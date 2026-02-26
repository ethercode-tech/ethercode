"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import sendToAgentStream from "../lib/sendToAgentStream";
import {
  extractLeadFieldsFromText,
  mergeLeadDraft,
  isLeadReady,
} from "../lib/leadDraft";

export default function EtherCodeAssistantModal({
  open,
  onClose,
  showWelcome = true,
  title = "Asistente de ÉtherCode",
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorBar, setErrorBar] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const sessionIdRef = useRef(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // draft lead (se junta durante la charla)
  const leadDraftRef = useRef({
    personName: "",
    businessName: "",
    businessType: "",
    email: "",
    phone: "",
    sent: false,
  });

  // Persist session id
  useEffect(() => {
    if (typeof window === "undefined") return;

    let sid = localStorage.getItem("ethercode_chat_sid");
    if (!sid) {
      const uuid =
        (globalThis.crypto && crypto.randomUUID && crypto.randomUUID()) ||
        String(Date.now());
      sid = uuid;
      localStorage.setItem("ethercode_chat_sid", sid);
    }

    sessionIdRef.current = sid;
  }, []);

  // Reset state each time modal opens
  useEffect(() => {
    if (!open) return;

    setMessages([]);
    setHasStarted(false);
    setErrorBar("");
    setInput("");
    setIsTyping(false);

    leadDraftRef.current = {
      personName: "",
      businessName: "",
      businessType: "",
      email: "",
      phone: "",
      sent: false,
    };
  }, [open]);

  // Lock scroll + ESC
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onEsc);
    return () => {
      document.documentElement.style.overflow = prevOverflow || "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  // Autoscroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Autosize textarea
  const autosize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const max = 20 * 6; // ~6 líneas
    el.style.height = Math.min(el.scrollHeight, max) + "px";
  };

  useEffect(() => {
    autosize();
  }, [input, open]);

  if (!open) return null;

  const whatsappHref = useMemo(() => {
    const msg = encodeURIComponent(
      "Hola EtherCode, estaba probando a Nexo desde la web y quiero avanzar con un Empleado Digital para mi negocio."
    );
    return `https://wa.me/5493884486112?text=${msg}`;
  }, []);

  const welcomeVisible = !!showWelcome && !hasStarted && messages.length === 0 && !isTyping;

  async function trySendLeadOnce(lastUserMessage) {
    const draft = leadDraftRef.current;
    if (draft.sent) return;
    if (!isLeadReady(draft)) return;

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionIdRef.current,
        url: typeof window !== "undefined" ? window.location.href : "",
        draft,
        lastMessage: lastUserMessage || "",
      }),
    });

    if (res.ok) {
      leadDraftRef.current = { ...draft, sent: true };
    }
  }

  function humanizeErrorMessage(raw) {
    const msg = String(raw || "");

    // caso: rate limit
    if (msg.includes("Límite diario por IP")) {
      return {
        banner: "Cupo gratuito diario alcanzado",
        bot:
          "Listo, ya probaste el demo desde esta red por hoy. Si querés seguir ahora mismo, escribinos por WhatsApp y te armamos el Empleado Digital con tu caso real (sin esperar al reset del límite).",
        showWhatsApp: true,
      };
    }

    // timeouts u otros
    if (msg.toLowerCase().includes("timeout") || msg.toLowerCase().includes("timed out")) {
      return {
        banner: "El asistente está tardando más de lo normal",
        bot:
          "Estoy tardando un poco más de lo normal. Probá de nuevo en unos segundos, o si querés avanzar ya, escribinos por WhatsApp y lo resolvemos rápido.",
        showWhatsApp: true,
      };
    }

    return {
      banner: "No pude procesar tu consulta",
      bot:
        "Tuve un problema al procesar eso. Probá otra vez en unos segundos. Si estás con apuro, escribinos por WhatsApp y lo resolvemos sin vueltas.",
      showWhatsApp: true,
    };
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;

    if (!hasStarted) setHasStarted(true);

    // juntar lead fields (solo del user)
    try {
      const fields = extractLeadFieldsFromText(text);
      leadDraftRef.current = mergeLeadDraft(leadDraftRef.current, fields);
      trySendLeadOnce(text).catch(() => {});
    } catch {
      // no rompemos chat si extractor falla
    }

    setInput("");
    setIsTyping(true);
    setErrorBar("");

    setMessages((m) => [...m, { sender: "user", text }, { sender: "bot", text: "" }]);

    try {
      const { reader, decoder } = await sendToAgentStream({
        message: text,
        sessionId: sessionIdRef.current,
      });

      let reply = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const t = line.trim();
          if (!t) continue;

          if (t.startsWith("data:")) {
            const payload = t.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;

            let chunk = "";
            try {
              const obj = JSON.parse(payload);
              chunk = obj?.response || "";
            } catch {
              chunk = payload;
            }

            if (chunk) {
              reply += chunk;
              setMessages((m) => {
                const updated = [...m];
                updated[updated.length - 1] = { sender: "bot", text: reply };
                return updated;
              });
            }
          }
        }
      }
    } catch (e) {
      console.error(e);

      const friendly = humanizeErrorMessage(e?.message || "");
      setErrorBar(friendly.banner);

      setMessages((m) => {
        const updated = [...m];
        updated[updated.length - 1] = {
          sender: "bot",
          text: friendly.bot,
          booking_url: friendly.showWhatsApp ? whatsappHref : null,
        };
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const canSend = input.trim().length > 0 && !isTyping;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center dark"
      style={{ colorScheme: "dark" }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop + aura */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(0,180,232,0.22), transparent 70%)",
        }}
      />

      {/* Panel */}
      <div
        className="relative w-[94vw] max-w-3xl h-[86dvh] sm:h-[78vh] rounded-2xl overflow-hidden
                   shadow-[0_30px_100px_rgba(0,0,0,0.55)] border border-white/10
                   bg-neutral-950/90 text-neutral-100 flex flex-col"
      >
        {/* Header */}
        <div className="relative px-5 py-3 text-white bg-gradient-to-r from-[#00B4D8] via-[#00B4E7] to-[#C77DFF]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 grid place-items-center">🧠</div>
              <div>
                <div className="font-semibold leading-none">{title} — Nexo</div>
                <div className="text-[11px] opacity-95 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Ventas y automatización • 24/7
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-white/15 transition"
              aria-label="Cerrar"
              title="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Error banner */}
        {errorBar && (
          <div className="px-4 py-2 text-xs bg-red-900/30 text-red-200 border-b border-red-800/40">
            {errorBar}{" "}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              Abrir WhatsApp
            </a>
          </div>
        )}

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {welcomeVisible && (
            <div className="rounded-2xl p-4 bg-neutral-900/60 border border-white/10 text-sm text-neutral-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-white/10 grid place-items-center">
                  🧠
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white">
                    Soy Nexo, el asistente de ventas de ÉtherCode
                  </div>
                  <div className="mt-1 text-neutral-300">
                    Te ayudo a definir un <span className="text-white font-semibold">Empleado Digital</span> para automatizar tareas repetitivas.
                    Para empezar rápido, decime:
                    <ul className="mt-2 space-y-1 text-neutral-300">
                      <li>• Nombre del negocio</li>
                      <li>• Qué querés automatizar primero (WhatsApp, reservas o ventas)</li>
                      <li>• Tu WhatsApp o email si querés que te contactemos</li>
                    </ul>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <QuickChip onClick={() => setInput("Mi negocio se llama ____ y quiero automatizar WhatsApp para responder consultas.")}>
                      WhatsApp
                    </QuickChip>
                    <QuickChip onClick={() => setInput("Tengo ____ y quiero automatizar reservas/turnos y confirmaciones.")}>
                      Reservas
                    </QuickChip>
                    <QuickChip onClick={() => setInput("Quiero automatizar ventas: calificar leads, seguimiento y recordatorios.")}>
                      Ventas
                    </QuickChip>
                  </div>
                </div>
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <Bubble
              key={i}
              side={m.sender === "user" ? "right" : "left"}
              booking_url={m.booking_url}
            >
              {m.text}
            </Bubble>
          ))}

          {isTyping && (
            <Bubble side="left" raw>
              <TypingDots />
            </Bubble>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Composer */}
        <div className="sticky bottom-0 left-0 right-0">
          <div className="h-4 bg-gradient-to-t from-neutral-950/95 to-transparent" />
          <div className="px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur p-2 shadow">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Escribí tu consulta…"
                  className="flex-1 min-h-[40px] max-h-32 resize-none bg-transparent outline-none px-2 py-2 text-sm leading-5
                             text-neutral-100 placeholder:text-neutral-400 caret-white"
                  aria-label="Tu mensaje"
                />
                <button
                  onClick={handleSend}
                  disabled={!canSend}
                  className={`shrink-0 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition shadow
                    ${
                      canSend
                        ? "bg-[#00B4E7] text-black hover:brightness-110"
                        : "bg-white/10 text-white/50 cursor-not-allowed"
                    }`}
                  aria-label="Enviar"
                  title="Enviar"
                >
                  Enviar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="px-2 pt-1 flex items-center justify-between gap-3">
                <span className="text-[11px] text-neutral-400">
                  Enter envía • Shift+Enter hace salto de línea
                </span>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-neutral-300 underline hover:text-white"
                >
                  Preferís WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === Quick chips === */
function QuickChip({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[12px] rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80 hover:bg-white/10"
    >
      {children}
    </button>
  );
}

/* === util: autolink === */
function autolink(text) {
  if (typeof text !== "string") return text;
  const urlRegex = /(https?:\/\/[^\s)]+)|(www\.[^\s)]+)/gi;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (!part) return null;
    const isUrl = /^(https?:\/\/|www\.)/i.test(part);
    if (!isUrl) return <span key={i}>{part}</span>;
    const href = part.startsWith("http") ? part : `https://${part}`;
    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-cyan-300 hover:text-cyan-200 break-all"
      >
        {part}
      </a>
    );
  });
}

function Bubble({ side = "left", children, booking_url, raw = false }) {
  const isRight = side === "right";
  const hasLink = typeof booking_url === "string" && booking_url.startsWith("http");
  const content = raw ? children : typeof children === "string" ? autolink(children) : children;

  const botStyle = {
    background:
      "conic-gradient(at 10% 10%, rgba(0,245,212,0.18), rgba(0,180,231,0.22), rgba(199,125,255,0.18), rgba(20,22,32,0.85))",
  };

  const userClass =
    "bg-neutral-900/80 text-white border border-cyan-300/40 shadow-[0_0_24px_rgba(0,180,231,0.18)]";

  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm space-y-2 ${
          isRight ? userClass : "text-white border border-white/10"
        }`}
        style={isRight ? undefined : botStyle}
      >
        <div className="whitespace-pre-wrap break-words">{content}</div>

        {hasLink && (
          <a
            href={booking_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition"
            role="button"
          >
            Abrir WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <i className="inline-block w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.2s]" />
      <i className="inline-block w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.1s]" />
      <i className="inline-block w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
    </span>
  );
}
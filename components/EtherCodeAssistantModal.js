"use client";
import { useEffect, useRef, useState } from "react";

export default function EtherCodeAssistantModal({
  open,
  onClose,
  showWelcome = true,
  title = "Asistente de EtherCode",
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorBar, setErrorBar] = useState("");
  const sessionIdRef = useRef(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    let sid = null;
    if (typeof window !== "undefined") {
      sid = localStorage.getItem("ethercode_chat_sid");
      if (!sid) {
        sid = (crypto?.randomUUID?.() || String(Date.now()));
        localStorage.setItem("ethercode_chat_sid", sid);
      }
    }
    sessionIdRef.current = sid;
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => {
      document.documentElement.style.overflow = prevOverflow || "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !showWelcome) return;
    setMessages((m) =>
      m.length ? m : [{ sender: "bot", text: "¡Hola! Soy Ali 🤖. el empleado digital que necesita tu negocio, charlemos y te comento como podes tener el tuyo." }],
    );
  }, [open, showWelcome]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const autosize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const max = 20 * 5;
    el.style.height = Math.min(el.scrollHeight, max) + "px";
  };
  useEffect(() => { autosize(); }, [input, open]);

  if (!open) return null;

  async function sendToAgent({ message, context }) {
    const res = await fetch("/api/send-to-n8n", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId: sessionIdRef.current,
        meta: {
          url: typeof window !== "undefined" ? window.location.href : "",
          tz: "America/Argentina/Jujuy",
          context: context || "",
        },
      }),
    });
    if (!res.ok) throw new Error(await res.text().catch(() => "n8n error"));
    return res.json();
  }

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { sender: "user", text }]);
    setInput("");
    setIsTyping(true);
    setErrorBar("");

    try {
      const context = messages[messages.length - 1]?.text || "";
      const data = await sendToAgent({ message: text, context });

      const reply =
        data?.reply ||
        "No pude procesarlo justo ahora. Si querés, dejame tu contacto y te escribimos a la brevedad.";
      const bookingUrl = data?.booking_url || null;

      setMessages((m) => [...m, { sender: "bot", text: reply, booking_url: bookingUrl }]);
    } catch (e) {
      console.error(e);
      // setErrorBar("No pude conectar con el asistente. Revisá /api/send-to-n8n o el Webhook.");
      setMessages((m) => [
        ...m,
        { sender: "bot", text: "Tuvimos un problema al procesar tu consulta. Probá otra vez." },
      ]);
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

  return (
    // 🔒 Forzamos dark SIEMPRE
    <div className="fixed inset-0 z-[100000] flex items-center justify-center dark" style={{ colorScheme: "dark" }} role="dialog" aria-modal="true">
      {/* Backdrop oscuro */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel oscuro */}
      <div className="relative w-[94vw] max-w-3xl h-[86dvh] sm:h-[78vh] rounded-2xl overflow-hidden
                      shadow-[0_30px_100px_rgba(0,0,0,0.55)] border border-white/10
                      bg-neutral-950/90 text-neutral-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[#00B4E7] to-blue-700 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 grid place-items-center">🤖</div>
            <div>
              <div className="font-semibold leading-none">{title}</div>
              <div className="text-xs opacity-90">IA comercial & técnica — EtherCode</div>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-white/15 transition" aria-label="Cerrar">✕</button>
        </div>

        {errorBar && (
          <div className="px-4 py-2 text-xs bg-red-900/30 text-red-200 border-b border-red-800/40">
            {errorBar}
          </div>
        )}

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m, i) => (
            <Bubble key={i} side={m.sender === "user" ? "right" : "left"} booking_url={m.booking_url}>
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

        {/* Composer sticky oscuro */}
        <div className="sticky bottom-0 left-0 right-0">
          <div className="h-4 bg-gradient-to-t from-neutral-950/95 to-transparent" />
          <div className="px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur p-2 shadow">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); }}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Escribí tu consulta…"
                  className="flex-1 min-h-[40px] max-h-32 resize-none bg-transparent outline-none px-2 py-2 text-sm leading-5
                             text-neutral-100 placeholder:text-neutral-400 caret-white"
                />
                <button
                  onClick={handleSend}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl
                             bg--[#00B4E7] text-white hover:bg-blue-700 transition shadow"
                  aria-label="Enviar"
                >
                  Enviar
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="px-2 pt-1">
                <span className="text-[11px] text-neutral-400">Enter envía • Shift+Enter hace salto de línea</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== util: convierte URLs en links clickeables ===== */
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
      <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="underline text-blue-400 hover:text-blue-300 break-all">
        {part}
      </a>
    );
  });
}

function Bubble({ side = "left", children, booking_url, raw = false }) {
  const isRight = side === "right";
  const hasLink = typeof booking_url === "string" && booking_url.startsWith("http");
  const content = raw ? children : (typeof children === "string" ? autolink(children) : children);

  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm space-y-2
        ${isRight ? "bg--[#00B4E7] text-white" : "bg-neutral-800 border border-neutral-700/60 text-neutral-100"}`}
      >
        <div className="whitespace-pre-wrap break-words">{content}</div>
        {hasLink && (
          <a
            href={booking_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
            role="button"
          >
            Abrir agenda
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

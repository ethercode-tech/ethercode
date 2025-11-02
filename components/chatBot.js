import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Chat EtherCode — glass + aura, tip de contacto, consistente con el estilo del sitio
const ChatBot = ({
  closeChat,
  showWelcomeMessage,
  bottomOffset = 150, // alineado sobre la burbuja de WhatsApp
  rightOffset = 24,
  fixed = true,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorBar, setErrorBar] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ name: "", email: "", telefono: "" });
  const sessionIdRef = useRef(null);
  const messagesEndRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // === Helpers ===
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let sid = window.localStorage.getItem("ethercode_chat_sid");
    if (!sid) {
      sid = (crypto?.randomUUID?.() || String(Date.now()));
      window.localStorage.setItem("ethercode_chat_sid", sid);
    }
    sessionIdRef.current = sid;
  }, []);

  // Mensaje de bienvenida (opcional)
  useEffect(() => {
    if (showWelcomeMessage) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            sender: "bot",
            text:
              "¡Hola! Soy Ali, tu asistente de EtherCode. Contame en qué te ayudo y te respondo al toque ⚡",
          },
        ]);
        setIsTyping(false);
      }, 450);
    }
  }, [showWelcomeMessage]);

  // Envío a n8n
  const sendToAgent = async ({ message, context }) => {
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
  };

  // Enviar texto
  const sendMessage = async (message) => {
    const trimmed = (message || input || "").trim();
    if (!trimmed) return;

    // Atajo de UX
    if (trimmed.toLowerCase() === "contacto") {
      setShowContactForm(true);
      setMessages((m) => [...m, { sender: "user", text: trimmed }]);
      setInput("");
      return;
    }

    const userMessage = { sender: "user", text: trimmed };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setIsTyping(true);
    setErrorBar("");

    try {
      const context = messages[messages.length - 1]?.text || "";
      const data = await sendToAgent({ message: trimmed, context });

      const botText =
        data?.reply ||
        "Ahora mismo no pude procesarlo. Si querés, dejame tu contacto y te escribimos enseguida.";
      setMessages((m) => [...m, { sender: "bot", text: botText }]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [
        ...m,
        { sender: "bot", text: "Tuvimos un problema al procesar tu consulta. Probá nuevamente." },
      ]);
      setErrorBar("Error de conexión. Verificá /api/send-to-n8n y el webhook de n8n.");
    } finally {
      setIsTyping(false);
    }
  };

  // Enviar contacto
  const handleContactSubmit = async () => {
    const { name, email, telefono } = contactData;
    if (!name || !email || !telefono) {
      setMessages((m) => [...m, { sender: "bot", text: "Completá nombre, correo y teléfono para avanzar." }]);
      return;
    }
    setIsTyping(true);
    setErrorBar("");

    try {
      await sendToAgent({
        message: `LEAD_CAPTURE|name:${name}|email:${email}|phone:${telefono}`,
        context: "chatbot_contact_form",
      });

      setMessages((m) => [
        ...m,
        { sender: "user", text: `Nombre: ${name} | Email: ${email} | Tel: ${telefono}` },
        { sender: "bot", text: "¡Gracias! Registramos tus datos. Te contactamos a la brevedad." },
      ]);
      setShowContactForm(false);
      setContactData({ name: "", email: "", telefono: "" });
    } catch (e) {
      console.error(e);
      setMessages((m) => [
        ...m,
        { sender: "bot", text: "No pudimos registrar el contacto ahora. Probá otra vez en un momento." },
      ]);
      setErrorBar("No se pudo enviar el lead a n8n.");
    } finally {
      setIsTyping(false);
    }
  };

  // Posición
  const wrapperClass = fixed ? "fixed z-[99999]" : "";
  const wrapperStyle = fixed
    ? {
        right: `${rightOffset}px`,
        bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottomOffset}px)`,
      }
    : {};

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      {/* Aura conic (match sitio) */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[1.5rem] blur-2xl opacity-30"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, rgba(0,245,212,.28), rgba(199,125,255,.18), rgba(10,17,40,.0))",
        }}
      />

      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="w-[92vw] max-w-[380px] h-[560px] sm:w-[360px] sm:max-w-none sm:h-[580px]
                   rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl
                   shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#00B4D8] via-[#00B4E7] to-[#C77DFF] text-white py-3 pl-4 pr-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              Ali • Asistente EtherCode
            </div>
            <button
              onClick={closeChat}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/15 transition"
              aria-label="Cerrar chat"
              title="Cerrar"
            >
              ✕
            </button>
          </div>
          <div className="text-white/90 text-[11px] mt-0.5">Responde en segundos • 24/7</div>
        </div>

        {/* Error bar */}
        {errorBar && (
          <div className="bg-red-50 text-red-700 text-xs px-3 py-2 border-b border-red-100">
            {errorBar}
          </div>
        )}

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} sender={msg.sender}>
              {msg.text}
            </MessageBubble>
          ))}
          {isTyping && (
            <MessageBubble sender="bot">
              <TypingDots />
            </MessageBubble>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Contact form / Input */}
        {showContactForm ? (
          <div className="border-t border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                placeholder="Nombre"
                value={contactData.name}
                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                className="p-2 rounded-xl bg-white/90 text-black border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                className="p-2 rounded-xl bg-white/90 text-black border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={contactData.telefono}
                onChange={(e) => setContactData({ ...contactData, telefono: e.target.value })}
                className="p-2 rounded-xl bg-white/90 text-black border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleContactSubmit}
                  className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#00B4E7] text-black font-semibold hover:opacity-95 transition"
                >
                  Enviar
                </button>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="px-3 py-2 rounded-xl bg-white/80 text-black hover:bg-white transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-t border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Escribí tu consulta…"
                className="flex-1 p-2 rounded-xl bg-white/90 text-black border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              />
              <button
                onClick={() => sendMessage()}
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl
                           bg-gradient-to-br from-[#00B4D8] to-[#00B4E7] text-black font-semibold hover:opacity-95 transition"
                aria-label="Enviar"
                title="Enviar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-[11px] text-white/80">
              Tip: escribí <span className="font-semibold">contacto</span> y te pedimos tus datos para asistirte.
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

function MessageBubble({ sender, children }) {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3 py-2 leading-relaxed text-sm shadow-sm
        ${isUser
          ? "bg-gradient-to-br from-[#00B4D8] to-[#00B4E7] text-black font-medium"
          : "bg-white/90 text-gray-900 border border-white/50"}`}
      >
        {children}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1">
      <span className="inline-block w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.2s]" />
      <span className="inline-block w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.1s]" />
      <span className="inline-block w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
    </div>
  );
}

export default ChatBot;

import { useState, useEffect, useRef } from "react";

// ✅ Chat limpio, cada mensaje va directo a n8n
// ✅ Diseño glass, header degradado, sombras suaves
// ✅ Posicionado arriba del botón de WhatsApp con offsets configurables
// ✅ Sin opciones pre-armadas
// ✅ Maneja "contacto" para abrir formulario (opcional)

const ChatBot = ({
  closeChat,
  showWelcomeMessage,
  bottomOffset = 150,   // subilo/bajalo según tu botón de WhatsApp
  rightOffset = 24,     // margen derecho
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

  // Auto-scroll al final
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // sessionId persistente por visitante
  useEffect(() => {
    let sid = null;
    if (typeof window !== "undefined") {
      sid = window.localStorage.getItem("ethercode_chat_sid");
      if (!sid) {
        sid = (crypto?.randomUUID?.() || String(Date.now()));
        window.localStorage.setItem("ethercode_chat_sid", sid);
      }
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
          { sender: "bot", text: "¡Hola! Soy Ali, tu asistente de EtherCode. Contame en qué te ayudo y te respondo al toque." },
        ]);
        setIsTyping(false);
      }, 450);
    }
  }, [showWelcomeMessage]);

  // Enviar al agente (n8n) por tu API
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
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || "n8n error");
    }
    return res.json();
  };

  // Enviar mensaje (texto)
  const sendMessage = async (message) => {
    const trimmed = (message || input || "").trim();
    if (!trimmed) return;

    // Atajo: si el usuario escribe "contacto", abrimos form
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

  // Form de contacto (guarda y también avisa al agente)
  const handleContactSubmit = async () => {
    const { name, email, telefono } = contactData;
    if (!name || !email || !telefono) {
      setMessages((m) => [...m, { sender: "bot", text: "Completá nombre, correo y teléfono para avanzar." }]);
      return;
    }
    setIsTyping(true);
    setErrorBar("");

    try {
      // Aviso al agente: lead capture (tu flujo en n8n decide qué hacer)
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

  // Posición fija con offsets y safe-area para iOS
  const wrapperClass = fixed ? "fixed z-[99999]" : "";
  const wrapperStyle = fixed
    ? {
        right: `${rightOffset}px`,
        bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottomOffset}px)`,
      }
    : {};

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      {/* Card principal */}
      <div className="w-[92vw] max-w-[380px] h-[560px] sm:w-[360px] sm:max-w-none sm:h-[580px]
                      rounded-2xl border border-white/30 bg-white/80 backdrop-blur-xl
                      shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 pl-4 pr-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold tracking-wide">Altibot</div>
            <button
              onClick={closeChat}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
          <div className="text-white/80 text-xs mt-0.5">Asistente de EtherCode</div>
        </div>

        {/* Barra de error (si la hay) */}
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

        {/* Form de contacto (opcional) */}
        {showContactForm ? (
          <div className="border-t border-gray-200 bg-white px-3 py-3">
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                placeholder="Nombre"
                value={contactData.name}
                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-400"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-400"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={contactData.telefono}
                onChange={(e) => setContactData({ ...contactData, telefono: e.target.value })}
                className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleContactSubmit}
                  className="flex-1 px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Enviar
                </button>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Input principal
          <div className="border-t border-gray-200 bg-white px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Escribí tu consulta…"
                className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={() => sendMessage()}
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                aria-label="Enviar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-[11px] text-gray-500">
              Tip: escribí <span className="font-semibold">contacto</span> para dejarnos tus datos.
            </div>
          </div>
        )}
      </div>
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
          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
          : "bg-gray-100 text-gray-800 border border-gray-200"}`}
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

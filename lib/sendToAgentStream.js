// src/lib/sendToAgentStream.js
export default async function sendToAgentStream({ message, sessionId }) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId: sessionIdRef.current,
        meta: {
          url: window.location.href,
          tz: "America/Argentina/Jujuy",
          context: "Landing: Agente IA, objetivo: captar leads y agendar demo"
        }
      })
    });
  
    const ct = res.headers.get("content-type") || "";
  
    // Si no es stream, devolvemos error legible
    if (!res.ok || !ct.includes("text/event-stream")) {
      const txt = await res.text().catch(() => "");
      let msg = "No pude conectar con el asistente.";
      try {
        msg = JSON.parse(txt)?.error || msg;
      } catch {
        if (txt) msg = txt;
      }
      throw new Error(msg);
    }
  
    return { reader: res.body.getReader(), decoder: new TextDecoder() };
  }
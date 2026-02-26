// src/lib/sendToAgentStream.js
export default async function sendToAgentStream({ message, sessionId }) {
    if (!sessionId) {
      throw new Error("sessionId requerido");
    }
  
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId, // 👈 usamos el parámetro que nos pasan
        meta: {
          url: typeof window !== "undefined" ? window.location.href : "",
          tz: "America/Argentina/Jujuy",
          context: "Landing: Agente IA, objetivo: captar leads y agendar demo"
        }
      })
    });
  
    const ct = res.headers.get("content-type") || "";
  
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
  
    return {
      reader: res.body.getReader(),
      decoder: new TextDecoder()
    };
  }
// components/EtherCodeChat.js
"use client";
import { useState, useRef, useEffect } from "react";

export default function EtherCodeChat() {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const sessionIdRef = useRef(null);

  useEffect(() => {
    let sid = localStorage.getItem("sessionId");
    if (!sid) {
      sid = (crypto.randomUUID?.() || String(Date.now()));
      localStorage.setItem("sessionId", sid);
    }
    sessionIdRef.current = sid;
  }, []);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMsgs(m => [...m, { role: "user", text }]);

    const res = await fetch("/api/send-to-n8n", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: text,
        sessionId: sessionIdRef.current,
        meta: { url: location.href, tz: "America/Argentina/Jujuy" }
      }),
    });

    const data = await res.json().catch(() => ({}));
    const reply = data?.reply || "Ups, no pude procesar tu consulta.";
    setMsgs(m => [...m, { role: "assistant", text: reply }]);
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 rounded-2xl shadow-xl bg-neutral-900 text-neutral-100 p-3">
      <div className="text-sm font-semibold mb-2">EtherCode – Asistente</div>
      <div className="h-64 overflow-y-auto space-y-2 text-sm">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className={`inline-block px-3 py-2 rounded-xl ${m.role === "user" ? "bg-primary/20" : "bg-white/10"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Escribí tu consulta…"
          className="flex-1 bg-white/5 rounded-xl px-3 py-2 outline-none"
        />
        <button onClick={send} className="px-3 py-2 bg-primary/80 rounded-xl">Enviar</button>
      </div>
    </div>
  );
}

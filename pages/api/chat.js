// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }

  try {
    const workerUrl = process.env.CF_WORKER_CHAT_URL;
    if (!workerUrl) return res.status(500).json({ ok: false, error: "Falta CF_WORKER_CHAT_URL" });

    const r = await fetch(workerUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    const ct = r.headers.get("content-type") || "";

    // Errores JSON passthrough
    if (!ct.includes("text/event-stream")) {
      const text = await r.text().catch(() => "");
      res.status(r.status).send(text);
      return;
    }

    // Streaming passthrough
    res.statusCode = r.status;
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const reader = r.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (e) {
    res.status(502).json({ ok: false, error: e?.message || "Error proxy chat" });
  }
}
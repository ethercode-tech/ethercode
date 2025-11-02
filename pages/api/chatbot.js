
export async function POST(req, res) {
  try {
    const body = await (req.json?.() || new Promise(r => {
      let b = ""; req.on("data", c => b += c);
      req.on("end", () => r(JSON.parse(b || "{}")));
    }));

    const r = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await r.json().catch(() => ({}));

    const done = (payload, status=200) =>
      (res ? res.status(status).json(payload) : new Response(JSON.stringify(payload), { status, headers: { "content-type":"application/json" }}));

    if (!r.ok) return done({ ok:false, error:`n8n ${r.status}` }, 502);
    return done({ ok:true, ...data }, 200);
  } catch (e) {
    const done = (payload, status=500) =>
      (res ? res.status(status).json(payload) : new Response(JSON.stringify(payload), { status, headers: { "content-type":"application/json" }}));
    return done({ ok:false, error: e?.message || "Error enviando a n8n" }, 502);
  }
}

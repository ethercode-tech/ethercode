// pages/api/send-to-n8n.js
import crypto from "crypto";

const N8N_URL = process.env.N8N_WEBHOOK_URL;        // Test: .../webhook-test/...
const SHARED = process.env.N8N_SHARED_SECRET || ""; // opcional (si no lo usás, dejalo vacío)

export default async function handler(req, res) {
  // (Opcional) CORS simple si lo necesitás desde otro dominio
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-ethercode-signature");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!N8N_URL) {
    return res.status(500).json({ ok: false, error: "Missing N8N_WEBHOOK_URL" });
  }

  // Next ya parsea JSON en req.body; si viniera vacío, intentamos leer manualmente
  const body =
    (req.body && Object.keys(req.body).length ? req.body : await readBody(req)) || {};

  const payload = JSON.stringify(body);

  // Firma HMAC opcional (si definiste N8N_SHARED_SECRET)
  const headers = { "content-type": "application/json" };
  if (SHARED) {
    const sig = crypto.createHmac("sha256", SHARED).update(payload).digest("hex");
    headers["x-ethercode-signature"] = sig;
  }

  // Timeout
  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), 30000);

  try {
    const r = await fetch(N8N_URL, {
      method: "POST",
      headers,
      body: payload,
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(to);

    // Intentamos parsear JSON; si no es JSON devolvemos texto crudo
    let n8nData;
    const ct = r.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      n8nData = await r.json().catch(() => ({}));
    } else {
      n8nData = { reply: await r.text().catch(() => "") };
    }
    console.log('n8nData', n8nData);

    if (!r.ok) {
      return res.status(502).json({ ok: false, error: `n8n ${r.status}`, n8n: n8nData });
    }
    return res.status(200).json({ ok: true, ...n8nData });
  } catch (e) {
    clearTimeout(to);
    return res
      .status(502)
      .json({ ok: false, error: e?.message || "Error enviando a n8n" });
  }
}

// Lee el body crudo si hiciera falta (cuando req.body viene vacío)
function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

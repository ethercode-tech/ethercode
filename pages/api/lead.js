// pages/api/lead.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Método no permitido" });
    }
  
    try {
        const FORM_ID = "xzdaodzl"; // <- EJ: xabcdxyz
        const endpoint = `https://formspree.io/f/${FORM_ID}`;
      const formUrl = process.env.FORMSPREE_LEADS_URL || endpoint;
      if (!formUrl) {
        return res.status(500).json({ ok: false, error: "Falta FORMSPREE_LEADS_URL" });
      }
  
      const { sessionId, url, draft, lastMessage } = req.body || {};
  
      if (!sessionId || !draft) {
        return res.status(400).json({ ok: false, error: "Faltan datos (sessionId/draft)" });
      }
  
      // Guardrail: no mandes basura
      const hasContact = !!(draft.email || draft.phone);
      const hasBusiness = !!(draft.businessName || draft.businessType);
      if (!hasContact || !hasBusiness) {
        return res.status(200).json({ ok: true, skipped: true, reason: "Lead incompleto" });
      }
  
      const payload = {
        sessionId,
        url: url || "",
        personName: draft.personName || "",
        businessName: draft.businessName || "",
        businessType: draft.businessType || "",
        email: draft.email || "",
        phone: draft.phone || "",
        lastMessage: lastMessage || "",
        createdAt: new Date().toISOString(),
        source: "ethercode-ai-chat",
      };
  
      const r = await fetch(formUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!r.ok) {
        const t = await r.text().catch(() => "");
        return res.status(502).json({ ok: false, error: "Error Formspree", details: t });
      }
  
      return res.status(200).json({ ok: true, saved: true });
    } catch (e) {
      return res.status(500).json({ ok: false, error: e?.message || "Error guardando lead" });
    }
  }

const emailRe = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

function normalizePhone(s) {
  const digits = (s || "").replace(/\D/g, "");
  return digits.length >= 10 ? digits : "";
}

export function extractContact(text) {
  const email = (text || "").match(emailRe)?.[0] || "";
  const phone = normalizePhone(text || "");
  return { email, phone };
}

export async function captureLead({ sessionId, url, message, transcript }) {
  const contact = extractContact(message);
  const hasContact = !!(contact.email || contact.phone);

  // Guardamos igual aunque no haya contacto, porque sirve para analítica.
  // Si querés guardar solo cuando hay contacto, descomentá:
  // if (!hasContact) return { ok: true, skipped: true };

  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, url, contact, message, transcript }),
  });

  return res.json().catch(() => ({ ok: false }));
}
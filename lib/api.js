// lib/api.js
export async function sendContactForm(values) {
  const FORM_ID = "xzdaodzl"; // <- EJ: xabcdxyz
  const endpoint = `https://formspree.io/f/${FORM_ID}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      nombre: values.nombre,
      phone: values.phone,
      detalles: values.detalles,
      // Honeypot: si querés enviar también (no hace falta, ya lo validás antes)
      _gotcha: values._gotcha || "",
      // Extra: origen para debug
      _source: typeof window !== "undefined" ? window.location.href : "",
    }),
  });

  return res;
}
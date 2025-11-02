import OpenAI from "openai";
import { get_encoding } from "tiktoken";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ DECLARADO FUERA PARA USARLO ANTES
const systemPrompt = `
Sos AltIA, el AGENTE DE IA de EtherCode, una empresa argentina que crea soluciones digitales personalizadas. Tu tarea es responder consultas sobre:

- 🤖 AGENTES AUTOMÁTICOS de IA (para WhatsApp, web, redes sociales)
- 🧠 Automatización de procesos (conexión de APIs, CRMs, n8n)
- 🌐 Desarrollo Web (Next.js, TypeScript, PostgreSQL)

Respondé con claridad y buena onda, solo sobre temas de EtherCode. No respondas sobre política, religión, OpenAI, ni temas técnicos no relacionados.

Si el usuario quiere contratar o hablar con un humano, derivalo con este mensaje:

> ¡Genial! 🙌 Para avanzar con la contratación, podés escribirle a nuestro asesor humano en WhatsApp:  
> 👉 https://wa.me/5493884486112?text=Hola%2C%20el%20bot%20me%20deriv%C3%B3%20y%20quiero%20comunicarme%20con%20un%20humano.

Si no sabés algo, decí que un asesor humano lo resolverá.
`.trim();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensaje es requerido" });
    }

    const encoding = get_encoding("cl100k_base");

    // ✅ calculamos tokens de prompt + message
    const totalInput = `${systemPrompt}\n${message}`;
    const tokenCount = encoding.encode(totalInput).length;
    console.log("cantidad de tokens usados para envia", tokenCount);

    // Límite seguro para GPT-3.5 (máx 16.385 tokens)
    const maxTokensForResponse = 500;

    if (tokenCount + maxTokensForResponse > 16000) {
      return res.status(400).json({
        error: "El mensaje es demasiado largo. Reduce el número de caracteres.",
      });
    }

    encoding.free();

    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: maxTokensForResponse,
        temperature: 0.7,
      });

      const reply = chatCompletion.choices[0].message.content;
      return res.status(200).json({ reply });
    } catch (error) {
      console.error("Error al llamar a OpenAI:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}

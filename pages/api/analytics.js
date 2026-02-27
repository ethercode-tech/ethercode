// export default function handler(req, res) {
//   if (req.method === "POST") {
//     const { trackingId, path } = req.body;

//     // Verifica que ambos campos estén presentes
//     if (!trackingId || !path) {
//       return res
//         .status(400)
//         .json({ error: "trackingId and path are required" });
//     }

//     // Aquí puedes agregar el manejo de la lógica de Analytics
//     console.log("Datos de Analytics recibidos:", { trackingId, path });

//     // Responde con un mensaje de éxito
//     return res
//       .status(200)
//       .json({ message: "Analytics data sent successfully" });
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { trackingId: bodyTrackingId, path } = req.body;
    const trackingId = bodyTrackingId || process.env.NEXT_PUBLIC_GA_TRACKING_ID;

    if (!trackingId || !path) {
      return res
        .status(400)
        .json({ error: "path is required; trackingId or NEXT_PUBLIC_GA_TRACKING_ID must be set" });
    }

    try {
      // Envía los datos de navegación a Google Analytics (Measurement Protocol)
      await fetch(`https://www.google-analytics.com/collect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          v: "1", // Versión de la API de Google Analytics
          tid: trackingId, // ID de seguimiento (trackingId)
          cid: "555", // Identificador único de cliente; puede ser estático o dinámico
          t: "pageview", // Tipo de hit (pageview)
          dp: path, // Path de la URL (ruta)
        }),
      });

      // Responde con éxito si el envío fue exitoso
      return res
        .status(200)
        .json({ message: "Analytics data sent successfully" });
    } catch (error) {
      console.error("Error al enviar datos a Google Analytics:", error);
      // Responde con un error si algo falla
      return res
        .status(500)
        .json({ error: "Error al enviar datos a Google Analytics" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

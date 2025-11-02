import { createPool } from '@vercel/postgres';
import nodemailer from 'nodemailer';
import { newsletterEmailTemplate } from "../../templates/templateSendNewletter"; // Plantilla del newsletter

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Crear conexión a la base de datos
    const pool = createPool({
      connectionString: process.env.POSTGRES_URL,
    });

    // Obtener todos los emails de la tabla newsletter
    const { rows: subscribers } = await pool.sql`SELECT email FROM newsletter`;

    console.log('subscribers', subscribers);

    if (subscribers.length === 0) {
      return res.status(404).json({ error: 'No hay suscriptores en la base de datos.' });
    }

    // Configurar transporte para enviar correos
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar correo a cada suscriptor
    for (const subscriber of subscribers) {
      const email = subscriber.email;

      await transporter.sendMail({
        from: `"EtherCode" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Tu Newsletter Semanal de EtherCode 🚀',
        html: newsletterEmailTemplate(), // Generar el contenido dinámico del newsletter
      });
    }

    return res.status(200).json({ 
        suscriptores: `Se encontraron ${subscribers.length} suscriptores`,
        message: 'el Newsletter fue enviado a todos.' 
    });
  } catch (error) {
    console.error('Error al enviar el newsletter:', error);
    return res.status(500).json({ error: 'Error al enviar el newsletter.' });
  }
}

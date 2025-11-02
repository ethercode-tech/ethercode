import { transporter } from "../../config/nodemailer";
import { createPool } from '@vercel/postgres';
import { confirmationEmailTemplate } from "../../templates/templateMail";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'El correo electrónico es requerido.' });
    }

    try {
      const pool = createPool({
        connectionString: process.env.POSTGRES_URL,
      });

      await pool.sql`INSERT INTO newsletter (email) VALUES (${email})`;

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Confirma tu suscripción al newsletter de EtherCode!',
        html: confirmationEmailTemplate(email),
      });

      return res.status(200).json({ message: 'Suscripción exitosa. Por favor, revisa tu correo para confirmar la suscripción.' });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);

      if (error.code === '23505') {
        return res.status(400).json({ error: 'Ya te encuentras registrado a nuestro newsletter! Gracias!' });
      }

      return res.status(500).json({ error: 'Error al suscribirse, inténtalo de nuevo más tarde.' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}

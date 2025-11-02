import { createPool } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'El correo electrónico es requerido.' });
    }

    try {
      const pool = createPool({
        connectionString: process.env.POSTGRES_URL,
      });

      const result = await pool.sql`DELETE FROM newsletter WHERE email = ${email}`;

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Tu correo ya no está registrado en nuestra lista.' });
      }

      return res.status(200).json({ message: 'Has sido eliminado de la lista de suscriptores.' });
    } catch (error) {
      console.error('Error al eliminar el correo:', error);
      return res.status(500).json({ error: 'Error al procesar la solicitud, inténtalo de nuevo más tarde.' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}

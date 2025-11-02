import { createPool } from '@vercel/postgres';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, contact } = req.body;

    if (!name || !contact) {
      return res.status(400).json({ error: 'El nombre y el contacto son requeridos.' });
    }

    try {
      // Crear la conexión con la base de datos
      const pool = createPool({
        connectionString: process.env.POSTGRES_URL,
      });

      await pool.sql`INSERT INTO client_contacts (name, contact_info) VALUES (${name}, ${contact})`;

      return res.status(200).json({ message: 'Información registrada exitosamente. ¡Gracias por tu interés en EtherCode!' });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);

      if (error.code === '23505') {
        return res.status(400).json({ error: 'Este cliente ya se encuentra registrado. Gracias!' });
      }

      return res.status(500).json({ error: 'Error al registrar los datos. Por favor, inténtalo nuevamente más tarde.' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}

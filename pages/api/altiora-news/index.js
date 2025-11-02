const { createPool } = require('@vercel/postgres');

const pool = createPool();

module.exports = async (req, res) => {
  const { method } = req;

  try {
    const client = await pool.connect();

    if (method === 'GET') {
      // Obtener todas las noticias
      const { rows } = await client.query('SELECT * FROM news ORDER BY published_at DESC');
      client.release();
      return res.status(200).json({ success: true, news: rows });
    }

    if (method === 'POST') {
      // Crear una nueva noticia
      const { title, content, imageUrl } = req.body;
      if (!title || !content || !imageUrl) {
        client.release();
        return res.status(400).json({ success: false, message: 'Faltan datos requeridos.' });
      }

      const query = `
        INSERT INTO news (title, content, image_url, published_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
      `;
      const values = [title, content, imageUrl];

      const { rows } = await client.query(query, values);
      client.release();

      return res.status(201).json({ success: true, news: rows[0] });
    }

    client.release();
    return res.status(405).json({ success: false, message: 'Método no permitido.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error en el servidor.', error });
  }
};

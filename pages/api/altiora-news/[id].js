const { createPool } = require('@vercel/postgres');

const pool = createPool();

module.exports = async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  try {
    const client = await pool.connect();

    if (method === 'GET') {
      // Obtener una noticia específica
      const { rows } = await client.query('SELECT * FROM news WHERE id = $1', [id]);
      client.release();

      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Noticia no encontrada.' });
      }

      return res.status(200).json({ success: true, news: rows[0] });
    }

    if (method === 'PUT') {
      // Actualizar una noticia
      const { title, content, imageUrl } = req.body;
      if (!title || !content || !imageUrl) {
        client.release();
        return res.status(400).json({ success: false, message: 'Faltan datos requeridos.' });
      }

      const query = `
        UPDATE news
        SET title = $1, content = $2, image_url = $3, updated_at = NOW()
        WHERE id = $4
        RETURNING *;
      `;
      const values = [title, content, imageUrl, id];

      const { rows } = await client.query(query, values);
      client.release();

      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Noticia no encontrada.' });
      }

      return res.status(200).json({ success: true, news: rows[0] });
    }

    if (method === 'DELETE') {
      // Eliminar una noticia
      const { rowCount } = await client.query('DELETE FROM news WHERE id = $1', [id]);
      client.release();

      if (rowCount === 0) {
        return res.status(404).json({ success: false, message: 'Noticia no encontrada.' });
      }

      return res.status(200).json({ success: true, message: 'Noticia eliminada con éxito.' });
    }

    client.release();
    return res.status(405).json({ success: false, message: 'Método no permitido.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error en el servidor.', error });
  }
};

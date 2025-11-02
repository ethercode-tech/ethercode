const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

export default async function handler(req, res) {
  const { topic, id, country, category, q, pageSize } = req.query;

  try {
    let response;
    if (id) {
      response = await newsapi.v2.topHeadlines({
        country: country || 'ar',
        category: category || 'technology',
        q: q,
        pageSize: pageSize || 100,
      });
      const article = response.articles.find(article => article.id === parseInt(id));
      if (article) {
      console.log('article', article);
        res.status(200).json(article);
      } else {
        res.status(404).json({ error: 'Noticia no encontrada.' });
      }
    } else if (topic) {
      response = await newsapi.v2.everything({
        q: topic,
        language: 'es',
        pageSize: pageSize || 10,
        sortBy: 'publishedAt',
      });
      res.status(200).json(response);
    } else {
      response = await newsapi.v2.topHeadlines({
        country: country || 'ar',
        category: category || 'technology',
        q: q || '',
        pageSize: pageSize || 20,
      });
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
}

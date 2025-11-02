import { useEffect, useState } from 'react';
import Container from '../components/container';
import Footer from '../components/footer';
import Head from "next/head";
import NewsCardExternal from '../components/newCardExternal';
import NewsCardEtherCode from '../components/NewsCardEtherCode';
import { blogPosts } from '../data/blogPosts';

const BlogPage = () => {
  const [externalNews, setExternalNews] = useState([]);

  // Función para cargar noticias de EtherCode
  const fetchEtherCodeNews = async () => {
    try {
      const response = await axios.get('/api/ethercode-news'); // Endpoint para noticias del blog empresarial
      const articles = response.data.news.map((article) => ({
        ...article,
        id: article.id,
        urlToImage: article.image_url,
        publishedAt: article.published_at,
      }));
      setEtherCodeNews(articles);
    } catch (error) {
      console.error('Error fetching EtherCode news:', error);
    }
  };

  // Función para cargar noticias internacionales
  const fetchInternationalNews = async (topic = 'tecnología') => {
    try {
      const response = await axios.get('/api/news', {
        params: {
          topic,
          pageSize: 8,
        },
      });
      const articles = response.data.articles
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .map((article) => ({
          ...article,
          imageUrl: article.urlToImage,
          source: article.source,
          url: article.url
        }));
        setExternalNews(filtered);
      } catch (error) {
        console.error('Error al cargar noticias externas:', error);
      }
    };

  useEffect(() => {
    // Aquí deberías llamar a la función correcta para cargar noticias.
    // Por ejemplo, si quieres cargar noticias internacionales:
    fetchInternationalNews();
    // Si también quieres cargar noticias de EtherCode, descomenta la siguiente línea:
    // fetchEtherCodeNews();
  }, []);

  return (
    <>
      <Head>
        <title>Blog y Noticias | EtherCode</title>
        <meta name="description" content="Noticias de automatización con inteligencia artificial y experiencias reales desde EtherCode. Descubrí cómo mejorar tu negocio con tecnología." />
      </Head>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <Container>
          <h1 className="text-4xl font-bold text-center my-10">Blog y Noticias</h1>

          {/* Noticias EtherCode */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Noticias de EtherCode</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((news) => (
                <NewsCardEtherCode key={news.slug} news={news} />
              ))}
            </div>
          </section>

          {/* Noticias externas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Noticias del mundo sobre Automatización con IA</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {externalNews.map((news, index) => (
              <NewsCardExternal key={index} news={news} />
            ))}
            </div>
          </section>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;

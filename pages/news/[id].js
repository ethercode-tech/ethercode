import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const NewsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [news, setNews] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const response = await axios.get(`/api/news?id=${id}`);
          setNews(response.data);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      };
      fetchNews();
    }
  }, [id]);

  if (!news) {
    return <p>Noticia no encontrada.</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">{news.title}</h1>
      <div className="relative w-full h-64 mb-8">
        <Image
          src={news.urlToImage}
          alt={news.title}
          fill
          className="object-cover rounded"
          sizes="100vw"
          priority 
        />
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {new Date(news.publishedAt).toLocaleDateString()} - {news.source.name}
      </p>
      <p>{news.content}</p>
      <div className="mt-8">
        <Link href="/blog">
          <a>Volver al blog</a>
        </Link>
      </div>
    </div>
  );
};

export default NewsPage;

import Image from "next/image";
const NewsCardExternal = ({ news }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-900 m-4">

      <Image
        className="w-full h-48 object-cover"
        src={news.urlToImage}
        alt={news.title}
        priority 
      />
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">{news.title}</div>
        <p className="text-gray-700 dark:text-gray-300 text-sm">{news.description}</p>
      </div>
      <div className="px-6 pt-2 pb-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <span>{news.source?.name || 'Fuente desconocida'}</span>
        <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
      </div>
      <div className="px-6 pb-4">
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm"
        >
          Leer más en la fuente
        </a>
      </div>
    </div>
  );
};

export default NewsCardExternal;

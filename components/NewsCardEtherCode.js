import Link from 'next/link';
import Image from "next/image";

const NewsCardÉtherCode = ({ news }) => {
  return (
    <div className="max-w-sm rounded  shadow-lg bg-white dark:bg-gray-900 m-4">

    <Image className="w-full h-48 object-cover" src={news.imageUrl} alt={news.title} priority />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{news.title}</div>
        <p className="text-gray-700 dark:text-gray-300 text-base">{news.description}</p>
      </div>
      <div className="px-6 pb-4">
        <Link href={`/news/${news.slug}`} className="text-blue-500 hover:underline">
          Leer más
        </Link>
      </div>
    </div>
  );
};

export default NewsCardÉtherCode;

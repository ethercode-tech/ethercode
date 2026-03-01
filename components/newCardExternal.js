import Image from "next/image";
import { useState } from "react";

const fallbackImage = "/img-blog/default-news.jpg";

const NewsCardExternal = ({ news }) => {
  const [imgSrc, setImgSrc] = useState(news?.imageUrl || fallbackImage);

  if (!news) return null;

  return (
    <article
      className="group overflow-hidden rounded-2xl border border-white/10 
                 bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl 
                 transition duration-300"
    >
      {/* Imagen */}
      <div className="relative h-52 w-full">
        <Image
          src={imgSrc}
          alt={news.title || "Noticia externa"}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
          onError={() => setImgSrc(fallbackImage)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col justify-between min-h-[220px]">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition">
            {news.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {news.description || "Resumen no disponible."}
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>{news.source?.name || "Fuente externa"}</span>
          <span>
            {news.publishedAt
              ? new Date(news.publishedAt).toLocaleDateString()
              : ""}
          </span>
        </div>

        {/* CTA */}
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold 
                     text-cyan-500 hover:text-cyan-400 transition"
        >
          Leer en la fuente →
        </a>
      </div>
    </article>
  );
};

export default NewsCardExternal;
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const NewsCardÉtherCode = ({ news }) => {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl 
                 border border-white/10 
                 bg-gradient-to-br from-gray-900 to-gray-800 
                 shadow-xl hover:shadow-2xl transition"
    >
      {/* Imagen */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={news.imageUrl}
          alt={news.title}
          width="500"
          height={300}
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="text-xs text-gray-500 mb-2">
          5 min lectura • 2026
        </div>
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badge */}
        <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 
                         rounded-full bg-cyan-500/20 border border-cyan-400/30 
                         text-cyan-300 backdrop-blur">
          Automatización IA
        </span>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col justify-between min-h-[220px]">
        <div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition">
            {news.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {news.description}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link
            href={`/blog/${news.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold 
                       text-cyan-400 hover:text-cyan-300 transition"
          >
            Leer artículo
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Glow effect sutil */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 
                      bg-cyan-500 blur-2xl transition pointer-events-none" />
    </motion.article>
  );
};

export default NewsCardÉtherCode;
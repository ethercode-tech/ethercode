'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroKitInicial = () => {
  return (
    <>
      {/* Flecha hacia atrás */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 p-2 text-white hover:text-[#72D7FF] transition"
        aria-label="Volver al inicio"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>

      {/* Hero principal */}
      <section className="flex flex-col items-center justify-center text-center pt-28 pb-12 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-48 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-extrabold text-white mb-4"
        >
          Poné tu Negocio en Google con tu Propia App Web
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-200 max-w-3xl mb-4"
        >
          No es solo un sitio web. Es tu propia aplicación web escalable, con diseño moderno,
          dominio propio y presencia en Google. Hecho para que tu negocio crezca con vos.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm sm:text-base text-gray-300 max-w-xl"
        >
          Arrancás con lo esencial: identidad, contacto, posicionamiento y diseño responsive.
          Luego, podés sumar módulos: turnos, carrito, catálogo, blog, CRM, lo que necesites.
        </motion.p>

        {/* <motion.a
          href="https://wa.me/5493884136752?text=Hola!%20Estoy%20interesado%20en%20tener%20mi%20app%20web%20para%20mi%20negocio%20con%20el%20Kit%20de%20EtherCode%20💻"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-2xl text-lg shadow-lg transition"
        >
          ¡Quiero mi app ahora!
        </motion.a> */}
      </section>
    </>
  );
};

export default HeroKitInicial;

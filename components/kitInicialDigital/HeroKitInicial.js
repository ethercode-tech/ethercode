'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const PHRASES = [
  'Tu app web lista para Google.',
  'Dominio propio + SEO desde el día 1.',
  'Diseño moderno y escalable.',
  'Listo en días, no en meses.',
  'Sumá turnos, catálogo o tienda cuando quieras.',
];

export default function HeroKitInicial() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PHRASES.length), 2200);
    return () => clearInterval(t);
  }, []);
  const phraseKey = useMemo(() => `${idx}-${PHRASES[idx]}`, [idx]);

  return (
    <>
      {/* Flecha hacia atrás */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 p-2 text-white/80 hover:text-cyan-300 transition"
        aria-label="Volver al inicio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      <section
        className="relative flex flex-col items-center justify-center text-center pt-28 pb-14 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-48 max-w-6xl mx-auto overflow-hidden"
        aria-labelledby="kit-title"
        style={{
          ['--sec-mask-strength']: 0.5,
          ['--sec-alpha']: 0.06,
        }}
      >
        {/* BACKGROUND FX (coherente con el resto del sitio) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* grilla sutil */}
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
          {/* blobs cónicos */}
          <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_7s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-25vmax] right-[-10vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.22),_rgba(199,125,255,.14),_transparent_60%)]" />
          {/* overlay de lectura */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 60% at 50% 30%, rgba(10,17,40, var(--sec-alpha)), rgba(10,17,40, calc(var(--sec-alpha) + 0.02)) 60%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)',
              maskImage:
                'radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)',
            }}
          />
        </div>

        {/* Encabezado */}
        <motion.h1
          id="kit-title"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 drop-shadow mb-4"
        >
          Poné tu Negocio en Google con tu <span className="whitespace-nowrap">Propia App Web</span>
        </motion.h1>

        {/* Subcopy principal */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="text-base sm:text-lg text-white/85 max-w-3xl mb-3"
        >
          No es solo un sitio web: es una <span className="text-white font-semibold">aplicación web escalable</span> con diseño moderno, dominio propio y presencia en Google.
        </motion.p>

        {/* Frase dinámica (tipo teletipo sin borrar: impacto/urgencia) */}
        <div className="relative h-7 sm:h-8 mb-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={phraseKey}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm sm:text-base text-white/85"
            >
              {PHRASES[idx]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subcopy secundario */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-sm sm:text-base text-white/75 max-w-xl"
        >
          Arrancás con lo esencial (identidad, contacto, SEO y responsive). Después sumás módulos: turnos, carrito, catálogo, blog, CRM… <span className="text-white">a tu ritmo</span>.
        </motion.p>

        {/* Micro-badges de confianza */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] text-white/75"
        >
          {['Publicación en Google', 'Dominio + SSL', 'Carga rápida', 'Escalable por módulos'].map((b) => (
            <span key={b} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {b}
            </span>
          ))}
        </motion.div>

        {/* Línea pulsante */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="w-[200px] h-[2px] mx-auto mt-7 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-500 animate-pulse rounded-full shadow"
        />

        {/* Doble CTA (baja fricción) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://wa.me/5493884136752?text=Hola%20EtherCode!%20Quiero%20mi%20App%20Web%20del%20Kit%20Digital%20🚀"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center rounded-2xl px-7 py-3.5 min-h-[48px]
                       text-black font-bold bg-gradient-to-r from-cyan-300 to-indigo-300
                       shadow-xl transition will-change-transform
                       hover:from-cyan-200 hover:to-indigo-200 active:scale-[0.99]"
            aria-label="Quiero mi app ahora por WhatsApp"
          >
            💬 Quiero mi app ahora
          </a>

          <a
            href="https://cal.com/ether-code/contanos-tu-idea"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center rounded-2xl px-7 py-3.5 min-h-[48px]
                       text-white bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/10
                       shadow-lg shadow-black/10 transition will-change-transform
                       hover:bg-white/20 hover:shadow-xl hover:ring-white/30 active:scale-[0.99]"
            aria-label="Agendar reunión"
          >
            📅 Agendar una reunión
          </a>
        </motion.div>

        {/* KPIs flotantes (refuerzan valor) */}
        <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {[
            { k: '+90', s: 'Puntaje Lighthouse Performance' },
            { k: 'SEO', s: 'Optimizado para aparecer en Google' },
            { k: 'Días', s: 'Tiempo de salida a producción' },
          ].map((c, i) => (
            <motion.div
              key={c.s}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 text-left"
            >
              <p className="text-2xl font-semibold text-white leading-none">{c.k}</p>
              <p className="text-xs text-white/70 mt-1">{c.s}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

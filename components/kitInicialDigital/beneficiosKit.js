// beneficiosKit.js — Kit Digital Inicial (neuro-copy + fondo continuo + microinteracciones)
// - Texto orientado a conversión (beneficio directo + futuro escalable)
// - Fondo coherente con el resto del sitio (grilla + blobs cónicos + overlay)
// - Íconos con halos de color y hover sutil

'use client';

import { motion } from 'framer-motion';
import {
  FaGlobe,
  FaLock,
  FaChartLine,
  FaMobileAlt,
  FaCamera,
  FaMapMarkedAlt,
  FaEnvelopeOpenText,
  FaRocket,
  FaRobot,
} from 'react-icons/fa';

const beneficios = [
  {
    icon: FaGlobe,
    hue: '#22d3ee',
    title: 'Dominio propio incluido',
    description: 'Tu .com.ar listo y configurado. Marca profesional desde el día 1.',
  },
  {
    icon: FaLock,
    hue: '#10b981',
    title: 'SSL y seguridad',
    description: 'https activo, confianza para tus clientes y mejor ranking en Google.',
  },
  {
    icon: FaChartLine,
    hue: '#a78bfa',
    title: 'SEO inicial que posiciona',
    description: 'Palabras clave locales y estructura técnica lista para aparecer.',
  },
  {
    icon: FaMobileAlt,
    hue: '#f472b6',
    title: 'Diseño responsive real',
    description: 'Se ve y rinde perfecto en móvil, tablet y desktop. Sin sorpresas.',
  },
  {
    icon: FaCamera,
    hue: '#fb923c',
    title: 'Galería que vende',
    description: 'Hasta 5 fotos optimizadas para mostrar producto y generar deseo.',
  },
  {
    icon: FaMapMarkedAlt,
    hue: '#34d399',
    title: 'Google Maps integrado',
    description: 'Ubicación exacta y cómo llegar en un toque. Que te encuentren fácil.',
  },
  {
    icon: FaEnvelopeOpenText,
    hue: '#60a5fa',
    title: 'Contacto sin fricción',
    description: 'Formulario + WhatsApp y email. Consultas que llegan y se responden.',
  },
  {
    icon: FaRocket,
    hue: '#f59e0b',
    title: 'Velocidad que retiene',
    description: 'Carga en segundos. Menos rebote, más clientes mirando tu oferta.',
  },
  {
    icon: FaRobot,
    hue: '#00F5D4',
    title: 'Listo para escalar',
    description: 'Sumá turnos, carrito, catálogo, blog o chatbot con IA cuando quieras.',
  },
];

export default function BeneficiosKit() {
  return (
    <section
      className="relative overflow-hidden py-24 px-6 sm:px-10 md:px-20 lg:px-32 text-white"
      aria-labelledby="beneficios-title"
      style={{
        ['--sec-mask-strength']: 0.5,
        ['--sec-alpha']: 0.06,
      }}
    >
      {/* BACKGROUND FX coherente */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
        <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-25vmax] right-[-10vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.22),_rgba(199,125,255,.14),_transparent_60%)]" />
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

      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="beneficios-title"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 drop-shadow mb-3"
        >
          ¿Qué obtenés con el Kit?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="text-center text-white/80 max-w-3xl mx-auto mb-12"
        >
          Lo esencial para aparecer, convertir y crecer. Listo en días, diseñado para escalar.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map(({ icon: Icon, title, description, hue }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.06 }}
              className="relative rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:border-white/20 transition"
            >
              {/* halo conic sutil */}
              <span className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-25 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-[1px] [background:conic-gradient(from_90deg_at_50%_50%,_#22d3ee55,_#e879f955,_#6366f155,_#22d3ee55)]" />

              <div className="flex flex-col items-center text-center">
                <div
                  className="mb-4 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_18px_rgba(255,255,255,0.12)]"
                  style={{ color: hue, background: `${hue}20`, boxShadow: `0 0 18px ${hue}30` }}
                >
                  <Icon className="text-3xl" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
                <p className="text-white/80 text-sm">{description}</p>

                {/* micro-badge */}
                <div className="mt-4 inline-flex items-center gap-2 text-[11px] text-white/75 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: hue }} />
                  Listo para producción
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Línea pulsante + mini CTA sutil */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-[200px] h-[2px] mx-auto mt-12 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-500 animate-pulse rounded-full shadow"
        />
        <div className="mt-6 text-center">
          <a
            href="https://wa.me/5493884136752?text=Hola%20EtherCode!%20Quiero%20mi%20Kit%20Digital%20para%20salir%20en%20Google%20🚀"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[48px]
                       text-black font-bold bg-gradient-to-r from-cyan-300 to-indigo-300
                       shadow-xl hover:from-cyan-200 hover:to-indigo-200 active:scale-[0.99] transition"
            aria-label="Quiero mi Kit ahora"
          >
            🚀 Quiero mi Kit ahora
          </a>
        </div>
      </div>
    </section>
  );
}

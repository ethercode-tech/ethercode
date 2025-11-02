// CTAFinal.js — Versión neuro-psicológica de cierre
// Objetivo: provocar acción inmediata + conexión emocional + confianza
// Estilo: coherente con la estética EtherCode (gradientes, grilla, blur, energía digital)

'use client';

import { motion } from 'framer-motion';

export default function CTAFinal() {
  return (
    <section
      className="relative overflow-hidden py-24 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-48 text-white"
      aria-labelledby="cta-final-title"
      style={{
        ['--sec-mask-strength']: 0.5,
        ['--sec-alpha']: 0.06,
      }}
    >
      {/* BACKGROUND FX (coherente con toda la página) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
        <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-25vmax] right-[-10vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.22),_rgba(199,125,255,.14),_transparent_60%)]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* TÍTULO con carga emocional */}
        <motion.h2
          id="cta-final-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 drop-shadow"
        >
          🚀 Tu presencia digital puede despegar hoy
        </motion.h2>

        {/* SUBTÍTULO — lenguaje emocional + acción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          Miles de personas buscan lo que vos ofrecés.  
          Pero si no te encuentran, no existís.  
          <span className="text-cyan-300 font-semibold">
            Este es el momento de aparecer, destacar y convertir visitas en clientes reales.
          </span>
        </motion.p>

        {/* FRASE EMOCIONAL DESTACADA */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="italic text-xl sm:text-2xl font-medium text-cyan-400 mb-10"
        >
          “La mejor idea no sirve de nada si nadie la ve.”
        </motion.p>

        {/* CTA */}
        <motion.a
          href="https://cal.com/ether-code/contanos-tu-idea"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.06,
            boxShadow: '0 0 30px rgba(0,180,216,0.5)',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          onClick={() => {
            if (typeof window !== 'undefined' && 'gtag' in window) {
              // @ts-ignore
              window.gtag('event', 'cta_agendar_click', {
                event_category: 'CTA',
                event_label: 'CTA Kit Digital',
              });
            }
          }}
          className="inline-block bg-gradient-to-r from-[#00F5D4] via-[#00B4E7] to-[#C77DFF] 
                     hover:from-[#72D7FF] hover:to-[#C77DFF] 
                     text-black font-extrabold text-lg sm:text-xl py-4 px-10 
                     rounded-full shadow-2xl tracking-wide transition-all duration-300"
        >
          💬 Reservá tu llamada gratuita
        </motion.a>

        {/* TEXTO DE CONFIANZA FINAL */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-sm text-white/60"
        >
          Sin compromisos. Sin tecnicismos. Solo una charla real para entender tu proyecto.  
          <br />
          <span className="text-white/75 font-medium">
            El primer paso hacia tu crecimiento digital empieza con una conversación.
          </span>
        </motion.p>
      </div>
    </section>
  );
}

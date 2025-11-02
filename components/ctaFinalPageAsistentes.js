"use client";
import { motion } from "framer-motion";

export default function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="relative overflow-hidden text-white py-20 px-6 sm:px-10 md:px-20"
      style={{
        ["--sec-mask-strength"]: 0.5,
        ["--sec-alpha"]: 0.06,
      }}
      aria-labelledby="cta-title"
    >
      {/* BACKGROUND FX (sin imágenes) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* grilla sutil */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
        {/* blob cónico principal */}
        <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_7s_ease-in-out_infinite]" />
        {/* apoyo radial */}
        <div className="absolute bottom-[-25vmax] right-[-10vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.22),_rgba(199,125,255,.14),_transparent_60%)]" />
        {/* overlay de lectura */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 30%, rgba(10,17,40, var(--sec-alpha)), rgba(10,17,40, calc(var(--sec-alpha) + 0.02)) 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
            maskImage:
              "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-0">
        {/* Halo conic suave en el bloque */}
        <div className="relative rounded-[2rem] p-1">
          <span className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-30 blur-md -z-10 [background:conic-gradient(from_120deg_at_50%_50%,_#22d3ee55,_#e879f955,_#6366f155,_#22d3ee55)]" />

          {/* Título */}
          <motion.h2
            id="cta-title"
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 drop-shadow mb-4"
          >
            Conocé a tu próximo <span className="whitespace-nowrap">empleado digital</span>
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto"
          >
            Atendé día y noche. Vendé sin pausas. Automatizá sin complicaciones.
            <br className="hidden sm:block" />
            <span className="text-white">No duerme, no se cansa y no falla.</span>
          </motion.p>

          {/* Micro-badges de confianza */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[12px] text-white/75"
          >
            {["Onboarding en días", "Integración WhatsApp/Web/IG", "Logs y auditoría", "Fallback humano"].map((b) => (
              <span key={b} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {b}
              </span>
            ))}
          </motion.div>

          {/* Línea pulsante */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-[200px] h-[2px] mx-auto mt-8 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-500 animate-pulse rounded-full shadow"
          />

          {/* Doble CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="https://cal.com/ether-code/contanos-tu-idea"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center rounded-2xl px-7 py-3.5 min-h-[48px]
                         text-black font-bold bg-gradient-to-r from-cyan-300 to-indigo-300
                         shadow-xl transition will-change-transform
                         hover:from-cyan-200 hover:to-indigo-200 active:scale-[0.99]"
              aria-label="Agendar reunión"
            >
              <span className="absolute inset-0 rounded-2xl -z-10 opacity-30 blur-md [background:conic-gradient(from_0deg_at_50%_50%,_#22d3ee55,_#e879f955,_#6366f155,_#22d3ee55)]" />
              📅 Agendar reunión ahora
            </a>

            <a
              href="#contacto"
              className="relative inline-flex items-center justify-center rounded-2xl px-7 py-3.5 min-h=[48px]
                         text-white bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/10
                         shadow-lg shadow-black/10 transition will-change-transform
                         hover:bg-white/20 hover:shadow-xl hover:ring-white/30 active:scale-[0.99]"
              aria-label="Hablar con nosotros"
            >
              🗣️ Hablar con nosotros
            </a>
          </motion.div>

          {/* Objeción desactivada (privacidad/compromiso) */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-5 text-sm text-white/70"
          >
            Sin compromiso. Te mostramos cómo funciona con tus propios casos.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

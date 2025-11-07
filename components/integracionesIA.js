"use client";
import Container from "./container";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useMemo } from "react";

// Beneficios (texto orientado a resultado, no a herramienta)
const beneficios = [
  {
    icono: <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />,
    titulo: "Atención al cliente día y noche",
    descripcion:
      "Respuestas inmediatas sin importar el día o la hora. Nunca más perdés una venta por no contestar a tiempo.",
    chip: "SLA 99.9%",
  },
  {
    icono: <Sparkles className="w-6 h-6 text-fuchsia-300 animate-pulse" />,
    titulo: "Ventas automatizadas",
    descripcion:
      "Muestra productos, gestiona reservas y toma pedidos automáticamente en WhatsApp, Web o App.",
    chip: "Cierre +rápido",
  },
  {
    icono: <Sparkles className="w-6 h-6 text-indigo-300 animate-pulse" />,
    titulo: "Procesos internos más eficientes",
    descripcion:
      "Asigná tareas, registrá pedidos e integrá tus sistemas para reducir trabajo repetitivo.",
    chip: "Errores ↓",
  },
  {
    icono: <Sparkles className="w-6 h-6 text-emerald-300 animate-pulse" />,
    titulo: "Ahorro de tiempo y dinero",
    descripcion:
      "Escalá sin aumentar costos fijos. Sin ausencias, sin horas extra, sin fricción.",
    chip: "Costos ↓",
  },
];

export default function IntegracionesIA() {
  // Variants
  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 32 },
      show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
    }),
    []
  );

  return (
    <section
      id="integraciones-ia"
      aria-labelledby="beneficios-ia"
      className="relative  text-white py-10"
      style={{
        ["--sec-mask-strength"]: 0.5,
        ["--sec-alpha"]: 0.06,
      }}
    >
      {/* Fondo continuo (igual lenguaje visual del sitio) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* grilla sutil */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
        {/* blobs cónicos de color */}
        <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_7s_ease-in-out_infinite]" />
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

      <Container className="relative">
        {/* Título + subtítulo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 id="beneficios-ia" className="text-3xl sm:text-4xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300">
              Lo que hacen nuestros asistentes
            </span>
          </h2>
          <p className="text-white/75 mt-3">
            Resultado primero, tecnología después: atención, ventas y procesos que funcionan solos, con control humano cuando hace falta.
          </p>
        </motion.div>

        {/* Línea central de “timeline” */}
        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/40 via-fuchsia-400/30 to-indigo-400/20" />

          {/* Items alternados */}
          <div className="relative flex flex-col items-center">
            {beneficios.map((item, index) => {
              const left = index % 2 !== 0; // alterna lado
              return (
                <motion.div
                  key={item.titulo}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.06 }}
                  aria-label={`Beneficio: ${item.titulo}`}
                  className="relative w-full max-w-6xl my-10 px-4"
                >
                  {/* Nodo central */}
                  <div className="absolute left-1/2 top-4 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/10 backdrop-blur flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.07)]">
                      {item.icono}
                    </div>
                  </div>

                  {/* Tarjeta */}
                  <div
                    className={`relative mt-12 sm:mt-0 ${
                      left ? "sm:mr-auto sm:pr-16" : "sm:ml-auto sm:pl-16"
                    } sm:w-1/2`}
                  >
                    <div
                      className={`relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6`}
                    >
                      {/* halo conic sutil */}
                      <span className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-25 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-[1px] [background:conic-gradient(from_90deg_at_50%_50%,_#22d3ee55,_#e879f955,_#6366f155,_#22d3ee55)]" />

                      <h3 className="text-xl font-semibold text-white">{item.titulo}</h3>
                      <p className="text-sm text-white/80 leading-relaxed mt-1">{item.descripcion}</p>

                      {/* Chips micro-confianza */}
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/70">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          {item.chip}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Logs & auditoría
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Fallback humano
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Cierre persuasivo */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 text-lg text-center text-white/75 max-w-3xl mx-auto"
        >
          Con ÉtherCode, vos definís el objetivo y nosotros diseñamos el flujo. Sin aprender nuevas herramientas:{" "}
          <span className="text-white">el equipo digital trabaja por vos</span>.
        </motion.p>

        {/* CTA secundario */}
        {/* <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-6 flex justify-center"
        >
          <a
            href="#contacto"
            className="relative inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[48px]
                       text-white bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/25 to-indigo-500/25
                       border border-white/20 ring-1 ring-white/30 shadow-lg shadow-black/10 transition will-change-transform
                       hover:from-cyan-500/35 hover:via-fuchsia-500/35 hover:to-indigo-500/35 hover:shadow-xl hover:ring-white/40 active:scale-[0.99]"
          >
            <span className="absolute inset-0 rounded-2xl -z-10 opacity-30 blur-md [background:conic-gradient(from_0deg_at_50%_50%,_#22d3ee55,_#e879f955,_#6366f155,_#22d3ee55)]" />
            Quiero mi equipo digital
          </a>
        </motion.div> */}
      </Container>
    </section>
  );
}

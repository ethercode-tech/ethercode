// CasosUso.js — Empleados digitales resolviendo problemas reales
// - Fondo continuo (coherente con el sitio)
// - Microinteracciones, count-up y barras animadas on-view
// - Texto persuasivo y métricas claras

"use client";
import Container from "./container";
import { motion, useInView } from "framer-motion";
import {
  BriefcaseIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

// ====== Datos ======
const items = [
  {
    icon: (
      <BriefcaseIcon className="h-12 w-12 text-white bg-gradient-to-br from-cyan-500 to-indigo-500 p-2 rounded-xl shadow-md" />
    ),
    title: "Empleado digital para ventas",
    description:
      "Responde consultas, agenda reuniones y sostiene el seguimiento hasta el cierre. 24/7, sin perder oportunidades.",
    stats: [
      { label: "Leads calificados", value: 40 },
      { label: "Reducción de costos comerciales", value: 60 },
      { label: "Disponibilidad operativa", value: 100 },
    ],
    hue: "#22d3ee",
  },
  {
    icon: (
      <Cog6ToothIcon className="h-12 w-12 text-white bg-gradient-to-br from-fuchsia-500 to-indigo-500 p-2 rounded-xl shadow-md" />
    ),
    title: "Empleado digital para operaciones",
    description:
      "Confirma turnos, actualiza estados y dispara recordatorios. Menos carga manual, menos errores.",
    stats: [
      { label: "Eficiencia operativa", value: 75 },
      { label: "Reducción de errores", value: 90 },
      { label: "Nivel de integración", value: 100 },
    ],
    hue: "#e879f9",
  },
  {
    icon: (
      <UserGroupIcon className="h-12 w-12 text-white bg-gradient-to-br from-emerald-500 to-cyan-500 p-2 rounded-xl shadow-md" />
    ),
    title: "Empleado digital para atención al cliente",
    description:
      "Primera respuesta en segundos. Escala casos complejos y mantiene el tono humano. Multi-idioma.",
    stats: [
      { label: "Satisfacción de clientes", value: 95 },
      { label: "Tiempo de respuesta (seg)", value: 15 }, // usaremos barra relativa (segundos -> %) para visual
      { label: "Consultas resueltas sin humanos", value: 85 },
    ],
    hue: "#10b981",
  },
];

// ====== Helpers ======
function useOnceInView(threshold = 0.25) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: threshold, once: true });
  return [ref, inView];
}

function CountUp({ to = 0, duration = 1200, start = false, suffix = "%", decimals = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    let startTs = null;
    const from = 0;
    const animate = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const curr = from + (to - from) * eased;
      setVal(curr);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelRaf(raf);
  }, [to, duration, start]);
  const num = Number(val).toFixed(decimals);
  return <>{num}{suffix}</>;
}
function cancelRaf(id){ if(id) cancelAnimationFrame(id); }

// Normalizamos una métrica de “segundos” para barra (15s -> 100% = 0s ideal)
function toBarPercent(label, value) {
  if (label.toLowerCase().includes("seg")) {
    // asumimos 60s como tope "malo"; 0s = 100% (mejor)
    const capped = Math.min(value, 60);
    return Math.max(0, Math.round(100 - (capped / 60) * 100));
  }
  return value;
}

// ====== Componente ======
export default function CasosUso() {
  const [wrapRef, inView] = useOnceInView(0.25);

  return (
    <section
      id="useCases"
      className="relative text-white"
      style={{
        ["--sec-mask-strength"]: 0.5,
        ["--sec-alpha"]: 0.06,
      }}
      aria-labelledby="usecases-title"
    >
      {/* Fondo continuo / overlay coherente */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
        <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_7s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-25vmax] right-[-10vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.22),_rgba(199,125,255,.14),_transparent_60%)]" />
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

      <Container className="py-28">
        <div ref={wrapRef} className="text-center max-w-3xl mx-auto">
          <motion.h2
            id="usecases-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 mb-3"
          >
            ¿Cómo trabajan nuestros empleados digitales?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-white/75 mb-14 text-lg"
          >
            Resultado medible, sin pausas y con control humano cuando hace falta.
          </motion.p>
        </div>

        {/* Tarjetas */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const delay = index * 0.08;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 42, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut", delay }}
                className="relative overflow-hidden rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:border-white/20 transition"
                aria-label={item.title}
              >
                {/* halo conic sutil */}
                <span className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-25 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-[1px] [background:conic-gradient(from_90deg_at_50%_50%,_#22d3ee55,_#e879f955,_#6366f155,_#22d3ee55)]" />

                <div className="flex flex-col items-center text-center">
                  <div
                    className="shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                    style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.25))" }}
                    aria-hidden
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-6">{item.description}</p>
                </div>

                {/* Métricas */}
                <div className="grid gap-4 w-full">
                  {item.stats.map((stat, i) => {
                    const barPercent = toBarPercent(stat.label, stat.value);
                    const decimals = stat.label.toLowerCase().includes("seg") ? 0 : 0;

                    return (
                      <div key={stat.label} className="text-left">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-bold text-white">
                            {/* CountUp numérico */}
                            <CountUp
                              to={stat.value}
                              decimals={decimals}
                              suffix={stat.label.toLowerCase().includes("seg") ? "s" : "%"}
                              start={inView}
                              duration={1100 + i * 150}
                            />
                          </span>
                          <span className="text-cyan-300 text-xs">{stat.label}</span>
                        </div>

                        {/* Barra animada */}
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${barPercent}%` }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 + i * 0.05 }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chips micro-confianza */}
                <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-white/70">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Logs & auditoría</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Fallback humano</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Onboarding en días</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

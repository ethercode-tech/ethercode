// ✅ USECASES — Empleados digitales con métricas creíbles + microinteracciones
// Archivo: UseCases.js (JS)

// Requiere: tailwind + framer-motion (opcional pero recomendado)
// Si aún no usás framer-motion, podés quitar las partes <motion.*> y funciona igual.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

// Hook simple: detecta si un elemento está en viewport
function useInView(options = { threshold: 0.25 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);
  return [ref, inView];
}

// CountUp minimalista con rAF
function CountUp({ to = 0, duration = 1800, start = false, suffix = "", prefix = "", decimals = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTs = null;
    let raf;
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
    return () => cancelAnimationFrame(raf);
  }, [to, duration, start]);

  const num = Number(val).toFixed(decimals);
  return <>{prefix}{num}{suffix}</>;
}

const cards = [
  {
    icon: BriefcaseIcon,
    title: "Más cierres sin sumar personal",
    role: "Empleado digital de ventas",
    copy:
      "Responde consultas, agenda y sostiene el seguimiento hasta el cierre. Operación 24/7 con desvío a humano en casos complejos.",
    beforeAfter: "Antes: seguimientos manuales. Después: secuencias y alertas automáticas.",
    // Métricas con contexto (ejemplos)
    metrics: [
      { value: 32, suffix: "%", label: "Leads calificados", note: "30 días, ecommerce AR" },
      { value: 18, suffix: "%", label: "Reducción de costo por cierre", note: "mes 1" },
      { value: 24, suffix: "h", label: "Disponibilidad", note: "con handoff humano" },
    ],
    badge: "Privacidad y control humano",
    hue: "#00F5D4",
  },
  {
    icon: ClipboardDocumentListIcon,
    title: "Menos errores y tiempos muertos",
    role: "Empleado digital de operaciones",
    copy:
      "Confirmaciones, recordatorios y actualizaciones en tus sistemas. Integra API/WhatsApp/CRM para flujos sin fricción.",
    beforeAfter: "Antes: planillas y recordatorios a mano. Después: flujos y validaciones automáticas.",
    metrics: [
      { value: 58, suffix: "%", label: "Eficiencia operativa", note: "mes 1" },
      { value: 73, suffix: "%", label: "Errores repetitivos", note: "reducción" },
      { value: 3, suffix: "+", label: "Integraciones activas", note: "API/WA/CRM" },
    ],
    badge: "Logs y auditoría exportable",
    hue: "#C77DFF",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Primera respuesta en segundos",
    role: "Empleado digital de atención al cliente",
    copy:
      "Atiende al instante, mantiene tono humano y escala tickets complejos. Multi-idioma (ES/EN/PT).",
    beforeAfter: "Antes: colas y tiempos muertos. Después: SLA de respuesta y escalado inteligente.",
    metrics: [
      { value: 4.6, suffix: "/5", label: "CSAT promedio", note: "90 días" , decimals: 1},
      { value: 45, suffix: "s", label: "Tiempo de 1ª respuesta", note: "pico < 60s" },
      { value: 3, suffix: " idiomas", label: "Soporte", note: "ES/EN/PT" },
    ],
    badge: "SLA 99.9% con fallback humano",
    hue: "#00B4D8",
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function UseCases() {
  const [wrapRef, inView] = useInView({ threshold: 0.2 });

  return (
    <section className="py-20 px-4 text-white relative">
      {/* fondo sutil sin imágenes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* brillo/grilla sutil */}
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
          {/* blobs cónicos animados en capas (muy suaves) */}
          <div className="absolute -top-1/3 left-1/2 h-[95vmax] w-[95vmax] -translate-x-1/2 rounded-full blur-3xl opacity-35 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-25vmax] right-[-10vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.25),_rgba(199,125,255,.15),_transparent_60%)]" />
          <div className="absolute top-[-10vmax] left-[-10vmax] h-[40vmax] w-[40vmax] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_70%_30%,_rgba(99,102,241,.25),_rgba(0,245,212,.15),_transparent_60%)]" />

          {/* overlay de equilibrio para lectura */}
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

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            ¿Cómo trabajan nuestros <span className="text-[#00B4D8]">empleados digitales?</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Casos resumidos y métricas reales para decidir con claridad. Resultado primero, tecnología después.
          </p>
        </div>

        <motion.div
          ref={wrapRef}
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[rgba(18,25,51,0.3)] backdrop-blur-md rounded-2xl p-6 shadow-lg"
        >
          {cards.map((c) => (
            <motion.article
              key={c.role}
              variants={cardVariants}
              className="rounded-xl p-6 bg-[rgba(26,33,56,0.7)] backdrop-blur-sm hover:shadow-2xl transition duration-300 border border-white/10"
            >
              <div className="flex items-center gap-2" style={{ color: c.hue }}>
                <c.icon className="w-5 h-5" />
                <h3 className="text-lg font-bold">{c.title}</h3>
              </div>

              <p className="text-[13px] text-white/70 mt-1">{c.role}</p>

              <p className="text-sm text-gray-300 mt-3">{c.copy}</p>

              {/* Before/After de 1 línea (contraste rápido) */}
              <div className="mt-3 text-xs text-white/70 rounded-full border border-white/10 bg-white/5 px-3 py-1 inline-flex">
                {c.beforeAfter}
              </div>

              {/* Métricas con CountUp y notas de contexto */}
              <div className="mt-5 grid grid-cols-3 gap-3 text-sm font-semibold" style={{ color: c.hue }}>
                {c.metrics.map((m, i) => (
                  <div key={i} className="group">
                    <p className="text-lg md:text-xl leading-none">
                      <CountUp
                        to={m.value}
                        suffix={m.suffix || ""}
                        decimals={m.decimals || 0}
                        duration={1200 + i * 200}
                        start={inView}
                      />
                    </p>
                    <p className="text-gray-400 text-[12px]">{m.label}</p>
                    {m.note && (
                      <p className="text-[11px] text-white/50 group-hover:text-white/70 transition">
                        {m.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Chips de confianza / objeciones integradas */}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-white/70">
                <span
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                  style={{ boxShadow: `0 0 0 0 ${c.hue}` }}
                >
                  {c.badge}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Datos propios • Logs exportables
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { BriefcaseIcon, ClipboardDocumentListIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

const flowSteps = [
  {
    step: "01",
    title: "Diagnostico rapido",
    description:
      "Identificamos donde se pierde tiempo o dinero y elegimos un flujo simple para atacar primero.",
  },
  {
    step: "02",
    title: "Setup con tu equipo",
    description:
      "Configuramos el empleado digital con tus reglas de negocio y conectamos canales clave.",
  },
  {
    step: "03",
    title: "Escala con datos",
    description:
      "Tomamos metricas reales y optimizamos semana a semana para sostener crecimiento.",
  },
];

const cards = [
  {
    icon: BriefcaseIcon,
    title: "Ventas",
    hue: "from-cyan-400 to-indigo-500",
    copy: "Responde, califica y hace seguimiento automatico para que tu equipo cierre mejor.",
    metrics: ["+32% leads calificados", "-18% costo por cierre", "Operacion 24/7"],
  },
  {
    icon: ClipboardDocumentListIcon,
    title: "Operaciones",
    hue: "from-fuchsia-400 to-indigo-500",
    copy: "Automatiza confirmaciones, recordatorios y estados sin depender de tareas manuales.",
    metrics: ["+58% eficiencia", "-73% errores", "Flujos integrados"],
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Atencion",
    hue: "from-emerald-400 to-cyan-500",
    copy: "Da primera respuesta rapida y deriva casos complejos al humano correcto con contexto.",
    metrics: ["CSAT 4.6/5", "Respuesta < 60s", "Fallback humano"],
  },
];

export default function UseCases() {
  return (
    <section className="relative py-24 px-4 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
        <div className="absolute -top-1/3 left-1/2 h-[95vmax] w-[95vmax] -translate-x-1/2 rounded-full blur-3xl opacity-35 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_6s_ease-in-out_infinite]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Como trabajan nuestros <span className="text-[#00B4D8]">empleados digitales</span>
          </h2>
          <p className="mt-4 text-white/75">
            Un flujo claro en 3 pasos: implementacion simple, foco en resultados y mejora continua.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {flowSteps.map((item, index) => (
            <motion.article
              key={item.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300/90">PASO {item.step}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {cards.map((c, index) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[rgba(26,33,56,0.78)] p-5 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-xl bg-gradient-to-br ${c.hue} p-2.5 shadow`}>
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{c.title}</h3>
              </div>

              <p className="mt-3 text-sm text-white/80 leading-relaxed">{c.copy}</p>

              <div className="mt-4 space-y-2">
                {c.metrics.map((m) => (
                  <p key={m} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/85">
                    {m}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

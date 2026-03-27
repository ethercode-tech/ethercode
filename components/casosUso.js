"use client";

import Container from "./container";
import { motion } from "framer-motion";
import { BriefcaseIcon, Cog6ToothIcon, UserGroupIcon } from "@heroicons/react/24/solid";

const flowSteps = [
  {
    step: "01",
    title: "Descubrimiento rapido",
    description:
      "Mapeamos tu embudo y detectamos tareas repetitivas con impacto directo en ventas, soporte u operaciones.",
  },
  {
    step: "02",
    title: "Implementacion guiada",
    description:
      "Entrenamos el empleado digital con tus reglas, tono y procesos. Integramos WhatsApp, CRM y APIs necesarias.",
  },
  {
    step: "03",
    title: "Mejora continua",
    description:
      "Medimos resultados semana a semana, ajustamos prompts y escalamos solo lo que ya demuestra ROI.",
  },
];

const roles = [
  {
    icon: BriefcaseIcon,
    hue: "from-cyan-400 to-indigo-500",
    title: "Ventas",
    summary: "Califica leads, responde objeciones y activa seguimiento automatico hasta cerrar.",
    metrics: ["+32% leads calificados", "-18% costo por cierre", "24/7 sin pausas"],
  },
  {
    icon: Cog6ToothIcon,
    hue: "from-fuchsia-400 to-indigo-500",
    title: "Operaciones",
    summary: "Confirma turnos, valida datos y ejecuta tareas repetitivas sin errores manuales.",
    metrics: ["+58% eficiencia", "-73% errores repetitivos", "Integracion API/CRM"],
  },
  {
    icon: UserGroupIcon,
    hue: "from-emerald-400 to-cyan-500",
    title: "Atencion",
    summary: "Responde en segundos y deriva casos complejos a humano con contexto completo.",
    metrics: ["CSAT 4.6/5", "1ra respuesta < 60s", "Fallback humano"],
  },
];

export default function CasosUso() {
  return (
    <section id="useCases" className="relative py-24 text-white" aria-labelledby="usecases-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
        <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_7s_ease-in-out_infinite]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="usecases-title"
            className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300"
          >
            Como trabajan nuestros empleados digitales
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/75">
            Un sistema simple de entender: tareas claras, automatizacion real y metricas que si explican negocio.
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
          {roles.map((role, index) => (
            <motion.article
              key={role.title}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#111a3b]/75 p-5 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-xl bg-gradient-to-br ${role.hue} p-2.5 shadow`}>
                  <role.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{role.title}</h3>
              </div>

              <p className="mt-3 text-sm text-white/80 leading-relaxed">{role.summary}</p>

              <div className="mt-4 space-y-2">
                {role.metrics.map((metric) => (
                  <p
                    key={metric}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/85"
                  >
                    {metric}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 sm:p-5 text-center"
        >
          <p className="text-sm sm:text-base text-cyan-100">
            Implementacion en dias, no en meses. Empezas por un flujo critico y escalas solo lo que demuestra resultado.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

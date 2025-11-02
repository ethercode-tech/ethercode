// Services.js — comparte el mismo fondo global; overlay por sección para equilibrio

import { motion } from "framer-motion";
import { FaRobot, FaBolt, FaTools } from "react-icons/fa";

const sectionVariants = { hidden:{opacity:0}, show:{opacity:1, transition:{ when:"beforeChildren", staggerChildren:0.12 }} };
const cardVariants = { hidden:{opacity:0, y:26, scale:0.98}, show:{opacity:1, y:0, scale:1, transition:{duration:0.55, ease:"easeOut"}} };
const iconPulse = { animate:{scale:[1,1.12,1], rotate:[0,2,0]}, transition:{duration:1.8, repeat:Infinity, ease:"easeInOut"} };
const benefitVariants = { hidden:{opacity:0, x:-12}, show:(i)=>({opacity:1, x:0, transition:{delay:0.08*i, duration:0.35, ease:"easeOut"}}) };

const services = [
  { icon:<FaRobot/>, title:"Empleado digital para atención automatizada", headline:"Vende y responde en segundos — 24/7, sin cansancio.", description:"Activa un aliado que atiende WhatsApp y Web con lenguaje natural. Resuelve dudas, califica leads y no deja escapar oportunidades mientras vos te enfocás en crecer.", ideal:"Negocios con atención al cliente intensiva", benefits:["Disponible día y noche (sin horarios)","Menos tiempo en tareas repetitivas","Escalabilidad sin aumentar costos"], hue:"#00F5D4" },
  { icon:<FaBolt/>,  title:"Marketing automatizado con IA", headline:"Leads calientes sin esfuerzo — nutrición y seguimiento automático.", description:"Secuencias inteligentes, respuestas personalizadas y campañas que se activan solas. Tu empleado digital también impulsa tu embudo y conversa hasta convertir.", ideal:"Empresas que buscan más ventas sin más trabajo", benefits:["Generación de leads automatizada","Seguimiento personalizado en cada etapa","Mejor tasa de conversión (optimización continua)"], hue:"#C77DFF" },
  { icon:<FaTools/>, title:"Software a medida", headline:"Procesos afilados — integra, automatiza y controla.", description:"Construimos soluciones que encajan con tus flujos reales, eliminan fricción manual y potencian a tu equipo humano y a tu empleado digital para operar con precisión.", ideal:"Equipos con procesos únicos o no estandarizados", benefits:["Menos errores humanos","Tiempos de ejecución reducidos","Mayor control y trazabilidad"], hue:"#00B4D8" },
];

export default function Services() {
  return (
    <section
      className="py-24 px-6 md:px-10 text-white relative z-0 overflow-hidden"
      /* Equilibrio de esta sección (puede variar levemente por sección) */
      style={{
        ["--sec-mask-strength"]: 0.52,
        ["--sec-alpha"]: 0.05,
      }}
    >
      {/* OVERLAY DE EQUILIBRIO (recorta/atenúa el fondo global) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 30%, rgba(10,17,40, var(--sec-alpha)), rgba(10,17,40, calc(var(--sec-alpha) + 0.02)) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
          maskImage:
            "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-20"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 drop-shadow">
            Soluciones que generan impacto real
          </span>
        </motion.h2>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-16 md:grid-cols-3"
        >
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={cardVariants}
              className="group flex flex-col items-center md:items-start text-left rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow"
            >
              <motion.div
                className="mb-4 w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto md:mx-0 shadow-[0_0_18px_rgba(255,255,255,0.12)]"
                style={{ color: s.hue, background: `${s.hue}20`, boxShadow: `0 0 18px ${s.hue}30` }}
                animate={iconPulse.animate}
                transition={iconPulse.transition}
              >
                {s.icon}
              </motion.div>

              <div className="w-full max-w-xs sm:max-w-sm md:max-w-none">
                <h3 className="text-xl md:text-2xl font-semibold">{s.title}</h3>

                <p className="text-sm md:text-base italic mt-1" style={{ color: s.hue }}>
                  {s.headline}
                </p>

                <p className="text-sm text-gray-300 mt-2 leading-snug">{s.description}</p>

                <p className="text-sm text-white mt-3 font-bold">
                  👉 Ideal para: <span className="font-normal text-gray-200">{s.ideal}</span>
                </p>

                <ul className="mt-2 text-sm text-gray-300 space-y-1 list-none">
                  {s.benefits.map((b, idx) => (
                    <motion.li
                      key={idx}
                      custom={idx}
                      variants={benefitVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="flex items-start gap-2"
                    >
                      <span
                        className="mt-[2px] inline-block h-4 w-4 rounded-full"
                        style={{ background: s.hue, boxShadow: `0 0 10px ${s.hue}60` }}
                      />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-4 inline-flex items-center gap-2 text-[11px] text-white/70 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: s.hue }} />
                  <span>Implementación guiada • Soporte humano + IA</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// FAQsIA.js — Preguntas frecuentes con neuro-copy, fondo continuo y microinteracciones
// - Fondo coherente con el resto (grilla + blobs + overlay)
// - Acordeón accesible (aria-expanded/controls), animaciones suaves
// - Micro-badges que reducen fricción (seguridad, control humano, soporte)
// - JSON-LD (FAQPage) para SEO

"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const preguntas = [
  {
    pregunta: "¿Qué es un empleado digital con inteligencia artificial?",
    respuesta:
      "Es un sistema entrenado con la información de tu negocio que trabaja 24/7: atiende, guía, registra y acciona. No reemplaza a tu equipo: lo potencia y le saca lo repetitivo.",
  },
  {
    pregunta: "¿Qué tareas puede hacer un empleado digital?",
    respuesta:
      "Responde WhatsApp y Web, agenda turnos, califica y hace seguimiento de leads, toma pedidos, genera tickets, consulta tu inventario/CRM y deriva casos complejos a humanos.",
  },
  {
    pregunta: "¿Necesito saber de tecnología para usar uno?",
    respuesta:
      "No. Nosotros hacemos el relevamiento, diseñamos los flujos, lo integramos a tus herramientas actuales y te acompañamos con soporte. Solo definís objetivos y reglas.",
  },
  {
    pregunta: "¿Qué tan confiables y controlables son?",
    respuesta:
      "Son consistentes y auditables: logs de cada interacción, límites de acción y políticas de escalado. Cuando hay dudas, se deriva al responsable humano automáticamente.",
  },
  {
    pregunta: "¿En qué rubros funciona mejor?",
    respuesta:
      "Ecommerce, concesionarias, restaurantes, gimnasios, centros médicos, hoteles, educación, servicios profesionales y cualquier negocio con alta conversación con clientes.",
  },
  {
    pregunta: "¿Qué pasa si la consulta es muy compleja?",
    respuesta:
      "Escala a humano, adjunta el contexto y avisa al cliente que un especialista continuará la atención. Nunca deja a nadie esperando sin respuesta.",
  },
];

export default function FAQsIA() {
  const [abierta, setAbierta] = useState(0);

  const toggle = (i) => {
    setAbierta(abierta === i ? null : i);
  };

  // JSON-LD para SEO (FAQPage)
  const faqJson = useMemo(() => {
    const mainEntity = preguntas.map((q) => ({
      "@type": "Question",
      name: q.pregunta,
      acceptedAnswer: { "@type": "Answer", text: q.respuesta },
    }));
    return JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity });
  }, []);

  // Variants
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section
      id="faqs"
      className="relative bg-transparent py-16 px-6 md:px-20 overflow-hidden text-white"
      style={{
        ["--sec-mask-strength"]: 0.5,
        ["--sec-alpha"]: 0.06,
      }}
      aria-labelledby="faqs-title"
    >
      {/* Fondo continuo (grilla + blobs + overlay) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
        <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_8s_ease-in-out_infinite]" />
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

      {/* Encabezado */}
      <div className="max-w-5xl mx-auto text-center mb-10 relative z-0">
        <h2
          id="faqs-title"
          className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 mb-3"
        >
          Preguntas frecuentes sobre nuestros empleados digitales
        </h2>
        <p className="text-white/75">
          Todo lo que necesitás saber antes de integrar IA real a tu negocio.
        </p>

        {/* Micro-badges de confianza */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] text-white/75">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Logs y auditoría</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Fallback humano</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Onboarding en días</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Privacidad y control</span>
        </div>
      </div>

      {/* Acordeón */}
      <div className="max-w-4xl mx-auto relative z-0">
        {preguntas.map((item, i) => {
          const isOpen = abierta === i;
          const controlId = `faq-panel-${i}`;
          const btnId = `faq-button-${i}`;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="border-b border-white/10 py-4"
            >
              <button
                id={btnId}
                aria-controls={controlId}
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-md px-1"
              >
                <span className="pr-4">{item.pregunta}</span>
                <span className="shrink-0 text-cyan-300">
                  {isOpen ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={controlId}
                    role="region"
                    aria-labelledby={btnId}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 text-[15.5px] leading-relaxed text-white/85 bg-white/5 border border-white/10 rounded-xl p-4">
                      {item.respuesta}
                      {/* Micro-LLAMADO a acción contextual (reduce fricción) */}
                      <div className="mt-3">
                        <a
                          href="#contacto"
                          className="inline-flex items-center gap-2 text-[13px] text-cyan-300 hover:text-cyan-200 transition"
                        >
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          Consultar mi caso
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* JSON-LD para SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
    </section>
  );
}

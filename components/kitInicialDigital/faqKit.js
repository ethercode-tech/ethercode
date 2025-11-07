// faqKit.js — Preguntas frecuentes (neuro-UX + fondo continuo + micro-confianza)
// - Copy orientado a conversión: reduce fricción y activa avance
// - Acordeón con micro-badges y CTA final
// - Fondo coherente (grilla + blobs cónicos + overlay)

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    pregunta: '¿Cómo arranco el proceso para tener mi web?',
    respuesta:
      'Nos compartís nombre del negocio, rubro, logo (si tenés) y qué querés lograr. Te guiamos paso a paso y en pocos días ves tu app web lista para publicar.',
    badge: 'Acompañamiento 1:1',
  },
  {
    pregunta: '¿Qué incluye exactamente el Kit Web de ÉtherCode?',
    respuesta:
      'Una WebApp escalable con dominio .com.ar, SSL, SEO inicial, diseño responsive, contacto por WhatsApp, mapa, métricas y base técnica lista para crecer por módulos.',
    badge: 'Listo para Google',
  },
  {
    pregunta: '¿Cómo se realiza el pago?',
    respuesta:
      'Se abona al entregar. Aceptamos transferencia, Mercado Pago y cripto (USDC y otras). Sin complicaciones: elegís el método que te quede cómodo.',
    badge: 'Pago flexible',
  },
  {
    pregunta: '¿Y si no me convence lo que entregan?',
    respuesta:
      'Satisfacción garantizada. Si el resultado final no te convence, te devolvemos el dinero. Preferimos relaciones a largo plazo, no ventas forzadas.',
    badge: 'Garantía total',
  },
  {
    pregunta: '¿Cuál es el tiempo estimado de entrega?',
    respuesta:
      'Entre 5 y 7 días hábiles después de recibir el contenido. Entregamos validado para móvil y con todo funcionando desde el día uno.',
    badge: 'Salimos rápido',
  },
  {
    pregunta: '¿Puedo ampliar mi WebApp más adelante?',
    respuesta:
      'Sí. Todo es modular: podés sumar turnos, catálogo, carrito y pagos online, blog, CRM, área privada y hasta asistentes con IA. Crecés por etapas.',
    badge: 'Escalable',
  },
  {
    pregunta: '¿Tengo que pagar todos los años algo más?',
    respuesta:
      'El primer año de dominio y hosting está incluido. Luego podés continuar con nuestros planes accesibles o migrar donde quieras, sin ataduras.',
    badge: 'Sin bloqueos',
  },
];

export default function FAQsKit() {
  const [activo, setActivo] = useState(null);
  const toggle = (i) => setActivo(i === activo ? null : i);

  return (
    <section
      className="relative  py-20 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-48 text-white"
      aria-labelledby="faq-title"
      style={{
        ['--sec-mask-strength']: 0.5,
        ['--sec-alpha']: 0.06,
      }}
    >
      {/* BACKGROUND FX (coherente con el resto) */}
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

      <div className="max-w-4xl mx-auto">
        <motion.h2
          id="faq-title"
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 drop-shadow mb-4"
        >
          Preguntas frecuentes
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="text-center text-white/80 mb-10"
        >
          Leé esto y en 2 minutos sabés si el Kit es para vos. (Spoiler: probablemente sí.)
        </motion.p>

        <div className="space-y-5">
          {faqs.map((faq, idx) => {
            const open = activo === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl transition cursor-pointer ${
                  open ? 'ring-1 ring-white/20' : 'hover:bg-white/10'
                }`}
                onClick={() => toggle(idx)}
                aria-expanded={open}
                aria-controls={`faq-${idx}`}
              >
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-300/30">
                      {faq.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold">{faq.pregunta}</h3>
                  </div>
                  {open ? (
                    <FaChevronUp className="text-cyan-300" />
                  ) : (
                    <FaChevronDown className="text-cyan-300" />
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-${idx}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-white/85 leading-relaxed text-sm sm:text-base">
                        {faq.respuesta}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA sutil al final del bloque */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mt-8 text-center"
        >
          <a
            href="https://wa.me/5493884136752?text=Hola%20ÉtherCode!%20Tengo%20una%20pregunta%20sobre%20el%20Kit%20Digital%20🙂"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[48px]
                       text-black font-bold bg-gradient-to-r from-cyan-300 to-indigo-300
                       shadow-xl hover:from-cyan-200 hover:to-indigo-200 active:scale-[0.99] transition"
            aria-label="Hacer una pregunta por WhatsApp"
          >
            💬 Tengo una pregunta
          </a>
        </motion.div>
      </div>
    </section>
  );
}

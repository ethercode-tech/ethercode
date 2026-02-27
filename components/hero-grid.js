import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent, GA_EVENTS } from "../lib/ga";
import { useEffect, useMemo, useState } from "react";
import EtherCodeAssistantModal from "../components/EtherCodeAssistantModal";
import Container from "./container";

// === Animations ===
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const floatSoft = {
  initial: { y: 0 },
  animate: { y: [0, -6, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
};

const chip = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

// === Copy ===
const PHRASES = [
  "Tu vendedor que nunca duerme.",
  "Respuestas en segundos, 24/7.",
  "Atiende, califica y cierra por vos.",
  "Aprende de tu negocio y mejora.",
  "Integra WhatsApp, Web e Instagram.",
  "Escala atención sin contratar más.",
];

export default function HeroGrid(){
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // cycle phrases
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PHRASES.length), 2400);
    return () => clearInterval(t);
  }, []);

  const phraseKey = useMemo(() => `${idx}-${PHRASES[idx]}`,[idx]);

  const handleRedirect = () => {
    trackEvent(GA_EVENTS.CTA_CLICK, { event_category: "engagement", event_label: "Quiero conocer a mi futuro empleado digital" });
    router.push("/asistentes");
  };

  const handleOpenAssistant = () => {
    trackEvent(GA_EVENTS.CTA_CLICK, { event_category: "engagement", event_label: "Probar ahora (modal asistente)" });
    setIsOpen(true);
  };

  return (
    <AnimatePresence>
      <motion.section
        className="relative w-full bg-transparent pt-24 sm:pt-28 pb-[calc(2.5rem+env(safe-area-inset-bottom))] min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]"
        initial="hidden"
        animate="show"
        variants={container}
        style={{
          ["--sec-mask-strength"]: 0.6,
          ["--sec-alpha"]: 0.05,
        }}
      >
        {/* BACKGROUND FX (sin imágenes) — más color y vida */}
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

        <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Texto principal */}
          <motion.div variants={fadeUp} className="flex flex-col items-start text-left">
            {/* badge de contexto con borde arcoíris sutil */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur relative">
              <span className="absolute inset-0 rounded-full opacity-30 [background:conic-gradient(from_180deg_at_50%_50%,_#22d3ee,_#e879f9,_#6366f1,_#22d3ee)] blur-[8px] -z-10" />
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>IA aplicada a ventas y atención en Latinoamérica</span>
            </div>

            {/* título con degradé animado sutil en el subrayado */}
            <h1 className="font-extrabold leading-tight tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-4 max-w-2xl relative">
              El aliado invisible que <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300">multiplica tus ventas</span> y atiende a todos tus clientes sin descanso.
              <span className="block mt-2 h-[3px] w-44 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 animate-[pulse_3.5s_ease-in-out_infinite]" />
            </h1>

            {/* Frase dinámica con texto degradé para “vida” */}
            <div className="relative h-9 sm:h-10 mb-6 ">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phraseKey}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-base sm:text-lg lg:text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300"
                >
                  {PHRASES[idx]}
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mb-6 text-base sm:text-lg lg:text-xl text-white/85 max-w-xl">
              Atender consultas y cerrar ventas mientras llevás el negocio no debería ser una carga imposible.
              Configuramos tu asistente una vez; desde ahí responde en segundos, califica leads y no deja escapar
              oportunidades. Vos enfocás tu energía en crecer.
            </p>

            {/* CTAs con borde-luz y hover con gradiente */}
            <div className="mt-2 grid w-full max-w-2xl grid-cols-1 gap-4 sm:auto-cols-max sm:grid-flow-col">
              <button
                onClick={handleRedirect}
                className="relative w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[52px] text-white
                bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/10
                shadow-lg shadow-black/10 hover:bg-white/20 active:bg-white/25 transition"
              >
                <span className="absolute inset-0 rounded-2xl opacity-40 blur-md -z-10 [background:conic-gradient(from_140deg_at_50%_50%,_#22d3ee33,_#e879f933,_#6366f133,_#22d3ee33)]" />
                ⚡ Conocer mi empleado digital
              </button>

              <button
                onClick={handleOpenAssistant}
                aria-label="Hablar con el asistente de ÉtherCode"
                className="relative w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[52px]
                text-white bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/25 to-indigo-500/25
                border border-white/20 ring-1 ring-white/30 shadow-lg shadow-black/10 transition will-change-transform
                hover:from-cyan-500/35 hover:via-fuchsia-500/35 hover:to-indigo-500/35 hover:shadow-xl hover:ring-white/40 active:scale-[0.99]"
              >
                <span className="absolute inset-0 rounded-2xl -z-10 opacity-30 blur-md [background:conic-gradient(from_0deg_at_50%_50%,_#22d3ee55,_#e879f955,_#6366f155,_#22d3ee55)]" />
                🗣️ Probar ahora
              </button>
            </div>

            {/* Trust microbadges con puntos de color */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/70">
              {[
                "Onboarding en días, no meses",
                "Integración WhatsApp / Web / IG",
                "Entrena con tus PDFs y procesos",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 inline-flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Panel animado sin imágenes */}
          <div className="relative">
            <motion.div
              className="relative mx-auto max-w-md rounded-3xl p-5 backdrop-blur-lg shadow-2xl
              border border-white/10 bg-white/5"
              variants={fadeUp}
            >
              {/* borde interior animado sutil */}
              <span className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-25 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-[1px] [background:conic-gradient(from_90deg_at_50%_50%,_#22d3ee55,_#e879f955,_#6366f155,_#22d3ee55)]" />

              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-white/70">Asistente ÉtherCode</div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-300/80">En línea</span>
                </div>
              </div>

              {/* Cards flotantes */}
              <div className="grid grid-cols-1 gap-3">
                <motion.div className="rounded-2xl border border-white/10 bg-white/10 p-4" {...floatSoft}>
                  <div className="text-xs text-white/60">Tiempo de respuesta</div>
                  <div className="text-2xl font-semibold text-white">4.1s</div>
                  <div className="text-xs text-white/50">Promedio de las últimas 100 consultas</div>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/10 p-4"
                  {...floatSoft}
                  transition={{ ...floatSoft.animate.transition, delay: 0.4 }}
                >
                  <div className="text-xs text-white/60">Ventas asistidas</div>
                  <div className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300">
                    +38%
                  </div>
                  <div className="text-xs text-white/50">Medido en 30 días post implementación</div>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/10 p-4"
                  {...floatSoft}
                  transition={{ ...floatSoft.animate.transition, delay: 0.8 }}
                >
                  <div className="text-xs text-white/60">Canales activos</div>
                  <div className="text-sm text-white/80">WhatsApp · Webchat · Instagram</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Preguntas frecuentes", "Seguimiento de leads", "Agendado automático"].map((t) => (
                      <motion.span
                        key={t}
                        variants={chip}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80"
                        style={{ boxShadow: "0 0 0 0 rgba(255,255,255,0.06)" }}
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300">
                          {t}
                        </span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer simulado */}
              <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                <span>Entrenado con tu negocio</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">SLA 99.9%</span>
              </div>
            </motion.div>

            {/* Aura animada alrededor */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-30 blur-2xl"
              animate={{ opacity: [0.18, 0.36, 0.18] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{
                background:
                  "conic-gradient(from 90deg at 50% 50%, rgba(34,211,238,.6), rgba(232,121,249,.5), rgba(99,102,241,.45), rgba(34,211,238,.6))",
              }}
            />
          </div>
        </Container>

        {/* MODAL */}
        <EtherCodeAssistantModal open={isOpen} onClose={() => setIsOpen(false)} />
      </motion.section>
    </AnimatePresence>
  );
}

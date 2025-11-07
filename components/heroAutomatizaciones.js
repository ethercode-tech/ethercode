import { motion } from "framer-motion";
import Container from "./container";
import { useEffect, useState } from "react";
import ChatWhatsapp from "./buttonWhatsapp";
import ButtonTop from "./buttonTop";

const phrases = [
  "Nunca falta. Nunca duerme. Siempre responde.",
  "Tu empleado digital trabaja día y noche por vos.",
  "Atendé clientes mientras dormís.",
  "¿Y si tuvieras un equipo que nunca se desconecta?",
  "Inteligencia Artificial al servicio de tu negocio",
];

export default function HeroAutomatizaciones() {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCaret, setShowCaret] = useState(true);

  // Typewriter + caret
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (charIndex < currentPhrase.length && !isDeleting) {
      const t = setTimeout(() => {
        setDisplayedText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((c) => c + 1);
      }, 42);
      return () => clearTimeout(t);
    }

    if (charIndex === currentPhrase.length && !isDeleting) {
      const p = setTimeout(() => setIsDeleting(true), 1100);
      return () => clearTimeout(p);
    }

    if (isDeleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex((c) => c - 1);
      }, 24);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex === 0) {
      setPhraseIndex((i) => (i + 1) % phrases.length);
      setIsDeleting(false);
    }
  }, [charIndex, isDeleting, phraseIndex]);

  useEffect(() => {
    const caretTimer = setInterval(() => setShowCaret((s) => !s), 500);
    return () => clearInterval(caretTimer);
  }, []);

  // Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <>
      <ButtonTop />
      <ChatWhatsapp />

      <section
        className="relative text-white px-4 pt-20 pb-10 sm:pt-36 sm:pb-24 "
        style={{
          ["--sec-mask-strength"]: 0.55,
          ["--sec-alpha"]: 0.06,
        }}
        aria-label="Automatizaciones con empleados digitales"
      >
        {/* BACKGROUND FX (sin imágenes) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* grilla sutil */}
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
          {/* blobs cónicos de color */}
          <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_6s_ease-in-out_infinite]" />
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

        <Container className="relative z-0">
          {/* SVG “circuito” animado */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 200"
            className="absolute top-2 left-1/2 -translate-x-1/2 w-full max-w-6xl opacity-20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          >
            <path
              d="M50 100 H200 V50 H600 V150 H200 V100"
              stroke="url(#gradLine)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,6"
            />
            <defs>
              <linearGradient id="gradLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#e879f9" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* CONTENIDO */}
          <div className="relative max-w-5xl mx-auto text-center leading-[1.2]">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="uppercase tracking-widest text-sm sm:text-base text-cyan-300/90 mb-4 inline-flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Tecnología que no duerme
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 drop-shadow pb-2"
            >
              Empleados digitales para empresas reales
            </motion.h1>

            {/* Frase tipiada + caret degradé */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.5 }}
              className="text-base sm:text-xl md:text-3xl font-medium mt-6 min-h-[2.5rem] flex justify-center"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-indigo-200">
                {displayedText}
              </span>
              <span
                className="ml-1 w-3"
                aria-hidden="true"
                style={{
                  borderRight: showCaret ? "3px solid rgba(255,255,255,0.85)" : "3px solid transparent",
                }}
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.8 }}
              className="text-white/80 max-w-3xl mx-auto mt-6 text-sm sm:text-base md:text-lg"
            >
              No vendemos bots. Creamos <span className="text-white font-semibold">empleados digitales</span> con IA que
              atienden clientes, responden preguntas y gestionan tareas por vos. 24 horas. Todos los días. Sin excusas.
            </motion.p>

            {/* Micro-badges de confianza */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 1 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] text-white/70"
            >
              {["Onboarding en días", "Integración WhatsApp/Web/IG", "Logs y auditoría", "Fallback humano"].map(
                (b) => (
                  <span key={b} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    {b}
                  </span>
                )
              )}
            </motion.div>

            {/* Línea pulso */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="w-[180px] h-[2px] mx-auto mt-8 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 animate-pulse rounded-full shadow-md"
            />

            {/* CTAs con borde-luz */}
            {/* <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 1.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href="#servicios"
                className="relative inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[48px]
                           text-white bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/10
                           shadow-lg shadow-black/10 hover:bg-white/20 active:bg-white/25 transition"
              >
                <span className="absolute inset-0 rounded-2xl opacity-40 blur-md -z-10 [background:conic-gradient(from_140deg_at_50%_50%,_#22d3ee33,_#e879f933,_#6366f133,_#22d3ee33)]" />
                Ver servicios
              </a>

              <a
                href="#contacto"
                className="relative inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[48px]
                           text-white bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/25 to-indigo-500/25
                           border border-white/20 ring-1 ring-white/30 shadow-lg shadow-black/10 transition will-change-transform
                           hover:from-cyan-500/35 hover:via-fuchsia-500/35 hover:to-indigo-500/35 hover:shadow-xl hover:ring-white/40 active:scale-[0.99]"
                aria-label="Ir a contacto"
              >
                <span className="absolute inset-0 rounded-2xl -z-10 opacity-30 blur-md [background:conic-gradient(from_0deg_at_50%_50%,_#22d3ee55,_#e879f955,_#6366f155,_#22d3ee55)]" />
                Hablar con nosotros
              </a>
            </motion.div> */}
          </div>
        </Container>
      </section>
    </>
  );
}

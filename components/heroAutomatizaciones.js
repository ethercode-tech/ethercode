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

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (charIndex < currentPhrase.length && !isDeleting) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex(charIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }

    if (charIndex === currentPhrase.length && !isDeleting) {
      const pause = setTimeout(() => setIsDeleting(true), 1200);
      return () => clearTimeout(pause);
    }

    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      }, 30);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      const nextIndex = (phraseIndex + 1) % phrases.length;
      setPhraseIndex(nextIndex);
      setIsDeleting(false);
    }
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <>
      <ButtonTop />
      <ChatWhatsapp />
      <Container className="text-white px-4 pt-20 pb-5 sm:pt-36 sm:pb-24 relative overflow-visible">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 200"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl opacity-10 z-0"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <path
            d="M50 100 H200 V50 H600 V150 H200 V100"
            stroke="#00FFFF"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4,4"
          />
        </motion.svg>

        <div className="relative z-0 max-w-5xl mx-auto text-center leading-[1.2]">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-widest text-sm sm:text-base text-cyan-400 mb-4"
          >
            Tecnología que no duerme
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 drop-shadow pb-2"
          >
            Empleados digitales para empresas reales
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-base sm:text-xl md:text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via--[#00B4D8] to-orange-400 opacity-80 text-[#00B4D8] mt-6 min-h-[2.5rem]"
          >
            {displayedText}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-gray-300 max-w-3xl mx-auto mt-6 text-sm sm:text-base md:text-lg"
          >
            No vendemos bots. Creamos empleados digitales con IA que atienden
            clientes, responden preguntas y gestionan tareas por vos. 24 horas.
            Todos los días. Sin excusas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="w-[160px] h-[2px] mx-auto mt-8 bg-gradient-to-r from--[#00B4D8] via-orange-400 to-rose-400 animate-pulse rounded-full shadow-md"
          />
        </div>
      </Container>
    </>
  );
}

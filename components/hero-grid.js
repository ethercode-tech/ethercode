import Image from "next/image";
import Container from "./container";
import heroImg from "../public/herimagen2.png";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { event } from "nextjs-google-analytics";
import { useState } from "react";
import EtherCodeAssistantModal from "../components/EtherCodeAssistantModal";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const textAnimation = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const imageAnimation = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const HeroGrid = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRedirect = () => {
    event("cta_click", { category: "engagement", label: "Quiero conocer a mi futuro empleado digital" });
    router.push("/asistentes");
  };

  const handleOpenAssistant = () => {
    event("cta_click", { category: "engagement", label: "Probar ahora (modal asistente)" });
    setIsOpen(true);
  };

  return (
    <AnimatePresence>
      <motion.section
        variants={variants}
        initial="hidden"
        animate="show"
        className="relative w-full bg-transparent pt-24 sm:pt-28 pb-[calc(2.5rem+env(safe-area-inset-bottom))] min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]"
      >
        <div
          aria-hidden
          className="absolute inset-0 md:hidden pointer-events-none"
        />

        <Container className="relative grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          {/* TEXTO */}
          <motion.div
            variants={textAnimation}
            className="flex flex-col justify-center text-left items-start"
          >
            <h1 className="font-extrabold leading-tight tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-5 max-w-2xl">
              El aliado invisible que multiplica tus ventas y atiende a todos
              tus clientes sin descanso.
            </h1>

            <p className="mb-6 text-base sm:text-lg lg:text-xl text-white/85 max-w-xl">
              Atender consultas y cerrar ventas mientras llevás el negocio no
              debería ser una carga imposible. Nuestro asistente digital
              responde en segundos, aprende de vos y nunca deja escapar una
              oportunidad. Lo configuramos una vez y se transforma en tu socio
              incansable para que enfoques tu energía en crecer.
            </p>

            {/* CTAs (glass) */}
            <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-4 sm:auto-cols-max sm:grid-flow-col sm:gap-4">
              <button
                onClick={handleRedirect}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[52px]
               text-white bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/10
               shadow-lg shadow-black/10 hover:bg-white/20 active:bg-white/25 transition"
              >
                🤖 ¿Querés saber más?
              </button>

              <button
                onClick={handleOpenAssistant}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[52px]
               text-white bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/30
               shadow-lg shadow-black/10 transition will-change-transform
               animate-float-soft md:animate-none md:hover:animate-float-soft
               hover:bg-white/20 hover:shadow-xl hover:ring-white/40 active:scale-[0.99]"
                aria-label="Hablar con el asistente de EtherCode"
              >
                Habla con el nuestro!
              </button>
            </div>
          </motion.div>

          {/* MODAL */}
          <EtherCodeAssistantModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
          />

          {/* IMAGEN */}
          <motion.div
            variants={imageAnimation}
            className="md:flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={heroImg}
              width={770}
              height={770}
              className="object-contain"
              alt="Empleado digital de EtherCode IA"
              placeholder="empty"
              priority
            />
          </motion.div>
        </Container>
      </motion.section>
    </AnimatePresence>
  );
};

export default HeroGrid;

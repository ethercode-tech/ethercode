"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../container";

const logos = [
  "/clientes/jb.svg",
  "/clientes/tesai.svg",
  "/clientes/plazachess.svg",
  "/clientes/lumiq.svg",
  "/clientes/wolf.svg",
  "/clientes/atlantis.svg",
];

const LogoSlider = () => {
  // 1) Sin duplicados en la fuente
  const unique = Array.from(new Set(logos));

  // 2) Duplicamos una sola vez para el loop sin corte
  const track = [...unique, ...unique];

  return (
    <section className="bg-primaryBg py-12">
      <Container>
        <div className="relative overflow-hidden">
          {/* Gradientes laterales */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-primaryBg to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-primaryBg to-transparent z-10" />

          {/* 3) Carrusel infinito sin mostrar duplicados (se anima hasta -50%) */}
          <motion.div
            className="flex gap-16 items-center w-max"
            style={{ willChange: "transform" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {track.map((src, i) => {
              const isClone = i >= unique.length; // segunda mitad
              return (
                <div
                  key={`${src}-${isClone ? "clone" : "orig"}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center w-[180px] h-[80px] min-w-[180px]"
                  aria-hidden={isClone} // 4) clones no “cuentan”
                >
                  <Image
                    src={src}
                    alt={`Logo ${src.split("/").pop()?.replace(".svg", "")}`}
                    width={180}
                    height={80}
                    sizes="180px"
                    className="object-contain max-h-16"
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default LogoSlider;

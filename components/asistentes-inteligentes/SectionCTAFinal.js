"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "../container";

export default function SectionCTAFinal() {
  const router = useRouter();

  return (
    <section className="bg-gradient-to-r from-[#0A0F2C] to-[#3F8CFF] py-16 px-6 text-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Logo + ALTIORA */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-30 h-30 flex items-center justify-center">
              <Image
                src="/img-logo/logo-ethercode--sinfondo-blanco.png"
                alt="Logo EtherCode"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
            <Link href="/" className=" md:flex items-center gap-2">
              <span className="text-white text-1xl font-bold tracking-wide">
                ALTIORA SOFTWARE
              </span>
            </Link>
          </div>

          {/* Título y texto */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para automatizar tu negocio?
          </h2>
          <p className="text-gray-200 mb-8">
            Pedinos una demo personalizada y empezá a ahorrar tiempo desde hoy.
          </p>

          {/* Botón CTA */}
          <motion.button
            onClick={() => router.push("#contacto")}
            animate={{ y: [0, -10, 0] }} // movimiento suave de "flotación"
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f0f9ff",
              boxShadow: "0 0 20px #ffffff70",
              transition: { duration: 0.3 },
            }}
            className="bg-white text-[#0A0F2C] font-semibold px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            Quiero mi asistente ahora
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
}

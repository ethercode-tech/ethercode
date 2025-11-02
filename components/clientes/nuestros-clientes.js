"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../container";

const clientes = [
  {
    name: "Tesãi",
    logo: "/clientes/tesai.svg",
    desc: "Centro Médico Integral",
    web: "https://www.centrotesai.com.ar",
  },
  {
    name: "Plazachess",
    logo: "/clientes/plazachess.svg",
    desc: "Academia de ajedrez educativo",
    web: "https://plazachess.vercel.app/",
  },
  {
    name: "LUMIQ",
    logo: "/clientes/lumiq.svg",
    desc: "Diseño en 3D e iluminación personalizada",
    web: "https://lumiq-web.vercel.app/ ",
  },
  {
    name: "Jujuy Barroco",
    logo: "/clientes/jb.svg",
    desc: "Festival de música barroca",
    web: "https://jujuybarroco.com.ar",
  },
];

const NuestrosClientes = () => {
  return (
    <section className="bg-primaryBg text-primaryText py-12">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 font-serif tracking-tight">
            Conocé a quienes confían en nosotros
          </h2>
          <p className="text-secondaryText text-lg mb-12">
            Empresas y organizaciones que potencian sus procesos con EtherCode
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-center justify-center">
            {clientes.map((cliente, index) => (
              <motion.div
                key={index}
                className="relative group flex flex-col items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => {
                  if (cliente.web) {
                    window.open(cliente.web, "_blank");
                  }
                }}
              >
                <Image
                  src={cliente.logo}
                  alt={`Logo de ${cliente.name}`}
                  width={120}
                  height={50}
                  className="grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition duration-300 object-contain"
                />

                {/* Hover con descripción */}
                <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-dark text-light text-[12px] px-4 py-1 rounded-md shadow-md">
                    {cliente.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NuestrosClientes;

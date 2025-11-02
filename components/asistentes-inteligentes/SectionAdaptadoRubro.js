"use client";

import { motion } from "framer-motion";
import { Gavel, Home, Dumbbell, ShoppingCart, Stethoscope } from "lucide-react";
import Container from "../container";
const rubros = [
  {
    icon: <Gavel className="h-8 w-8 text-primary" />,
    title: "Abogados",
    desc: "Responde consultas frecuentes, agenda reuniones y filtra casos urgentes.",
  },
  {
    icon: <Home className="h-8 w-8 text-primary" />,
    title: "Inmobiliarias",
    desc: "Muestra propiedades, responde por WhatsApp y organiza visitas automáticamente.",
  },
  {
    icon: <Dumbbell className="h-8 w-8 text-primary" />,
    title: "Gimnasios",
    desc: "Informa precios, horarios, inscripciones y promociones sin intervención manual.",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    title: "Tiendas online",
    desc: "Contesta dudas, recomienda productos y genera ventas día y noche.",
  },
  {
    icon: <Stethoscope className="h-8 w-8 text-primary" />,
    title: "Centros médicos",
    desc: "Agenda turnos, responde coberturas y guía pacientes automáticamente.",
  },
];

export function SectionAdaptadoRubro() {
  return (
    <section className="bg-[#121933] py-20 px-6">
      <Container>
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Adaptado a tu negocio, sin importar el rubro
          </motion.h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-12">
            Ya trabajamos con profesionales, comercios y empresas que
            automatizan día a día.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {rubros.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-[#0A0F2C] border border-[#3F8CFF] rounded-xl p-6 text-lef "
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

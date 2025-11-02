// ✅ REESCRITURA DE SECCIÓN INTEGRACIONESIA — ENFOQUE EN LO QUE HACEMOS (NO EN LAS HERRAMIENTAS)

"use client";
import Container from "./container";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const beneficios = [
  {
    icono: <Sparkles className="w-6 h-6 text-[#00B4D8] animate-pulse" />,
    titulo: "Atención al cliente día y noche",
    descripcion:
      "Tus clientes reciben respuestas inmediatas sin importar el día o la hora. Nunca más perdés una venta por no contestar a tiempo.",
  },
  {
    icono: <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />,
    titulo: "Ventas automatizadas",
    descripcion:
      "Nuestro sistema responde dudas frecuentes, muestra productos, gestiona reservas y toma pedidos automáticamente en WhatsApp, Web o App.",
  },
  {
    icono: <Sparkles className="w-6 h-6 text-green-400 animate-pulse" />,
    titulo: "Procesos internos más eficientes",
    descripcion:
      "Asigná tareas, registrá pedidos, integrá tus herramientas y reducí el trabajo repetitivo sin necesidad de más personal.",
  },
  {
    icono: <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />,
    titulo: "Ahorro de tiempo y dinero",
    descripcion:
      "Nuestros empleados digitales no se enferman, no llegan tarde y no cobran horas extras. Escalá sin aumentar tus costos fijos.",
  },
];

export default function IntegracionesIA() {
  return (
    <Container className="text-white relative overflow-hidden pt-10 pb-28">
      <section aria-labelledby="beneficios-ia z-0">
        <div className="relative flex flex-col items-center z-0 mt-20">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 to-transparent -translate-x-1/2 z-0" />

          {beneficios.map((item, index) => (
            <motion.div
              key={index}
              className="relative w-full max-w-5xl my-14"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.4 }}
              aria-label={`Beneficio: ${item.titulo}`}
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg--[#00B4E7] border-4 border-[#0f172a] flex items-center justify-center z-0 shadow-lg">
                {item.icono}
              </div>
              <motion.div
                className={`mt-14 ${
                  index % 2 === 0 ? "ml-auto" : "mr-auto"
                } w-full sm:w-1/2 px-4`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-[#0f172a]/70 to-[#1e293b]/70 backdrop-blur-md border border-yellow-500 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-lg text-center text-gray-400 max-w-3xl mx-auto z-0 relative"
        >
          Con EtherCode, no necesitás entender de herramientas. Nosotros diseñamos
          y conectamos todo para que tengas un equipo digital que trabaja por
          vos sin parar. Empezá a automatizar tu negocio hoy mismo.
        </motion.p>
      </section>
    </Container>
  );
}

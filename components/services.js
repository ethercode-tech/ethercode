// ✅ SERVICIOS REESCRITOS – INCLUYENDO EMPLEADO DIGITAL COMO ENFOQUE CLAVE PARA AUTOMATIZACIÓN

import { motion } from "framer-motion";
import { FaRobot, FaBolt, FaTools } from "react-icons/fa";

const services = [
  {
    icon: <FaRobot />,
    title: "Empleado digital para atención automatizada",
    headline: "Soporte, ventas y respuestas en tiempo real",
    description:
      "Atiende automáticamente tus canales como WhatsApp y Web con conversaciones naturales, resolviendo consultas al instante y liberando a tu equipo humano.",
    ideal: "Negocios con atención al cliente intensiva",
    benefits: [
      "Disponible día y noche",
      "Menos tiempo en tareas repetitivas",
      "Escalabilidad sin aumentar costos",
    ],
  },
  {
    icon: <FaBolt />,
    title: "Marketing automatizado con IA",
    headline: "Leads calificados y conversiones con menos esfuerzo",
    description:
      "Seguimiento inteligente, respuestas personalizadas y campañas activadas automáticamente. El empleado digital también es parte de tu equipo de marketing.",
    ideal: "Empresas que buscan más ventas sin más trabajo",
    benefits: [
      "Generación de leads automatizada",
      "Seguimiento personalizado sin esfuerzo",
      "Tasa de conversión optimizada",
    ],
  },
  {
    icon: <FaTools />,
    title: "Software a medida",
    headline: "Procesos optimizados y adaptados a cada empresa",
    description:
      "Creamos soluciones que se integran a tus flujos internos, eliminan tareas manuales y aumentan la eficiencia. Ideal para potenciar a tus empleados digitales y humanos.",
    ideal: "Equipos con procesos únicos o no estandarizados",
    benefits: [
      "Menos errores humanos",
      "Tiempos de ejecución reducidos",
      "Mayor control sobre la operación",
    ],
  },
];

export default function Services() {
  return (
    <section className="py-24 px-6 md:px-10 text-white relative z-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#00B4D8] mb-20">
          Soluciones que generan impacto real
        </h2>

        <div className="grid gap-16 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col items-center md:items-start text-left"
            >
              <motion.div
                className="mb-4 w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-yellow-500/10 text-[#00B4D8] shadow-[0_0_15px_#facc15] mx-auto"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {s.icon}
              </motion.div>

              <div className="w-full max-w-xs sm:max-w-sm md:max-w-none">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {s.title}
                </h3>

                <p className="text-sm md:text-base text-[#00B4D8] italic mt-1">
                  {s.headline}
                </p>

                <p className="text-sm text-gray-300 mt-2 leading-snug">
                  {s.description}
                </p>

                <p className="text-sm text-white mt-3 font-bold">
                  👉 Ideal para: <span className="font-normal text-gray-200">{s.ideal}</span>
                </p>

                <ul className="mt-2 text-sm text-gray-300 space-y-1 list-none">
                  {s.benefits.map((b, idx) => (
                    <li key={idx}>✔️ {b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
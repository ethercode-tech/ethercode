// ✅ CASOS DE USO – AHORA CON ENFOQUE EN EMPLEADOS DIGITALES RESOLVIENDO PROBLEMAS REALES

import Container from "./container";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const items = [
  {
    icon: (
      <BriefcaseIcon className="h-12 w-12 text-white bg-gradient-to-br from-blue-500 to-cyan-400 p-2 rounded-xl shadow-md" />
    ),
    title: "Empleado digital para ventas",
    description:
      "Atiende consultas, agenda reuniones, responde dudas frecuentes y genera oportunidades de venta las 24 horas.",
    stats: [
      { label: "Leads calificados", value: 40 },
      { label: "Reducción de costos comerciales", value: 60 },
      { label: "Disponibilidad operativa", value: 100 },
    ],
  },
  {
    icon: (
      <Cog6ToothIcon className="h-12 w-12 text-white bg-gradient-to-br from--[#00B4D8] to--[#00B4E7] p-2 rounded-xl shadow-md" />
    ),
    title: "Empleado digital para operaciones",
    description:
      "Confirma turnos, hace seguimiento de pedidos, actualiza estados y reduce tareas manuales.",
    stats: [
      { label: "Eficiencia operativa", value: 75 },
      { label: "Reducción de errores", value: 90 },
      { label: "Nivel de integración", value: 100 },
    ],
  },
  {
    icon: (
      <UserGroupIcon className="h-12 w-12 text-white bg-gradient-to-br from-pink-400 to-red-500 p-2 rounded-xl shadow-md" />
    ),
    title: "Empleado digital para atención al cliente",
    description:
      "Resuelve dudas, deriva consultas complejas y responde al instante incluso fuera del horario laboral.",
    stats: [
      { label: "Satisfacción de clientes", value: 95 },
      { label: "Tiempo de respuesta (segundos)", value: 15 },
      { label: "Consultas resueltas sin humanos", value: 85 },
    ],
  },
];

function ProgressBar({ value }) {
  return (
    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

export default function CasosUso() {
  return (
    <Container className="py-28 text-white text-center">
      <Container>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from--[#00B4D8] via-orange-500 to-rose-500 mb-4"
          >
            ¿Cómo trabajan nuestros empleados digitales?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-300 mb-20 text-lg max-w-2xl mx-auto"
          >
            Cada uno resuelve tareas clave en tu empresa, sin excusas, sin
            pausas y con resultados medibles.
          </motion.p>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0f172a]/60 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition hover:scale-[1.02] flex flex-col items-center text-center"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm mb-6">{item.description}</p>
                <div className="grid gap-4 w-full">
                  {item.stats.map((stat, i) => (
                    <div key={i} className="text-left">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-white">
                          {stat.value}%
                        </span>
                        <span className="text-cyan-400 text-xs">
                          {stat.label}
                        </span>
                      </div>
                      <ProgressBar value={stat.value} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Container>
  );
}

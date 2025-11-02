"use client";
import Container from "../container";
import { motion } from "framer-motion";
import { Lightbulb, Bot, Plug, Briefcase } from "lucide-react";

const steps = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Nos contás tu negocio",
    desc: "Nos compartís qué tareas te hacen perder tiempo o qué procesos querés automatizar.",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Entrenamos a tu IA",
    desc: "Preparamos un asistente que habla como vos, con tu info, productos y estilo de atención.",
  },
  {
    icon: <Plug className="h-8 w-8 text-primary" />,
    title: "Lo conectamos a tus canales",
    desc: "WhatsApp, Web, Instagram, CRM, formularios… donde tus clientes ya están.",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Empieza a trabajar por vos",
    desc: "Atiende, responde y convierte sin que tengas que hacer nada. Literal.",
  },
];

export function SectionComoFunciona() {
  return (
    <section className="bg-[#0A0F2C] py-20 px-6">
      <Container>
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            ¿Cómo funciona tu nuevo asistente inteligente?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 text-left"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";
import Container from "../container";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    pregunta: "¿Qué puede hacer un asistente de IA?",
    respuesta:
      "Puede responder consultas, enviar información, recomendar productos, agendar citas, enviar mensajes automáticos, calificar leads y más. Lo adaptamos a tu negocio.",
  },
  {
    pregunta: "¿En qué plataformas funciona?",
    respuesta:
      "Tu asistente puede conectarse con WhatsApp, Instagram, tu sitio web, CRM, correos automáticos y herramientas como n8n o Zapier.",
  },
  {
    pregunta: "¿Necesito saber programar?",
    respuesta:
      "No. Nos encargamos de toda la configuración técnica y te damos soporte continuo. Solo necesitás contarnos qué querés automatizar.",
  },
  {
    pregunta: "¿Qué pasa si mi negocio cambia?",
    respuesta:
      "Podés actualizar tu asistente en cualquier momento: cambiar respuestas, agregar productos o integrar nuevas plataformas.",
  },
  {
    pregunta: "¿Cuánto cuesta?",
    respuesta:
      "Tenemos planes escalables según tus necesidades. Podés empezar gratis con una demo y sumar funcionalidades a medida.",
  },
];

export function SectionFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#121933] py-20 px-6">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Preguntas frecuentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-colors duration-500 ${
                    isOpen
                      ? "bg-[#1E2B55] border-[#3F8CFF]"
                      : "bg-[#0A0F2C] border-[#1E293B]"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left px-4 py-4 flex items-center justify-between text-white font-medium focus:outline-none"
                  >
                    {faq.pregunta}
                    <ChevronDown
                      className={`h-5 w-5 text-[#00B4D8] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-4 text-sm text-gray-300">
                          {faq.respuesta}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

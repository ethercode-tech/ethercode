'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    pregunta: '¿Cómo arranco el proceso para tener mi web?',
    respuesta: 'Simple: nos compartís tu nombre, rubro, logo (si tenés) y una idea general de lo que querés mostrar. Nosotros nos encargamos del resto y te guiamos paso a paso.',
  },
  {
    pregunta: '¿Qué obtengo exactamente al contratar el Kit Web de EtherCode?',
    respuesta: 'Diseñamos e implementamos una WebApp escalable y profesional, desarrollada con las mejores prácticas de rendimiento, SEO, seguridad y responsive design. Incluye formulario, contacto directo por WhatsApp, mapa, estadísticas, y estructura optimizada para crecer desde el día uno.',
  },
  {
    pregunta: '¿Cómo se realiza el pago?',
    respuesta: 'El pago es al entregar el sitio. Aceptamos cualquier método: transferencia, Mercado Pago, USDC, criptomonedas o moneda extranjera. Nos adaptamos para facilitarte todo.',
  },
  {
    pregunta: '¿Y si no me convence lo que entregan?',
    respuesta: 'Confiamos plenamente en nuestro trabajo. Si al finalizar el proyecto no estás conforme, te devolvemos el dinero. Aplicamos una política de satisfacción garantizada sin vueltas.',
  },
  {
    pregunta: '¿Cuál es el tiempo estimado de entrega?',
    respuesta: 'La entrega inicial se realiza entre 5 y 7 días hábiles luego de recibir el contenido. Nuestro enfoque ágil nos permite avanzar rápido sin sacrificar calidad. Además, el proyecto se entrega validado para dispositivos móviles y con todo funcionando.',
  },
  {
    pregunta: '¿Puedo ampliar mi WebApp más adelante?',
    respuesta: 'Por supuesto. Todas nuestras soluciones son modulares y escalables. Podés sumar turnero, catálogo, pagos en línea, blog, área privada de clientes, CRM, sistema de reservas, y más. Lo construimos para que crezcas sin límites.',
  },
  {
    pregunta: '¿Tengo que pagar todos los años algo más?',
    respuesta: 'El primer año el hosting y dominio están incluidos. Luego, te ofrecemos continuidad con precios accesibles o podés migrar donde quieras, sin compromiso.',
  }
];

const FAQsKit = () => {
  const [activo, setActivo] = useState(null);

  const toggle = (index) => {
    setActivo(index === activo ? null : index);
  };

  return (
    <section className="py-20 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-48 text-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Preguntas Frecuentes</h2>

      <div className="space-y-6 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-lg transition cursor-pointer hover:bg-opacity-20"
            onClick={() => toggle(idx)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold">{faq.pregunta}</h3>
              {activo === idx ? (
                <FaChevronUp className="text-[#00B4D8]" />
              ) : (
                <FaChevronDown className="text-[#00B4D8]" />
              )}
            </div>
            <AnimatePresence>
              {activo === idx && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-green-300 mt-4 leading-relaxed text-base"
                >
                  {faq.respuesta}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQsKit;

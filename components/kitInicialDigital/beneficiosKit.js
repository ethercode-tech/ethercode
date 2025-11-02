'use client';

import { motion } from 'framer-motion';
import {
  FaGlobe,
  FaLock,
  FaChartLine,
  FaMobileAlt,
  FaCamera,
  FaMapMarkedAlt,
  FaEnvelopeOpenText,
  FaRocket,
  FaRobot,
} from 'react-icons/fa';

const beneficios = [
  {
    icon: FaGlobe,
    title: 'Dominio propio',
    description: 'Incluye un dominio .com.ar para que tu negocio tenga presencia profesional y confiable.',
  },
  {
    icon: FaLock,
    title: 'Certificado SSL',
    description: 'Seguridad total para tus visitantes y mejor posicionamiento en Google (https://).',
  },
  {
    icon: FaChartLine,
    title: 'SEO inicial optimizado',
    description: 'Tu negocio aparece en Google con palabras clave locales pensadas para vender.',
  },
  {
    icon: FaMobileAlt,
    title: 'Diseño responsive',
    description: 'Se adapta a celulares, tablets y notebooks. ¡Una experiencia perfecta en cualquier pantalla!',
  },
  {
    icon: FaCamera,
    title: 'Galería de imágenes',
    description: 'Mostrá tus productos o servicios con hasta 5 fotos de alta calidad.',
  },
  {
    icon: FaMapMarkedAlt,
    title: 'Google Maps integrado',
    description: 'Incluye ubicación exacta para que te encuentren fácilmente y lleguen a vos.',
  },
  {
    icon: FaEnvelopeOpenText,
    title: 'Formulario de contacto',
    description: 'Recibí consultas directamente desde tu web al WhatsApp o por correo electrónico.',
  },
  {
    icon: FaRocket,
    title: 'Carga rápida',
    description: 'Tu sitio está optimizado para que cargue en segundos y no pierdas visitas.',
  },
  {
    icon: FaRobot,
    title: 'Automatizable a futuro',
    description: 'Listo para escalar con módulos como turnos, tienda online, blog o chatbot con IA.',
  },
];


const BeneficiosKit = () => {
  return (
    <section className="py-24 px-6 sm:px-10 md:px-20 lg:px-32 bg-transparent">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-16 drop-shadow-md">
        ¿Qué obtenés con el Kit?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {beneficios.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0D1321]/80 to-[#1F2A44]/80 border border-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:scale-[1.05] hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <Icon className="text-5xl text-[#72D7FF] drop-shadow-lg mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">{title}</h3>
            <p className="text-gray-300 text-sm">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BeneficiosKit;

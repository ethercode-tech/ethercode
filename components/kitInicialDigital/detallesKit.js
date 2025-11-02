'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const servicios = [
  { label: 'Dominio .com.ar personalizado', incluido: true },
  { label: 'Certificado SSL (https://)', incluido: true },
  { label: 'Diseño responsive (celular/tablet/PC)', incluido: true },
  { label: 'Carga inicial de hasta 5 imágenes', incluido: true },
  { label: 'Formulario de contacto o botón WhatsApp', incluido: true },
  { label: 'Google Maps integrado', incluido: true },
  { label: 'SEO básico (Google y palabras clave locales)', incluido: true },
  { label: 'Estadísticas básicas de visitas', incluido: true },
  { label: 'Blog o sección de noticias', incluido: false },
  { label: 'Carrito de compras y pagos online', incluido: false },
  { label: 'Módulo de turnos o reservas', incluido: false },
  { label: 'Panel de administración editable', incluido: false },
];

const DetallesKit = () => {
  return (
    <section className="py-20 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-48 text-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        Detalles del Kit Presencia Online
      </h2>

      <div className="overflow-x-auto rounded-2xl bg-white bg-opacity-10 backdrop-blur-md shadow-lg">
        <table className="w-full text-left text-sm sm:text-base text-white">
          <thead className="bg-white bg-opacity-20">
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Servicio</th>
              <th className="px-6 py-4 font-semibold text-white text-center">Incluido</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-white/20 hover:bg-white/10 transition"
              >
                <td className="px-6 py-4">{servicio.label}</td>
                <td className="px-6 py-4 text-center">
                  {servicio.incluido ? (
                    <FaCheckCircle className="inline text-green-400 text-xl" />
                  ) : (
                    <span className="text-sm text-gray-300 italic">Customizable</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DetallesKit;

// ✅ CTA FINAL REESCRITA – ENFOQUE TOTAL EN EMPLEADO DIGITAL, EN LÍNEA CON EL RESTO DE LA PÁGINA

import { motion } from "framer-motion";

export default function CTAFinal() {
  return (
    <section className="py-16 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-48 text-white bg-gradient-to-b from-transparent to-black relative overflow-hidden">
      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f3f_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-6 drop-shadow-sm"
        >
          📣 Conocé a tu próximo empleado digital
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed"
        >
          Atendé día y noche. Vendé sin pausas. Automatizá sin complicaciones. Tu nuevo empleado digital no duerme, no se cansa y no falla.
        </motion.p>

        {/* Botón */}
        <motion.a
          href="https://cal.com/ethercode-software/contanos-tu-idea"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-gradient-to-r from--[#00B4D8] to--[#00B4E7] hover:from-yellow-500 hover:to-yellow-700 text-black font-bold text-lg py-3 px-8 rounded-full shadow-xl transition-all duration-300"
        >
          📅 Agendar reunión ahora
        </motion.a>
      </div>
    </section>
  );
}
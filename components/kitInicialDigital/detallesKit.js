// detallesKit.js — Detalles del Kit (fondo continuo + neuro-copy + upsell claro)
// - Mismo fondo con grilla + blobs cónicos + overlay
// - Tabla legible con hover y checks animados
// - “Extras opcionales” marcados como Upgrades (baja fricción, no suena a falta)
// - Mini leyenda + CTA al final

'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const servicios = [
  { label: 'Dominio .com.ar personalizado', incluido: true },
  { label: 'Certificado SSL (https://)', incluido: true },
  { label: 'Diseño responsive (celular / tablet / PC)', incluido: true },
  { label: 'Carga inicial de hasta 5 imágenes optimizadas', incluido: true },
  { label: 'Formulario de contacto / botón WhatsApp', incluido: true },
  { label: 'Google Maps integrado (cómo llegar)', incluido: true },
  { label: 'SEO técnico inicial + palabras clave locales', incluido: true },
  { label: 'Métricas esenciales de visitas (Analytics)', incluido: true },
  // Upgrades
  { label: 'Blog / Novedades autogestionable', incluido: false },
  { label: 'Carrito de compras y pagos online', incluido: false },
  { label: 'Turnos / Reservas con recordatorios', incluido: false },
  { label: 'Panel de administración editable', incluido: false },
];

export default function DetallesKit() {
  return (
    <section
      className="relative  py-20 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-48 text-white"
      aria-labelledby="detalles-title"
      style={{
        ['--sec-mask-strength']: 0.5,
        ['--sec-alpha']: 0.06,
      }}
    >
      {/* BACKGROUND FX (coherente con el resto) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
        <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-25vmax] right-[-10vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.22),_rgba(199,125,255,.14),_transparent_60%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 30%, rgba(10,17,40, var(--sec-alpha)), rgba(10,17,40, calc(var(--sec-alpha) + 0.02)) 60%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)',
            maskImage:
              'radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)',
          }}
        />
      </div>

      <motion.h2
        id="detalles-title"
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 drop-shadow mb-4"
      >
        Detalles del Kit Presencia Online
      </motion.h2>

      {/* Leyenda breve (reduce fricción) */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="text-center text-white/80 max-w-2xl mx-auto mb-8"
      >
        Todo lo básico para salir en Google <span className="text-white">incluido</span>. 
        Lo demás se suma cuando lo necesitás.
      </motion.p>

      <div className="overflow-x-auto rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl">
        <table className="w-full text-left text-sm sm:text-base text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Servicio</th>
              <th className="px-6 py-4 font-semibold text-white text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio, idx) => {
              const isUpgrade = !servicio.incluido;
              return (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`border-b border-white/10 hover:bg-white/10 transition ${
                    isUpgrade ? 'bg-white/0' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {!isUpgrade ? (
                        <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-300/30">
                          Incluido
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-300/30">
                          Upgrade
                        </span>
                      )}
                      <span className="text-white">{servicio.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {servicio.incluido ? (
                      <motion.span
                        initial={{ scale: 0.85, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        className="inline-flex items-center justify-center"
                        aria-label="Incluido"
                        title="Incluido en el Kit"
                      >
                        <FaCheckCircle className="text-emerald-400 text-xl drop-shadow" />
                      </motion.span>
                    ) : (
                      <span className="text-sm text-white/70 italic">A pedido</span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mini-CTA para upgrades */}
      <div className="mt-8 text-center">
        <a
          href="https://wa.me/5493884136752?text=Hola%20ÉtherCode!%20Quiero%20agregar%20m%C3%B3dulos%20al%20Kit%20Digital%20(%20blog%2Fcarrito%2Fturnos%20)%20🚀"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[48px]
                     text-white bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/10
                     shadow-lg shadow-black/10 transition will-change-transform
                     hover:bg-white/20 hover:shadow-xl hover:ring-white/30 active:scale-[0.99]"
          aria-label="Consultar upgrades del Kit"
        >
          🔧 Consultar upgrades del Kit
        </a>
      </div>
    </section>
  );
}

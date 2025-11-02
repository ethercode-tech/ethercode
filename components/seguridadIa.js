import { ShieldCheckIcon, LockClosedIcon, KeyIcon, ServerStackIcon } from '@heroicons/react/24/outline';

export default function SeguridadIA() {
  return (
    <section className="bg-gradient-to-br from-[#0B0F1A] via-[#121933] to-[#101e33] text-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">🔒 Seguridad garantizada</h2>
        <p className="text-gray-300 text-lg mb-12">
          Aplicamos los más altos estándares para proteger tu información y la de tus clientes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
            <ServerStackIcon className="w-10 h-10 text-[#48E0B8] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Datos en casa</h3>
            <p className="text-gray-400 text-sm">
              Control total: tus datos permanecen cifrados y bajo tu dominio.
            </p>
          </div>

          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
            <ShieldCheckIcon className="w-10 h-10 text-[#FFD700] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Certificaciones</h3>
            <p className="text-gray-400 text-sm">
              En proceso de certificación ISO 27001 y SOC2 para máxima confianza.
            </p>
          </div>

          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
            <LockClosedIcon className="w-10 h-10 text-[#FF5E5E] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cifrado Avanzado</h3>
            <p className="text-gray-400 text-sm">
              Toda comunicación está protegida con protocolos de última generación.
            </p>
          </div>

          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
            <KeyIcon className="w-10 h-10 text-[#00D38F] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Acceso restringido</h3>
            <p className="text-gray-400 text-sm">
              Sólo vos y tu equipo autorizado acceden a la información crítica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

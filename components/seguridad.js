import { ShieldCheckIcon, LockClosedIcon, KeyIcon, ServerStackIcon } from '@heroicons/react/24/outline';

export default function Seguridad() {
  return (
    <div className="py-20 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-accent mb-4 text-white">🔒 Seguridad en EtherCode</h2>
        <p className="text-gray-300 mb-12 text-lg">
          Implementamos las medidas más estrictas de protección para garantizar la integridad, confidencialidad y disponibilidad de tus datos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-transform">
            <ServerStackIcon className="h-10 w-10 text-[#48E0B8] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Datos seguros</h3>
            <p className="text-gray-400 text-sm">
              Tus datos permanecen en la nube, manteniendo control total sobre tu información.
            </p>
          </div>

          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-transform">
            <ShieldCheckIcon className="h-10 w-10 text-[#FFD700] mb-4" />
            <h3 className="text-xl font-semibold mb-2">SOC2</h3>
            <p className="text-gray-400 text-sm">
              Certificación que valida nuestros controles de seguridad y privacidad.
            </p>
            <span className="mt-2 text-xs text-gray-300 bg-[#3F8CFF]/30 rounded-full px-2 py-1">En proceso</span>
          </div>

          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-transform">
            <ShieldCheckIcon className="h-10 w-10 text-[#00D38F] mb-4" />
            <h3 className="text-xl font-semibold mb-2">ISO 27001</h3>
            <p className="text-gray-400 text-sm">
              Estándar internacional para la gestión de seguridad de la información.
            </p>
            <span className="mt-2 text-xs text-gray-300 bg-[#3F8CFF]/30 rounded-full px-2 py-1">En proceso</span>
          </div>

          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-transform">
            <LockClosedIcon className="h-10 w-10 text-[#FF5E5E] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cifrado</h3>
            <p className="text-gray-400 text-sm">
              La información es cifrada con tecnología avanzada, accesible sólo por usuarios autorizados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

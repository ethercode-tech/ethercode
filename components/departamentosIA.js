import Container from "../components/container";
import { MessageSquareCheck, Briefcase, Megaphone } from "lucide-react";
import Link from "next/link";

export default function DepartamentosIA() {
  return (
    <Container className="py-20 bg-gradient-to-b from-[#0B0F1A] via-[#121933] to-[#101e33] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-accent mb-4">¿En qué puedo ayudarte?</h2>
        <p className="text-gray-300 mb-12 text-lg">
          Son muchas las posibilidades que ofrece la IA en el campo de la empresa, pero vamos a trabajar con los departamentos que más se pueden beneficiar de automatizar tareas repetitivas y reducir costos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 shadow-md hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-4">
              {/* <Briefcase className="h-8 w-8 text-[#48E0B8]" /> */}
            </div>
            <h3 className="text-xl font-semibold mb-2">Administración y Finanzas</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✔️ KPI’s y reportes</li>
              <li>✔️ Analítica de Datos</li>
              <li>✔️ Contabilidad</li>
            </ul>
            <Link href="https://wa.me/5493884486112" target="_blank">
              <button className="mt-4 px-4 py-2 rounded bg-[#3F8CFF] hover:bg-[#2b6cb0] font-medium text-white">Hablamos</button>
            </Link>
          </div>

          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 shadow-md hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-4">
              {/* <MessageSquareCheck className="h-8 w-8 text-[#FFD700]" /> */}
            </div>
            <h3 className="text-xl font-semibold mb-2">Recursos Humanos</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✔️ Onboardings</li>
              <li>✔️ Gestión de candidatos</li>
              <li>✔️ Registros horarios</li>
            </ul>
            <Link href="https://wa.me/5493884486112" target="_blank">
              <button className="mt-4 px-4 py-2 rounded bg-[#3F8CFF] hover:bg-[#2b6cb0] font-medium text-white">Hablamos</button>
            </Link>
          </div>

          <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 shadow-md hover:scale-105 transition-transform">
            <div className="flex items-center justify-center mb-4">
              {/* <Megaphone className="h-8 w-8 text-[#FF5E5E]" /> */}
            </div>
            <h3 className="text-xl font-semibold mb-2">Marketing y Ventas</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✔️ Gestión de CRM</li>
              <li>✔️ Funnels de Venta</li>
              <li>✔️ Automatización de seguimiento</li>
            </ul>
            <Link href="https://wa.me/5493884486112" target="_blank">
              <button className="mt-4 px-4 py-2 rounded bg-[#3F8CFF] hover:bg-[#2b6cb0] font-medium text-white">Hablamos</button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

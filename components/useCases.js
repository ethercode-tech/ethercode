// ✅ USECASES REESCRITO — ENFOQUE EN EMPLEADOS DIGITALES CON MÉTRICAS Y RESULTADOS

import {
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/solid';

export default function UseCases() {
  return (
    <section className="py-20 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            ¿Cómo trabajan nuestros <span className="text-[#00B4D8]">empleados digitales?</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Historias reales de empresas que automatizaron tareas críticas y mejoraron sus resultados con empleados digitales de EtherCode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[rgba(18,25,51,0.3)] backdrop-blur-md rounded-2xl p-6 shadow-lg">
          {/* Ventas */}
          <div className="bg-[rgba(26,33,56,0.7)] backdrop-blur-sm rounded-xl p-6 hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-2 text-[#00B4D8] font-bold mb-2">
              <BriefcaseIcon className="w-5 h-5" />
              <h3 className="text-lg">Empleado digital de ventas</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Responde consultas, agenda citas, y acompaña a cada lead hasta cerrar la venta. Nunca se olvida, nunca se duerme, y nunca pierde una oportunidad.
            </p>
            <div className="flex justify-between text-sm text-[#00B4D8] font-semibold">
              <div>
                <p>40%</p>
                <p className="text-gray-400">Leads calificados</p>
              </div>
              <div>
                <p>60%</p>
                <p className="text-gray-400">Reducción de costos</p>
              </div>
              <div>
                <p>día y noche</p>
                <p className="text-gray-400">Disponibilidad</p>
              </div>
            </div>
          </div>

          {/* Operaciones */}
          <div className="bg-[rgba(26,33,56,0.7)] backdrop-blur-sm rounded-xl p-6 hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-2 text-[#00B4D8] font-bold mb-2">
              <ClipboardDocumentListIcon className="w-5 h-5" />
              <h3 className="text-lg">Empleado digital de operaciones</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Automatiza confirmaciones, seguimientos, alertas y actualizaciones en sistemas internos. Reduce tareas manuales y mejora la eficiencia.
            </p>
            <div className="flex justify-between text-sm text-[#00B4D8] font-semibold">
              <div>
                <p>75%</p>
                <p className="text-gray-400">Eficiencia</p>
              </div>
              <div>
                <p>90%</p>
                <p className="text-gray-400">Reducción de errores</p>
              </div>
              <div>
                <p>100%</p>
                <p className="text-gray-400">Integración</p>
              </div>
            </div>
          </div>

          {/* Servicio al Cliente */}
          <div className="bg-[rgba(26,33,56,0.7)] backdrop-blur-sm rounded-xl p-6 hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-2 text-[#00B4D8] font-bold mb-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <h3 className="text-lg">Empleado digital de atención al cliente</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Atiende clientes al instante, resuelve problemas, escala casos complejos y responde en múltiples idiomas sin perder la calidad humana.
            </p>
            <div className="flex justify-between text-sm text-[#00B4D8] font-semibold">
              <div>
                <p>95%</p>
                <p className="text-gray-400">Satisfacción</p>
              </div>
              <div>
                <p>&lt; 30s</p>
                <p className="text-gray-400">Tiempo de respuesta</p>
              </div>
              <div>
                <p>20+</p>
                <p className="text-gray-400">Idiomas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
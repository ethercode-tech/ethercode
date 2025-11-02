import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const preguntas = [
  {
    pregunta: "¿Qué es un empleado digital con inteligencia artificial?",
    respuesta:
      "Es un sistema inteligente que trabaja para tu empresa día y noche, automatizando tareas como atención al cliente, reservas, soporte y ventas, sin necesidad de intervención humana constante.",
  },
  {
    pregunta: "¿Qué tareas puede hacer un empleado digital?",
    respuesta:
      "Responde mensajes en WhatsApp, agenda turnos, deriva casos complejos, toma pedidos, responde dudas frecuentes, registra datos, y más. Se adapta a las necesidades de tu negocio.",
  },
  {
    pregunta: "¿Necesito saber de tecnología para usar uno?",
    respuesta:
      "No. Nosotros nos encargamos de todo. Analizamos tu caso, lo diseñamos a medida, lo conectamos con tus herramientas actuales y te acompañamos en el uso diario.",
  },
  {
    pregunta: "¿Qué tan confiables son?",
    respuesta:
      "Son más consistentes que un humano: no se enferman, no se distraen y no descansan. Siempre responden con el mismo nivel de calidad, a cualquier hora, cualquier día.",
  },
  {
    pregunta: "¿En qué rubros funcionan mejor?",
    respuesta:
      "Tiendas online, concesionarias, restaurantes, gimnasios, centros médicos, hoteles, servicios profesionales, y cualquier negocio que hable con clientes todo el tiempo.",
  },
  {
    pregunta: "¿Qué pasa si mi cliente hace una consulta muy compleja?",
    respuesta:
      "El empleado digital puede derivar automáticamente al responsable humano o tomar nota y enviar el mensaje al equipo. Siempre deja al cliente atendido, incluso en esos casos.",
  },
];

export default function FAQsIA() {
  const [abierta, setAbierta] = useState(0);

  const toggle = (i) => {
    setAbierta(abierta === i ? null : i);
  };

  return (
    <section className="bg-transparent py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primaryText dark:text-white mb-4">
          Preguntas frecuentes sobre nuestros empleados digitales
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Todo lo que necesitás saber antes de integrar IA real a tu negocio.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {preguntas.map((item, i) => (
          <div
            key={i}
            className="border-b border-gray-300 dark:border-gray-700 py-4"
          >
            <button
              className="w-full flex justify-between items-center text-left text-lg font-medium text-primaryText dark:text-white focus:outline-none"
              onClick={() => toggle(i)}
            >
              <span>{item.pregunta}</span>
              {abierta === i ? (
                <ChevronUpIcon className="w-5 h-5 text-accent" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-accent" />
              )}
            </button>
            {abierta === i && (
              <div className="mt-2 text-lg text-[#00B4D8]">
                {item.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

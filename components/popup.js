import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Para redireccionar
import adsImg from '../public/auditoriaSoftwarePopup.jpeg';

const Popup = ({ showPopup, setShowPopup, onAuditClick }) => {
  const router = useRouter(); // Inicializa router para la redirección

  useEffect(() => {
    if (!showPopup) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow || '';
    };
  }, [showPopup]);

  if (!showPopup) return null;

  const handleRedirect = () => {
    setShowPopup(false); // Cierra el popup
    router.push('/auditoria'); // Redirige a la página de contacto
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative p-6 bg-gray-800 rounded-lg shadow-xl w-11/12 sm:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto flex flex-col md:flex-row md:space-x-4">
        
        {/* Botón de cerrar */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenedor de la imagen */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={adsImg}
              layout="fill"
              objectFit="cover"
              loading="eager"
              alt="Optimización de código"
              className="rounded-lg"
              priority 
            />
          </div>
        </div>

        {/* Contenedor del contenido */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-4 text-center md:text-left">
            ¿Tienes un Sitio Web que Necesite Mejora?
          </h2>

          <p className="text-gray-300 text-sm sm:text-base mb-4 text-center md:text-left">
            Realizamos auditorías automatizadas, pruebas de rendimiento, mejoras en el código y resolución de deudas técnicas. ¡Optimiza tu sistema de forma rápida y eficiente!
          </p>

          <ul className="list-disc list-inside text-gray-300 mb-6">
            <li>Auditoría de código para identificar fallos y mejoras.</li>
            <li>Optimización de rendimiento y aplicación de buenas prácticas.</li>
            <li>Resolución automatizada de deudas técnicas.</li>
            <li>Mejoras en seguridad, escalabilidad y arquitectura.</li>
          </ul>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowPopup(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-transform transform hover:scale-105"
            >
              Cerrar
            </button>
            <button
              onClick={handleRedirect}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Sí, Auditar mi Web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

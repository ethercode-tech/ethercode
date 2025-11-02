import { useState } from "react";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(!Cookies.get("cookieConsent"));
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    functional: false,
    analytics: false,
  });

  const handleAcceptAll = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    Cookies.set("cookieConsent", "rejected", { expires: 365 });
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 w-full bg-gray-800 text-gray-100 p-4 flex flex-col md:flex-row justify-between items-center z-50">
          <div className="text-sm mb-4 md:mb-0">
            <p className="font-bold">Valoramos tu privacidad</p>
            <p>
              Usamos cookies para mejorar su experiencia de navegación, como mostrarle
              anuncios, contenidos personalizados y analizar nuestro tráfico. No se utilizarán las cookies
              para recoger información de carácter personal.
            </p><br/>
            <p>
              Al hacer clic en ACEPTAR todo, usted da consentimiento a nuestro uso de cookies y tratamiento de
              datos. Usted puede permitir su uso o rechazarlo, también puede actualizar su información.
            </p><br/>
          </div>
          <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-2">
            <button
              onClick={handleCustomize}
              className="px-4 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white text-sm h-12 w-full md:w-auto"
            >
              Personalizar
            </button>
            <button
              onClick={handleRejectAll}
              className="px-4 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white text-sm h-12 w-full md:w-auto"
            >
              Rechazar todo
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white text-sm h-12 w-full md:w-auto"
            >
              Aceptar todo
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xl p-6 z-60"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-6 dark:text-white text-center">Personalizar las preferencias de consentimiento</h2>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              <p className="text-sm col-span-2 dark:text-gray-300">
                Las cookies necesarias son cruciales para las funciones básicas del sitio web y el sitio web no
                funcionará de la forma prevista sin ellas. Estas cookies no almacenan ningún dato de identificación personal.
              </p>
              <p className="text-green-600 font-bold justify-self-end">Siempre activas</p>
            </div>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              <p className="text-sm col-span-2 dark:text-gray-300">
                Las cookies funcionales ayudan a realizar ciertas funcionalidades, como compartir el contenido del sitio
                web en plataformas de redes sociales, recopilar comentarios y otras características de terceros.
              </p>
              <label className="relative inline-flex items-center cursor-pointer justify-self-end">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={() => togglePreference("functional")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              <p className="text-sm col-span-2 dark:text-gray-300">
                Las cookies analíticas se utilizan para entender cómo los visitantes interactúan con el sitio web.
              </p>
              <label className="relative inline-flex items-center cursor-pointer justify-self-end">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => togglePreference("analytics")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 border border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white text-sm h-12 w-full md:w-auto"
              >
                Rechazar todo
              </button>
              <button
                onClick={() => {
                  Cookies.set("cookieConsent", JSON.stringify(preferences), { expires: 365 });
                  setShowModal(false);
                  setShowBanner(false);
                }}
                className="px-4 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white text-sm h-12 w-full md:w-auto"
              >
                Guardar mis preferencias
              </button>
              <button
                onClick={() => {
                  setPreferences({ functional: true, analytics: true });
                  Cookies.set("cookieConsent", "accepted", { expires: 365 });
                  setShowModal(false);
                  setShowBanner(false);
                }}
                className="px-4 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white text-sm h-12 w-full md:w-auto"
              >
                Aceptar todo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;

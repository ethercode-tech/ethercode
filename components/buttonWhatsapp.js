import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { event as gaEvent } from 'nextjs-google-analytics';


const ChatWhatsapp = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const videoRef = useRef(null);

  const num = "+5493884486112";
  const message = "Hola!%20quiero%20mi%20agente%20IA%20del%20video%20";
  const url = `https://api.whatsapp.com/send?phone=${num}&text=${message}`;

  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
    // Intento inicial de reproducción con sonido dentro del gesto del usuario.
    // Damos un pequeño delay para que el video se monte.
    setTimeout(() => {
      const el = videoRef.current;
      if (!el) return;
      el.muted = false;
      el.currentTime = 0;
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Si falla, pediremos gesto explícito
          setNeedsUserGesture(true);
        });
      }
    }, 50);
  };

  const closeModal = () => {
    setIsOpen(false);
    setNeedsUserGesture(false);
  };

  const openWhatsApp = () => {
    window.open(url, "_blank");
  };

  // Tooltip timers
  useEffect(() => {
    const t1 = setTimeout(() => setShowTooltip(true), 8000);
    const t2 = setTimeout(() => setShowTooltip(false), 18000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  
  // Manejo de scroll/ESC + pausa al cerrar
  useEffect(() => {
    const el = videoRef.current;
    
    if (isOpen) {
      gaEvent('cta_agenteIA_video_whatsapp_click', { category: 'CTA', label: 'Agente IA - Video whatsapp' });
      document.body.style.overflow = "hidden";
      const onKeyDown = (e) => {
        if (e.key === "Escape") closeModal();
      };
      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = "";
      };
    } else {
      if (el) el.pause();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Handler por si hizo falta gesto del usuario
  const playWithSoundNow = async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      el.muted = false;
      el.currentTime = 0;
      await el.play();
      setNeedsUserGesture(false);
    } catch (e) {
      // Si sigue fallando, dejamos los controles visibles
      // y el usuario puede darle play manualmente.
    }
  };

  return (
    <>
      {/* Botón flotante WhatsApp */}
      <div className="fixed right-5 bottom-10 z-50">
        <button
          onClick={openModal}
          className="flex items-center justify-center transition duration-300 rounded-full shadow-lg w-14 h-14 border focus:outline-none text-white bg-[#25D366] hover:opacity-90"
          aria-label="Chatea con nuestra IA"
        >
          <svg
            className="w-6 h-6 text-white font-bold"
            fill="white"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>WhatsApp</title>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>

        {showTooltip && (
          <div className="absolute bottom-2 left-[-270px] p-3 text-black bg-white rounded-lg shadow-lg w-[250px] text-center">
            ¿En qué te podemos ayudar?
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          aria-label="Video de presentación y contacto por WhatsApp"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Contenedor del modal */}
          <div className="relative z-[61] w-full max-w-4xl mx-4">
            {/* Marco 16:9 con el video 9:16 ajustado */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black aspect-[16/9] z-0">
              {/* Video */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain"
                src="/video/agenteAli.mp4"
                playsInline
                // SIN muted → queremos con sonido
                // autoPlay lo intentamos desde openModal con gesture
                preload="metadata"
                controls
              />

              {/* Overlays para tapar bordes y watermark (ajusta % si hace falta) */}
              <div className="absolute bottom-0 right-0 w-[15%] h-[15%] bg-black z-10" />

              {/* Overlay botón si el navegador bloqueó autoplay con sonido */}
              {needsUserGesture && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
                  <button
                    onClick={playWithSoundNow}
                    className="px-4 py-2 rounded-full bg-white text-black shadow"
                    title="Reproducir con sonido"
                  >
                    ▶ Reproducir con sonido
                  </button>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white shadow hover:opacity-90"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>

              <button
                onClick={closeModal}
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-black shadow hover:bg-gray-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWhatsapp;

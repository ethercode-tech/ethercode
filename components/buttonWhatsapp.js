// components/buttonWhatsapp.jsx
// Burbuja WhatsApp — tooltip fijo y limpio, sin distorsión

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { trackEvent, GA_EVENTS } from "../lib/ga";
import { motion, useReducedMotion } from "framer-motion";

const WAPP_NUMBER = "+5493884486112";
const BASE_MESSAGE =
  "Hola ÉtherCode! Quiero mi Empleado Digital y me gustaría una propuesta rápida 🚀";

function buildWaUrl(extra = "", origin = "") {
  const msg = extra ? `${BASE_MESSAGE}\n\nNecesito: ${extra}` : BASE_MESSAGE;
  const q = encodeURIComponent(`${msg}`);
  return `https://api.whatsapp.com/send?phone=${encodeURIComponent(
    WAPP_NUMBER
  )}&text=${q}`;
}

export default function ChatWhatsapp() {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t1 = setTimeout(() => setShowTooltip(true), 7000);
    const t2 = setTimeout(() => setShowTooltip(false), 16000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const origin = `${router?.pathname || "/"}${router?.asPath || ""}`;

  const openWA = (extra = "") => {
    const href = buildWaUrl(extra, origin);
    trackEvent(GA_EVENTS.CTA_WHATSAPP_CLICK, {
      event_category: "CTA",
      event_label: extra ? `QuickReply: ${extra}` : "Bubble click",
    });
    window.open(href, "_blank");
  };

  return (
    <>
      {/* Aura sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-3 bottom-3 z-40 w-40 h-40 rounded-full blur-3xl opacity-30"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, rgba(0,245,212,.35), rgba(199,125,255,.25), rgba(10,17,40,.0))",
        }}
      />

      {/* Contenedor burbuja */}
      <div className="fixed right-5 bottom-6 z-50">
        {/* Tooltip FIX: fijo al viewport, sin clases animate personalizadas */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: reduceMotion ? 0 : [0, -3, 0],
              scale: 1,
            }}
            transition={{
              duration: reduceMotion ? 0.2 : 2.2,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="fixed right-[92px] bottom-[88px] max-w-[260px] select-none text-[13px]
                       rounded-2xl px-3 py-2 text-black bg-white shadow-lg border border-black/5
                       pointer-events-none"
            style={{ zIndex: 60 }}
          >
            ¿Te ayudo por WhatsApp?
            <div
              className="absolute -right-1.5 bottom-2 w-3 h-3 rotate-45 bg-white border-r border-b border-black/5"
              aria-hidden
            />
          </motion.div>
        )}

        {/* Botón principal */}
        <button
          onClick={() => {
            setShowPanel((v) => !v);
            trackEvent(GA_EVENTS.CTA_WHATSAPP_BUBBLE_TOGGLE, {
              event_category: "CTA",
              event_label: "Toggle panel",
            });
          }}
          aria-label="Chatear por WhatsApp"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl
                     border border-white/10 bg-[#25D366]
                     hover:brightness-105 active:scale-[0.98] transition"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
          </svg>
          <span
            className="pointer-events-none absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-100 transition"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(37,211,102,.6), transparent 60%)",
            }}
          />
        </button>

        {/* Panel desplegable */}
        {showPanel && (
          <div
            role="dialog"
            aria-label="Asistencia por WhatsApp"
            className="absolute right-0 bottom-16 w-[290px] p-4 rounded-2xl
                       bg-[rgba(10,17,40,0.75)] backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <h4 className="text-white font-semibold text-sm">Hablemos ahora 👋</h4>
            <p className="text-white/70 text-xs mt-1">
              Respuesta en minutos. Activá tu{" "}
              <span className="text-emerald-300 font-medium">Empleado Digital</span> sin vueltas.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2">
              {[
                "Quiero vender más con WhatsApp",
                "Necesito atención 24/7",
                "Cotización rápida de mi web/app",
                "Integrar pagos y reservas",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => openWA(q)}
                  className="text-left text-[12px] px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:border-emerald-300/50 transition"
                >
                  {q} →
                </button>
              ))}
            </div>

            <button
              onClick={() => openWA("")}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2
                         bg-gradient-to-r from-[#00F5D4] via-[#00B4E7] to-[#C77DFF]
                         text-black font-bold shadow-2xl hover:opacity-95 active:scale-[0.99] transition"
            >
              Abrir WhatsApp
            </button>

            <div className="mt-2 text-[11px] text-white/60">
              Sin bots genéricos. Resolvemos tu caso real.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

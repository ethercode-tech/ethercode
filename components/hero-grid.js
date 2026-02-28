import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { trackEvent, GA_EVENTS } from "../lib/ga";
import Container from "./container";

// Cargar modal solo si se usa (reduce JS inicial + LCP)
const EtherCodeAssistantModal = dynamic(
  () => import("../components/EtherCodeAssistantModal"),
  { ssr: false }
);

// Copy optimizado: pérdida + urgencia
const BULLETS = [
  "Si tardás en responder, el cliente se va con otro",
  "El asistente responde ya, califica y ordena el lead",
  "Vos solo entrás a cerrar, no a remar chats",
];

export default function HeroGrid() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenAssistant = useCallback(() => {
    trackEvent(GA_EVENTS.CTA_CLICK, {
      event_category: "engagement",
      event_label: "Abrir demo (modal asistente)",
    });
    setIsOpen(true);
  }, []);

  const handleWhatsApp = useCallback(() => {
    trackEvent(GA_EVENTS.CTA_CLICK, {
      event_category: "engagement",
      event_label: "WhatsApp (Hero)",
    });
  }, []);

  const jsonMicro = useMemo(
    () => ({
      badge: "Menos chats perdidos, más ventas cerradas",
      titleA: "Dejá de perder",
      titleB: "clientes por demora",
      sub:
        "La mayoría de las ventas se pierden por una cosa simple: responder tarde. Tu asistente atiende al instante, guía al cliente y te deja el contacto listo para cerrar.",
    }),
    []
  );

  return (
    <section
      className="relative w-full bg-transparent pt-24 sm:pt-28 pb-12 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 20%, rgba(63,140,255,.20), transparent 55%), radial-gradient(900px 520px at 20% 70%, rgba(0,245,212,.14), transparent 55%), radial-gradient(900px 520px at 80% 75%, rgba(199,125,255,.12), transparent 55%)",
      }}
    >
      {/* Decoración muy liviana */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/10" />
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* LEFT */}
        <div className="flex flex-col items-start text-left">
          {/* badge */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>{jsonMicro.badge}</span>
          </div>

          {/* H1 */}
          <h1 className="font-extrabold leading-tight tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-4 max-w-2xl">
            {jsonMicro.titleA}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300">
              {jsonMicro.titleB}
            </span>
          </h1>

          {/* Subcopy */}
          <p className="mb-6 text-base sm:text-lg lg:text-xl text-white/85 max-w-xl">
            {jsonMicro.sub}
          </p>

          {/* bullets */}
          <ul className="mb-7 space-y-2 text-sm sm:text-base text-white/75">
            {BULLETS.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-1 grid w-full max-w-2xl grid-cols-1 gap-4 sm:auto-cols-max sm:grid-flow-col">
            <Link
              href="/asistentes"
              onClick={() =>
                trackEvent(GA_EVENTS.CTA_CLICK, {
                  event_category: "engagement",
                  event_label: "Ver como funciona (asistentes)",
                })
              }
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[52px] text-white
              bg-white/10 border border-white/20 ring-1 ring-white/10
              shadow-lg shadow-black/10 hover:bg-white/20 active:bg-white/25 transition"
            >
              Ver el sistema en acción
            </Link>

            <button
              type="button"
              onClick={handleOpenAssistant}
              aria-label="Probar demo del asistente"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[52px]
              text-white bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/25 to-indigo-500/25
              border border-white/20 ring-1 ring-white/30 shadow-lg shadow-black/10 transition
              hover:from-cyan-500/35 hover:via-fuchsia-500/35 hover:to-indigo-500/35 hover:ring-white/40 active:scale-[0.99]"
            >
              Probar y ver cómo responde
            </button>

            <a
              href="https://wa.me/5493884486112?text=Hola!%20Estoy%20perdiendo%20consultas%20por%20demora.%20Quiero%20un%20asistente%20que%20atienda%20al%20instante.%20%C2%BFC%C3%B3mo%20funciona%20y%20cu%C3%A1nto%20sale%3F"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-6 py-3.5 min-h-[52px]
              text-white bg-white/5 border border-white/15 hover:bg-white/10 transition"
            >
              Hablar por WhatsApp
            </a>
          </div>

          {/* micro confianza */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/70">
            {[
              "Implementación rápida, sin fricción",
              "WhatsApp + Web + Instagram",
              "Entrenado con tu info real, no genérico",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 inline-flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="relative mx-auto max-w-md rounded-3xl p-5 border border-white/10 bg-white/5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-white/75">Asistente ÉtherCode</div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-300/80">Responde en el momento</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="text-xs text-white/60">El problema</div>
                <div className="mt-1 text-sm text-white/85">
                  Cuando un cliente pregunta y nadie responde, no espera. Se va y compra en otro lado.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="text-xs text-white/60">La solución</div>
                <div className="mt-1 text-sm text-white/85">
                  El asistente contesta, guía y califica al cliente. Vos recibís el lead ordenado y con intención clara.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="text-xs text-white/60">Preguntas típicas</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Precios", "Servicios", "Horarios", "Reservas", "Seguimiento"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80"
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300">
                        {t}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-white/60">
              <span>Personalizado a tu rubro</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                Soporte incluido
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* MODAL */}
      {isOpen ? (
        <EtherCodeAssistantModal open={isOpen} onClose={() => setIsOpen(false)} />
      ) : null}
    </section>
  );
}
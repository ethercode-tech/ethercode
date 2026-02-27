'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent, GA_EVENTS } from "../lib/ga";

export default function Gracias() {
  const router = useRouter();

  // countdown visible (15s)
  const [secondsLeft, setSecondsLeft] = useState(15);

  // “no hizo nada” = sin interacción del usuario
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    const markActivity = () => {
      lastActivityRef.current = Date.now();
      // Si el user vuelve a interactuar, reiniciamos el contador para que tenga tiempo
      setSecondsLeft(15);
    };

    // Eventos que cuentan como actividad real
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "pointerdown"];
    events.forEach((ev) => window.addEventListener(ev, markActivity, { passive: true }));

    const interval = setInterval(() => {
      const idleMs = Date.now() - lastActivityRef.current;
      const left = Math.max(0, 15 - Math.floor(idleMs / 1000));
      setSecondsLeft(left);

      if (left <= 0) {
        router.push("/");
      }
    }, 250);

    return () => {
      clearInterval(interval);
      events.forEach((ev) => window.removeEventListener(ev, markActivity));
    };
  }, [router]);

  return (
    <main className="relative min-h-[85vh] overflow-hidden px-6 py-16 text-white">
      {/* Fondo suave */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 25%, rgba(0,180,216,0.18), rgba(99,102,241,0.10) 45%, rgba(10,17,40,0.88) 78%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(65% 55% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(65% 55% at 50% 30%, black, transparent)",
        }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center text-center">
          {/* Robot + gears */}
          <div className="relative mb-8 mt-4">
            {/* Halo */}
            <div className="absolute -inset-8 rounded-full blur-2xl opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(0,180,216,0.35),rgba(99,102,241,0.25),transparent_60%)]" />

            {/* Robot core */}
            <div className="relative w-[210px] h-[210px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
              {/* Header */}
              <div className="absolute left-1/2 top-5 -translate-x-1/2 h-3 w-28 rounded-full bg-white/10" />

              {/* Eyes */}
              <div className="absolute left-1/2 top-[70px] -translate-x-1/2 flex gap-5">
                <div className="h-10 w-10 rounded-2xl bg-black/35 border border-white/10 grid place-items-center">
                  <div className="h-3 w-3 rounded-full bg-[#00B4D8] animate-pulse" />
                </div>
                <div className="h-10 w-10 rounded-2xl bg-black/35 border border-white/10 grid place-items-center">
                  <div className="h-3 w-3 rounded-full bg-[#00B4D8] animate-pulse" />
                </div>
              </div>

              {/* Mouth / Status */}
              <div className="absolute left-1/2 top-[130px] -translate-x-1/2 w-32 h-9 rounded-xl border border-white/10 bg-black/25 grid place-items-center">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-white/80">Procesando consulta</span>
                </div>
              </div>

              {/* Antenna */}
              <div className="absolute left-1/2 -top-6 -translate-x-1/2">
                <div className="h-8 w-[2px] bg-white/20 mx-auto" />
                <div className="h-3 w-3 rounded-full bg-[#00B4D8] shadow-[0_0_35px_rgba(0,180,216,0.7)]" />
              </div>

              {/* Gears */}
              <div className="absolute -right-7 bottom-6 h-16 w-16 rounded-full border border-white/10 bg-white/5 grid place-items-center animate-spin [animation-duration:2.6s]">
                <GearSVG />
              </div>
              <div className="absolute -left-7 bottom-10 h-12 w-12 rounded-full border border-white/10 bg-white/5 grid place-items-center animate-spin [animation-duration:3.4s] [animation-direction:reverse]">
                <GearSVG small />
              </div>

              {/* Loading line */}
              <div className="absolute left-1/2 bottom-5 -translate-x-1/2 w-40 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-1/3 bg-white/40 animate-[movebar_1.15s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold">
            ¡Listo! <span className="text-[#00B4D8]">Recibimos tu consulta</span>
          </h1>

          <p className="mt-4 text-white/75 text-base sm:text-lg max-w-xl">
            Tu empleado digital ya está “en modo armado”. En breve te contactamos por WhatsApp o llamada.
          </p>

          <div className="mt-6 text-sm text-white/60">
            Si no hacés nada, volvemos al inicio en{" "}
            <span className="text-white font-semibold">{secondsLeft}s</span>.
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/5493884486112?text=Hola%20EtherCode%2C%20acabo%20de%20enviar%20una%20consulta%20desde%20la%20web."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(GA_EVENTS.OUTBOUND_CLICK, { event_category: "CTA", event_label: "Gracias - Ir a WhatsApp" })}
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-white text-black font-semibold hover:opacity-95"
            >
              Ir a WhatsApp
            </a>

            <a
              href="/"
              onClick={() => trackEvent(GA_EVENTS.NAV_LINK_CLICK, { event_category: "Navegación", event_label: "Gracias - Volver al inicio" })}
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 border border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
            >
              Volver al inicio
            </a>
          </div>

          <div className="mt-6 text-xs text-white/50">
            Tip: si no te respondemos en 10 minutos, escribinos directo por WhatsApp y te priorizamos.
          </div>
        </div>
      </div>

      {/* Keyframes inline */}
      <style jsx>{`
        @keyframes movebar {
          0% { transform: translateX(-120%); opacity: 0.35; }
          40% { opacity: 0.9; }
          100% { transform: translateX(320%); opacity: 0.35; }
        }
      `}</style>
    </main>
  );
}

function GearSVG({ small = false }) {
  const size = small ? 22 : 28;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="1.6"
      />
      <path
        d="M19.4 15a7.96 7.96 0 0 0 .1-1l2-1.2-2-3.5-2.3.6a7.4 7.4 0 0 0-1.6-1l-.3-2.4H9.7l-.3 2.4c-.6.3-1.1.6-1.6 1l-2.3-.6-2 3.5 2 1.2a7.96 7.96 0 0 0 .1 1 7.96 7.96 0 0 0-.1 1l-2 1.2 2 3.5 2.3-.6c.5.4 1 .7 1.6 1l.3 2.4h4.6l.3-2.4c.6-.3 1.1-.6 1.6-1l2.3.6 2-3.5-2-1.2c.1-.3.1-.7.1-1Z"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
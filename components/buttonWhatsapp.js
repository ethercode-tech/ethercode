"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { trackEvent, GA_EVENTS } from "../lib/ga";
import { motion, useReducedMotion } from "framer-motion";

const WAPP_NUMBER = "+5493884486112";
const TOOLTIP_SEEN_KEY = "ethercode_wa_tooltip_seen_v1";
const BASE_MESSAGE =
  "Hola EtherCode! Quiero un Empleado Digital y me gustaria una propuesta rapida.";

function buildWaUrl(extra = "") {
  const msg = extra ? `${BASE_MESSAGE}\n\nNecesito: ${extra}` : BASE_MESSAGE;
  const q = encodeURIComponent(msg);
  return `https://api.whatsapp.com/send?phone=${encodeURIComponent(WAPP_NUMBER)}&text=${q}`;
}

export default function ChatWhatsapp() {
  const router = useRouter();
  const panelRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const reduceMotion = useReducedMotion();

  const origin = useMemo(
    () => `${router?.pathname || "/"}${router?.asPath || ""}`,
    [router?.pathname, router?.asPath]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = window.sessionStorage.getItem(TOOLTIP_SEEN_KEY) === "1";
    if (seen) return;

    const start = window.setTimeout(() => setShowTooltip(true), 3500);
    const hide = window.setTimeout(() => {
      setShowTooltip(false);
      window.sessionStorage.setItem(TOOLTIP_SEEN_KEY, "1");
    }, 9000);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (!showPanel) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setShowPanel(false);
    };

    const onPointerDown = (event) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target)) setShowPanel(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [showPanel]);

  useEffect(() => {
    const closePanel = () => setShowPanel(false);
    router.events.on("routeChangeStart", closePanel);
    return () => router.events.off("routeChangeStart", closePanel);
  }, [router.events]);

  const openWA = (extra = "") => {
    const href = buildWaUrl(extra);

    trackEvent(GA_EVENTS.CTA_WHATSAPP_CLICK, {
      event_category: "CTA",
      event_label: extra ? `QuickReply: ${extra}` : "Widget open",
      source_path: origin,
    });

    setShowTooltip(false);
    setShowPanel(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed right-4 bottom-5 sm:right-5 sm:bottom-6 z-40" ref={panelRef}>
      {showTooltip && !showPanel && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.2 }}
          className="absolute right-0 bottom-14 w-[220px] rounded-xl border border-black/10 bg-white px-3 py-2 text-[12px] text-black shadow-lg"
        >
          Escribinos por WhatsApp y te guiamos en minutos.
        </motion.div>
      )}

      {showPanel && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.2 }}
          role="dialog"
          aria-label="Asistencia por WhatsApp"
          className="absolute right-0 bottom-14 w-[250px] rounded-2xl border border-white/15 bg-[#0A1128]/95 p-3 shadow-2xl"
        >
          <p className="text-[13px] font-semibold text-white">Soporte rapido</p>
          <p className="mt-1 text-[11px] text-white/70">Contanos tu caso y te respondemos por WhatsApp.</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              onClick={() => openWA("Quiero vender mas con WhatsApp")}
              className="rounded-full border border-white/20 bg-white/5 px-2 py-1 text-[10px] text-white/85 hover:bg-white/10"
            >
              Ventas
            </button>
            <button
              onClick={() => openWA("Necesito automatizar la atencion")}
              className="rounded-full border border-white/20 bg-white/5 px-2 py-1 text-[10px] text-white/85 hover:bg-white/10"
            >
              Atencion
            </button>
          </div>

          <button
            onClick={() => openWA("")}
            className="mt-3 w-full rounded-full bg-[#25D366] px-3 py-2 text-[13px] font-semibold text-[#062014] hover:brightness-105"
          >
            Abrir WhatsApp
          </button>
        </motion.div>
      )}

      <button
        onClick={() => {
          setShowPanel((prev) => !prev);
          setShowTooltip(false);
          trackEvent(GA_EVENTS.CTA_WHATSAPP_BUBBLE_TOGGLE, {
            event_category: "CTA",
            event_label: "Toggle panel",
            source_path: origin,
          });
        }}
        aria-label="Abrir asistencia por WhatsApp"
        className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-[#25D366] text-white shadow-lg transition hover:scale-[1.03]"
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
      </button>
    </div>
  );
}

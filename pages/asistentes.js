"use client";

import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  BoltIcon,
  ChartBarSquareIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { trackEvent, GA_EVENTS } from "../lib/ga";

const NavbarIndex = dynamic(() => import("../components/NavbarIndex"), { ssr: true });
const CasosUso = dynamic(() => import("../components/casosUso"), { ssr: true, loading: () => null });
const FAQsIA = dynamic(() => import("../components/faqIa"), { ssr: true, loading: () => null });
const CTAFinal = dynamic(() => import("../components/ctaFinalPageAsistentes"), { ssr: true, loading: () => null });
const ChatWhatsapp = dynamic(() => import("../components/buttonWhatsapp"), { ssr: false });
const ButtonTop = dynamic(() => import("../components/buttonTop"), { ssr: false });

const CANONICAL_URL = "https://ethercode.com.ar/asistentes";
const OG_IMAGE_ABS = "https://ethercode.com.ar/img-logo/logonombre.png";

const heroWords = ["ventas", "soporte", "operaciones", "seguimiento"];

const workflow = [
  {
    title: "Mapeo de flujo critico",
    text: "Detectamos una tarea que hoy te consume horas y la convertimos en automatizacion real.",
  },
  {
    title: "Implementacion con tu stack",
    text: "Conectamos WhatsApp, CRM, agenda o sistema interno sin romper tu operacion diaria.",
  },
  {
    title: "Entrenamiento por contexto",
    text: "El empleado digital aprende tu tono, reglas y prioridades para responder como tu equipo.",
  },
  {
    title: "Optimizacion semanal",
    text: "Medimos, iteramos y escalamos solo lo que mejora conversion, tiempos y experiencia cliente.",
  },
];

const bentoCards = [
  {
    icon: BoltIcon,
    title: "Respuesta instantanea",
    body: "Atiende en segundos y evita perder oportunidades por demora.",
    stat: "< 60s",
    note: "primera respuesta",
  },
  {
    icon: CpuChipIcon,
    title: "Integracion modular",
    body: "Se conecta a APIs, CRM y herramientas actuales con control por etapas.",
    stat: "API + WA + CRM",
    note: "stack conectado",
  },
  {
    icon: ShieldCheckIcon,
    title: "Control y auditoria",
    body: "Todo queda registrado: cada respuesta, cada decision y cada traspaso a humano.",
    stat: "100% trazable",
    note: "logs exportables",
  },
  {
    icon: ChartBarSquareIcon,
    title: "Escala con metricas",
    body: "No se mueve por intuicion: ajustamos segun conversion, CSAT y costo operativo.",
    stat: "ROI visible",
    note: "iteracion continua",
  },
];

const logos = [
  { src: "/logos/n8n.png", alt: "n8n" },
  { src: "/logos/make.png", alt: "Make" },
  { src: "/logos/flowise.png", alt: "Flowise" },
  { src: "/logos/highLevel.jpeg", alt: "HighLevel" },
];

function FloatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroWords.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] min-w-[11ch] overflow-hidden align-bottom">
      {heroWords.map((word, i) => (
        <motion.span
          key={word}
          initial={false}
          animate={{ y: i === index ? 0 : i < index ? -42 : 42, opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute left-0 top-0 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function PageEmpleadosDigitales() {
  const handleDemoClick = useCallback((label) => {
    trackEvent(GA_EVENTS.CTA_EMPLEADO_DIGITAL_CLICK, {
      event_category: "CTA",
      event_label: label,
    });

    if (typeof window !== "undefined") {
      window.open(
        "https://wa.me/5493884486112?text=Hola%20EtherCode!%20Quiero%20implementar%20un%20empleado%20digital%20en%20mi%20negocio.",
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, []);

  const links = useMemo(
    () => [
      { name: "Inicio", href: "#inicio", type: "anchor" },
      { name: "Metodo", href: "#metodo", type: "anchor" },
      { name: "Arquitectura", href: "#servicios", type: "anchor" },
      { name: "Resultados", href: "#casos", type: "anchor" },
      { name: "FAQ", href: "#faq", type: "anchor" },
      { name: "Contacto", href: "#contacto", type: "anchor" },
    ],
    []
  );

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Empleados Digitales con IA para negocios | EtherCode",
        description:
          "EtherCode desarrolla empleados digitales para automatizar tareas, mejorar atencion al cliente y aumentar eficiencia empresarial con IA.",
        url: CANONICAL_URL,
        inLanguage: "es-AR",
        about: [
          "automatizacion empresarial con IA",
          "empleados digitales para ventas",
          "asistentes de atencion al cliente",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Diseño e implementación de empleados digitales con IA",
        provider: {
          "@type": "Organization",
          name: "EtherCode",
          url: "https://ethercode.com.ar",
          logo: { "@type": "ImageObject", url: OG_IMAGE_ABS },
        },
        areaServed: ["Argentina", "Latinoamérica"],
        audience: { "@type": "Audience", audienceType: "Empresas y pymes" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cómo implementar un empleado digital sin frenar la operación?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Se implementa por fases: primero un flujo crítico, luego integración con sistemas y por último optimización por métricas.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué tareas puede automatizar un empleado digital?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Atención por WhatsApp, calificación de leads, seguimiento comercial, recordatorios operativos y derivación inteligente a humano.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cómo se mide el rendimiento de un empleado digital?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Con métricas de tiempo de respuesta, conversión, satisfacción de cliente y reducción de tareas manuales, con auditoría de interacciones.",
            },
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>Empleados Digitales con IA para negocios | EtherCode</title>
        <meta
          name="description"
          content="Contrata empleados digitales impulsados por IA para automatizar tareas, mejorar la atencion al cliente y escalar tu negocio dia y noche."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:title" content="Empleados Digitales con IA para negocios | EtherCode" />
        <meta
          property="og:description"
          content="Soluciones con IA para automatizar ventas, operaciones y atencion al cliente. Empleados digitales personalizados para tu empresa."
        />
        <meta property="og:image" content={OG_IMAGE_ABS} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:locale" content="es_AR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE_ABS} />

        <link rel="canonical" href={CANONICAL_URL} />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />

        {jsonLd.map((schema, index) => (
          <script
            key={`asistentes-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <div className="min-h-screen bg-[#0A0F2C] text-white">
        <ChatWhatsapp />
        <ButtonTop />

        <div id="inicio">
          <NavbarIndex links={links} />
        </div>

        <main>
          <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pt-32 md:pb-24">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(65%_65%_at_50%_40%,_black,_transparent)]" />
              <div className="absolute -top-[36vmin] left-1/2 h-[100vmax] w-[100vmax] -translate-x-1/2 rounded-full bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] opacity-30 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
              <div className="absolute right-[-22vmax] top-[15vmax] h-[42vmax] w-[42vmax] rounded-full bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.18),_rgba(199,125,255,.14),_transparent_65%)] blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-200">
                  <SparklesIcon className="h-3.5 w-3.5" />
                  Plataforma de empleados digitales
                </div>

                <h1 className="text-4xl font-black leading-[1.03] sm:text-5xl md:text-6xl">
                  Tu proximo equipo para
                  <br />
                  <FloatingWord />
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  Disenamos empleados digitales que atienden, venden y ejecutan procesos sin pausas.
                  Empezas con un flujo clave, medimos impacto y escalamos solo lo que agrega valor.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => handleDemoClick("Asistentes - Hero - Quiero demo")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-indigo-300 px-6 py-3 font-semibold text-black shadow-xl transition hover:brightness-105"
                  >
                    Quiero una demo
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </button>
                  <a
                    href="#metodo"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white no-underline transition hover:bg-white/10 hover:no-underline"
                  >
                    Ver como funciona
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-white/75">
                  {[
                    "Onboarding en dias",
                    "Integracion WA/Web/CRM",
                    "Fallback humano",
                    "Logs y auditoria",
                  ].map((badge) => (
                    <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="grid gap-3 sm:grid-cols-2"
              >
                {bentoCards.map((card, index) => (
                  <motion.article
                    key={card.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                    className="rounded-2xl border border-white/10 bg-[#0f1a3d]/80 p-4 backdrop-blur"
                  >
                    <div className="flex items-center gap-2">
                      <card.icon className="h-5 w-5 text-cyan-300" />
                      <h2 className="text-base font-semibold text-white">{card.title}</h2>
                    </div>
                    <p className="mt-2 text-sm text-white/75">{card.body}</p>
                    <div className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-3 py-2">
                      <p className="text-sm font-bold text-cyan-100">{card.stat}</p>
                      <p className="text-[11px] text-cyan-100/70">{card.note}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>

          <section id="metodo" className="px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="mb-8 text-center"
              >
                <h2 className="text-3xl font-bold sm:text-4xl">Metodo de trabajo</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
                  El objetivo es simple: que en pocas semanas tu negocio tenga un flujo automatizado que ya muestre resultado.
                </p>
              </motion.div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {workflow.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="relative rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <span className="text-xs font-bold tracking-[0.2em] text-cyan-300/90">PASO {String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="servicios" className="px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto grid max-w-7xl gap-6 rounded-3xl border border-white/10 bg-[#0f1734]/70 p-5 backdrop-blur md:grid-cols-[1.2fr,0.8fr] md:p-8">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <h2 className="text-2xl font-bold text-white sm:text-3xl">Arquitectura lista para crecer</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                  No armamos un bot aislado. Creamos una capa operativa que conecta canales, reglas de negocio y equipo humano.
                  Primero resolvemos un caso concreto, luego replicamos el sistema en nuevas areas.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Orquestacion de tareas",
                    "Memoria de conversacion",
                    "Desvio inteligente a humano",
                    "Tablero de rendimiento",
                  ].map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-semibold text-white">Integraciones habituales</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {logos.map((logo) => (
                    <div key={logo.alt} className="grid place-items-center rounded-xl border border-white/10 bg-[#0a1026] p-3">
                      <Image src={logo.src} alt={logo.alt} width={100} height={34} className="h-7 w-auto object-contain" />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-white/65">
                  Tambien integramos plataformas propietarias via API o webhooks.
                </p>
              </motion.div>
            </div>
          </section>

          <div id="casos">
            <CasosUso />
          </div>

          <div id="faq">
            <FAQsIA />
          </div>

          <div id="contacto">
            <CTAFinal />
          </div>
        </main>
      </div>
    </>
  );
}

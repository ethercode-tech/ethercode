"use client";

import Head from "next/head";
import { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { trackEvent, GA_EVENTS } from "../lib/ga";

const NavbarIndex = dynamic(() => import("../components/NavbarIndex"), { ssr: true });
const HeroAutomatizaciones = dynamic(() => import("../components/heroAutomatizaciones"), { ssr: true, loading: () => null });
const IntegracionesIA = dynamic(() => import("../components/integracionesIA"), { ssr: true, loading: () => null });
const CasosUso = dynamic(() => import("../components/casosUso"), { ssr: true, loading: () => null });
const FAQsIA = dynamic(() => import("../components/faqIa"), { ssr: true, loading: () => null });
const CTAFinal = dynamic(() => import("../components/ctaFinalPageAsistentes"), { ssr: true, loading: () => null });

const CANONICAL_URL = "https://ethercode.com.ar/asistentes";
const OG_IMAGE_ABS = "https://ethercode.com.ar/img-logo/logonombre.png";

export default function PageEmpleadosDigitales() {
  const handleCTAClick = useCallback(() => {
    trackEvent(GA_EVENTS.CTA_EMPLEADO_DIGITAL_CLICK, {
      event_category: "CTA",
      event_label: "Empleado Digital - Empezar ahora",
    });

    if (typeof window !== "undefined") {
      window.open(
        "https://wa.me/5493884486112?text=Hola!%20Estoy%20interesado%20en%20la%20oferta%20del%20Empleado%20Digital%20🤖",
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, []);

  const links = useMemo(
    () => [
      { name: "Inicio", href: "#inicio", type: "anchor" },
      { name: "Servicios", href: "#servicios", type: "anchor" },
      { name: "Casos", href: "#casos", type: "anchor" },
      { name: "FAQ", href: "#faq", type: "anchor" },
      { name: "Contacto", href: "#contacto", type: "anchor" },
    ],
    []
  );

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Empleados Digitales con IA para negocios | ÉtherCode",
      description:
        "ÉtherCode desarrolla empleados digitales para automatizar tareas, mejorar atención al cliente y aumentar eficiencia empresarial con IA.",
      url: CANONICAL_URL,
      publisher: {
        "@type": "Organization",
        name: "ÉtherCode",
        url: "https://ethercode.com.ar",
        logo: { "@type": "ImageObject", url: OG_IMAGE_ABS },
      },
    }),
    []
  );

  return (
    <>
      <Head>
        <title>Empleados Digitales con IA para negocios | ÉtherCode</title>
        <meta
          name="description"
          content="Contratá empleados digitales impulsados por IA para automatizar tareas, mejorar la atención al cliente y escalar tu negocio día y noche."
        />
        <meta
          name="keywords"
          content="empleados digitales, automatización empresarial, bots WhatsApp, agentes inteligentes, inteligencia artificial para negocios, ÉtherCode"
        />

        <meta property="og:title" content="Empleados Digitales con IA para negocios | ÉtherCode" />
        <meta
          property="og:description"
          content="Soluciones con IA para automatizar ventas, operaciones y atención al cliente. Empleados digitales personalizados para tu empresa."
        />
        <meta property="og:image" content={OG_IMAGE_ABS} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE_ABS} />

        <link rel="canonical" href={CANONICAL_URL} />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />
        <meta name="robots" content="index, follow" />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen text-white flex flex-col justify-between bg-[#0A0F2C]">
        <div id="inicio">
          <NavbarIndex links={links} />
        </div>

        {/* IDs ancla para navegación rastreable */}
        <div id="servicios">
          <HeroAutomatizaciones />
          <IntegracionesIA />
        </div>

        <div id="casos">
          <CasosUso />
        </div>

        <div id="faq">
          <FAQsIA />
        </div>

        <div id="contacto">
          <CTAFinal onClick={handleCTAClick} />
        </div>
      </div>
    </>
  );
}
// pages/index.js
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import NavbarIndex from "../components/NavbarIndex";
import Footer from "../components/footer";

// Lazy-load componentes pesados (reduce TBT)
const HeroGrid = dynamic(() => import("../components/hero-grid"), { ssr: true, loading: () => null });
const Services = dynamic(() => import("../components/services"), { ssr: true, loading: () => null });
const UseCases = dynamic(() => import("../components/useCases"), { ssr: true, loading: () => null });
const LogoSlider = dynamic(() => import("../components/clientes/LogoSlider"), { ssr: true, loading: () => null });

// Widgets que suelen ser client-heavy: cargarlos sin SSR si usan window
const ChatWhatsapp = dynamic(() => import("../components/buttonWhatsapp"), { ssr: false });
const ButtonTop = dynamic(() => import("../components/buttonTop"), { ssr: false });
const Contact = dynamic(() => import("./contact"), { ssr: true, loading: () => null });

// Si tenés ChatBotButton y es pesado, dejalo lazy sin SSR
// const ChatBotButton = dynamic(() => import("../components/chatBotButton"), { ssr: false });

const SITE_URL = "https://ethercode.com.ar";
const OG_IMAGE = `${SITE_URL}/img-logo/logonombre.png`;

export default function Home() {
  const aiSeoQuestions = useMemo(
    () => [
      {
        q: "¿Qué es un empleado digital para una pyme?",
        a: "Es un sistema con IA entrenado para tu negocio que atiende consultas, califica oportunidades y ejecuta tareas operativas 24/7 con trazabilidad.",
        proof: "Implementación inicial en días",
      },
      {
        q: "¿Cómo automatizar WhatsApp sin perder control humano?",
        a: "Definimos reglas de escalado: la IA resuelve lo repetitivo y deriva a una persona en casos sensibles, complejos o de alto valor.",
        proof: "Fallback humano + logs de auditoría",
      },
      {
        q: "¿Cuánto tarda implementar un empleado digital?",
        a: "El primer flujo suele quedar operativo en días. Después se escala por etapas según conversiones, tiempos de respuesta y carga operativa.",
        proof: "Enfoque por flujo crítico",
      },
      {
        q: "¿Qué integra ÉtherCode además de WhatsApp?",
        a: "Integramos web, CRM, agendas y APIs para centralizar atención, ventas y operaciones en una arquitectura única.",
        proof: "Integración modular (WA + Web + CRM + API)",
      },
    ],
    []
  );

  const homeSchemas = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "ÉtherCode | Empleados Digitales con IA para Empresas",
        url: SITE_URL,
        description:
          "ÉtherCode desarrolla empleados digitales con IA para automatizar atención, ventas y operaciones 24/7.",
        inLanguage: "es-AR",
        about: ["empleados digitales", "automatización con IA", "asistentes virtuales para empresas"],
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Implementación de empleados digitales con IA",
        provider: {
          "@type": "Organization",
          name: "ÉtherCode",
          url: SITE_URL,
        },
        areaServed: ["Argentina", "Latinoamérica"],
        audience: {
          "@type": "Audience",
          audienceType: "Empresas y pymes",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: aiSeoQuestions.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
    [aiSeoQuestions]
  );

  const links = [
    { name: "Inicio", href: "#inicio" },
    { name: "Agentes IA", href: "#servicios" },
    { name: "Casos", href: "#casos" },
    { name: "Contacto", href: "#contacto" },
  ];

  const highIntentPages = [
    { href: "/soluciones/empleado-digital-pymes", label: "Empleado digital para pymes" },
    { href: "/soluciones/empleado-digital-inmobiliarias", label: "Empleado digital para inmobiliarias" },
    { href: "/soluciones/automatizar-whatsapp-clinicas", label: "Automatizar WhatsApp para clínicas" },
    { href: "/soluciones/empleado-digital-estudios-juridicos", label: "Empleado digital para estudios jurídicos" },
    { href: "/soluciones/automatizacion-whatsapp-restaurantes", label: "Automatización WhatsApp para restaurantes" },
    { href: "/soluciones/empleado-digital-concesionarias", label: "Empleado digital para concesionarias" },
  ];

  return (
    <>
      <Head>
        <title>Empleados Digitales IA, Automatización y Asistentes Virtuales | ÉtherCode</title>
        <meta
          name="description"
          content="ÉtherCode desarrolla empleados digitales con IA para automatizar atención, ventas y operaciones 24/7. Agentes conversacionales, automatizaciones y desarrollo web para empresas en Argentina y Latinoamérica."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Canonical correcto (sin barra final para consistencia) */}
        <link rel="canonical" href={SITE_URL} />

        {/* OG */}
        <meta property="og:title" content="ÉtherCode | Empleados Digitales con IA para Empresas" />
        <meta
          property="og:description"
          content="Tu negocio nunca se detiene. Creamos empleados digitales impulsados por IA que automatizan tareas, ventas y atención al cliente 24/7."
        />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content="ÉtherCode" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_AR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ÉtherCode | Empleados Digitales con IA" />
        <meta
          name="twitter:description"
          content="Automatizá tu negocio con empleados digitales IA y asistentes inteligentes. Tecnología y eficiencia 24/7."
        />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Theme */}
        <meta name="theme-color" content="#0A1128" />

        {/* GEO (opcional) */}
        <meta name="language" content="es" />
        <meta name="geo.region" content="AR-J" />
        <meta name="geo.placename" content="San Salvador de Jujuy" />

        {homeSchemas.map((schema, index) => (
          <script
            key={`home-schema-${index}`}
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <div className="min-h-screen text-primaryText flex flex-col justify-between" id="inicio">
        {/* Widgets livianos y client-only */}
        <ChatWhatsapp />
        <ButtonTop />

        {/* Navbar con anchors reales */}
        <NavbarIndex links={links} />

        <div className="flex-grow">
          {/* HERO */}
          <HeroGrid />

          {/* SERVICIOS */}
          <section id="servicios">
            <Services />
          </section>

          {/* CASOS */}
          <section id="casos">
            <UseCases />
          </section>

          <section id="preguntas-rapidas" className="relative px-4 py-20 text-white">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(65%_65%_at_50%_45%,_black,_transparent)]" />
              <div className="absolute -top-1/3 left-1/2 h-[90vmax] w-[90vmax] -translate-x-1/2 rounded-full blur-3xl opacity-25 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))]" />
            </div>

            <div className="mx-auto max-w-7xl">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Preguntas rápidas antes de <span className="text-[#00B4D8]">implementar IA</span>
                </h2>
                <p className="mt-3 text-white/75">
                  Respuestas cortas y concretas sobre cómo trabajamos y qué resultados buscamos con tu equipo digital.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {aiSeoQuestions.map((item) => (
                  <article
                    key={item.q}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{item.a}</p>
                    <div className="mt-4 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium text-cyan-200">
                      {item.proof}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="soluciones-ia" className="px-4 pb-10 text-white">
            <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Soluciones por industria (intención alta)</h2>
                  <p className="mt-1 text-sm text-white/75">
                    Páginas específicas por rubro con caso, precio base referencial y CTA directo.
                  </p>
                </div>
                <Link
                  href="/soluciones"
                  className="inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white no-underline hover:bg-white/10 hover:no-underline"
                >
                  Ver todas
                </Link>
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {highIntentPages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border border-white/10 bg-[#0a1128]/70 px-3 py-2 text-sm text-white no-underline hover:bg-[#111a3b] hover:no-underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <LogoSlider />

          {/* CONTACTO */}
          <section id="contacto">
            <Contact />
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}

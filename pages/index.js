// pages/index.js
import Head from "next/head";
import dynamic from "next/dynamic";
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
  const links = [
    { name: "Inicio", href: "#inicio" },
    { name: "Agentes IA", href: "#servicios" },
    { name: "Casos", href: "#casos" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <Head>
        <title>Empleados Digitales IA, Automatización y Asistentes Virtuales | ÉtherCode</title>
        <meta
          name="description"
          content="ÉtherCode desarrolla empleados digitales con IA para automatizar atención, ventas y operaciones 24/7. Agentes conversacionales, automatizaciones y desarrollo web para empresas en Argentina y Latinoamérica."
        />
        <meta name="robots" content="index, follow" />

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

        {/* IMPORTANTE: borré alternates inventados. Si esos dominios no existen o no están activos, te perjudican. */}
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
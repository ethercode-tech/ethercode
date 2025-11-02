import React, { useState, useEffect } from "react";
import Head from "next/head";
import NavbarIndex from "../components/NavbarIndex";
import Footer from "../components/footer";
import Contact from "./contact";
import { Element } from "react-scroll";
import HeroGrid from "../components/hero-grid";
import Services from "../components/services";
import ChatWhatsapp from "../components/buttonWhatsapp";
import ButtonTop from "../components/buttonTop";
import UseCases from "../components/useCases";
import ChatBot from "../components/chatBotButton";
import LogoSlider from "../components/clientes/LogoSlider";
import EtherCodeChat from "../components/EtherCodeChat";


const Home = () => {
  const links = [
    { name: "Inicio", href: "/" },
    { name: "Agentes IA", href: "/servicios" },
    { name: "Contacto", href: "/contact" },
    { name: "Nosotros", href: "/nosotros" },
  ];

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(true);
  
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setIsClient(true); // habilita el uso de localStorage

    if (typeof window !== "undefined") {
      const hasLoaded = localStorage.getItem("hasLoaded");

      if (hasLoaded) {
        setIsLoading(false);
        return;
      }

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setCompleted(true);
            setTimeout(() => {
              setIsLoading(false);
              localStorage.setItem("hasLoaded", "true");
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(timer);
    }
  }, []);



  const startProgress = () => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            localStorage.setItem("hasLoaded", "true");
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 20);
    setCompleted(true);
  };

  return (
    <>
      <Head>
        <title>
          Empleados Digitales con IA para Empresas | EtherCode
        </title>

        <meta
          name="description"
          content="EtherCode crea empleados digitales con inteligencia artificial para que tu negocio nunca se detenga. Atención al cliente, automatización y eficiencia 24/7."
        />
        <meta
          name="keywords"
          content="empleado digital, asistentes IA, agentes inteligentes, inteligencia artificial para empresas, automatización empresarial, chatbot whatsapp, empleados virtuales, IA para negocios, automatizar procesos, empleados IA Argentina"
        />

        <meta
          property="og:title"
          content="Empleados Digitales con IA para Empresas | EtherCode"
        />
        <meta
          property="og:description"
          content="Automatizá tu atención al cliente, ventas y operaciones con asistentes inteligentes. Tu nuevo empleado digital trabaja 24/7, sin excusas."
        />
        <meta property="og:image" content="/img-logo/EtherCodeSlogan.png" />
        <meta property="og:url" content="https://www.ethercode.com.ar" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Empleados Digitales con IA para Empresas"
        />
        <meta
          name="twitter:description"
          content="Automatizá tu negocio con asistentes IA que trabajan como empleados virtuales. Siempre disponibles, siempre eficientes."
        />
        <meta name="twitter:image" content="/img-logo/EtherCodeSlogan.png" />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="EtherCode" />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />
        <link rel="canonical" href="https://www.ethercode.com.ar" />

        {/* Preguntas SEO estilo LLM */}
        <meta
          name="search-questions"
          content="¿Qué es un empleado digital con IA? ¿Cómo automatizar tareas con inteligencia artificial? ¿Un bot puede atender mi negocio en WhatsApp? ¿Qué hace un asistente inteligente? ¿Cómo usar IA para atención al cliente? ¿Cómo vender más con inteligencia artificial?"
        />

        {/* Structured Data para motores de búsqueda y LLMs */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "EtherCode",
            "url": "https://www.ethercode.com.ar",
            "description": "EtherCode desarrolla empleados digitales con inteligencia artificial para automatizar ventas, atención al cliente y operaciones empresariales.",
            "publisher": {
              "@type": "Organization",
              "name": "EtherCode",
              "url": "https://www.ethercode.com.ar",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.ethercode.com.ar/img-logo/EtherCodeSlogan.png"
              }
            }
          }
          `}
        </script>
      </Head>

      {/* Botones de idioma */}

      {isLoading ? (
          <div
          className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden"
          style={{
            backgroundImage: "url('/img/ethercodeFondo2.png')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* Capa de energía sutil */}
          <div
            aria-hidden
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,180,231,0.25),transparent_70%)]"
          />
        
          {/* Capa de gradiente cuántico (movimiento leve) */}
          <div
            aria-hidden
            className="absolute inset-0 animate-[pulse_8s_ease-in-out_infinite] opacity-25"
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, rgba(0,245,212,0.2), rgba(199,125,255,0.25), rgba(0,180,231,0.25), transparent 100%)",
            }}
          />
        
          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <p
              className="text-2xl sm:text-3xl font-semibold mb-8 animate-pulse 
                        bg-gradient-to-r from-[#00F5D4] via-[#00B4E7] to-[#C77DFF] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,180,231,0.5)]"
            >
              Preparando tu camino hacia la automatización inteligente...
            </p>
        
            {/* Barra glass con brillo dinámico */}
            <div className="relative w-72 sm:w-80 bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(0,180,231,0.2)]">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#00F5D4] via-[#00B4E7] to-[#C77DFF] animate-[flow_2s_linear_infinite]"
                style={{
                  width: `${progress}%`,
                  backgroundSize: "200% auto",
                }}
              />
              <style jsx>{`
                @keyframes flow {
                  0% {
                    background-position: 0% 50%;
                  }
                  100% {
                    background-position: 200% 50%;
                  }
                }
              `}</style>
            </div>
        
            {/* Porcentaje con efecto neón */}
            <span className="mt-4 text-sm font-medium tracking-wide text-[#00F5D4] drop-shadow-[0_0_6px_rgba(0,245,212,0.6)]">
              {progress}%
            </span>
          </div>
        
          {/* Bruma de energía en el fondo inferior */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#0A1128]/80 via-[#0A1128]/0 to-transparent"
          />
        </div>
      
      ) : (
        <div
          className="min-h-screen text-primaryText flex flex-col justify-between"
          style={{
            backgroundImage: "url('img/ethercodeFondo2.png')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <ChatWhatsapp />
          <ButtonTop />

          <Element name="hero">
            <NavbarIndex links={links} />
          </Element>

          <div className="flex-grow">
            {/* HERO GRID  */}
            <HeroGrid />
            <Element name="servicios">
              <Services />
            </Element>
            {/* CASOS DE USO  */}
            <Element name="useCases">
              <UseCases />
            </Element>
            <LogoSlider />
            {/* <Element name="seguridad">
              <Seguridad />
            </Element> */}
            <Contact />
            {/* <CTAFinal /> */}
            <Element name="newsletter">{/* <Newsletter /> */}</Element>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;

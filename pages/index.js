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
import LogoSlider from "../components/clientes/LogoSlider";
import ChatBotButton from "../components/chatBotButton";


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
        {/* 🧠 TÍTULOS Y DESCRIPCIONES */}
        <title>Empleados Digitales IA, Automatización y Asistentes Virtuales | ÉtherCode</title>
        <meta
          name="description"
          content="ÉtherCode desarrolla empleados digitales con inteligencia artificial para empresas y emprendedores. Automatizá atención al cliente, ventas y operaciones con IA 24/7. Expertos en bots, software inteligente y soluciones tecnológicas en Argentina y Latinoamérica."
        />

        {/* 🗝️ PALABRAS CLAVE AMPLIADAS */}
        <meta
          name="keywords"
          content="empleado digital, inteligencia artificial, automatización de empresas, chatbot WhatsApp, asistentes virtuales, IA para negocios, bots conversacionales, software personalizado, automatización de procesos, agente inteligente, transformación digital, IA Argentina, automatizar ventas, IA marketing, atención al cliente 24/7, ÉtherCode, programadores IA, agentes GPT, integración OpenAI, web apps, diseño web inteligente, desarrollo web Argentina, soluciones IA para empresas, automatización para pymes, innovación tecnológica, agentes digitales, IA empresarial, asistentes GPT, empresas de software, desarrollo inteligente, IA en Jujuy, IA Norte Argentino, automatización en Latinoamérica, tecnología futurista"
        />

        {/* 🌍 CANONICAL Y LOCALIZACIÓN */}
        <link rel="canonical" href="https://ethercode.com.ar" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ÉtherCode" />
        <meta name="language" content="es" />
        <meta name="geo.region" content="AR-J" />
        <meta name="geo.placename" content="San Salvador de Jujuy" />
        <meta name="geo.position" content="-24.185786;-65.299476" />
        <meta name="ICBM" content="-24.185786, -65.299476" />

        {/* 📱 OPEN GRAPH Y REDES */}
        <meta property="og:title" content="ÉtherCode | Empleados Digitales con IA para Empresas" />
        <meta
          property="og:description"
          content="Tu negocio nunca se detiene. ÉtherCode crea empleados digitales impulsados por IA que automatizan tareas, ventas y atención al cliente 24/7."
        />
        <meta property="og:image" content="https://ethercode.com.ar/img-logo/logonombre.png" />
        <meta property="og:url" content="https://ethercode.com.ar" />
        <meta property="og:site_name" content="ÉtherCode" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ethercode_tech" />
        <meta name="twitter:title" content="ÉtherCode | Empleados Digitales con IA" />
        <meta
          name="twitter:description"
          content="Automatizá tu negocio con asistentes inteligentes y empleados virtuales IA. Tecnología, innovación y eficiencia 24/7."
        />
        <meta name="twitter:image" content="https://ethercode.com.ar/img-logo/logonombre.png" />

        {/* 🔍 PREGUNTAS SEMÁNTICAS (BERT / LLM SEO) */}
        <meta
          name="search-questions"
          content="¿Qué es un empleado digital con IA?, ¿Cómo usar inteligencia artificial para automatizar un negocio?, ¿Un bot puede atender clientes por WhatsApp?, ¿Cómo crear un asistente virtual?, ¿Cuánto cuesta desarrollar un empleado digital?, ¿Cómo usar IA en una pyme?, ¿Qué hace ÉtherCode?, ¿Cómo optimizar ventas con inteligencia artificial?, ¿Cómo automatizar atención al cliente 24/7?"
        />

        {/* 🧩 DATOS ESTRUCTURADOS EXTENDIDOS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ÉtherCode",
              "url": "https://ethercode.com.ar",
              "logo": "https://ethercode.com.ar/img-logo/logonombre.png",
              "sameAs": [
                "https://www.instagram.com/ethercode",
                "https://www.linkedin.com/company/ethercode",
                "https://github.com/ethercode",
                "https://www.facebook.com/ethercode.ar"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+54 388 123 4567",
                  "contactType": "Atención al cliente",
                  "areaServed": "AR, LATAM",
                  "availableLanguage": ["Spanish", "English"]
                }
              ],
              "founder": {
                "@type": "Person",
                "name": "Alejandro Mendoza",
                "jobTitle": "CEO & Software Engineer",
                "sameAs": ["https://www.linkedin.com/in/alejandromendozadev"]
              },
              "co-founder": {
                "@type": "Person",
                "name": "Pablo Martinez",
                "jobTitle": "CTO & Software Engineer",
                "sameAs": ["https://www.linkedin.com/in/pablo-martinez-9b2991233"]
              },
              "description":
                "ÉtherCode desarrolla empleados digitales con inteligencia artificial, automatización de procesos, bots conversacionales y soluciones web inteligentes.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Salvador de Jujuy",
                "addressRegion": "Jujuy",
                "addressCountry": "AR"
              }
            }),
          }}
        />

        {/* 🌐 SCHEMA DE SERVICIOS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Automatización con IA y Asistentes Digitales",
              "provider": {
                "@type": "Organization",
                "name": "ÉtherCode",
                "url": "https://ethercode.com.ar"
              },
              "areaServed": "Argentina y Latinoamérica",
              "description":
                "Diseño y desarrollo de empleados digitales con IA, bots de atención, sistemas web, automatización de tareas y soluciones inteligentes para empresas.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://ethercode.com.ar/servicios"
              }
            }),
          }}
        />

        {/* 🗺️ BREADCRUMB PARA GOOGLE */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://ethercode.com.ar" },
                { "@type": "ListItem", position: 2, name: "Asistentes Digitales", item: "https://ethercode.com.ar/asistentes" },
                { "@type": "ListItem", position: 2, name: "Kit digital Inicial", item: "https://ethercode.com.ar/kitInicialDigital" },
                { "@type": "ListItem", position: 3, name: "Software Factory", item: "https://ethercode.com.ar/fabricaSoft" }
              ]
            }),
          }}
        />

        {/* 🔥 EXTRA SEO */}
        <meta name="theme-color" content="#0A1128" />
        <meta name="application-name" content="ÉtherCode" />
        <meta name="apple-mobile-web-app-title" content="ÉtherCode" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* 📢 ALTERNATES PARA MULTIPAÍS */}
        <link rel="alternate" href="https://ethercode.com.ar" hrefLang="es-ar" />
        <link rel="alternate" href="https://ethercode.com" hrefLang="es" />
        <link rel="alternate" href="https://ethercode.lat" hrefLang="es-419" />
        <link rel="alternate" href="https://ethercode.com/en" hrefLang="en" />

        {/* 📊 GOOGLE ANALYTICS Y ADSENSE YA CONFIGURADOS ARRIBA */}
      </Head>


      {/* Botones de idioma */}

      
        <div
          className="min-h-screen text-primaryText flex flex-col justify-between"
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
    </>
  );
};

export default Home;

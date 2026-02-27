'use client';

import Head from 'next/head';
import { trackEvent, GA_EVENTS } from '../lib/ga';
import CasosUso from '../components/casosUso';
import CTAFinal from '../components/ctaFinalPageAsistentes';
import HeroAutomatizaciones from '../components/heroAutomatizaciones';
import IntegracionesIA from '../components/integracionesIA';
import FAQsIA from '../components/faqIa';
import { Element } from 'react-scroll';
import NavbarIndex from '../components/NavbarIndex';

const PageEmpleadosDigitales = () => {
  const handleCTAClick = () => {
    trackEvent(GA_EVENTS.CTA_EMPLEADO_DIGITAL_CLICK, {
      event_category: 'CTA',
      event_label: 'Empleado Digital - Empezar ahora',
    });
    window.open(
      'https://wa.me/5493884486112?text=Hola!%20Estoy%20interesado%20en%20la%20oferta%20del%20Empleado%20Digital%20🤖',
      '_blank'
    );
  };

  const links = [
    { name: 'Inicio', href: 'Inicio', type: 'scroll' },
    { name: 'Servicios', href: 'Servicios', type: 'scroll' },
    { name: 'Contacto', href: 'Contacto', type: 'scroll' },
    { name: 'Nosotros', href: 'Nosotros', type: 'scroll' },
  ];

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
          content="empleados digitales, automatización empresarial, bots WhatsApp, agentes inteligentes, atención día y noche, inteligencia artificial para negocios, automatizar tareas con IA, ÉtherCode"
        />

        <meta
          property="og:title"
          content="Empleados Digitales con IA para negocios | ÉtherCode"
        />
        <meta
          property="og:description"
          content="Soluciones con IA para automatizar ventas, operaciones y atención al cliente. ÉtherCode crea empleados digitales personalizados para tu empresa."
        />
        <meta
          property="og:image"
          content="/img-logo/logonombre.png"
        />
        <meta
          property="og:url"
          content="https://www.ethercode.com.ar/asistentes"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Empleados Digitales de IA para automatizar tu empresa"
        />
        <meta
          name="twitter:description"
          content="Conectá IA a tu negocio y operá día y noche con empleados digitales personalizados por ÉtherCode."
        />
        <meta
          name="twitter:image"
          content="/img-logo/logonombre.png"
        />

        <link
          rel="canonical"
          href="https://www.ethercode.com.ar/asistentes"
        />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="ÉtherCode" />

        <meta
          name="search-questions"
          content="¿Qué es un empleado digital? ¿Cómo puede un bot reemplazar tareas repetitivas? ¿Puedo contratar un asistente virtual con IA? ¿Qué beneficios tiene un agente digital en mi empresa?"
        />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Empleados Digitales con IA para empresas | ÉtherCode",
              "description": "ÉtherCode desarrolla empleados digitales para automatizar tareas, mejorar atención al cliente y aumentar la eficiencia empresarial con IA.",
              "url": "https://www.ethercode.com.ar/asistentes",
              "publisher": {
                "@type": "Organization",
                "name": "ÉtherCode",
                "url": "https://www.ethercode.com.ar",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.ethercode.com.ar/img-logo/logonombre.png"
                }
              }
            }
          `}
        </script>
      </Head>

      <Element name="Inicio">
        <NavbarIndex links={links} />
      </Element>

      <div
        className="min-h-screen text-white flex flex-col justify-between"
      >
        <HeroAutomatizaciones />
        <IntegracionesIA />
        <CasosUso />
        <FAQsIA />
        <CTAFinal onClick={handleCTAClick} />
      </div>
    </>
  );
};

export default PageEmpleadosDigitales;

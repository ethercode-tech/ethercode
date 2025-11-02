'use client';

import Head from 'next/head';
import { event as gaEvent } from 'nextjs-google-analytics';
import CasosUso from '../components/casosUso';
import CTAFinal from '../components/ctaFinalPageAsistentes';
import HeroAutomatizaciones from '../components/heroAutomatizaciones';
import IntegracionesIA from '../components/integracionesIA';
import FAQsIA from '../components/faqIa';
import { Element } from 'react-scroll';
import NavbarIndex from '../components/NavbarIndex';

const PageEmpleadosDigitales = () => {
  const handleCTAClick = () => {
    gaEvent('cta_empleadoDigital_click', {
      category: 'CTA',
      label: 'Empleado Digital - Empezar ahora',
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
        <title>Empleados Digitales con IA para negocios | EtherCode</title>
        <meta
          name="description"
          content="Contratá empleados digitales impulsados por IA para automatizar tareas, mejorar la atención al cliente y escalar tu negocio día y noche."
        />
        <meta
          name="keywords"
          content="empleados digitales, automatización empresarial, bots WhatsApp, agentes inteligentes, atención día y noche, inteligencia artificial para negocios, automatizar tareas con IA, EtherCode"
        />

        <meta
          property="og:title"
          content="Empleados Digitales con IA para negocios | EtherCode"
        />
        <meta
          property="og:description"
          content="Soluciones con IA para automatizar ventas, operaciones y atención al cliente. EtherCode crea empleados digitales personalizados para tu empresa."
        />
        <meta
          property="og:image"
          content="/img-logo/EtherCodeSlogan.png"
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
          content="Conectá IA a tu negocio y operá día y noche con empleados digitales personalizados por EtherCode."
        />
        <meta
          name="twitter:image"
          content="/img-logo/EtherCodeSlogan.png"
        />

        <link
          rel="canonical"
          href="https://www.ethercode.com.ar/asistentes"
        />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="EtherCode" />

        <meta
          name="search-questions"
          content="¿Qué es un empleado digital? ¿Cómo puede un bot reemplazar tareas repetitivas? ¿Puedo contratar un asistente virtual con IA? ¿Qué beneficios tiene un agente digital en mi empresa?"
        />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Empleados Digitales con IA para empresas | EtherCode",
              "description": "EtherCode desarrolla empleados digitales para automatizar tareas, mejorar atención al cliente y aumentar la eficiencia empresarial con IA.",
              "url": "https://www.ethercode.com.ar/asistentes",
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

      <Element name="Inicio">
        <NavbarIndex links={links} />
      </Element>

      <div
        className="min-h-screen text-white flex flex-col justify-between"
        style={{
          backgroundImage: "url('/img/ethercodeFondo2.png')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
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

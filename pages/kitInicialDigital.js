'use client';

import Head from 'next/head';
import { event as gaEvent } from 'nextjs-google-analytics';
import HeroKitInicial from '../components/kitInicialDigital/HeroKitInicial';
import BeneficiosKit from '../components/kitInicialDigital/beneficiosKit';
import DetallesKit from '../components/kitInicialDigital/detallesKit';
import FAQsKit from '../components/kitInicialDigital/faqKit';
import CTAFinal from '../components/kitInicialDigital/CTAFinal';

const PageKitInicial = () => {
  const handleCTAClick = () => {
    gaEvent('cta_kitInicial_click', { category: 'CTA', label: 'Kit Inicial - Empezar ahora' });
    window.open('https://wa.me/5493884486112?text=Hola!%20Estoy%20interesado%20en%20el%20Kit%20Presencia%20Online%20de%20EtherCode%20💻', '_blank');
  };

  return (
    <>
      <Head>
        <title>Kit Presencia Online para PYMEs y Emprendedores | EtherCode</title>
        <meta
          name="description"
          content="Kit completo para tener presencia online: sitio web profesional, dominio .com.ar, certificado SSL, integración con WhatsApp y SEO básico. Ideal para emprendedores, freelancers y pymes argentinas."
        />
        <meta name="keywords" content="presencia online, página web para pymes, sitio web económico, desarrollo web Argentina, kit digital, web con whatsapp, dominio gratis, ssl incluido, SEO Google" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="EtherCode" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kit Presencia Online para PYMEs y Emprendedores | EtherCode" />
        <meta
          property="og:description"
          content="Lanzá tu presencia digital con EtherCode: diseño web, dominio, hosting y posicionamiento en Google. Solo 200 USD. En 7 días."
        />
        <meta property="og:image" content="https://www.ethercode.com.ar/img/logoKitInicial.png" />
        <meta property="og:url" content="https://www.ethercode.com.ar/kitinicial" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kit Presencia Online | Web + Dominio + SSL + SEO" />
        <meta
          name="twitter:description"
          content="¿Todavía no estás en Google? Este kit incluye todo lo que necesitás para mostrar tu negocio online. ¡Consultá ahora!"
        />
        <meta name="twitter:image" content="https://www.ethercode.com.ar/img/logoKitInicial.png" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.ethercode.com.ar/kitInicialDigital" />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Kit Presencia Online",
            image: "https://www.ethercode.com.ar/img/logoKitInicial.png",
            description: "Kit digital para lanzar tu negocio en Internet. Incluye sitio web profesional, dominio .com.ar, hosting, certificado SSL y posicionamiento SEO básico.",
            brand: {
              "@type": "Organization",
              name: "EtherCode"
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "200",
              availability: "https://schema.org/InStock",
              url: "https://www.ethercode.com.ar/kitInicialDigital"
            }
          })
        }} />
      </Head>

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
        <HeroKitInicial />
        <BeneficiosKit />
        <DetallesKit />
        <FAQsKit />
        <CTAFinal onClick={handleCTAClick} />
      </div>
    </>
  );
};

export default PageKitInicial;

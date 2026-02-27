import Document, { Html, Head, Main, NextScript } from "next/document";
import OrganizationJSONLD from "../components/OrganizationJSONLD";
import WebsiteJSONLD from "../components/WebsiteJSONLD";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es" dir="ltr" data-theme="dark" class="dark" suppressHydrationWarning>
        <Head>
          {/* ------- META TAGS PARA COMPARTIR (OG + TWITTER) ------- */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ethercode.com.ar/" />
          <meta property="og:title" content="ÉtherCode — Inteligencia Artificial y Desarrollo Web en Argentina" />
          <meta property="og:description" content="Creamos agentes de IA, automatizaciones y webs de alto rendimiento. Aumenta ventas, reduce costos y escalá tu negocio con soluciones reales." />
          <meta property="og:image" content="https://ethercode.com.ar/img-logo/EtherCode.png" />
          <meta property="og:image:alt" content="Logo de ÉtherCode" />
          <meta property="og:site_name" content="ÉtherCode" />

          {/* Para WhatsApp y Facebook */}
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* ------- TWITTER CARD ------- */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="ÉtherCode — Soluciones de IA y Desarrollo Web" />
          <meta name="twitter:description" content="Impulsamos empresas con inteligencia artificial, automatización y webs ultra rápidas." />
          <meta name="twitter:image" content="https://ethercode.com.ar/img-logo/EtherCode.png" />
          <meta name="twitter:image:alt" content="Logo de ÉtherCode" />

          {/* ------- SEO GENERAL ------- */}
          <meta name="description" content="ÉtherCode crea agentes de inteligencia artificial, automatizaciones y desarrollo web profesional para empresas de Argentina y Latinoamérica. Multiplica tus ventas y reduce tus costos con tecnología real." />

          <link rel="canonical" href="https://ethercode.com.ar/" />

          <link rel="manifest" href="/site.webmanifest" />
          {/* Metadatos esenciales */}
          <meta charSet="UTF-8" />
          <meta name="color-scheme" content="dark" />
          <style>{`:root { color-scheme: dark; }`}</style>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          <meta name="google-site-verification" content="pwslL4ojLoF0MNCk8JLU9VnQn9VFCBdh6LPae1v_6e8" />
          <meta name="google-adsense-account" content="ca-pub-6961079452828782"></meta>

          {/* Favicon y Apple Icons */}
          <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />
          <link rel="apple-touch-icon" href="/img-logo/EtherCode.png" />
          {/* <link rel="manifest" href="/site.webmanifest" /> */}
          <meta name="mobile-web-app-capable" content="yes" />
          {/* Datos estructurados para SEO */}
          <OrganizationJSONLD />
          <WebsiteJSONLD />

          {/* GA4 se carga en _app.js con NEXT_PUBLIC_GA_TRACKING_ID para evitar duplicado */}

          {/* Script de Metricool */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                function loadScript(a){
                  var b=document.getElementsByTagName("head")[0],
                  c=document.createElement("script");
                  c.type="text/javascript",
                  c.src="https://tracker.metricool.com/resources/be.js",
                  c.onreadystatechange=a,
                  c.onload=a,
                  b.appendChild(c)
                }
                loadScript(function(){
                  beTracker.t({hash:"ec3a9ca8186f33cd65ce3efd1069e851"})
                });
              `,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "ÉtherCode",
                "url": "https://ethercode.com.ar",
                "logo": "https://ethercode.com.ar/logo.png",
                "sameAs": [
                  "https://www.linkedin.com/company/ethercode",
                  "https://www.instagram.com/ethercode"
                ]
              }),
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

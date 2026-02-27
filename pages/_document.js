// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

const SITE_URL = "https://ethercode.com.ar";
const OG_IMAGE = `${SITE_URL}/img-logo/EtherCode.png`;

class MyDocument extends Document {
  render() {
    const orgJsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ÉtherCode",
      url: SITE_URL,
      logo: OG_IMAGE,
      sameAs: [
        "https://www.linkedin.com/company/ethercode",
        "https://www.instagram.com/ethercode",
      ],
    };

    const websiteJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ÉtherCode",
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/buscar?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };

    return (
      <Html lang="es" dir="ltr" data-theme="dark" className="dark" suppressHydrationWarning>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* OG / Social base (genérico). Cada página puede sobreescribir en <Head> */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="ÉtherCode" />
          <meta property="og:url" content={`${SITE_URL}/`} />
          <meta property="og:title" content="ÉtherCode — Inteligencia Artificial y Desarrollo Web" />
          <meta
            property="og:description"
            content="Agentes de IA, automatizaciones y webs de alto rendimiento para vender más y operar mejor."
          />
          <meta property="og:image" content={OG_IMAGE} />
          <meta property="og:image:alt" content="ÉtherCode" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={OG_IMAGE} />

          {/* SEO base */}
          <meta
            name="description"
            content="ÉtherCode crea agentes de IA, automatizaciones y desarrollo web profesional para empresas en Argentina y Latinoamérica."
          />
          <meta name="robots" content="index, follow" />

          {/* Verificación */}
          <meta
            name="google-site-verification"
            content="pwslL4ojLoF0MNCk8JLU9VnQn9VFCBdh6LPae1v_6e8"
          />

          {/* Icons */}
          <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />
          <link rel="apple-touch-icon" href="/img-logo/EtherCode.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Color scheme */}
          <meta name="color-scheme" content="dark" />
          <style>{`:root { color-scheme: dark; }`}</style>

          {/* JSON-LD global (UNA vez) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
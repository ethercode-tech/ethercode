import Document, { Html, Head, Main, NextScript } from "next/document";
import OrganizationJSONLD from "../components/OrganizationJSONLD";
import WebsiteJSONLD from "../components/WebsiteJSONLD";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es" dir="ltr">
        <Head>
          {/* Metadatos esenciales */}
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          <meta name="google-site-verification" content="pwslL4ojLoF0MNCk8JLU9VnQn9VFCBdh6LPae1v_6e8" />
          <meta name="google-adsense-account" content="ca-pub-6961079452828782"></meta>

          {/* Favicon y Apple Icons */}
          <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />
          <link rel="apple-touch-icon" href="/img-logo/EtherCodeSlogan.png" />
          {/* <link rel="manifest" href="/site.webmanifest" /> */}

          {/* Datos estructurados para SEO */}
          <OrganizationJSONLD />
          <WebsiteJSONLD />

          {/* Google Analytics gtag.js */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-DWNYC03YQH"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DWNYC03YQH');
              `,
            }}
          />

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
                "name": "EtherCode",
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

        <body className="bg-transparent text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

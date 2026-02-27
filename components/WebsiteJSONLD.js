// components/WebsiteJSONLD.js
import React from "react";

const WebsiteJSONLD = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: "https://ethercode.com.ar",
        name: "ÉtherCode",
        description:
          "Desarrollamos software a medida, aplicaciones móviles y soluciones tecnológicas innovadoras para tu negocio.",
        publisher: {
          "@type": "Organization",
          name: "ÉtherCode",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://ethercode.com.ar?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    }}
  />
);

export default WebsiteJSONLD;

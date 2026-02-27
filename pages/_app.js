// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import "../css/tailwind.css";
import "../css/global.css";
import Head from "next/head";
import Script from "next/script";
import { trackPageView } from "../lib/ga";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Evita llamar GA si todavía no cargó
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        trackPageView(url, document?.title ?? "");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {trackingId ? (
        <>
          <Script
            id="ga4-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                // Evitamos duplicar page_view porque lo mandamos en routeChangeComplete
                gtag('config', '${trackingId}', { send_page_view: false });
              `,
            }}
          />
        </>
      ) : null}

      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
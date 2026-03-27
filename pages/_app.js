// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import "../css/global.css";
import Head from "next/head";
import Script from "next/script";
import { bindAutoOutboundTracking, initAnalyticsSession, trackPageView } from "../lib/ga";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  useEffect(() => {
    if (!trackingId) return;

    initAnalyticsSession();

    const trackCurrentPage = () => {
      if (typeof window === "undefined") return;
      trackPageView(window.location.href, document?.title ?? "");
    };

    // Primera carga: imprescindible para no perder UTMs de entrada
    trackCurrentPage();

    const handleRouteChange = () => {
      // Espera un tick para que el <title> esté actualizado
      window.requestAnimationFrame(trackCurrentPage);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    const unbindOutboundTracking = bindAutoOutboundTracking();

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      unbindOutboundTracking();
    };
  }, [router, trackingId]);

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
                gtag('config', '${trackingId}', {
                  send_page_view: false,
                  anonymize_ip: true
                });
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

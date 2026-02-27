// pages/_app.js
import { useEffect } from "react";
// import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import "../css/tailwind.css";
// import "../css/stylesLoading.css";
import "../css/global.css";
// import "../lib/i18n";
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

  // GA4: page_view en cada cambio de ruta (SPA). La primera carga la envía gtag('config').
  useEffect(() => {
    const handleRouteChange = (url) => {
      trackPageView(url, typeof document !== "undefined" ? document.title : "");
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {trackingId && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
          />
          <Script
            id="gtag-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${trackingId}');
              `,
            }}
          />
        </>
      )}

      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;

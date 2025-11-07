// pages/_app.js
import { useEffect } from "react";
// import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import "../css/tailwind.css";
// import "../css/stylesLoading.css";
import "../css/global.css";
// import "../lib/i18n";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     if (!trackingId) return;

  //     fetch("/api/analytics", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ trackingId, path: url }),
  //     }).catch((error) =>
  //       console.error("Error al enviar datos de Analytics:", error)
  //     );
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => router.events.off("routeChangeComplete", handleRouteChange);
  // }, [router, trackingId]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {trackingId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
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

      <>
        <Component {...pageProps} />
       
        
      </>
    </>
  );
}

export default MyApp;

import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { intentLandingPages } from "../../data/intentLandingPages";

const NavbarIndex = dynamic(() => import("../../components/NavbarIndex"), { ssr: true });
const Footer = dynamic(() => import("../../components/footer"), { ssr: true });

const SITE_URL = "https://ethercode.com.ar";

export default function SolucionesIndex() {
  const canonical = `${SITE_URL}/soluciones`;

  return (
    <>
      <Head>
        <title>Soluciones por industria con empleados digitales | ÉtherCode</title>
        <meta
          name="description"
          content="Landing pages de alta intención por industria: inmobiliarias, clínicas, estudios jurídicos, restaurantes y concesionarias con IA aplicada a resultados."
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Soluciones por industria con empleados digitales | ÉtherCode" />
        <meta property="og:description" content="Implementaciones de IA orientadas a conversión y eficiencia por rubro." />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_URL}/img-logo/logonombre.png`} />
      </Head>

      <div className="min-h-screen bg-[#0A0F2C] text-white">
        <NavbarIndex links={[{ name: "Inicio", href: "/" }, { name: "Asistentes", href: "/asistentes" }]} />

        <main className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
          <section className="mx-auto max-w-7xl text-center">
            <h1 className="text-3xl font-black sm:text-5xl">Soluciones de alta intención por industria</h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-white/75 sm:text-base">
              Elegí tu vertical y accedé a una propuesta clara con caso, precio base referencial y CTA directo.
            </p>
          </section>

          <section className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {intentLandingPages.map((item) => (
              <article key={item.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{item.industry}</p>
                <h2 className="mt-2 text-lg font-semibold">{item.h1}</h2>
                <p className="mt-2 text-sm text-white/75">{item.subtitle}</p>
                <p className="mt-3 text-xs text-cyan-100">{item.basePrice}</p>
                <Link
                  href={`/soluciones/${item.slug}`}
                  className="mt-4 inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white no-underline hover:bg-white/10 hover:no-underline"
                >
                  Ver solución
                </Link>
              </article>
            ))}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

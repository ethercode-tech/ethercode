import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { getIntentLandingBySlug, intentLandingPages } from "../../data/intentLandingPages";

const NavbarIndex = dynamic(() => import("../../components/NavbarIndex"), { ssr: true });
const Footer = dynamic(() => import("../../components/footer"), { ssr: true });
const ChatWhatsapp = dynamic(() => import("../../components/buttonWhatsapp"), { ssr: false });
const ButtonTop = dynamic(() => import("../../components/buttonTop"), { ssr: false });

const SITE_URL = "https://ethercode.com.ar";

export default function IntentLandingPage({ page }) {
  const canonical = `${SITE_URL}/soluciones/${page.slug}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: canonical,
      inLanguage: "es-AR",
      about: [page.industry, "empleados digitales", "automatizacion con IA"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: `Empleado digital para ${page.industry}`,
      areaServed: ["Argentina", "Latinoamérica"],
      provider: {
        "@type": "Organization",
        name: "ÉtherCode",
        url: SITE_URL,
      },
      audience: {
        "@type": "Audience",
        audienceType: `Empresas de ${page.industry}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Soluciones", item: `${SITE_URL}/soluciones` },
        { "@type": "ListItem", position: 3, name: page.h1, item: canonical },
      ],
    },
  ];

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Empleados Digitales", href: "/asistentes" },
    { name: "Fábrica de Software", href: "/fabricaSoft" },
    { name: "Soluciones", href: "/soluciones" },
  ];

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_URL}/img-logo/logonombre.png`} />
        <meta name="twitter:card" content="summary_large_image" />

        {schemas.map((schema, idx) => (
          <script
            key={`intent-schema-${idx}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <div className="min-h-screen bg-[#0A0F2C] text-white">
        <ChatWhatsapp />
        <ButtonTop />
        <NavbarIndex links={links} />

        <main className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
          <section className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[#0f1734]/75 p-6 backdrop-blur md:p-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"
            >
              Solución por industria · {page.industry}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-3 text-3xl font-black leading-tight sm:text-5xl"
            >
              {page.h1}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base"
            >
              {page.subtitle}
            </motion.p>

            <div className="mt-5 inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-200">
              Precio base: {page.basePrice}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/5493884486112?text=${encodeURIComponent(`Hola ÉtherCode, quiero una propuesta para ${page.h1}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 to-indigo-300 px-6 py-3 font-semibold text-black no-underline hover:no-underline"
              >
                Pedir propuesta por WhatsApp
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white no-underline hover:bg-white/10 hover:no-underline"
              >
                Hablar con un especialista
              </Link>
            </div>
          </section>

          <section className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-xl font-semibold">Problemas frecuentes</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                {page.painPoints.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-[#0a1128]/70 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-xl font-semibold">Cómo lo resolvemos</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                {page.outcomes.map((item) => (
                  <li key={item} className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mx-auto mt-8 max-w-7xl rounded-2xl border border-white/10 bg-[#111a3b]/80 p-5">
            <h2 className="text-xl font-semibold">Caso de referencia</h2>
            <p className="mt-3 text-sm text-white/80">{page.miniCase.context}</p>
            <p className="mt-2 text-sm text-cyan-100">{page.miniCase.result}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {page.miniCase.metrics.map((metric) => (
                <p key={metric} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/85 text-center">
                  {metric}
                </p>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-8 max-w-7xl rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-semibold">Preguntas clave</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {page.faqs.map((faq) => (
                <article key={faq.q} className="rounded-xl border border-white/10 bg-[#0a1128]/70 p-4">
                  <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                  <p className="mt-2 text-sm text-white/80">{faq.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-8 max-w-7xl text-center">
            <p className="text-sm text-white/75">¿Querés ver más verticales?</p>
            <Link
              href="/soluciones"
              className="mt-3 inline-flex rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-white no-underline hover:bg-white/10 hover:no-underline"
            >
              Ver todas las soluciones
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: intentLandingPages.map((item) => ({ params: { slug: item.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = getIntentLandingBySlug(params.slug);

  if (!page) {
    return { notFound: true };
  }

  return {
    props: { page },
  };
}

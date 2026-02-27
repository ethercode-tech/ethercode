// pages/fabricaSoft.js
// Fábrica de Software — versión neuro-persuasiva + fondo coherente ÉtherCode
// Mantiene tecnologías y contenido clave, pero con copy que activa confianza y acción.

import Container from "../components/container";
import NavbarIndex from "../components/NavbarIndex";
import Footer from "../components/footer";
import Head from "next/head";
import PopupWidget from "../components/popupWidget";
import { Element } from "react-scroll";
import Contact from "./contact";
import Image from "next/image";
import { motion } from "framer-motion";

const FabricaSoft = () => {
  const links = [
    { name: "Inicio", href: "Inicio", type: "scroll" },
    { name: "Servicios", href: "Servicios", type: "scroll" },
    { name: "Contacto", href: "Contacto", type: "scroll" },
    { name: "Nosotros", href: "Nosotros", type: "scroll" },
  ];

  const techColors = {
    HTML: "#f16529",
    CSS: "#2965f1",
    JavaScript: "#f7df1e",
    React: "#61dafb",
    Nextjs: "#54f1ed",
    NodeJS: "#41cb2e",
    ApiRest: "#6C47FF",
    Python: "#3776AB",
    Typescript: "#007acc",
    Docker: "#0db7ed",
    Tailwind: "#38bdf8",
    Supabase: "#3ECF8E",
    Sass: "#cd6799",
    Flutter: "#42a5f5",
    Vercel: "#000000",
    GitHub: "#000000",
    Figma: "#f24e1e",
    Zoom: "#11319e",
    OpenAI: "#41cb2e",
    MongoDB: "#3ECF8E",
  };

  const technologies = [
    { name: "JavaScript", icon: "/img/iconTech/JS.webp" },
    { name: "Typescript", icon: "/img/iconTech/TS.webp" },
    { name: "NodeJS", icon: "/img/iconTech/nodejstransparente.png" },
    { name: "React", icon: "/img/iconTech/reactjs.png" },
    { name: "Nextjs", icon: "/img/iconTech/next.webp" },
    { name: "Tailwind", icon: "/img/iconTech/Tailwind.png" },
    { name: "Supabase", icon: "/img/iconTech/supabase.png" },
    { name: "Sass", icon: "/img/iconTech/Sass.png" },
    { name: "Flutter", icon: "/img/iconTech/flutter.png" },
    { name: "GitHub", icon: "/img/iconTech/github.png" },
    { name: "HTML", icon: "/img/iconTech/html.png" },
    { name: "CSS", icon: "/img/iconTech/CSS.png" },
    { name: "ApiRest", icon: "/img/iconTech/apirest.png" },
    { name: "Vercel", icon: "/img/iconTech/vercel.webp" },
    { name: "Docker", icon: "/img/iconTech/doker.png" },
    { name: "OpenAI", icon: "/img/iconTech/OpenAi.png" },
    { name: "Python", icon: "/img/iconTech/python.png" },
    { name: "MongoDB", icon: "/img/iconTech/mongo2.png" },
  ];

  const cardsContent = [
    {
      title: "Múltiples lenguajes",
      description:
        "Dominamos el stack moderno para elegir lo que mejor se adapta a tu caso, no al revés.",
    },
    {
      title: "Siempre actualizados",
      description:
        "Aprendizaje continuo y estándares vivos. Traemos prácticas de alto rendimiento a tu proyecto.",
    },
    {
      title: "Metodología flexible",
      description:
        "Nos acoplamos a tus reglas, documentación y cadencias. Ágil, visible y predecible.",
    },
    {
      title: "Múltiples plataformas",
      description:
        "Web, mobile y desktop. Diseñado para escalar y convivir con tu ecosistema actual.",
    },
    {
      title: "Conocimiento funcional",
      description:
        "Experiencia en Salud, Educación, Estado, Banca, Seguros y Retail. Menos curva, más valor.",
    },
    {
      title: "Beneficios económicos",
      description:
        "Costo-eficiencia sin sacrificar calidad: foco en ROI y time-to-value.",
    },
  ];

  const statBadges = [
    { k: "Onboarding", v: "en días, no meses" },
    { k: "SLA", v: "99.9%" },
    { k: "Deploy", v: "CI/CD automatizado" },
  ];

  return (
    <>
      <Head>
        <title>Fábrica de software a medida en Argentina – ÉtherCode</title>
        <meta
          name="description"
          content="Desarrollo de software a medida en Argentina: ÉtherCode crea soluciones web y móviles adaptadas a tu empresa con metodologías ágiles. Solicita una consulta gratuita y conoce nuestros casos de éxito."
        />
        <meta
          property="og:title"
          content="Fábrica de software a medida en Argentina – ÉtherCode"
        />
        <meta
          property="og:description"
          content="Somos tu partner tecnológico. Creamos soluciones web, mobile y sistemas internos que potencian tu empresa."
        />
        <meta property="og:image" content="/img-logo/logonombre.png" />
        <meta
          property="og:url"
          content="https://ethercode.com.ar/fabricaSoft"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/img-logo/logonombre.png" />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />
        <link rel="canonical" href="https://ethercode.com.ar/fabricaSoft" />
      </Head>

      {/* LAYOUT + FONDO COHERENTE ÉtherCode */}
      <div
        className="min-h-screen text-white pt-20 relative overflow-hidden"
        style={{
          ["--sec-mask-strength"]: 0.5,
          ["--sec-alpha"]: 0.06,
        }}
      >
        {/* FX de fondo (grilla + blobs cónicos) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
          <div className="absolute -top-[35vmin] left-1/2 -translate-x-1/2 h-[95vmax] w-[95vmax] rounded-full blur-3xl opacity-30 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-25vmax] right-[-10vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.22),_rgba(199,125,255,.14),_transparent_60%)]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 30%, rgba(10,17,40, var(--sec-alpha)), rgba(10,17,40, calc(var(--sec-alpha) + 0.02)) 60%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
              maskImage:
                "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
            }}
          />
        </div>

        <Element name="Inicio">
          <NavbarIndex links={links} />
        </Element>

        <Container>
          {/* HERO NEURO-PERSUASIVO */}
          <section className="mx-auto py-10 px-4 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300"
            >
              Fábrica de Software que convierte ideas en sistemas reales
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-lg text-center text-white/85 max-w-3xl mx-auto"
            >
              No prometemos magia: entregamos software{" "}
              <span className="text-cyan-300 font-semibold">
                estable, rápido y medible
              </span>{" "}
              que impacta en tus métricas. Menos excusas, más entregas.
            </motion.p>

            {/* Micro-confianza */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[12px]">
              {statBadges.map((b) => (
                <span
                  key={b.k}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70"
                >
                  {b.k}: <span className="text-cyan-300 ml-1">{b.v}</span>
                </span>
              ))}
            </div>
          </section>

          {/* TIMELINE INTERACTIVO (SERVICIOS DIFERENCIADORES) */}
          <section className="relative mt-12">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10" />
            <div className="space-y-12">
              {cardsContent.map((card, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    className={`relative flex items-start justify-${
                      isLeft ? "start" : "end"
                    } w-full`}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.06 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {/* Punto en la línea */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_18px_rgba(34,211,238,0.6)]" />

                    {/* Card */}
                    <div
                      className={`w-full max-w-xl p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-300/50 transition ${
                        isLeft ? "ml-8 text-left" : "mr-8 text-left"
                      }`}
                    >
                      <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-white/85">{card.description}</p>
                      <div className="mt-3 text-[11px] text-white/60">
                        Calidad visible • Entregas quincenales • Demo continua
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ARSENAL TÉCNICO (HABILIDADES) */}
          <Element name="Servicios">
            <motion.section
              className="mt-20 mb-10 px-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center text-white mb-8">
                NUESTRO <span className="text-cyan-300">ARSENAL TÉCNICO</span>
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-x-4 gap-y-6 justify-center items-center max-w-7xl mx-auto">
                {technologies.map((tech, index) => {
                  const borderColor = techColors[tech.name] || "#3F8CFF";
                  return (
                    <motion.div
                      key={index}
                      className="group relative w-24 h-24 flex items-center justify-center rounded-md transition-transform duration-300 hover:scale-110 bg-[rgba(255,255,255,0.05)]"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true, amount: 0.2 }}
                      style={{ boxShadow: `0 0 0 1px ${borderColor}33` }}
                    >
                      {/* Esquinas */}
                      <div className="absolute inset-0 pointer-events-none rounded-md">
                        <div
                          className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2"
                          style={{ borderColor }}
                        />
                        <div
                          className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2"
                          style={{ borderColor }}
                        />
                        <div
                          className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2"
                          style={{ borderColor }}
                        />
                        <div
                          className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2"
                          style={{ borderColor }}
                        />
                      </div>

                      {/* Glow hover */}
                      <div
                        className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle, ${borderColor}33 0%, transparent 70%)`,
                          boxShadow: `0 0 12px 3px ${borderColor}`,
                        }}
                      />

                      {/* Icono */}
                      <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-125">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          fill
                          className="object-contain"
                          sizes="56px"
                        />
                      </div>

                      {/* Nombre */}
                      <span className="absolute bottom-[-1.4rem] text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition duration-300">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          </Element>

          {/* DESARROLLO WEB A MEDIDA (GALERÍA DE BENEFICIOS) */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-center text-cyan-300 mb-4">
              Desarrollo Web a Medida
            </h2>
            <p className="text-lg text-center text-white/85 max-w-3xl mx-auto mb-14">
              Sitios modernos, veloces y orientados a conversión. Integrados con{" "}
              WhatsApp, formularios inteligentes y automatizaciones para
              escalar sin fricción.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Landing Pages que convierten",
                  desc: "Hechas para campañas. Copy y UI pensados para captar leads y medir resultados.",
                },
                {
                  title: "Formularios inteligentes",
                  desc: "Conecta a WhatsApp, CRM o Sheets. Menos carga manual, más respuestas.",
                },
                {
                  title: "Webs institucionales",
                  desc: "Quién sos, qué hacés y por qué confiar: estructura clara + CTA efectiva.",
                },
                {
                  title: "SEO y performance",
                  desc: "Core Web Vitals, accesibilidad y buenas prácticas para subir en Google.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 shadow transition"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/85">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          {/* CTA BREVE ANTES DE CONTACTO */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="mt-8 text-center"
          >
            <a
              href="https://cal.com/ether-code/contanos-tu-idea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-7 py-3
                         bg-gradient-to-r from-[#00F5D4] via-[#00B4E7] to-[#C77DFF]
                         text-black font-bold shadow-2xl hover:opacity-95 no-underline hover:no-underline active:scale-[0.99] transition"
            >
              🚀 Agendar diagnóstico gratuito
            </a>
            <p className="text-white/60 text-sm mt-2">
              15 minutos. Sin compromiso. Te llevás un plan claro.
            </p>
          </motion.div>

          {/* CONTACTO */}
          <Element name="Contacto">
            <Contact />
          </Element>
        </Container>

        <Footer />
        <PopupWidget />
      </div>
    </>
  );
};

export default FabricaSoft;

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

  // colores de borde por tecnología
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

  // listado actualizado de tecnologías
  const technologies = [
    { name: "JavaScript", icon: "/img/iconTech/JS.webp" },
    { name: "Typescript", icon: "/img/iconTech/TS.webp" },
    { name: "NodeJS", icon: "/img/iconTech/nodejstransparente.png" },
    { name: "Python", icon: "/img/iconTech/python.png" },
    { name: "React", icon: "/img/iconTech/reactjs.png" },
    { name: "Nextjs", icon: "/img/iconTech/next.webp" },
    { name: "Zoom", icon: "/img/iconTech/zoom.png" },
    { name: "Tailwind", icon: "/img/iconTech/Tailwind.png" },
    { name: "Supabase", icon: "/img/iconTech/supabase.png" },
    { name: "Sass", icon: "/img/iconTech/Sass.png" },
    { name: "Flutter", icon: "/img/iconTech/flutter.png" },
    { name: "Figma", icon: "/img/iconTech/figma.png" },
    { name: "GitHub", icon: "/img/iconTech/github.png" },
    { name: "HTML", icon: "/img/iconTech/html.png" },
    { name: "CSS", icon: "/img/iconTech/CSS.png" },
    { name: "ApiRest", icon: "/img/iconTech/apirest.png" },
    { name: "Vercel", icon: "/img/iconTech/vercel.webp" },
    { name: "Docker", icon: "/img/iconTech/doker.png" },
    { name: "OpenAI", icon: "/img/iconTech/OpenAi.png" },
    { name: "MongoDB", icon: "/img/iconTech/mongo2.png" },
  ];

  const cardsContent = [
    {
      title: "Múltiples lenguajes",
      description:
        "Tenemos mucha experiencia trabajando en múltiples lenguajes de programación",
    },
    {
      title: "Siempre actualizados",
      description:
        "Mantenemos a nuestro equipo de desarrollo actualizado en las últimas novedades y tendencias de las Tecnologías de la Información.",
    },
    {
      title: "Metodología flexible",
      description:
        "Incorporamos la metodología y reglas de desarrollo de nuestros clientes, incluyendo las de documentación; y ponemos a su disposición nuestras mejores prácticas.",
    },
    {
      title: "Múltiples Plataformas",
      description:
        "Nos especializamos en desarrollar soluciones que funcionan en múltiples plataformas, asegurando que su software sea accesible y funcional en diversos dispositivos y sistemas operativos.",
    },
    {
      title: "Conocimiento funcional",
      description:
        "Contamos con experiencia en los procesos de múltiples sectores: Salud, Educación, Estado, Banca y Seguros, Comercio, etc.",
    },
    {
      title: "Beneficios económicos",
      description:
        "Ofrecemos soluciones costo-efectivas que permiten a nuestros clientes maximizar su inversión en tecnología, asegurando alta calidad y resultados óptimos a un costo razonable.",
    },
  ];

  return (
    <>
      <Head>
        <title>
          Fábrica de software a medida en Argentina – EtherCode
        </title>
        <meta
          name="description"
          content="Desarrollo de software a medida en Argentina: EtherCode crea soluciones web y móviles adaptadas a tu empresa con metodologías ágiles. Solicita una consulta gratuita y conoce nuestros casos de éxito."
        />
        <meta
          property="og:title"
          content="Fábrica de software a medida en Argentina – EtherCode"
        />
        <meta
          property="og:description"
          content="Somos tu partner tecnológico. Creamos soluciones web, mobile y sistemas internos que potencian tu empresa."
        />
        <meta property="og:image" content="/img-logo/EtherCodeSlogan.png" />
        <meta
          property="og:url"
          content="https://www.ethercode.com.ar/fabricaSoft"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/img-logo/EtherCodeSlogan.png" />
        <link rel="icon" href="/img-logo/EtherCode.ico" />
        <link
          rel="canonical"
          href="https://www.ethercode.com.ar/fabricaSoft"
        />
      </Head>

      <div
        className="min-h-screen text-white pt-20"
        style={{
          backgroundImage: "url('/img/ethercodeFondo2.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Element name="Inicio">
          <NavbarIndex links={links} />
        </Element>
        <Container>
          <div>
            <div className="mx-auto py-8 px-4 lg:px-8">
              <h2 className="text-4xl font-bold text-center text-[#00B4D8] mb-4">
                Fábrica de Software
              </h2>
              <p className="text-lg text-center text-gray-200 max-w-3xl mx-auto mb-20">
                Nuestra Fábrica de Software está a disposición de nuestros
                clientes para la atención directa de sus necesidades de
                desarrollo. Cualquiera sea el formato que necesite: In-Site,
                Off-Site, Near-Shore u Off-Shore, nuestro proceso de Gestión de
                la demanda y capacidad le asegurará el término en tiempo y forma
                de sus encargos.
              </p>

              {/* TIMELINE INTERACTIVO */}
              {/* TIMELINE INTERACTIVO CENTRAL */}
              <div className="relative mt-16">
                {/* LÍNEA VERTICAL CENTRAL */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#3F8CFF]/30" />

                <div className="space-y-12">
                  {cardsContent.map((card, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                      <motion.div
                        key={index}
                        className={`relative flex items-start justify-${
                          isLeft ? "start" : "end"
                        } w-full`}
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {/* Punto sobre la línea */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-2 w-4 h-4 bg-[#3F8CFF] rounded-full shadow-lg z-0" />

                        {/* Contenido a los lados */}
                        <div
                          className={`w-full max-w-xl p-6 rounded-lg backdrop-blur-sm bg-white/5 border border-[#3F8CFF]/20 hover:border-[#3F8CFF] transition z-0 
                    ${isLeft ? "ml-8 text-left" : "mr-8 text-left"}`}
                        >
                          <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">
                            {card.title}
                          </h3>
                          <p className="text-gray-300">{card.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* SECCIÓN DESARROLLO WEB */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mt-28"
              >
                <h2 className="text-3xl font-bold text-center text-[#00B4D8] mb-6">
                  Desarrollo Web a Medida
                </h2>
                <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto mb-16">
                  Creamos sitios web modernos, rápidos y orientados a
                  resultados. Desde landing pages para campañas de marketing
                  hasta webs completas institucionales, integradas con WhatsApp,
                  formularios de contacto y herramientas de automatización.
                </p>

                {/* GALERÍA DE BENEFICIOS WEB */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Landing Pages que convierten",
                      desc: "Diseñadas para campañas de Meta Ads o Google. Optimizadas para capturar leads y dirigir tráfico segmentado.",
                    },
                    {
                      title: "Formularios inteligentes",
                      desc: "Capturá datos de tus clientes, conectalo a WhatsApp, Google Sheets o CRM. Ideal para campañas con seguimiento automatizado.",
                    },
                    {
                      title: "Webs institucionales",
                      desc: "Mostrá quién sos, tus servicios, equipo, testimonios y CTA claras. Ideal para empresas, profesionales y emprendimientos.",
                    },
                    {
                      title: "SEO y velocidad",
                      desc: "Optimizamos tu sitio para posicionamiento en buscadores y una experiencia rápida en todos los dispositivos.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className="group relative overflow-hidden bg-white/5 rounded-xl p-6 backdrop-blur-sm shadow hover:shadow-lg transition"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#3F8CFF]/10 opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
                      <div className="relative z-0">
                        <h3 className="text-xl font-semibold text-[#00B4D8] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
              {/* TECNOLOGIAS */}
              <motion.section
                className="mt-20 mb-10 px-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-center text-white mb-8">
                  NUESTRO{" "}
                  <span className="text-[#00B4D8]"> ARSENAL TECNICO</span>
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-x-4 gap-y-4 justify-center items-center max-w-8xl mx-auto">
                  {technologies.map((tech, index) => {
                    const borderColor = techColors[tech.name] || "#3F8CFF";

                    return (
                      <motion.div
                        key={index}
                        className="group relative w-24 h-24 flex items-center justify-center rounded-md transition-transform duration-300 hover:scale-110 bg-[rgba(255,255,255,0.05)]"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} // entra desde izquierda/derecha alternando
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        style={{
                          boxShadow: `0 0 0 1px ${borderColor}33`,
                        }}
                      >
                        {/* Esquinas targeting */}
                        <div className="absolute inset-0 pointer-events-none rounded-md z-0">
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
                          className="absolute inset-0 rounded-md z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle, ${borderColor}33 0%, transparent 70%)`,
                            boxShadow: `0 0 12px 3px ${borderColor}`,
                          }}
                        />

                        {/* Icono */}
                        <div className="relative w-16 h-16 z-0 transition-transform duration-300 group-hover:scale-125">
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            fill
                            className="object-contain"
                            sizes="56px"
                          />
                        </div>

                        {/* Nombre al hover */}
                        <span className="absolute bottom-[-1.4rem] text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition duration-300 z-0">
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
              <Element name="Contacto">
                <Contact />
              </Element>
            </div>
          </div>
        </Container>

        <Footer />
        <PopupWidget />
      </div>
    </>
  );
};

export default FabricaSoft;

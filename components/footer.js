import Link from "next/link";
import Image from "next/image";
import Container from "./container";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion"; // Importamos motion para las animaciones

// Definición de iconos SVG para redes sociales
// (Se mantienen como están, son funcionales)
const Twitter = ({ size = 24 }) => (
  <svg
    role="img"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <title>X</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg
    role="img"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>GitHub</title>
    {/* Nota: Este icono es para GitHub, no Facebook. Si necesitas el icono de Facebook, deberías cambiar el SVG Path. */}
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
  </svg>
);

export default function Footer() {
  // Definición de enlaces para cada sección del footer
  const mainNavigation = [
    { name: "Inicio", to: "hero", isScrollLink: true },
    { name: "Servicios", to: "servicios", isScrollLink: true },
    { name: "Casos de uso", to: "useCases", isScrollLink: true },
    { name: "Seguridad", to: "seguridad", isScrollLink: true },
    { name: "Newsletter", to: "newsletter", isScrollLink: true },
  ];

  const services = [
    { name: "Soluciones AIMA", to: "/asistentes" },
    { name: "Fábrica de Software", to: "/fabricaSoft" },
    { name: "Asistentes inteligentes", to: "/asistentes-inteligentes" },
    { name: "Desarrollo Web", to: "/fabricaSoft" },
  ];

  const legal = [
    { name: "Términos de Servicio", to: "/terms" },
    { name: "Política de Privacidad", to: "/privacy" },
    { name: "Aviso Legal", to: "/legal" },
  ];

  return (
    // Contenedor principal del footer:
    // - `border-t border-gray-700`: Añade un borde superior gris oscuro para la división.
    // - `bg-[#1a202c] dark:bg-gray-900`: Define un color de fondo oscuro para que el footer destaque.
    //    He usado un gris oscuro que suele ser compatible con temas claros y oscuros.
    // - `pt-10`: Mantiene el padding superior.
    <div className="relative border-t border-gray-700 bg-[#1a202c] dark:bg-gray-900 pt-10">
      <Container>
        {/* Grid de columnas para el contenido del footer */}
        {/* Ajustado para 1 columna en móvil, 2 en sm, 3 en md y 5 en lg */}
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {/* Columna del Logo y Descripción */}
          <div className="lg:col-span-2">
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-bold text-gray-200 dark:text-gray-100"
              >
                {/* Lógica para mostrar logo blanco/negro según el tema */}
                <Image
                  src="/img-logo/logo-ethercode--sinfondo-blanco.png"
                  alt="EtherCode Logo"
                  width="32"
                  height="32"
                  className="w-14 hidden dark:block"
                  priority
                />
                <Image
                  src="/img-logo/logo-ethercode-sin-fondo-negro.png"
                  alt="EtherCode Logo"
                  width="32"
                  height="32"
                  className="w-14 block dark:hidden"
                  priority
                />
                <span>EtherCode</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-400 dark:text-gray-300 font-normal">
              EtherCode ofrece soluciones tecnológicas innovadoras para
              potenciar tu presencia en línea. Desarrolladas con las últimas
              tecnologías, nuestras herramientas están diseñadas para impulsar
              el éxito de startups y proyectos independientes. <br /> ¡Descubre
              el potencial de la tecnología con nosotros!
            </div>
          </div>

          {/* Columna de Navegación Principal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 dark:text-gray-50 mb-4">
              Navegación
            </h3>
            <div className="flex flex-col space-y-2">
              {mainNavigation.map((item, index) => {
                if (item.isScrollLink) {
                  return (
                    <ScrollLink
                      key={index}
                      to={item.to}
                      smooth={true}
                      duration={500}
                      className="text-gray-300 font-medium hover:text-[#00B4D8] cursor-pointer transition-colors duration-200"
                    >
                      {item.name}
                    </ScrollLink>
                  );
                }
                return (
                  <Link
                    key={index}
                    href={item.to}
                    className="text-gray-300 font-medium hover:text-[#00B4D8] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Columna de Servicios */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 dark:text-gray-50 mb-4">
              Nuestros Servicios
            </h3>
            <div className="flex flex-col space-y-2">
              {services.map((item, index) => (
                <Link
                  key={index}
                  href={item.to}
                  className="text-gray-300 font-medium hover:text-[#00B4D8] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Columna de Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 dark:text-gray-50 mb-4">
              Legal
            </h3>
            <div className="flex flex-col space-y-2">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href={item.to}
                  className="text-gray-300 font-medium hover:text-[#00B4D8] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Columna de Síguenos (Redes Sociales) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 dark:text-gray-50 mb-4">
              Síguenos
            </h3>
            <div className="flex mt-5 space-x-5 text-[#00B4D8]">
              {/* Contenedores motion.a para animaciones en los iconos de redes sociales */}
              <motion.a
                href="https://x.com/ethercode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en X (anteriormente Twitter)"
                whileHover={{ scale: 1.2, color: "#1DA1F2" }} // Efecto de escala y color al hacer hover
                transition={{ type: "spring", stiffness: 400, damping: 10 }} // Animación suave
              >
                <span className="sr-only">Twitter</span>
                <Twitter size={28} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/ethercode-software/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en LinkedIn"
                whileHover={{ scale: 1.2, color: "#0077B5" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="sr-only">Linkedin</span>
                <Linkedin size={28} />
              </motion.a>
              <motion.a
                href="https://github.com/ethercode-software"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visita nuestro GitHub"
                whileHover={{ scale: 1.2, color: "#6e5494" }} // Color de GitHub
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="sr-only">GitHub</span>
                {/* Nota: el componente Facebook contiene el SVG de GitHub. Considera renombrarlo a GitHub si es lo que quieres. */}
                <Facebook size={28} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/ethercode_software/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                whileHover={{ scale: 1.2, color: "#C13584" }} // Color de Instagram
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="sr-only">Instagram</span>
                <Instagram size={28} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Sección del botón "Sigue las noticias" */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-block px-8 py-4 text-lg font-semibold bg-gradient-to-r from--[#00B4D8] to--[#00B4E7] hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg shadow-md hover:bg-[#0096c7] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:ring-opacity-75 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            ¡Sigue las noticias más actuales!
          </Link>
        </div>

        {/* Sección de Copyright */}
        <div className="text-sm text-center text-gray-400 dark:text-gray-400 mt-5 mb-5">
          Copyright © {new Date().getFullYear()}. Hecho con{" "}
          <span className="text-red-500">♥</span> por {"EtherCode"}
        </div>
      </Container>
    </div>
  );
}

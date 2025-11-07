// Footer.js — ÉtherCode
// - Fondo continuo equilibrado (overlay por sección)
// - Gradientes vivos, micro-animaciones y hover glow
// - Accesibilidad mejorada + fixes (GitHub icon correcto)

import Link from "next/link";
import Image from "next/image";
import Container from "./container";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

// ==== Icons (SVG puros) ====
const XIcon = ({ size = 24 }) => (
  <svg role="img" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <title>X</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const GitHubIcon = ({ size = 24 }) => (
  <svg role="img" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const Instagram = ({ size = 24 }) => (
  <svg role="img" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <title>Instagram</title>
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg role="img" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <title>LinkedIn</title>
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
  </svg>
);

// ==== Footer ====
export default function Footer() {
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
    <footer
      className="relative border-t border-white/10 bg-[#0c0f1a] pt-12 text-white overflow-hidden"
      style={{
        ["--sec-mask-strength"]: 0.45,
        ["--sec-alpha"]: 0.06,
      }}
      aria-label="Footer"
    >
      {/* Overlay de equilibrio (mismo fondo global, sin duplicarlo) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 30%, rgba(10,17,40, var(--sec-alpha)), rgba(10,17,40, calc(var(--sec-alpha) + 0.02)) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
          maskImage:
            "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
        }}
      />

      {/* Línea superior glow */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400/40 via-fuchsia-400/40 to-indigo-400/40" />

      <Container>
        {/* Top row: brand + navs */}
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-6 mx-auto mt-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 text-2xl font-bold">
              {/* Logo dark/light */}
              <span className="relative inline-flex">
                <Image
                  src="/img-logo/ethercode-isotipo-white-1024.png"
                  alt="ÉtherCode Logo"
                  width={40}
                  height={40}
                  className="w-12 hidden dark:block"
                  priority
                />
                <Image
                  src="/img-logo/ethercode-isotipo-black-1024.png"
                  alt="ÉtherCode Logo"
                  width={40}
                  height={40}
                  className="w-12 block dark:hidden"
                  priority
                />
                {/* halo suave */}
                <span className="absolute -inset-2 rounded-full blur-md opacity-30 -z-10 bg-[conic-gradient(from_0deg_at_50%_50%,_#22d3ee44,_#e879f944,_#6366f144,_#22d3ee44)]" />
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300">
                ÉtherCode
              </span>
            </Link>

            <p className="max-w-md mt-4 text-white/70 text-sm leading-relaxed">
              Empleados digitales que combinan <span className="text-white">IA + humanos</span> para
              vender, atender y automatizar con control. Integraciones simples, onboarding en días y
              resultados medibles.
            </p>

            {/* Badges confianza */}
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/70">
              {["SLA 99.9%", "Logs & auditoría", "Fallback humano"].map((b) => (
                <span key={b} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Navegación principal */}
          <nav aria-label="Navegación del sitio">
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="flex flex-col space-y-2 text-white/80">
              {mainNavigation.map((item, index) => (
                <li key={index}>
                  {item.isScrollLink ? (
                    <ScrollLink
                      to={item.to}
                      smooth
                      duration={500}
                      className="cursor-pointer hover:text-white transition-colors"
                      offset={-80}
                    >
                      {item.name}
                    </ScrollLink>
                  ) : (
                    <Link href={item.to} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <nav aria-label="Servicios">
            <h3 className="text-lg font-semibold mb-4">Nuestros Servicios</h3>
            <ul className="flex flex-col space-y-2 text-white/80">
              {services.map((item, index) => (
                <li key={index}>
                  <Link href={item.to} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="flex flex-col space-y-2 text-white/80">
              {legal.map((item, index) => (
                <li key={index}>
                  <Link href={item.to} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex mt-2 space-x-5 text-white/90">
              <motion.a
                href="https://x.com/ethercode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                whileHover={{ scale: 1.15 }}
                className="hover:text-cyan-300 transition-colors"
              >
                <XIcon size={28} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/ethercode/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.15 }}
                className="hover:text-sky-400 transition-colors"
              >
                <Linkedin size={28} />
              </motion.a>
              <motion.a
                href="https://github.com/ethercode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ scale: 1.15 }}
                className="hover:text-fuchsia-300 transition-colors"
              >
                <GitHubIcon size={28} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/ethercode_tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.15 }}
                className="hover:text-pink-300 transition-colors"
              >
                <Instagram size={28} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* CTA Noticias / Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold
                       rounded-2xl shadow-lg transition will-change-transform
                       border border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <span className="absolute inset-0 -z-10 rounded-2xl opacity-40 blur-md [background:conic-gradient(from_140deg_at_50%_50%,_#22d3ee33,_#e879f933,_#6366f133,_#22d3ee33)]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300">
              ¡Sigue las noticias más actuales!
            </span>
          </Link>
        </div>

        {/* Divider degradado */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Bottom row */}
        <div className="mt-6 mb-8 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} • Hecho con <span className="text-red-400">♥</span> por ÉtherCode
          </p>

          {/* Mini links secundarios */}
          <div className="flex items-center gap-4 text-xs text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
            <ScrollLink to="hero" smooth duration={500} offset={-80} className="cursor-pointer hover:text-white transition-colors">
              Volver arriba
            </ScrollLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}

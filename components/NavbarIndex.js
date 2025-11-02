"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Container from "./container";

const Navbar = () => {
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const links = [
    {
      name: "Empleados Digitales",
      to: "/asistentes",
      description:
        "Empleados digitales potenciados con IA que trabajan día y noche y automatizan procesos clave sin errores ni descanso.",
    },
    {
      name: "Fábrica de Software",
      to: "/fabricaSoft",
      description:
        "Desarrollo a medida con tecnologías modernas y metodología flexible",
    },
  ];

  return (
    <>
      <div className="fixed top-0 z-10 w-full backdrop-blur-md">
        {/* Altura fija y centrado vertical */}
        <nav className="h-16 md:h-20 flex items-center">
          <Container className="w-full flex items-center justify-between">
            {/* IZQUIERDA: Logo + Nombre + Toggle mobile */}
            <div className="flex items-center w-full lg:w-auto">
              <Link href="/" className="no-underline">
                <span className="inline-flex items-center gap-2 text-2xl font-medium text-gray-200 dark:text-gray-100 leading-none">
                  {/* Misma dimensión para dark/light, sin clases de width adicionales */}
                  <Image
                    src="/img-logo/ethercode-isotipo-white-256.png"
                    alt="EtherCode"
                    width={40}
                    height={40}
                    className="hidden dark:block"
                    priority
                  />
                  <Image
                    src="/img-logo/ethercode-isotipo-black-1024.png"
                    alt="EtherCode"
                    width={40}
                    height={40}
                    className="block dark:hidden"
                    priority
                  />
                  <span className="leading-none">EtherCode</span>
                </span>
              </Link>

              {/* Toggle Mobile */}
              <button
                aria-label="Toggle Menu"
                className="ml-auto lg:hidden px-2 py-1 font-bold text-gray-500 rounded-md hover:text-[#4888CD] focus:text-white focus:bg-[#4888CD] focus:outline-none dark:text-gray-300"
                onClick={toggleMobileDropdown}
              >
                {mobileDropdownOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* DERECHA: Links + CTA (Desktop) */}
            <div className="hidden lg:flex items-center">
              <ul className="flex items-center justify-end list-none">
                {links.map((item, index) => (
                  <li key={index} className="group relative px-6 py-4">
                    <Link
                      href={item.to}
                      className="text-lg font-normal text-gray-200 rounded-md hover:text-[#4888CD] focus:text-white focus:bg-[#4888CD] focus:outline-none dark:text-gray-200 dark:hover:text-[#4888CD] dark:focus:bg-gray-800"
                    >
                      {item.name}
                    </Link>

                    {item.description && (
                      <div
                        className={`absolute top-full mt-2 whitespace-nowrap ${
                          index === links.length - 1
                            ? "right-0"
                            : "left-1/2 -translate-x-1/2"
                        } bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg z-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                      >
                        {item.description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="ml-4 animate-heartbeat">
                <Link
                  href="/kitInicialDigital"
                  id="cta-kit"
                  className="rounded-xl px-5 py-2 text-base font-semibold text-black shadow-lg transition-colors bg-gradient-to-r from-[#00B4D8] to-[#00B4E7] hover:from-blue-500 hover:to-blue-700"
                >
                  🚀 Conoce nuestro Kit Inicial Digital
                </Link>
              </div>
            </div>
          </Container>
        </nav>

        {/* DROPDOWN MOBILE (dentro del flow del Container) */}
        {mobileDropdownOpen && (
          <Container>
            <div className="my-5 flex w-full flex-wrap lg:hidden">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.to}
                  className="w-full rounded-md px-4 py-2 font-bold text-gray-900 hover:text-[#4888CD] focus:outline-none focus:bg-[#4888CD] focus:text-white dark:text-gray-100 dark:focus:bg-gray-800"
                  onClick={toggleMobileDropdown}
                >
                  {item.name}
                </Link>
              ))}

              <div className="animate-heartbeat w-full px-4 pt-4">
                <Link
                  href="/kitInicialDigital"
                  id="cta-kit"
                  className="rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#00B4E7] px-4 py-2 font-bold text-black shadow-lg transition hover:from-blue-500 hover:to-blue-700"
                  onClick={toggleMobileDropdown}
                >
                  🚀 Conoce nuestro Kit Inicial Digital
                </Link>
              </div>
            </div>
          </Container>
        )}
      </div>

      <style jsx global>{`
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.1);
          }
          28% {
            transform: scale(0.95);
          }
          42% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(1);
          }
        }
        .animate-heartbeat {
          animation: heartbeat 1.6s infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;

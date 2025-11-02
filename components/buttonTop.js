"use client";

import { Disclosure } from "@headlessui/react";
import { animateScroll as scroll } from "react-scroll";

const ButtonTop = () => {
  const handleToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: "easeInOutQuad",
      offset: 0,
    });
  };

  return (
    <Disclosure>
      {({ open }) => (
        <Disclosure.Button
          aria-label="Ir al inicio"
          onClick={handleToTop}
          className="fixed z-50 right-5 bottom-[7rem] w-14 h-14 rounded-full flex items-center justify-center
                     text-white bg-[#0077B6] transition duration-300 focus:outline-none"
          style={{
            filter: open ? "blur(0)" : "none",
            transition: "filter 0.3s",
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* Flecha hacia arriba */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </div>
          <div className="absolute w-full h-full rounded-full bg-[#0077B6] opacity-10 dark:bg-white transition hover:blur-xl" />
        </Disclosure.Button>
      )}
    </Disclosure>
  );
};

export default ButtonTop;

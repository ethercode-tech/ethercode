"use client";

import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    // Si hay historial, volvemos; si no, vamos al home
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Disclosure>
      {({ open }) => (
        <Disclosure.Button
          aria-label="Volver atrás"
          onClick={handleBack}
          className="fixed z-40 flex items-center justify-center transition duration-300 rounded-full right-5 bottom-[6rem] w-14 h-14 focus:outline-none text-white bg-[#0077B6] dark:text-white"
          style={{
            filter: open ? "blur(0)" : "none",
            transition: "filter 0.3s",
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <svg
              className="w-6 h-6 font-bold"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Flecha hacia la izquierda (Heroicons outline "ArrowLeft") */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </div>
          <div className="absolute w-full h-full rounded-full bg-[#0077B6] opacity-10 dark:bg-white transition hover:blur-xl"></div>
        </Disclosure.Button>
      )}
    </Disclosure>
  );
};

export default BackButton;

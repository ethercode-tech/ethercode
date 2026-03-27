"use client";

import { useEffect, useState } from "react";
import { trackEvent, GA_EVENTS } from "../lib/ga";

const ButtonTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToTop = () => {
    trackEvent?.(GA_EVENTS?.CTA_CLICK ?? "cta_click", {
      event_category: "engagement",
      event_label: "Scroll to top",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      aria-label="Ir al inicio"
      onClick={handleToTop}
      className="fixed z-30 right-4 bottom-[4.55rem] sm:right-5 sm:bottom-[5.2rem]
                 h-11 w-11 sm:h-12 sm:w-12 rounded-full flex items-center justify-center
                 text-white bg-[#1E9AE6] border border-white/15 shadow-lg
                 transition duration-200 hover:brightness-105 focus:outline-none"
    >
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>

    </button>
  );
};

export default ButtonTop;

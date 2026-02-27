"use client";

import { trackEvent, GA_EVENTS } from "../lib/ga";

const ButtonTop = () => {
  const handleToTop = () => {
    trackEvent?.(GA_EVENTS?.CTA_CLICK ?? "cta_click", {
      event_category: "engagement",
      event_label: "Scroll to top",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Ir al inicio"
      onClick={handleToTop}
      className="fixed z-50 right-5 bottom-[7rem] w-14 h-14 rounded-full flex items-center justify-center
                 text-white bg-[#0077B6] transition duration-300 focus:outline-none shadow-xl"
    >
      <svg
        className="w-6 h-6"
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

      {/* halo leve, sin blur extremo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-full opacity-0 hover:opacity-100 transition"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,119,182,.45), transparent 60%)",
          filter: "blur(10px)",
        }}
      />
    </button>
  );
};

export default ButtonTop;
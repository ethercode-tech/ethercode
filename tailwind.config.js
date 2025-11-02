const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 30s linear infinite",
      },
      colors: {
        // Paleta profesional EtherCode
        primaryBg: "transparent",          // Fondo principal
        secondaryBg: "#121933",        // Cards y fondos intermedios
        primaryText: "#FFFFFF",        // Títulos, textos importantes
        secondaryText: "#B0B3C3",      // Párrafos, descripciones
        accent: "#3F8CFF",             // Botones, enlaces, detalles activos
        emotion: "#48E0B8",            // Emocional, testimonios
        cta: "#FF5E5E",                // CTA y alertas

        trueGray: colors.neutral,      // Soporte extra
        customBg: "#f5f5f5",           // Solo si lo estás usando
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        stock: [defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        card: "0 4px 10px rgba(0,0,0,0.3)",
      },
      backgroundImage: {
        'ethercode-gradient': "linear-gradient(135deg, #0A0F2C 0%, #3F8CFF 100%)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animated"),
  ],
};


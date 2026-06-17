import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        indigo: { brand: "#1E3A8A" },
        saffron: "#F59E0B",
        teal: { brand: "#0EA5E9" },
        cream: "#FAF7F0",
        ink: "#0B1220",
        rose: { brand: "#E11D48" },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        bengali: ["var(--font-bengali)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        brand: "0 20px 60px -15px rgba(30,58,138,0.25)",
        "brand-lg": "0 30px 80px -20px rgba(30,58,138,0.35)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.15) translate(-1%, -1%)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 40s linear infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "ken-burns": "ken-burns 20s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;

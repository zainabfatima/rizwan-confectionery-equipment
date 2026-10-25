import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: "#0E2A33",
        cream: "#F4F7F6",
        caramel: "#E3B23C",
        cocoa: "#3E5964",
        charcoal: "#172126",
        bean: "#6B3F2A",
        berry: "#C23B5A",
        nougat: "#C4A46A",
        cereal: "#2F6B4F",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 18px 50px -28px rgba(14, 42, 51, 0.35)",
      },
      maxWidth: {
        page: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;

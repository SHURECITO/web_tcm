import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#c9a96e",
          light: "#e8c98a",
        },
        church: {
          bg: "#080808",
          card: "#111111",
          "off-white": "#f4f0e8",
        },
      },
    },
  },
  plugins: [],
};

export default config;

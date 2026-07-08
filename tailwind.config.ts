import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-heebo)", "sans-serif"],
        display: ["var(--font-suez)", "var(--font-heebo)", "serif"],
      },
      colors: {
        // "מלילה לזריחה" — night-to-sunrise luxury system.
        // Deep plum darkness, ember fire, champagne metal, parchment daylight.
        abyss: {
          800: "#2A1B36",
          900: "#1A1122",
          950: "#0F0A16",
        },
        ember: {
          50: "#FDF0EA",
          100: "#FADFD2",
          300: "#F5A98C",
          500: "#F26648",
          600: "#D94E33",
          700: "#A93A26",
        },
        champagne: {
          100: "#F7E8CF",
          400: "#E3B978",
          600: "#A87C3E",
        },
        parchment: "#FBF5EC",
        veil: "#F4EAE0",
        line: "#EADFD4",
        ink: "#241B26",
        mauve: "#6B5B6E",
      },
      boxShadow: {
        pop: "0 24px 48px -24px rgba(15,10,22,.35)",
      },
      maxWidth: {
        prose: "72ch",
      },
      keyframes: {
        "aurora-drift": {
          from: { transform: "translate3d(-4%, -2%, 0) rotate(0deg)" },
          to: { transform: "translate3d(4%, 3%, 0) rotate(6deg)" },
        },
      },
      animation: {
        aurora: "aurora-drift 45s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;

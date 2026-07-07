import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        assistant: ["var(--font-assistant)", "sans-serif"],
      },
      colors: {
        // "Family Umbrella" system — calm / warm / trust
        cream: "#FAF6EF",
        sand: "#F1E9DC",
        sage: {
          100: "#E7EDE7",
          600: "#556B5A",
          700: "#3E4F44",
        },
        terracotta: {
          100: "#F3E1D6",
          500: "#C67B54",
        },
        forest: {
          900: "#1E3A31",
        },
        ink: {
          DEFAULT: "#2B2B2B",
          soft: "#55524C",
        },
      },
      boxShadow: {
        soft: "0 8px 24px rgba(30,40,35,.06)",
        lift: "0 12px 32px rgba(30,40,35,.10)",
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;

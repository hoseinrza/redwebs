import type { Config } from "tailwindcss";

// Single hue family (crimson/ruby, not alert-red) so every token — logo,
// text, CTA, dark sections — reads as one unified "Redwebs" red.
const redwebs = {
  50: "#fef2f3",
  100: "#fde3e6",
  200: "#fbccd1",
  300: "#f7a4ac",
  400: "#f06f7c",
  500: "#e2374a",
  600: "#c41f36",
  700: "#a01a2d",
  800: "#841a29",
  900: "#6f1a26",
  950: "#3d0b12",
};

// Warm paper/charcoal neutrals — the page canvas reads as warm paper/board,
// not cold SaaS gray, so mounted "sign" cards (crisp white/ink) read as
// panels against it. Kept separate from the red brand scale.
const ink = {
  50: "#faf9f7",
  100: "#f2efe9",
  150: "#eae5db",
  200: "#e0d9cb",
  300: "#cabfa8",
  400: "#a99c80",
  500: "#7f7360",
  600: "#5d5346",
  700: "#453e34",
  800: "#2c2721",
  900: "#1c1814",
  950: "#100d0a",
};

// Brass hardware accent — used sparingly for the hero sign's bolts/chain and
// the small "rivet" motif on eyebrow chips. Never a wash.
const brass = {
  50: "#fbf6ec",
  100: "#f4e8cf",
  200: "#e8d19f",
  300: "#d9b46c",
  400: "#c89a49",
  500: "#b3813a",
  600: "#93692e",
  700: "#735326",
  800: "#5c4320",
  900: "#4a371c",
};

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: redwebs,
        accent: redwebs,
        ink,
        brass,
      },
      fontFamily: {
        sans: ["var(--font-vazir)", "Tahoma", "system-ui", "sans-serif"],
        display: ["var(--font-lalezar)", "var(--font-vazir)", "Tahoma", "system-ui", "sans-serif"],
        mono: ["var(--font-vazir)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 24px -6px rgb(16 13 10 / 0.1)",
        card: "0 1px 2px rgb(16 13 10 / 0.05), 0 8px 24px -12px rgb(16 13 10 / 0.1)",
        "card-hover": "0 1px 2px rgb(16 13 10 / 0.05), 0 16px 32px -12px rgb(16 13 10 / 0.16)",
        glow: "0 12px 44px -6px rgb(196 31 54 / 0.4)",
        sign: "0 2px 0 rgb(16 13 10 / 0.15), 0 24px 60px -16px rgb(16 13 10 / 0.55)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "grow-bar": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-4%, 5%) scale(1.1)" },
        },
        "drift-reverse": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(5%, -4%) scale(1.08)" },
        },
        swing: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgb(226 55 74 / 0.5)" },
          "50%": { opacity: "0.85", boxShadow: "0 0 0 6px rgb(226 55 74 / 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 9s ease-in-out infinite",
        "grow-bar": "grow-bar 0.6s ease-out forwards",
        drift: "drift 14s ease-in-out infinite",
        "drift-slow": "drift-reverse 18s ease-in-out infinite",
        swing: "swing 7s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
      transformOrigin: {
        "top-center": "top center",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        mist: "hsl(var(--mist))",
        paper: "hsl(var(--paper))",
        ink: "hsl(var(--ink))",
        // fennr yellow — exact #FFD21E
        accent: {
          DEFAULT: "hsl(var(--accent))",
          soft: "hsl(var(--accent-soft))",
        },
        slatey: "hsl(var(--slatey))",
        hairline: "hsl(var(--hairline))",
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        numeral: ["var(--font-numeral)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "drift-y": {
          "0%, 100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "spin-slower": "spin-slow 38s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "drift-y": "drift-y 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

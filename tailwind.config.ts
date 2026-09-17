import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chilli: {
          50: "#fff1ef",
          100: "#ffdfda",
          200: "#ffc2b9",
          300: "#ff9987",
          400: "#fb6b52",
          500: "#ef4423",
          600: "#dc2a15",
          700: "#b71f11",
          800: "#961c13",
          900: "#7c1c15",
        },
        masala: {
          50: "#fffaeb",
          100: "#fff1c6",
          200: "#ffe088",
          300: "#ffc94a",
          400: "#ffb320",
          500: "#f99007",
          600: "#dd6902",
          700: "#b74906",
          800: "#94380c",
          900: "#7a2f0d",
        },
        charcoal: {
          700: "#302320",
          800: "#231a17",
          900: "#17100e",
          950: "#0d0807",
        },
        cream: "#fffaf3",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(35, 26, 23, 0.45)",
        glow: "0 0 0 4px rgba(239, 68, 35, 0.18)",
      },
      backgroundImage: {
        "spice-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" },
        },
        steam: {
          "0%": { opacity: "0", transform: "translateY(6px) scale(0.9)" },
          "45%": { opacity: "0.7" },
          "100%": { opacity: "0", transform: "translateY(-18px) scale(1.15)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 6s ease-in-out infinite",
        steam: "steam 2.8s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

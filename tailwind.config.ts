import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#06060f",
        accent: "#93c5fd",
        "accent-dim": "rgba(147, 197, 253, 0.6)",
        "text-primary": "#e2e8f0",
        "text-muted": "rgba(226, 232, 240, 0.55)",
        "text-faint": "rgba(226, 232, 240, 0.35)",
        border: "rgba(147, 197, 253, 0.08)",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Outfit", "sans-serif"],
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        float: "float 8s ease-in-out infinite",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "float-slower": "float-slow 16s ease-in-out infinite 3s",
        orbit: "orbit 10s linear infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(180px)" },
          "100%": { transform: "rotate(360deg) translateX(180px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

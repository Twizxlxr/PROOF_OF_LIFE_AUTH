import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#1E2340",
          light: "#2A3055",
          card: "#252B4A",
          border: "#3A4170",
          hover: "#333A62",
        },
        ivory: {
          DEFAULT: "#F5F0EB",
          muted: "#A8AEBF",
          dim: "#7A8099",
        },
        accent: {
          DEFAULT: "#E97F4A",
          light: "#F09D6E",
          dark: "#D06835",
          glow: "rgba(233, 127, 74, 0.15)",
        },
        teal: {
          DEFAULT: "#607B8F",
          light: "#7D9AAE",
          dark: "#4A6475",
          glow: "rgba(96, 123, 143, 0.15)",
        },
        rose: {
          DEFAULT: "#D4654A",
          light: "#E0816B",
          glow: "rgba(212, 101, 74, 0.15)",
        },
        success: {
          DEFAULT: "#F7E396",
          light: "#FAECB3",
          glow: "rgba(247, 227, 150, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        heading: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h1": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h3": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.7" }],
        "small": ["0.875rem", { lineHeight: "1.6" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        "glow-accent": "0 0 30px rgba(233, 127, 74, 0.12), 0 0 60px rgba(233, 127, 74, 0.05)",
        "glow-teal": "0 0 30px rgba(96, 123, 143, 0.12), 0 0 60px rgba(96, 123, 143, 0.05)",
        "glow-rose": "0 0 30px rgba(212, 101, 74, 0.12), 0 0 60px rgba(212, 101, 74, 0.05)",
        "glow-success": "0 0 30px rgba(247, 227, 150, 0.12), 0 0 60px rgba(247, 227, 150, 0.05)",
        "card": "0 1px 3px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.15)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.4), 0 16px 48px rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #E97F4A, #607B8F)",
        "gradient-warm": "linear-gradient(135deg, #E97F4A, #F7E396)",
      },
    },
  },
  plugins: [],
};
export default config;

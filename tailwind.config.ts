import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        // Siena section: mirrors sienalv.org's Roboto Condensed (headings) / Quicksand (accents)
        "siena-heading": ["var(--font-siena-heading)", "sans-serif"],
        "siena-body": ["var(--font-siena-body)", "sans-serif"],
      },
      colors: {
        // Siena Community Association brand colors, matched from sienalv.org (css/css.css)
        siena: {
          teal: "#19A8A0",
          "teal-dark": "#07403D",
          brown: "#6c5043",
          "brown-light": "#8b776c",
          cream: "#F2F4F7",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

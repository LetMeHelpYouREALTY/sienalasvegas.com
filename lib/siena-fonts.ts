/**
 * Fonts for the Siena 55+ community section — matched to sienalv.org, which
 * uses Roboto Condensed (uppercase headings) and Quicksand (accents/footer).
 * Loaded once here and applied via CSS variables + Tailwind's `font-siena-*`
 * utilities so the rest of the site keeps its default Geist Sans typeface.
 */
import { Roboto_Condensed, Quicksand } from "next/font/google";

export const sienaHeadingFont = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-siena-heading",
  display: "swap",
});

export const sienaBodyFont = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-siena-body",
  display: "swap",
});

export const sienaFontVariables = `${sienaHeadingFont.variable} ${sienaBodyFont.variable}`;

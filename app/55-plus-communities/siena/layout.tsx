import type React from "react";
import { sienaFontVariables } from "@/lib/siena-fonts";

// Applies the Siena section's typeface variables (Roboto Condensed / Quicksand)
// so every page under /55-plus-communities/siena matches sienalv.org's look.
export default function SienaSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sienaFontVariables} font-siena-body`}>{children}</div>
  );
}

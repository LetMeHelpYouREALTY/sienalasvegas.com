"use client";

import dynamic from "next/dynamic";

const CalendlyBadge = dynamic(
  () => import("@/components/calendly/CalendlyBadge"),
  { ssr: false }
);

export default CalendlyBadge;

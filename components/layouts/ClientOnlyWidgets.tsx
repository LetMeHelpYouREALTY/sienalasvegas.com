"use client";

import dynamic from "next/dynamic";

// next/dynamic with ssr: false must live in a Client Component (Next 15+).
export const AIChatWidget = dynamic(
  () => import("@/components/chat/AIChatWidget"),
  { ssr: false },
);

export const CalendlyBadge = dynamic(
  () => import("@/components/calendly/CalendlyBadge"),
  { ssr: false },
);

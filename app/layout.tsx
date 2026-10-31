import "./globals.css";

import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "lib/utils";
import SchemaScript from "@/components/SchemaScript";
import PathBreadcrumbSchema from "@/components/PathBreadcrumbSchema";

import {
  AIChatWidget,
  CalendlyBadge,
} from "@/components/layouts/ClientOnlyWidgets";
import {
  generateRealEstateAgentSchema,
  generateWebSiteSchema,
  combineSchemas,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { DEFAULT_OG_IMAGE } from "@/lib/metadata";

const title =
  "Siena Las Vegas Real Estate | 55+ Communities | Dr. Jan Duffy, REALTOR®";
const description =
  "Siena and Las Vegas 55+ communities. Dr. Jan Duffy—Siena golf, guard-gated living, Community Center. Call (702) 500-1942.";
const url = siteConfig.url;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${siteConfig.brandLine}`,
  },
  description,
  metadataBase: new URL(url),
  keywords: [
    "Siena Las Vegas",
    "Siena real estate",
    "55+ communities Las Vegas",
    "Berkshire Hathaway HomeServices Nevada Properties",
    "Dr. Jan Duffy",
    "Las Vegas real estate",
    "Siena golf",
    "guard-gated 55+",
    "Siena Monte Avenue",
    "sienalasvegas.com",
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
    title,
    description,
  },
  icons: {
    icon: "/favicon-32x32.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Canonical is set per-page via buildPageMetadata() so each page has its own canonical URL.
  // Google Search Console: set GOOGLE_SITE_VERIFICATION in env to your meta tag content value
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

// Combined site-wide schemas using the schema utility
const siteWideSchemas = combineSchemas(
  generateRealEstateAgentSchema(),
  generateWebSiteSchema(),
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth antialiased"
      style={{ colorScheme: "light" }}
    >
      <head>
        <meta name="color-scheme" content="light" />
        {/* Sitemap for crawlers and Google Search Console */}
        <link
          rel="sitemap"
          type="application/xml"
          href={`${siteConfig.url}/sitemap.xml`}
        />
        {/* Preconnect to key third-party origins to reduce LCP (Lighthouse) */}
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://em.realscout.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Site-wide JSON-LD Schema: RealEstateAgent + WebSite */}
        <SchemaScript schema={siteWideSchemas} id="site-schema" />
        <PathBreadcrumbSchema />
        {/* Google Analytics - lazyOnload to reduce main-thread work during LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WB5DLLZ4C6"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WB5DLLZ4C6');
          `}
        </Script>
        {/* RealScout Widget Script - loaded once globally, deferred to avoid blocking */}
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          type="module"
          strategy="lazyOnload"
        />
        {/* Calendly Widget Script - loaded once globally */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          "antialiased bg-white text-sm md:text-base text-slate-800",
        )}
      >
        {children}
        <AIChatWidget />
        <CalendlyBadge />
        <Analytics />
      
        {/* Follow Up Boss pixel (Widget Tracker) */}
        <Script id="fub-widget-tracker" strategy="afterInteractive">{`
if(location.hostname.slice(-11)!==".vercel.app"&&location.hostname!=="localhost"){(function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
{(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
(t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
e.parentNode.insertBefore(t,e);})
(window,"https://widgetbe.com/agent",document,"widgetTracker");
window.widgetTracker("create", "WT-XQHVYQWW");
window.widgetTracker("send", "pageview");}
        `}</Script>
</body>
    </html>
  );
}

import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// Default social-share image for pages that don't provide their own.
// Used for Open Graph / Twitter Card previews (Google Search, Discover,
// and social platforms all read these tags).
export const DEFAULT_OG_IMAGE = {
  url: `${siteConfig.url}/Image/summerlin-las-vegas-luxury-desert-home-sunset.jpg`,
  width: 1536,
  height: 1024,
  alt: "Luxury desert home for sale in Summerlin, Las Vegas NV — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties",
};

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Override the default OG/Twitter image for this page */
  image?: { url: string; width?: number; height?: number; alt: string };
}

/**
 * Builds per-page metadata with correct canonical URL, Open Graph, and Twitter.
 * Use on every page so canonical and social previews are page-specific, not homepage.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image,
}: PageMetadataInput): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${siteConfig.url}${normalizedPath}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

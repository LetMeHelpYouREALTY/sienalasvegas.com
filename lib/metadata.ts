import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// Default social-share image for pages that don't provide their own.
// Used for Open Graph / Twitter Card previews (Google Search, Discover,
// and social platforms all read these tags). Purpose-built branded card
// (not a bare listing photo) so shared links carry the Siena Las Vegas
// name, tagline, agent NAP, and phone CTA directly in the preview.
export const DEFAULT_OG_IMAGE = {
  url: `${siteConfig.url}/Image/siena-las-vegas-55-plus-golf-community-social-share.jpg`,
  width: 1536,
  height: 1024,
  alt: "Siena Las Vegas 55+ golf course community — luxury desert home at sunset with mountain views. Dr. Jan Duffy, REALTOR, Berkshire Hathaway HomeServices Nevada Properties. Call (702) 500-1942.",
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

import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Note: Next.js serves this dynamic route in place of any static
// public/robots.txt (they cannot coexist — the app/ route wins), so this
// is the single source of truth for robots rules. Keep it in sync with
// docs/google-search-console.md.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/monitoring/"],
      },
      // Throttle aggressive SEO-tool crawlers rather than blocking them
      { userAgent: "AhrefsBot", crawlDelay: 10 },
      { userAgent: "SemrushBot", crawlDelay: 10 },
      { userAgent: "Bingbot", crawlDelay: 5 },
      // Block AI training crawlers that don't need to index this site
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      // Allow Google's AI (SGE / AI Overviews) and image indexing
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Googlebot-Image", allow: ["/", "/_next/image"] },
      // Social preview / link-unfurl bots
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "PinterestBot", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

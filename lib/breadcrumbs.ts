import type { BreadcrumbItem } from "@/lib/schema";

/** Human-readable labels for URL path segments (lowercase slug → display name). */
const SEGMENT_LABELS: Record<string, string> = {
  "55-plus-communities": "55+ Communities",
  buyers: "Buyers",
  sellers: "Sellers",
  neighborhoods: "Neighborhoods",
  listings: "Listings",
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  services: "Services",
  relocation: "Relocation",
  siena: "Siena",
  amenities: "Amenities",
  community: "Community",
  "local-attractions": "Local Attractions",
  "events-activities": "Events & Activities",
  "clubs-groups": "Clubs & Groups",
  "first-time-buyers": "First-Time Buyers",
  "california-relocator": "California Relocator",
  "luxury-homes-las-vegas": "Luxury Homes Las Vegas",
  "divorce-probate": "Divorce & Probate",
  downsizing: "Downsizing",
  "move-up": "Move-Up",
  "home-valuation": "Home Valuation",
  "market-insights": "Market Insights",
  "market-report": "Market Report",
  "market-update": "Market Update",
  "why-berkshire-hathaway": "About",
  "new-construction": "New Construction",
  "investment-properties": "Investment Properties",
  "luxury-homes": "Luxury Homes",
  "google-business": "Google Business",
  "security-policy": "Security Policy",
  "del-webb-lake-las-vegas": "Del Webb Lake Las Vegas",
  "sun-city-summerlin": "Sun City Summerlin",
  "sun-city-anthem": "Sun City Anthem",
  "sun-city-aliante": "Sun City Aliante",
  "solera-anthem": "Solera Anthem",
  "trilogy-summerlin": "Trilogy Summerlin",
  "heritage-stonebridge": "Heritage Stonebridge",
  summerlin: "Summerlin",
  henderson: "Henderson",
  "southern-highlands": "Southern Highlands",
  "mountains-edge": "Mountains Edge",
  "centennial-hills": "Centennial Hills",
  "north-las-vegas": "North Las Vegas",
  "green-valley": "Green Valley",
  "the-ridges": "The Ridges",
  "skye-canyon": "Skye Canyon",
  inspirada: "Inspirada",
};

function formatSegmentLabel(segment: string, parentSegment?: string): string {
  if (parentSegment === "listings" && segment !== "listings") {
    return "Property Details";
  }
  const known = SEGMENT_LABELS[segment.toLowerCase()];
  if (known) return known;
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Build breadcrumb trail items for an inner page path (e.g. /55-plus-communities/siena).
 * Returns null for the homepage.
 */
export function buildBreadcrumbItemsFromPath(pathname: string): BreadcrumbItem[] | null {
  const normalized = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  if (normalized === "/" || normalized === "") {
    return null;
  }

  const segments = normalized.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ name: "Home", url: "/" }];

  let accumulated = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const parent = i > 0 ? segments[i - 1] : undefined;
    accumulated += `/${segment}`;
    items.push({
      name: formatSegmentLabel(segment, parent),
      url: accumulated,
    });
  }

  return items;
}

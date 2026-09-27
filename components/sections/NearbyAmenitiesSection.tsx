import Link from "next/link";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { communityMapCenter, nearbyAmenitiesPagePath } from "@/lib/nearby-amenities";

const AmenityMap = dynamic(() => import("@/components/maps/AmenityMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500"
      style={{ minHeight: 420, height: 420 }}
      aria-busy="true"
    >
      Loading map…
    </div>
  ),
});

type NearbyAmenitiesSectionProps = {
  /** e.g. "Siena" */
  communityName?: string;
  title?: string;
  className?: string;
  /** Lighter background on inner pages */
  variant?: "default" | "siena";
};

export default function NearbyAmenitiesSection({
  communityName = "Siena",
  title,
  className = "",
  variant = "default",
}: NearbyAmenitiesSectionProps) {
  const heading = title ?? `Life Near ${communityName} — What's Nearby`;

  const sectionBg =
    variant === "siena" ? "bg-siena-cream border-y border-siena-brown/20" : "bg-slate-50";

  return (
    <section
      className={`py-16 md:py-20 ${sectionBg} ${className}`}
      aria-labelledby="nearby-amenities-heading"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Hyperlocal map
              </span>
            </div>
            <h2
              id="nearby-amenities-heading"
              className={
                variant === "siena"
                  ? "font-siena-heading uppercase tracking-wide text-3xl md:text-4xl font-bold text-siena-teal"
                  : "text-3xl md:text-4xl font-bold text-slate-900"
              }
            >
              {heading}
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl">
              Healthcare, golf, parks, grocery, and shopping around {communityName} (
              {communityMapCenter.address}). Filter the map by category, then see the full guide
              with drive times and FAQs.
            </p>
          </div>
          <Link
            href={nearbyAmenitiesPagePath}
            className={
              variant === "siena"
                ? "inline-flex shrink-0 items-center justify-center rounded-lg bg-siena-teal px-5 py-3 font-semibold text-white hover:bg-siena-teal-dark transition-colors"
                : "inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            }
          >
            Nearby amenities guide →
          </Link>
        </div>
        <AmenityMap showCuratedList={false} />
      </div>
    </section>
  );
}

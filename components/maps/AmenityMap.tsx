"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  amenityCategories,
  communityMapCenter,
  curatedNearbyPlaces,
  type AmenityCategoryId,
} from "@/lib/nearby-amenities";
import { cn } from "@/lib/utils";

const MAP_MIN_HEIGHT = 420;

type MapPlaceResult = {
  id: string;
  name: string;
  address?: string;
  rating?: number;
  lat: number;
  lng: number;
};

function directionsUrl(lat: number, lng: number, name: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${lat},${lng}`
  )}&destination_place_id=${encodeURIComponent(name)}`;
}

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("No window"));
      return;
    }
    if (window.google?.maps) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-amenity-map="google-maps"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Script load failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&loading=async`;
    script.async = true;
    script.defer = true;
    script.dataset.amenityMap = "google-maps";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
}

async function searchNearbyPlaces(
  categoryId: AmenityCategoryId,
  center: google.maps.LatLngLiteral
): Promise<MapPlaceResult[]> {
  const category = amenityCategories.find((c) => c.id === categoryId);
  if (!category || !window.google?.maps?.importLibrary) {
    return [];
  }

  try {
    const placesLib = (await window.google.maps.importLibrary(
      "places"
    )) as google.maps.PlacesLibrary;
    const { Place } = placesLib;

    const request: google.maps.places.SearchNearbyRequest = {
      fields: ["displayName", "formattedAddress", "location", "rating", "id"],
      locationRestriction: {
        center,
        radius: 8000,
      },
      includedPrimaryTypes: category.placeTypes,
      maxResultCount: 12,
    };

    const { places } = await Place.searchNearby(request);

    const results: MapPlaceResult[] = [];
    places.forEach((place, index) => {
      const loc = place.location;
      if (!loc) return;
      const displayName =
        typeof place.displayName === "string"
          ? place.displayName
          : (place.displayName as { text?: string } | undefined)?.text ?? "Place";
      results.push({
        id: place.id ?? `${categoryId}-${index}`,
        name: displayName,
        address: place.formattedAddress ?? undefined,
        rating: place.rating ?? undefined,
        lat: loc.lat(),
        lng: loc.lng(),
      });
    });
    return results;
  } catch {
    return [];
  }
}

type AmenityMapProps = {
  className?: string;
  /** Show compact static list under map (always shown in fallback) */
  showCuratedList?: boolean;
};

export default function AmenityMap({ className, showCuratedList = true }: AmenityMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  const containerRef = useRef<HTMLDivElement>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapInitializedRef = useRef(false);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>("healthcare");
  const [mapStatus, setMapStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [useFallback, setUseFallback] = useState(!apiKey);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const showInfo = useCallback((content: string, position: google.maps.LatLngLiteral) => {
    if (!mapRef.current || !window.google?.maps) return;
    if (!infoWindowRef.current) {
      infoWindowRef.current = new window.google.maps.InfoWindow();
    }
    infoWindowRef.current.setContent(content);
    infoWindowRef.current.setPosition(position);
    infoWindowRef.current.open(mapRef.current);
  }, []);

  const addCommunityMarker = useCallback(() => {
    if (!mapRef.current || !window.google?.maps) return;
    if (communityMarkerRef.current) {
      communityMarkerRef.current.setMap(null);
    }
    const position = { lat: communityMapCenter.lat, lng: communityMapCenter.lng };
    communityMarkerRef.current = new window.google.maps.Marker({
      map: mapRef.current,
      position,
      title: communityMapCenter.label,
      zIndex: 1000,
    });
    communityMarkerRef.current.addListener("click", () => {
      showInfo(
        `<div style="max-width:240px"><strong>${communityMapCenter.label}</strong><br/>${communityMapCenter.address}<br/><a href="https://www.google.com/maps/search/?api=1&query=${communityMapCenter.lat},${communityMapCenter.lng}" target="_blank" rel="noopener">Directions</a></div>`,
        position
      );
    });
  }, [showInfo]);

  const renderPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || !window.google?.maps) return;
      clearMarkers();
      addCommunityMarker();

      const results = await searchNearbyPlaces(categoryId, {
        lat: communityMapCenter.lat,
        lng: communityMapCenter.lng,
      });

      results.forEach((place) => {
        const position = { lat: place.lat, lng: place.lng };
        const marker = new window.google.maps.Marker({
          map: mapRef.current!,
          position,
          title: place.name,
        });
        const ratingLine =
          place.rating !== undefined ? `<br/>Rating: ${place.rating.toFixed(1)}` : "";
        const addressLine = place.address ? `<br/>${place.address}` : "";
        const dir = directionsUrl(place.lat, place.lng, place.name);
        marker.addListener("click", () => {
          showInfo(
            `<div style="max-width:260px"><strong>${place.name}</strong>${ratingLine}${addressLine}<br/><a href="${dir}" target="_blank" rel="noopener">Directions</a></div>`,
            position
          );
        });
        markersRef.current.push(marker);
      });

      if (results.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: communityMapCenter.lat, lng: communityMapCenter.lng });
        results.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
        mapRef.current.fitBounds(bounds, 48);
      }
    },
    [addCommunityMarker, clearMarkers, showInfo]
  );

  const initMap = useCallback(async () => {
    if (!apiKey || !mapDivRef.current || mapInitializedRef.current) return;
    setMapStatus("loading");
    try {
      await loadGoogleMapsScript(apiKey);
      await new Promise<void>((r) => {
        requestAnimationFrame(() => r());
      });
      if (!window.google?.maps) {
        throw new Error("Google Maps unavailable");
      }
      mapRef.current = new window.google.maps.Map(mapDivRef.current, {
        center: { lat: communityMapCenter.lat, lng: communityMapCenter.lng },
        zoom: 13,
        mapId: mapId || undefined,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      mapInitializedRef.current = true;
      setMapStatus("ready");
      setUseFallback(false);
      await renderPlaces(activeCategory);
    } catch {
      setMapStatus("error");
      setUseFallback(true);
    }
  }, [activeCategory, apiKey, mapId, renderPlaces]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && apiKey && !useFallback) {
      void initMap();
    }
  }, [isInView, apiKey, useFallback, initMap]);

  useEffect(() => {
    if (mapStatus === "ready") {
      void renderPlaces(activeCategory);
    }
  }, [activeCategory, mapStatus, renderPlaces]);

  const embedSrc = `https://www.google.com/maps?q=${communityMapCenter.lat},${communityMapCenter.lng}&z=14&output=embed`;

  const filteredCurated = curatedNearbyPlaces.filter((p) => p.category === activeCategory);

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label="Filter nearby amenities by category"
        className="flex flex-wrap gap-2 mb-4"
      >
        {amenityCategories.map((cat) => {
          const selected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="amenity-map-panel"
              id={`amenity-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div
        id="amenity-map-panel"
        role="tabpanel"
        aria-labelledby={`amenity-tab-${activeCategory}`}
        className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100"
        style={{ minHeight: MAP_MIN_HEIGHT, height: MAP_MIN_HEIGHT }}
      >
        {useFallback ? (
          <iframe
            title={`Map of ${communityMapCenter.label}, Las Vegas`}
            src={embedSrc}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <>
            <div ref={mapDivRef} className="absolute inset-0 w-full h-full" aria-label="Interactive map of nearby amenities" />
            {mapStatus === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80 text-slate-600 text-sm">
                Loading map…
              </div>
            )}
          </>
        )}
      </div>

      {showCuratedList && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Featured places — {amenityCategories.find((c) => c.id === activeCategory)?.label}
          </h3>
          {filteredCurated.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {filteredCurated.map((place) => (
                <li
                  key={place.name}
                  className="rounded-lg border border-slate-200 bg-white p-4 text-sm"
                >
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  <p className="text-slate-600 mt-1">{place.address}</p>
                  {place.note && <p className="text-slate-500 mt-1">{place.note}</p>}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${place.name}, ${place.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:underline font-medium"
                  >
                    Directions
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-600 text-sm">
              Explore other categories for curated highlights, or open the full{" "}
              <a href={embedSrc.replace("&output=embed", "")} className="text-blue-600 hover:underline">
                map centered on Siena
              </a>
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}

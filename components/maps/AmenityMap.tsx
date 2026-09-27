"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  amenityCategories,
  communityMapCenter,
  curatedNearbyPlaces,
  type AmenityCategoryId,
} from "@/lib/nearby-amenities";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/google-maps-loader";
import { searchCategory, type NearbyPlaceResult } from "@/lib/places-search";
import { cn } from "@/lib/utils";

const MAP_MIN_HEIGHT = 420;

function directionsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${lat},${lng}`)}`;
}

function buildPlaceInfoContent(
  name: string,
  options: { address?: string; directionsHref: string }
): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "260px";

  const title = document.createElement("strong");
  title.textContent = name;
  wrap.appendChild(title);

  if (options.address) {
    wrap.appendChild(document.createElement("br"));
    const addr = document.createElement("span");
    addr.textContent = options.address;
    wrap.appendChild(addr);
  }

  wrap.appendChild(document.createElement("br"));
  const link = document.createElement("a");
  link.href = options.directionsHref;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Directions";
  wrap.appendChild(link);

  return wrap;
}

function buildCommunityInfoContent(): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "240px";

  const title = document.createElement("strong");
  title.textContent = communityMapCenter.label;
  wrap.appendChild(title);

  wrap.appendChild(document.createElement("br"));
  const addr = document.createElement("span");
  addr.textContent = communityMapCenter.address;
  wrap.appendChild(addr);

  wrap.appendChild(document.createElement("br"));
  const link = document.createElement("a");
  link.href = `https://www.google.com/maps/search/?api=1&query=${communityMapCenter.lat},${communityMapCenter.lng}`;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Directions";
  wrap.appendChild(link);

  return wrap;
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
  const [livePlaces, setLivePlaces] = useState<NearbyPlaceResult[] | null>(null);
  const [placesSearchFailed, setPlacesSearchFailed] = useState(false);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const showInfo = useCallback((content: HTMLElement, position: google.maps.LatLngLiteral) => {
    if (!mapRef.current || !window.google?.maps) return;
    if (!infoWindowRef.current) {
      infoWindowRef.current = new window.google.maps.InfoWindow();
    }
    infoWindowRef.current.setContent(content);
    infoWindowRef.current.setPosition(position);
    infoWindowRef.current.open(mapRef.current);
  }, []);

  const enterFallback = useCallback(() => {
    infoWindowRef.current?.close();
    clearMarkers();
    communityMarkerRef.current?.setMap(null);
    communityMarkerRef.current = null;
    mapRef.current = null;
    mapInitializedRef.current = false;
    setLivePlaces(null);
    setMapStatus("error");
    setUseFallback(true);
  }, [clearMarkers]);

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
      showInfo(buildCommunityInfoContent(), position);
    });
  }, [showInfo]);

  const renderPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || !window.google?.maps || useFallback) return;
      clearMarkers();
      addCommunityMarker();
      setPlacesSearchFailed(false);
      setLivePlaces(null);

      try {
        const results = await searchCategory(
          { lat: communityMapCenter.lat, lng: communityMapCenter.lng },
          categoryId
        );
        setLivePlaces(results);

        results.forEach((place) => {
          const position = { lat: place.lat, lng: place.lng };
          const marker = new window.google.maps.Marker({
            map: mapRef.current!,
            position,
            title: place.name,
          });
          const dir = place.mapsUri ?? directionsUrl(place.lat, place.lng);
          marker.addListener("click", () => {
            showInfo(
              buildPlaceInfoContent(place.name, {
                address: place.address,
                directionsHref: dir,
              }),
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
      } catch {
        setPlacesSearchFailed(true);
        setLivePlaces([]);
      }
    },
    [addCommunityMarker, clearMarkers, showInfo, useFallback]
  );

  const initMap = useCallback(async () => {
    if (!apiKey || !mapDivRef.current || mapInitializedRef.current || useFallback) return;
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    setMapStatus("loading");
    try {
      await loadGoogleMaps(apiKey);
      if (!window.google?.maps?.importLibrary) {
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
      enterFallback();
    }
  }, [activeCategory, apiKey, enterFallback, mapId, renderPlaces, useFallback]);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

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
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    if (isInView && apiKey && !useFallback) {
      void initMap();
    }
  }, [isInView, apiKey, useFallback, initMap, enterFallback]);

  useEffect(() => {
    if (mapStatus === "ready" && !useFallback) {
      void renderPlaces(activeCategory);
    }
  }, [activeCategory, mapStatus, renderPlaces, useFallback]);

  const embedSrc = `https://www.google.com/maps?q=${communityMapCenter.lat},${communityMapCenter.lng}&z=14&output=embed`;

  const filteredCurated = curatedNearbyPlaces.filter((p) => p.category === activeCategory);
  const showCuratedForCategory =
    useFallback || placesSearchFailed || (livePlaces !== null && livePlaces.length === 0);

  const listPlaces = showCuratedForCategory ? filteredCurated : [];

  const placesListLoading =
    !useFallback && mapStatus === "ready" && livePlaces === null && !placesSearchFailed;

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
            <div
              ref={mapDivRef}
              className="absolute inset-0 w-full h-full"
              aria-label="Interactive map of nearby amenities"
            />
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
            {showCuratedForCategory ? "Featured places" : "Map results"} —{" "}
            {amenityCategories.find((c) => c.id === activeCategory)?.label}
          </h3>
          {showCuratedForCategory && listPlaces.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {listPlaces.map((place) => (
                <li
                  key={place.name}
                  className="rounded-lg border border-slate-200 bg-white p-4 text-sm"
                >
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  {place.address && <p className="text-slate-600 mt-1">{place.address}</p>}
                  {place.note && <p className="text-slate-500 mt-1">{place.note}</p>}
                  <a
                    href={
                      place.address
                        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${place.name}, ${place.address}`
                          )}`
                        : place.sourceUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:underline font-medium"
                  >
                    {place.address ? "Directions" : "Official site"}
                  </a>
                </li>
              ))}
            </ul>
          ) : placesListLoading ? (
            <p className="text-slate-600 text-sm">Loading nearby places…</p>
          ) : !showCuratedForCategory && livePlaces && livePlaces.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {livePlaces.map((place) => (
                <li
                  key={place.id}
                  className="rounded-lg border border-slate-200 bg-white p-4 text-sm"
                >
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  {place.address && <p className="text-slate-600 mt-1">{place.address}</p>}
                  <a
                    href={place.mapsUri ?? directionsUrl(place.lat, place.lng)}
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

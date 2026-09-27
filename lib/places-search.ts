import type { AmenityCategoryId } from "@/lib/nearby-amenities";
import { amenityCategories } from "@/lib/nearby-amenities";

export type NearbyPlaceResult = {
  id: string;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  mapsUri?: string;
};

const cache = new Map<string, Promise<NearbyPlaceResult[]>>();

function placeDisplayName(displayName: unknown): string {
  if (!displayName) return "Place";
  if (typeof displayName === "string") return displayName;
  if (
    typeof displayName === "object" &&
    displayName !== null &&
    "text" in displayName &&
    typeof (displayName as { text?: string }).text === "string"
  ) {
    return (displayName as { text: string }).text;
  }
  return "Place";
}

export function searchCategory(
  center: google.maps.LatLngLiteral,
  categoryId: AmenityCategoryId
): Promise<NearbyPlaceResult[]> {
  const category = amenityCategories.find((c) => c.id === categoryId);
  if (!category) {
    return Promise.resolve([]);
  }

  const cached = cache.get(categoryId);
  if (cached) {
    return cached;
  }

  const request = (async (): Promise<NearbyPlaceResult[]> => {
    const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
    const { places } = await Place.searchNearby({
      fields: ["displayName", "location", "formattedAddress", "googleMapsURI", "id"],
      locationRestriction: { center, radius: 5000 },
      includedPrimaryTypes: category.placeTypes,
      maxResultCount: 10,
      rankPreference: "POPULARITY" as any,
    });

    const results: NearbyPlaceResult[] = [];
    places.forEach((place, index) => {
      const loc = place.location;
      if (!loc) return;
      const { lat, lng } = loc.toJSON();
      results.push({
        id: place.id ?? `${categoryId}-${index}`,
        name: placeDisplayName(place.displayName),
        address: place.formattedAddress ?? undefined,
        lat,
        lng,
        mapsUri: place.googleMapsURI ?? undefined,
      });
    });
    return results;
  })();

  request.catch(() => cache.delete(categoryId));
  cache.set(categoryId, request);
  return request;
}

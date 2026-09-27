/**
 * Hyperlocal amenity map configuration for Siena Las Vegas (55+ community).
 * Map center: Siena Community Association main office (10525 Siena Monte Ave).
 * Coordinates ~36.1042, -115.3195 (Summerlin South; Clark County assessor / MapQuest listing).
 */

import { officeInfo, sienaCommunity } from "./site-config";

/** Single source of truth for the community map center */
export const communityMapCenter = {
  lat: 36.1042,
  lng: -115.3195,
  label: sienaCommunity.name,
  address: sienaCommunity.address.full,
};

export type AmenityCategoryId =
  | "healthcare"
  | "golf"
  | "parks"
  | "community"
  | "grocery"
  | "fitness"
  | "pharmacies"
  | "restaurants"
  | "cafes"
  | "shopping";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places (New) primary types for searchNearby */
  placeTypes: string[];
  schemaType?: string;
};

/** 55+ community: healthcare, golf, and recreation first; schools omitted */
export const amenityCategories: AmenityCategory[] = [
  {
    id: "healthcare",
    label: "Healthcare",
    placeTypes: ["hospital", "doctor", "medical_clinic"],
    schemaType: "Hospital",
  },
  {
    id: "golf",
    label: "Golf",
    placeTypes: ["golf_course"],
    schemaType: "GolfCourse",
  },
  {
    id: "parks",
    label: "Parks",
    placeTypes: ["park"],
    schemaType: "Park",
  },
  {
    id: "community",
    label: "Recreation",
    placeTypes: ["community_center", "sports_complex"],
    schemaType: "SportsActivityLocation",
  },
  {
    id: "grocery",
    label: "Grocery",
    placeTypes: ["grocery_store", "supermarket"],
    schemaType: "GroceryStore",
  },
  {
    id: "fitness",
    label: "Fitness",
    placeTypes: ["gym", "fitness_center"],
    schemaType: "ExerciseGym",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    placeTypes: ["pharmacy"],
    schemaType: "Pharmacy",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    placeTypes: ["restaurant"],
    schemaType: "Restaurant",
  },
  {
    id: "cafes",
    label: "Cafes",
    placeTypes: ["cafe", "coffee_shop"],
    schemaType: "CafeOrCoffeeShop",
  },
  {
    id: "shopping",
    label: "Shopping",
    placeTypes: ["shopping_mall", "department_store"],
    schemaType: "ShoppingCenter",
  },
];

export type CuratedPlace = {
  name: string;
  address: string;
  category: AmenityCategoryId;
  schemaType: string;
  note?: string;
};

/** Verified nearby places (static HTML + map fallback list) */
export const curatedNearbyPlaces: CuratedPlace[] = [
  {
    name: "Siena Community Center",
    address: "10525 Siena Monte Avenue, Las Vegas, NV 89135",
    category: "community",
    schemaType: "CommunityCenter",
    note: "On-site library, fitness, clubs, and resident services",
  },
  {
    name: "Siena Golf Club & Bistro",
    address: "10539 Siena Monte Avenue, Las Vegas, NV 89135",
    category: "golf",
    schemaType: "GolfCourse",
  },
  {
    name: "Centennial Hills Hospital Medical Center",
    address: "6575 North Fort Apache Road, Las Vegas, NV 89149",
    category: "healthcare",
    schemaType: "Hospital",
  },
  {
    name: "Summerlin Hospital Medical Center",
    address: "657 Town Center Drive, Las Vegas, NV 89144",
    category: "healthcare",
    schemaType: "Hospital",
  },
  {
    name: "MountainView Hospital",
    address: "3100 North Tenaya Way, Las Vegas, NV 89128",
    category: "healthcare",
    schemaType: "Hospital",
  },
  {
    name: "Downtown Summerlin",
    address: "1980 Festival Plaza Drive, Las Vegas, NV 89135",
    category: "shopping",
    schemaType: "ShoppingCenter",
    note: "Outdoor shopping, dining, and entertainment",
  },
  {
    name: "Smith's Marketplace",
    address: "9260 West Flamingo Road, Las Vegas, NV 89147",
    category: "grocery",
    schemaType: "GroceryStore",
  },
  {
    name: "TPC Las Vegas",
    address: "1700 Village Center Circle, Las Vegas, NV 89134",
    category: "golf",
    schemaType: "GolfCourse",
  },
  {
    name: "Red Rock Canyon National Conservation Area",
    address: "3205 State Route 159, Las Vegas, NV 89161",
    category: "parks",
    schemaType: "Park",
  },
  {
    name: "Centennial Hills Park",
    address: "7101 North Buffalo Drive, Las Vegas, NV 89131",
    category: "parks",
    schemaType: "Park",
  },
];

export const nearbyAmenitiesFaqs = [
  {
    question: "What grocery stores are near Siena?",
    answer:
      "Smith's Marketplace on West Flamingo Road and grocers at Downtown Summerlin are common shopping options for Siena residents, both a short drive from the community via Tropicana Avenue and the 215 Beltway.",
  },
  {
    question: "How far is Siena from the Las Vegas Strip?",
    answer:
      "Siena is in Summerlin South; driving to the central Las Vegas Strip is typically about 20–25 minutes depending on traffic and your gate exit, via Tropicana Avenue or the 215 Beltway.",
  },
  {
    question: "Are there hospitals near Siena?",
    answer:
      "Yes. Summerlin Hospital Medical Center on Town Center Drive, MountainView Hospital on North Tenaya Way, and Centennial Hills Hospital on North Fort Apache Road are within a reasonable drive of Siena.",
  },
  {
    question: "Where can I golf near Siena?",
    answer:
      "Siena has its own Schmidt-Curley championship course and Bistro on site; TPC Las Vegas in Summerlin is also nearby for additional public golf.",
  },
  {
    question: "What shopping is close to Siena?",
    answer:
      "Downtown Summerlin offers major retailers, restaurants, and services just west of the community; Red Rock Resort is north of Downtown Summerlin for additional dining and entertainment.",
  },
  {
    question: "How far is Harry Reid International Airport from Siena?",
    answer:
      "Harry Reid International Airport is approximately 25–35 minutes from Siena by car in typical traffic, often via the 215 Beltway and I-15.",
  },
  {
    question: "Is there outdoor recreation near Siena?",
    answer:
      "Red Rock Canyon National Conservation Area is a well-known hiking and scenic drive destination northwest of Summerlin; Centennial Hills Park offers local trails and sports fields to the north.",
  },
  {
    question: "Who helps with Siena real estate near these amenities?",
    answer:
      "Dr. Jan Duffy with Berkshire Hathaway HomeServices Nevada Properties specializes in Siena and Las Vegas 55+ communities—call (702) 500-1942 or email homes@sienalasvegas.com.",
  },
];

export const nearbyAmenitiesPagePath = "/nearby-amenities";

export const commuteDestinations = [
  {
    name: "Las Vegas Strip (approximate center)",
    detail: "About 20–25 minutes by car from Siena in typical conditions.",
  },
  {
    name: "Downtown Summerlin",
    detail: "Roughly 10–15 minutes; Siena borders the 215 with quick access west.",
  },
  {
    name: "Harry Reid International Airport",
    detail: "Approximately 25–35 minutes depending on traffic and route.",
  },
  {
    name: "Red Rock Canyon Visitor Center",
    detail: "About 25–35 minutes northwest through Summerlin and Charleston Boulevard.",
  },
];

/** Align legacy office geo in schema with map center */
export function getCommunityGeoForSchema() {
  return {
    "@type": "GeoCoordinates",
    latitude: communityMapCenter.lat,
    longitude: communityMapCenter.lng,
  };
}

export function getCommunityPlaceSchema() {
  return {
    "@type": "Place",
    "@id": `${officeInfo.address.full}#siena-community`,
    name: "Siena",
    description: sienaCommunity.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: sienaCommunity.address.street,
      addressLocality: sienaCommunity.address.city,
      addressRegion: sienaCommunity.address.state,
      postalCode: sienaCommunity.address.zip,
      addressCountry: "US",
    },
    geo: getCommunityGeoForSchema(),
  };
}

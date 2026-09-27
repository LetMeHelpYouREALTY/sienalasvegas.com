/**
 * Hyperlocal amenity map configuration for Siena Las Vegas (55+ community).
 * Map center: Siena Community Association main office (10525 Siena Monte Ave).
 */

import { agentInfo, officeInfo, sienaCommunity } from "./site-config";

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
  /** Verified mailing or street address; omit from JSON-LD when undefined */
  address?: string;
  category: AmenityCategoryId;
  schemaType: string;
  note?: string;
  /** Official source used to verify name/address */
  sourceUrl: string;
};

/** Verified nearby places (static HTML + map fallback list) */
export const curatedNearbyPlaces: CuratedPlace[] = [
  {
    name: "Siena Community Center",
    address: "10525 Siena Monte Avenue, Las Vegas, NV 89135",
    category: "community",
    schemaType: "CommunityCenter",
    note: "On-site library, fitness, clubs, and resident services",
    sourceUrl: "https://www.sienalv.org/home/",
  },
  {
    name: "Siena Golf Club",
    address: "10575 Siena Monte Avenue, Las Vegas, NV 89135",
    category: "golf",
    schemaType: "GolfCourse",
    note: "Championship course and The Siena Bistro on property",
    sourceUrl: "https://sienagolfclub.com/contact-directions/",
  },
  {
    name: "Centennial Hills Hospital Medical Center",
    address: "6900 North Durango Drive, Las Vegas, NV 89149",
    category: "healthcare",
    schemaType: "Hospital",
    sourceUrl: "https://www.centennialhillshospital.com/about/contact-us",
  },
  {
    name: "Summerlin Hospital Medical Center",
    address: "657 North Town Center Drive, Las Vegas, NV 89144",
    category: "healthcare",
    schemaType: "Hospital",
    sourceUrl: "https://www.summerlinhospital.com/about/contact-us",
  },
  {
    name: "MountainView Hospital",
    address: "3100 North Tenaya Way, Las Vegas, NV 89128",
    category: "healthcare",
    schemaType: "Hospital",
    sourceUrl: "https://www.sunrisehealthinfo.com/locations/mountainview-hospital/about-us/contact-us",
  },
  {
    name: "Downtown Summerlin",
    address: "1980 Festival Plaza Drive, Las Vegas, NV 89135",
    category: "shopping",
    schemaType: "ShoppingCenter",
    note: "Outdoor shopping, dining, and entertainment",
    sourceUrl: "https://www.downtownsummerlin.com/",
  },
  {
    name: "Smith's Food and Drug",
    address: "9350 West Flamingo Road, Las Vegas, NV 89147",
    category: "grocery",
    schemaType: "GroceryStore",
    sourceUrl: "https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/9350-w-flamingo-rd-las-vegas-nv/706/00396",
  },
  {
    name: "Whole Foods Market",
    address: "2475 South Town Center Drive, Las Vegas, NV 89135",
    category: "grocery",
    schemaType: "GroceryStore",
    sourceUrl: "https://www.wholefoodsmarket.com/stores/summerlin",
  },
  {
    name: "TPC Las Vegas",
    address: "9851 Canyon Run Drive, Las Vegas, NV 89144",
    category: "golf",
    schemaType: "GolfCourse",
    sourceUrl: "https://tpc.com/lasvegas/contact-directions/",
  },
  {
    name: "Red Rock Canyon Visitor Center",
    address: "1000 Scenic Loop Drive, Las Vegas, NV 89161",
    category: "parks",
    schemaType: "Park",
    note: "Gateway to Red Rock Canyon National Conservation Area (BLM)",
    sourceUrl: "https://www.blm.gov/programs/national-conservation-lands/nevada/red-rock-canyon",
  },
  {
    name: "Centennial Hills Park",
    address: "7101 North Buffalo Drive, Las Vegas, NV 89131",
    category: "parks",
    schemaType: "Park",
    sourceUrl: "https://www.lasvegasnevada.gov/residents/parks-facilities/centennial-hills-park",
  },
];

export const nearbyAmenitiesFaqs = [
  {
    question: "What grocery stores are near Siena?",
    answer:
      "Whole Foods Market on South Town Center Drive and Smith's Food and Drug on West Flamingo Road are common grocery options for Siena residents, with additional grocers at Downtown Summerlin.",
  },
  {
    question: "How far is Siena from the Las Vegas Strip?",
    answer:
      "Siena is in Summerlin South; driving to the central Las Vegas Strip is typically about 20–25 minutes depending on traffic and your gate exit, via Tropicana Avenue or the 215 Beltway.",
  },
  {
    question: "Are there hospitals near Siena?",
    answer:
      "Yes. Summerlin Hospital Medical Center on Town Center Drive, MountainView Hospital on North Tenaya Way, and Centennial Hills Hospital on North Durango Drive are within a reasonable drive of Siena.",
  },
  {
    question: "Where can I golf near Siena?",
    answer:
      "Siena has its own championship course and Bistro on site; TPC Las Vegas in Summerlin is also nearby for additional public golf.",
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
    answer: `Dr. Jan Duffy with Berkshire Hathaway HomeServices Nevada Properties specializes in Siena and Las Vegas 55+ communities—call ${agentInfo.phone} or email ${agentInfo.email}.`,
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

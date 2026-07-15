"use client";

import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Square, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  imageAlt: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
}

const PropertyCard = ({ property }: { property: Property }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="relative h-48 md:h-64">
      <Image
        src={property.image}
        alt={property.imageAlt}
        fill
        className="object-cover"
      />
      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
        {property.price}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{property.name}</h3>
      <p className="text-slate-600 mb-4">{property.location}</p>
      <div className="flex justify-between items-center text-slate-600 mb-4">
        <div className="flex items-center gap-1">
          <Bed className="h-4 w-4 text-blue-600" />
          <span className="text-sm">{property.bedrooms} Beds</span>
        </div>
        <div className="flex items-center gap-1">
          <Bath className="h-4 w-4 text-blue-600" />
          <span className="text-sm">{property.bathrooms} Baths</span>
        </div>
        <div className="flex items-center gap-1">
          <Square className="h-4 w-4 text-blue-600" />
          <span className="text-sm">{property.squareFeet.toLocaleString()} sq ft</span>
        </div>
      </div>
      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
        <Link href={`/listings/${property.id}`}>
          View Details <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    </div>
  </div>
);

const properties: Property[] = [
  {
    id: 1,
    name: "Modern Luxury Home",
    location: "Summerlin, Las Vegas, NV",
    price: "$850,000",
    image: "/Image/summerlin-las-vegas-luxury-desert-home-sunset.jpg",
    imageAlt:
      "Modern luxury desert home for sale in Summerlin, Las Vegas NV — 4 bed, 3 bath, 3,200 sq ft, $850,000",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
  },
  {
    id: 2,
    name: "Spacious Family Home",
    location: "Henderson, NV",
    price: "$625,000",
    image: "/Image/henderson-nevada-southwestern-family-home.jpg",
    imageAlt:
      "Spacious Southwestern-style family home for sale in Henderson, NV — 3 bed, 2 bath, 2,400 sq ft, $625,000",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2400,
  },
  {
    id: 3,
    name: "Elegant Estate",
    location: "Green Valley, Henderson, NV",
    price: "$1,200,000",
    image: "/Image/green-valley-henderson-luxury-estate-pool-twilight.jpg",
    imageAlt:
      "Elegant luxury estate with pool for sale in Green Valley, Henderson NV — 5 bed, 4 bath, 4,500 sq ft, $1,200,000",
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4500,
  },
];

export default function FeaturedProperties() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-slate-600 text-lg">
              Discover homes at Siena and Las Vegas 55+ communities
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0 border-slate-300 text-slate-900">
            <a href="http://drjanduffy.realscout.com/" target="_blank" rel="noopener noreferrer">View All Properties</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}

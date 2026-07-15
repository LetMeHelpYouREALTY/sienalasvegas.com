"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/lib/site-config";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  const images = [
    {
      src: "/Image/summerlin-las-vegas-luxury-desert-home-sunset.jpg",
      alt: "Luxury desert home for sale in Summerlin, Las Vegas NV with palm trees and mountain views at sunset — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties",
    },
    {
      src: "/Image/henderson-nevada-southwestern-family-home.jpg",
      alt: "Southwestern-style family home for sale in Henderson, NV with desert landscaping under a clear blue sky — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties",
    },
    {
      src: "/Image/green-valley-henderson-luxury-estate-pool-twilight.jpg",
      alt: "Luxury estate with swimming pool in Green Valley, Henderson NV at twilight — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties",
    },
  ];

  useEffect(() => {
    // Don't animate if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [prefersReducedMotion, images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 ${
              prefersReducedMotion 
                ? '' 
                : 'transition-opacity duration-1000'
            } ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* quality=60 tuned for LCP (hero is the LCP element) */}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes={index === 0 ? "100vw" : undefined}
              quality={60}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content - min-height reserves space for LCP text to reduce CLS (Lighthouse) */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="min-h-[7.5rem] md:min-h-[8rem]">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Dream Home at
            <br />
            <span className="text-blue-400">{siteConfig.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Siena is Las Vegas's premier 55+ guard-gated community, featuring a Schmidt-Curley golf course, Community Center, and active lifestyle. Dr. Jan Duffy with Berkshire Hathaway HomeServices Nevada Properties has served Siena and the Las Vegas Valley since 2008—$127M+ in closed transactions. Whether you're buying or selling at Siena, Sun City Summerlin, Henderson, or anywhere in Southern Nevada, you get expert representation backed by the most trusted name in real estate. Call (702) 500-1942 for a free consultation or home valuation.
          </p>
        </div>

        {/* RealScout Search Widget */}
        <div className="realscout-wrapper mb-4">
          <div
            dangerouslySetInnerHTML={{
              __html: `<realscout-simple-search agent-encoded-id="QWdlbnQtMjI1MDUw"></realscout-simple-search>`,
            }}
          />
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">500+</span>
            <span>Properties Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Since 2008</span>
            <span>Serving Siena & Las Vegas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">4.9★</span>
            <span>Average Rating</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 ${
          prefersReducedMotion ? '' : 'animate-bounce'
        }`}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}

import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import RealScoutListings from "@/components/realscout/RealScoutListingsDynamic";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ReviewsSection from "@/components/sections/ReviewsSection";
import { defaultReviews, aggregateRating, getReviewSchemaData } from "@/lib/reviews-data";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { Home as HomeIcon, TrendingUp, Shield, Users, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";
import { generateImageGallerySchema } from "@/lib/schema";
import { ReviewSchema } from "@/components/SchemaScript";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} Real Estate | 55+ Community | Dr. Jan Duffy, REALTOR®`,
  description: siteConfig.description,
  path: "/",
  keywords: [
    "Siena Las Vegas",
    "Siena real estate",
    "55+ community Las Vegas",
    "Siena golf course",
    "Dr. Jan Duffy Siena",
    "homes for sale Siena",
  ],
});

// Organization Schema (Siena NAP per GBP)
// Shares "@id" with the site-wide RealEstateAgent schema in app/layout.tsx
// (and the ReviewSchema below) so Google's structured-data parser merges
// all three into one entity instead of three ambiguous duplicate agents.
// aggregateRating is intentionally omitted here — it's declared once on the
// site-wide schema (lib/schema.ts) and once on ReviewSchema below, both now
// sourced from the same agentStats value, so this block only adds fields
// (the hero image gallery) that aren't already covered elsewhere.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${siteConfig.url}#organization`,
  name: "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties",
  url: siteConfig.url,
  telephone: "+17025001942",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10525 Siena Monte Avenue",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89135",
  },
  image: [
    `${siteConfig.url}/Image/summerlin-las-vegas-luxury-desert-home-sunset.jpg`,
    `${siteConfig.url}/Image/henderson-nevada-southwestern-family-home.jpg`,
    `${siteConfig.url}/Image/green-valley-henderson-luxury-estate-pool-twilight.jpg`,
  ],
};

// ImageGallery Schema for the homepage hero carousel (GEO/AEO: gives answer
// engines a structured, captioned description of each hero image)
const heroImageGallerySchema = generateImageGallerySchema({
  name: "Las Vegas & Henderson Real Estate — Featured Home Photography",
  url: "/",
  images: [
    {
      url: "/Image/summerlin-las-vegas-luxury-desert-home-sunset.jpg",
      caption: "Luxury desert home for sale in Summerlin, Las Vegas, NV",
      description:
        "Modern luxury desert-style home with palm trees, xeriscape landscaping, and mountain views at sunset in Summerlin, Las Vegas, Nevada.",
      width: 1536,
      height: 1024,
      representativeOfPage: true,
    },
    {
      url: "/Image/henderson-nevada-southwestern-family-home.jpg",
      caption: "Southwestern-style family home for sale in Henderson, NV",
      description:
        "Spacious single-story Southwestern desert home with tile roof and mountain backdrop in Henderson, Nevada.",
      width: 1536,
      height: 1024,
    },
    {
      url: "/Image/green-valley-henderson-luxury-estate-pool-twilight.jpg",
      caption: "Luxury estate with pool for sale in Green Valley, Henderson, NV",
      description:
        "Elegant two-story desert estate with backyard swimming pool, spa, and palm trees at twilight in Green Valley, Henderson, Nevada.",
      width: 1536,
      height: 1024,
    },
  ],
});

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why choose a Berkshire Hathaway HomeServices agent for Siena real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Berkshire Hathaway HomeServices is the only real estate brand backed by Warren Buffett's Berkshire Hathaway Inc.—unmatched financial stability, ethical standards, and a global referral network. When you're buying or selling at Siena, that trust matters.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does Dr. Jan Duffy serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dr. Jan specializes in Siena and Las Vegas 55+ communities, with deep expertise at Siena (10525 Siena Monte Avenue), Sun City Summerlin, Del Webb Lake Las Vegas, Heritage at Stonebridge, and other active-adult communities in the Las Vegas area.",
      },
    },
    {
      "@type": "Question",
      name: "How do I contact Dr. Jan Duffy for Siena real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Call (702) 500-1942 or email homes@sienalasvegas.com. Office at 10525 Siena Monte Avenue, Las Vegas, NV 89135.",
      },
    },
    {
      "@type": "Question",
      name: "Does Berkshire Hathaway HomeServices help with new construction homes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! BHHS agents provide free buyer representation for new construction purchases from builders like Toll Brothers, Lennar, and Century Communities—the builder pays the commission, not you.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Siena and Las Vegas 55+ market like in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As of January 2026, the Las Vegas median home price is $450,000 (+4.2% YoY). Siena and other 55+ communities remain in strong demand. Contact Dr. Jan for current Siena listings and market insight.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heroImageGallerySchema) }}
      />
      <ReviewSchema
        reviews={getReviewSchemaData(defaultReviews)}
        aggregateRating={{
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
        }}
      />
      <Navbar />
      <main>
        <HeroSection />

        {/* RealScout Widget - lead generator below hero, above the fold */}
        <RealScoutListings />

        {/* Berkshire Hathaway Value Proposition Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Why Choose Berkshire Hathaway HomeServices?
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                When you work with a <strong>Berkshire Hathaway HomeServices</strong> agent, you're
                backed by a name synonymous with trust, ethical standards, and financial
                strength—the same principles that built Warren Buffett's empire.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Trusted Brand</h3>
                <p className="text-slate-600 text-sm">
                  Backed by Warren Buffett's Berkshire Hathaway Inc.—unmatched financial stability
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Global Network</h3>
                <p className="text-slate-600 text-sm">
                  50,000+ agents worldwide for seamless referrals and relocations
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Market Expertise</h3>
                <p className="text-slate-600 text-sm">
                  Serving Las Vegas since 2008, $127M+ in closed transactions
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <HomeIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Full Service</h3>
                <p className="text-slate-600 text-sm">
                  Buying, selling, luxury, investment, relocation—we do it all
                </p>
              </div>
            </div>

            {/* Expert Quote */}
            <div className="max-w-3xl mx-auto mt-12 bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                "When clients ask why they should choose a Berkshire Hathaway HomeServices agent, I
                tell them: you're not just getting me—you're getting a global network of 50,000
                agents, world-class marketing, and a brand that's synonymous with trust."
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, BHHS Nevada Properties
              </cite>
            </div>
          </div>
        </section>

        {/* Market Stats Section */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Las Vegas Real Estate Market | January 2026
              </h2>
              <p className="text-slate-300">
                Current market data from Berkshire Hathaway HomeServices Nevada Properties
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">$450K</div>
                <div className="text-slate-300 text-sm">Median Home Price</div>
                <div className="text-green-400 text-sm">+4.2% YoY</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">28</div>
                <div className="text-slate-300 text-sm">Avg Days on Market</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">4,850</div>
                <div className="text-slate-300 text-sm">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">2.1</div>
                <div className="text-slate-300 text-sm">Months Inventory</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/market-report"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                View Full Market Report
              </Link>
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Las Vegas Neighborhoods We Serve
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Berkshire Hathaway HomeServices Nevada Properties covers all of Southern Nevada
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {[
                { name: "Summerlin", price: "$625K", slug: "summerlin" },
                { name: "Henderson", price: "$485K", slug: "henderson" },
                { name: "Green Valley", price: "$520K", slug: "green-valley" },
                { name: "The Ridges", price: "$2.5M", slug: "the-ridges" },
                { name: "Southern Highlands", price: "$750K", slug: "southern-highlands" },
                { name: "North Las Vegas", price: "$385K", slug: "north-las-vegas" },
                { name: "Skye Canyon", price: "$550K", slug: "skye-canyon" },
                { name: "Centennial Hills", price: "$495K", slug: "centennial-hills" },
                { name: "Inspirada", price: "$525K", slug: "inspirada" },
                { name: "Mountains Edge", price: "$475K", slug: "mountains-edge" },
              ].map((area) => (
                <Link
                  key={area.slug}
                  href={`/neighborhoods/${area.slug}`}
                  className="bg-slate-50 hover:bg-blue-50 rounded-lg p-4 text-center transition-colors group"
                >
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                    {area.name}
                  </h3>
                  <p className="text-sm text-slate-500">From {area.price}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/neighborhoods"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All Neighborhoods →
              </Link>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <ReviewsSection />
        <FAQSection />

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Work with Berkshire Hathaway HomeServices?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're buying, selling, or investing in Las Vegas real estate, Dr. Jan Duffy
              is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17025001942"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (702) 500-1942
              </a>
              <Link
                href="/contact"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Send a Message
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              Dr. Jan Duffy | License S.0197614.LLC | Berkshire Hathaway HomeServices Nevada
              Properties
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <div className="bg-slate-100 py-4 text-center text-sm text-slate-500">
          Last Updated: January 2026 | HeyBerkshire.com - Berkshire Hathaway HomeServices Nevada
          Properties
        </div>
      </main>
      <Footer />
    </>
  );
}

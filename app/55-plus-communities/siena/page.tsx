import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListingsDynamic";
import Link from "next/link";
import {
  Phone,
  MapPin,
  Shield,
  Home as HomeIcon,
  Dumbbell,
  Users,
  Star,
  Calendar,
  Palmtree,
  Landmark,
} from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { sienaCommunity } from "@/lib/site-config";
import SchemaScript from "@/components/SchemaScript";
import { generateWebPageSchema, combineSchemas } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Siena 55+ Community Las Vegas | Golf, Guard-Gated | Dr. Jan Duffy",
  description:
    "Siena — premier 55+ community in Las Vegas. Schmidt-Curley golf course, Community Center, guard-gated security, clubs & events. 10525 Siena Monte Avenue. Dr. Jan Duffy, BHHS. Call (702) 500-1942.",
  path: "/55-plus-communities/siena",
  keywords: [
    "Siena Las Vegas",
    "Siena 55+ community",
    "Siena golf course",
    "Siena Monte Ave",
    "guard-gated 55+ Las Vegas",
    "Siena Community Association",
    "homes for sale Siena Las Vegas",
  ],
});

const communitySchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "Siena Community Association",
  description:
    "Premier 55+ guard-gated community in Las Vegas with championship golf, Community Center, and Spring Mountain backdrop.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10525 Siena Monte Avenue",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89135",
    addressCountry: "US",
  },
  telephone: "+17022582500",
  url: "https://www.sienalv.org",
};

const sienaPageSchema = combineSchemas(
  generateWebPageSchema({
    name: "Siena 55+ Community Las Vegas | Golf, Guard-Gated | Dr. Jan Duffy",
    description:
      "Siena — premier 55+ community in Las Vegas. Schmidt-Curley golf course, Community Center, guard-gated security, clubs & events. 10525 Siena Monte Avenue.",
    url: "/55-plus-communities/siena",
    dateModified: "2026-01",
  }),
  communitySchema
);

export default function SienaPage() {
  return (
    <>
      <SchemaScript schema={sienaPageSchema} id="siena-page-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="max-w-6xl mx-auto mb-6">
            <nav className="text-sm text-slate-500">
              <Link href="/" className="hover:text-siena-teal">
                Home
              </Link>
              {" / "}
              <Link href="/55-plus-communities" className="hover:text-siena-teal">
                55+ Communities
              </Link>
              {" / "}
              <span className="text-slate-900">Siena</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center bg-siena-teal text-white px-4 py-2 rounded-full text-sm font-siena-heading uppercase tracking-wide mb-6">
              <Palmtree className="h-4 w-4 mr-2" />
              Premier 55+ Community — Spring Mountain Backdrop
            </div>
            <h1 className="font-siena-heading uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl font-bold text-siena-teal mb-6">
              Siena
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Siena is a premier 55+ guard-gated community in Summerlin South, Las Vegas, with 2,001 single-family homes and villas on 667 acres. It features a Schmidt-Curley championship golf course, a 16,000 sq ft Community Center with fitness and salon, and over 80 resident-run clubs. The community is served by Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties (10525 Siena Monte Avenue). For Siena homes for sale or a free valuation, call (702) 500-1942.
            </p>
            <div className="mt-8 p-6 bg-siena-cream border border-siena-brown/30 rounded-xl max-w-2xl mx-auto text-left">
              <h2 className="font-siena-heading uppercase tracking-wide text-lg font-bold text-siena-teal mb-3">At a glance</h2>
              <ul className="space-y-2 text-slate-700">
                <li><strong className="text-siena-brown">What:</strong> 55+ guard-gated community, 667 acres, 2,001 homes (Summerlin South)</li>
                <li><strong className="text-siena-brown">Amenities:</strong> Schmidt-Curley golf, Community Center, fitness, salon, 80+ clubs</li>
                <li><strong className="text-siena-brown">Address:</strong> 10525 Siena Monte Avenue, Las Vegas, NV 89135</li>
                <li><strong className="text-siena-brown">Agent:</strong> Dr. Jan Duffy, BHHS Nevada Properties — (702) 500-1942</li>
              </ul>
            </div>
          </div>

          {/* RealScout Widget - lead generator below hero, above the fold */}
          <RealScoutListings />

          {/* Quick Stats */}
          <section className="mb-16 bg-siena-teal-dark text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="font-siena-heading uppercase tracking-wide text-2xl font-bold mb-8 text-center">
              Siena at a Glance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  1998
                </div>
                <div className="text-white/70 text-sm">Community Founded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  18-Hole
                </div>
                <div className="text-white/70 text-sm">Championship Golf</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">Guard-Gated</div>
                <div className="text-white/70 text-sm">24/7 Security</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  10525 Siena Monte Avenue
                </div>
                <div className="text-white/70 text-sm">Las Vegas, NV 89135</div>
              </div>
            </div>
          </section>

          {/* Explore Siena — links to subpages */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="font-siena-heading uppercase tracking-wide text-2xl font-bold text-siena-teal mb-6 text-center">
              Explore Siena
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <Link
                href="/55-plus-communities/siena/community"
                className="flex items-center gap-3 p-4 rounded-xl border border-siena-brown/30 bg-white hover:border-siena-teal hover:shadow-md transition-all"
              >
                <MapPin className="h-8 w-8 text-siena-teal flex-shrink-0" />
                <span className="font-semibold text-slate-900">Community</span>
              </Link>
              <Link
                href="/55-plus-communities/siena/amenities"
                className="flex items-center gap-3 p-4 rounded-xl border border-siena-brown/30 bg-white hover:border-siena-teal hover:shadow-md transition-all"
              >
                <HomeIcon className="h-8 w-8 text-siena-teal flex-shrink-0" />
                <span className="font-semibold text-slate-900">Amenities</span>
              </Link>
              <Link
                href="/55-plus-communities/siena/events-activities"
                className="flex items-center gap-3 p-4 rounded-xl border border-siena-brown/30 bg-white hover:border-siena-teal hover:shadow-md transition-all"
              >
                <Calendar className="h-8 w-8 text-siena-teal flex-shrink-0" />
                <span className="font-semibold text-slate-900">Events & Activities</span>
              </Link>
              <Link
                href="/55-plus-communities/siena/clubs-groups"
                className="flex items-center gap-3 p-4 rounded-xl border border-siena-brown/30 bg-white hover:border-siena-teal hover:shadow-md transition-all"
              >
                <Users className="h-8 w-8 text-siena-teal flex-shrink-0" />
                <span className="font-semibold text-slate-900">Clubs & Groups</span>
              </Link>
              <Link
                href="/55-plus-communities/siena/local-attractions"
                className="flex items-center gap-3 p-4 rounded-xl border border-siena-brown/30 bg-white hover:border-siena-teal hover:shadow-md transition-all"
              >
                <Landmark className="h-8 w-8 text-siena-teal flex-shrink-0" />
                <span className="font-semibold text-slate-900">Local Attractions</span>
              </Link>
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">
              Content from{" "}
              <a href="https://www.sienalv.org/home/" target="_blank" rel="noopener noreferrer" className="text-siena-teal hover:underline">
                Siena Community Association (sienalv.org)
              </a>
            </p>
          </section>

          {/* About */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="max-w-none text-slate-700">
              <h2 className="font-siena-heading uppercase tracking-wide text-3xl font-bold text-siena-teal mb-6">
                Welcome to Siena
              </h2>
              <p className="mb-4">
                {sienaCommunity.description}
              </p>
              <p className="mb-4">
                Surrounded by beautiful lakes, the Schmidt-Curley designed 18-hole championship Siena Golf Course features an ideal blend of doglegs and straightaway holes, a mix of slender and ample fairways, and a balance between benign and rugged green complexes. The Bistro, located in the Siena Golf Club, offers breathtaking views and a dining experience to please not only the palate, but also the heart and soul.
              </p>
              <p>
                <strong className="text-siena-brown">Dr. Jan Duffy</strong> with Berkshire Hathaway HomeServices Nevada Properties helps buyers and sellers in Siena. For real estate in this premier 55+ community, call (702) 500-1942 or visit sienalasvegas.com.
              </p>
            </div>
          </section>

          {/* Community Center & Amenities */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="font-siena-heading uppercase tracking-wide text-3xl font-bold text-siena-teal mb-8 text-center">
              Community Center & Amenities
            </h2>
            <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8">
              {sienaCommunity.amenitiesIntro}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-siena-brown/30 rounded-xl p-6">
                <div className="bg-siena-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <HomeIcon className="h-6 w-6 text-siena-teal" />
                </div>
                <h3 className="font-siena-heading uppercase tracking-wide font-bold text-siena-brown mb-2">Community Center</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  {sienaCommunity.amenities.slice(0, 4).map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-siena-brown/30 rounded-xl p-6">
                <div className="bg-siena-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Dumbbell className="h-6 w-6 text-siena-teal" />
                </div>
                <h3 className="font-siena-heading uppercase tracking-wide font-bold text-siena-brown mb-2">More Amenities</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  {sienaCommunity.amenities.slice(4, 8).map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-siena-brown/30 rounded-xl p-6">
                <div className="bg-siena-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-siena-teal" />
                </div>
                <h3 className="font-siena-heading uppercase tracking-wide font-bold text-siena-brown mb-2">Siena Golf & Bistro</h3>
                <p className="text-slate-600 text-sm">{sienaCommunity.golf}</p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="mb-16 max-w-5xl mx-auto">
            <div className="bg-siena-cream border-l-4 border-siena-teal rounded-r-xl p-8">
              <div className="flex items-start">
                <Shield className="h-8 w-8 text-siena-teal mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-teal-dark mb-4">
                    Guard-Gated Security
                  </h3>
                  <p className="text-slate-700">{sienaCommunity.security}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Clubs & Events */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="font-siena-heading uppercase tracking-wide text-3xl font-bold text-siena-teal mb-6 text-center">
              Clubs, Groups & Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-siena-brown/30 rounded-xl p-6">
                <Users className="h-8 w-8 text-siena-teal mb-4" />
                <h3 className="font-siena-heading uppercase tracking-wide font-bold text-siena-brown mb-2">Clubs & Groups</h3>
                <p className="text-slate-600 text-sm">{sienaCommunity.clubs}</p>
              </div>
              <div className="bg-white border border-siena-brown/30 rounded-xl p-6">
                <Calendar className="h-8 w-8 text-siena-teal mb-4" />
                <h3 className="font-siena-heading uppercase tracking-wide font-bold text-siena-brown mb-2">Events & Activities</h3>
                <p className="text-slate-600 text-sm">{sienaCommunity.events}</p>
              </div>
            </div>
          </section>

          {/* Local Attractions */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="font-siena-heading uppercase tracking-wide text-3xl font-bold text-siena-teal mb-6 text-center">
              Local Attractions
            </h2>
            <p className="text-slate-600 text-center max-w-2xl mx-auto mb-6">
              {sienaCommunity.localAttractions}
            </p>
            <p className="text-center">
              <Link
                href="/55-plus-communities/siena/local-attractions"
                className="text-siena-teal font-semibold hover:underline"
              >
                Explore attractions, restaurants, shopping, shows & parks →
              </Link>
            </p>
          </section>

          {/* Address & Gates */}
          <section className="mb-16 bg-siena-cream rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="font-siena-heading uppercase tracking-wide text-3xl font-bold text-siena-teal mb-6 text-center">
              Siena Community Association
            </h2>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-siena-brown mr-2" />
                <span>{sienaCommunity.streetDisplay}, {sienaCommunity.address.city}, {sienaCommunity.address.state} {sienaCommunity.address.zip}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
                <span className="flex items-center">
                  <Phone className="h-5 w-5 text-siena-brown mr-2" />
                  <a href={sienaCommunity.hoaPhoneTel} className="text-siena-teal hover:underline">
                    {sienaCommunity.hoaPhone}
                  </a>
                </span>
                <span className="text-slate-600">Fax: {sienaCommunity.fax}</span>
              </div>
              <p className="text-sm text-slate-600 mt-4">
                <strong>Guest gate addresses:</strong> Main Gate — {sienaCommunity.gates.main}. Tropicana Gate — {sienaCommunity.gates.tropicana}.
              </p>
              <p className="text-sm text-slate-500">
                For real estate in Siena, contact Dr. Jan Duffy: (702) 500-1942 | sienalasvegas.com
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-16 max-w-2xl mx-auto text-center">
            <h2 className="font-siena-heading uppercase tracking-wide text-2xl font-bold text-siena-teal mb-4">
              Interested in Buying or Selling in Siena?
            </h2>
            <p className="text-slate-600 mb-6">
              Dr. Jan Duffy specializes in Siena and Las Vegas 55+ communities. Free home valuations and expert representation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17025001942"
                className="inline-flex items-center justify-center px-6 py-3 bg-siena-teal text-white font-semibold rounded-lg hover:bg-siena-teal-dark"
              >
                <Phone className="h-5 w-5 mr-2" />
                (702) 500-1942
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-siena-brown/40 text-siena-brown font-semibold rounded-lg hover:bg-siena-cream"
              >
                Contact Dr. Jan
              </Link>
            </div>
          </section>

          {/* Listings CTA - widget is above the fold below hero */}
          <section className="mb-16 max-w-6xl mx-auto text-center">
            <h2 className="font-siena-heading uppercase tracking-wide text-3xl font-bold text-siena-teal mb-4">Homes for Sale in Siena</h2>
            <p className="text-slate-600 mb-4">Search Siena listings above, or view all on RealScout.</p>
            <a href="http://drjanduffy.realscout.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-siena-teal text-white px-6 py-3 rounded-md font-semibold hover:bg-siena-teal-dark">View All Properties</a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

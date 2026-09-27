import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Phone } from "lucide-react";
import SchemaScript, { BreadcrumbSchema, FAQSchema } from "@/components/SchemaScript";
import { buildPageMetadata } from "@/lib/metadata";
import { agentInfo, sienaCommunity } from "@/lib/site-config";
import {
  commuteDestinations,
  curatedNearbyPlaces,
  getCommunityPlaceSchema,
  nearbyAmenitiesFaqs,
  nearbyAmenitiesPagePath,
} from "@/lib/nearby-amenities";
import {
  combineSchemas,
  generateFeaturedPlacesItemListSchema,
  generateWebPageSchema,
} from "@/lib/schema";

const AmenityMap = dynamic(() => import("@/components/maps/AmenityMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500"
      style={{ minHeight: 420, height: 420 }}
    >
      Loading map…
    </div>
  ),
});

export const metadata: Metadata = buildPageMetadata({
  title: "Nearby Amenities in Siena, Las Vegas | Map & Local Guide | Dr. Jan Duffy",
  description: `Interactive map of healthcare, golf, parks, grocery, and shopping near Siena 55+ community in Summerlin South. Drive times to the Strip, airport, and Downtown Summerlin. Dr. Jan Duffy, BHHS — ${agentInfo.phone}.`,
  path: nearbyAmenitiesPagePath,
  keywords: [
    "Siena nearby amenities",
    "Siena Las Vegas shopping",
    "hospitals near Siena",
    "golf near Siena Summerlin",
    "Downtown Summerlin from Siena",
    "55+ community amenities Las Vegas",
  ],
});

const pageSchema = combineSchemas(
  generateWebPageSchema({
    name: "Nearby Amenities in Siena, Las Vegas",
    description:
      "Hyperlocal guide and interactive map of restaurants, healthcare, golf, parks, and shopping near Siena guard-gated 55+ community.",
    url: nearbyAmenitiesPagePath,
    dateModified: "2026-09",
  }),
  getCommunityPlaceSchema(),
  generateFeaturedPlacesItemListSchema(
    curatedNearbyPlaces.map((p) => ({
      name: p.name,
      address: p.address,
      schemaType: p.schemaType,
    })),
    "Featured places near Siena, Las Vegas"
  )
);

function CategoryCopy({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-siena-heading uppercase tracking-wide text-2xl font-bold text-siena-teal mb-4">
        {title}
      </h2>
      <div className="prose prose-slate max-w-none text-slate-700">{children}</div>
    </section>
  );
}

export default function NearbyAmenitiesPage() {
  const healthcare = curatedNearbyPlaces.filter((p) => p.category === "healthcare");
  const golf = curatedNearbyPlaces.filter((p) => p.category === "golf");
  const parks = curatedNearbyPlaces.filter((p) => p.category === "parks");
  const shopping = curatedNearbyPlaces.filter((p) => p.category === "shopping");
  const grocery = curatedNearbyPlaces.filter((p) => p.category === "grocery");
  const community = curatedNearbyPlaces.filter((p) => p.category === "community");

  return (
    <>
      <SchemaScript schema={pageSchema} id="nearby-amenities-page" />
      <FAQSchema faqs={nearbyAmenitiesFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Siena", url: "/55-plus-communities/siena" },
          { name: "Nearby Amenities", url: nearbyAmenitiesPagePath },
        ]}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-siena-teal">Home</Link>
            {" / "}
            <Link href="/55-plus-communities/siena" className="hover:text-siena-teal">
              Siena
            </Link>
            {" / "}
            <span className="text-slate-900">Nearby Amenities</span>
          </nav>

          <h1 className="font-siena-heading uppercase tracking-wide text-3xl md:text-4xl font-bold text-siena-teal mb-4">
            Nearby Amenities in Siena, Las Vegas
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Siena is a guard-gated 55+ community in Summerlin South at{" "}
            {sienaCommunity.address.full}. Use the map to explore healthcare, golf, parks,
            grocery, and shopping within a short drive—then read hyperlocal notes and FAQs below
            (all in plain HTML for search and answer engines).
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mb-16">
          <AmenityMap showCuratedList />
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          <CategoryCopy title="Healthcare">
            <p>
              Residents often use full-service hospitals in Summerlin and the northwest valley.
              Verified options within a reasonable drive include:
            </p>
            <ul>
              {healthcare.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  {p.address ? ` — ${p.address}` : ""}
                </li>
              ))}
            </ul>
            <p>
              For emergencies, call 911. Siena&apos;s on-site security can assist while responders
              are en route, per the community association.
            </p>
          </CategoryCopy>

          <CategoryCopy title="Golf & dining on the course">
            <ul>
              {golf.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  {p.address ? ` — ${p.address}` : ""}
                  {p.note ? ` (${p.note})` : ""}
                </li>
              ))}
            </ul>
            <p>
              The Bistro at Siena Golf Club is on property for residents and guests; TPC Las Vegas
              adds another public course option in Summerlin.
            </p>
          </CategoryCopy>

          <CategoryCopy title="Parks & outdoor recreation">
            <ul>
              {parks.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  {p.address ? ` — ${p.address}` : ""}
                </li>
              ))}
            </ul>
            <p>
              Red Rock Canyon is the signature outdoor destination northwest of Summerlin; local
              parks such as Centennial Hills Park support walking, sports, and community events.
            </p>
          </CategoryCopy>

          <CategoryCopy title="Grocery & everyday errands">
            <ul>
              {grocery.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  {p.address ? ` — ${p.address}` : ""}
                </li>
              ))}
            </ul>
            <p>
              Downtown Summerlin also includes grocers and specialty food shops alongside major
              retailers.
            </p>
          </CategoryCopy>

          <CategoryCopy title="Shopping & entertainment">
            <ul>
              {shopping.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  {p.address ? ` — ${p.address}` : ""}
                  {p.note ? ` — ${p.note}` : ""}
                </li>
              ))}
            </ul>
            <p>
              Red Rock Resort, north of Downtown Summerlin, adds dining, casino entertainment, and
              a movie complex for locals who want a night out without crossing the Strip.
            </p>
          </CategoryCopy>

          <CategoryCopy title="On-site recreation at Siena">
            <ul>
              {community.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  {p.address ? ` — ${p.address}.` : "."} {p.note}
                </li>
              ))}
            </ul>
            <p>
              See also{" "}
              <Link href="/55-plus-communities/siena/amenities" className="text-siena-teal hover:underline">
                Siena community amenities
              </Link>{" "}
              for fitness, salon, and club details.
            </p>
          </CategoryCopy>

          <CategoryCopy title="Approximate drive times">
            <p className="text-sm text-slate-500 mb-3">
              Times vary with traffic and gate exit; figures below are approximate.
            </p>
            <ul>
              {commuteDestinations.map((d) => (
                <li key={d.name}>
                  <strong>{d.name}:</strong> {d.detail}
                </li>
              ))}
            </ul>
          </CategoryCopy>

          <section className="mb-12" aria-labelledby="nearby-faq-heading">
            <h2
              id="nearby-faq-heading"
              className="font-siena-heading uppercase tracking-wide text-2xl font-bold text-siena-teal mb-6"
            >
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {nearbyAmenitiesFaqs.map((faq) => (
                <div key={faq.question} className="border-b border-slate-200 pb-6">
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">{faq.question}</h3>
                  <p className="text-slate-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-siena-cream border border-siena-brown/30 rounded-2xl p-8 md:p-10 text-center">
            <h2 className="font-siena-heading uppercase tracking-wide text-2xl font-bold text-siena-teal mb-3">
              Your Siena real estate expert
            </h2>
            <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
              {agentInfo.name}, {agentInfo.title} with {agentInfo.brokerage}, specializes in Siena
              and Las Vegas 55+ communities. License {agentInfo.license}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center px-6 py-3 bg-siena-teal text-white font-semibold rounded-lg hover:bg-siena-teal-dark"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                {agentInfo.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-siena-brown/40 text-siena-brown font-semibold rounded-lg hover:bg-white"
              >
                Contact Dr. Jan
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center px-6 py-3 border border-siena-brown/40 text-siena-brown font-semibold rounded-lg hover:bg-white"
              >
                Siena listings
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              {sienaCommunity.address.full} · {agentInfo.email}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

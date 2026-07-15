import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Home as HomeIcon, Clock, Building2, Dumbbell, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { sienaAmenitiesPage } from "@/lib/siena-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Siena Amenities | Community Center, Fitness, Salon & Spa | Dr. Jan Duffy",
  description:
    "Siena Community Center with Library, Rotunda, game rooms & events. 16,000 sq ft Fitness Center, Salon & Spa, room rentals. Hours and details. Dr. Jan Duffy, Siena real estate.",
  path: "/55-plus-communities/siena/amenities",
});

export default function SienaAmenitiesPage() {
  const hours = sienaAmenitiesPage.communityCenter.hours;
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-siena-teal">
                Home
              </Link>
              {" / "}
              <Link href="/55-plus-communities" className="hover:text-siena-teal">
                55+ Communities
              </Link>
              {" / "}
              <Link href="/55-plus-communities/siena" className="hover:text-siena-teal">
                Siena
              </Link>
              {" / "}
              <span className="text-slate-900">Amenities</span>
            </nav>

            <h1 className="font-siena-heading uppercase tracking-wide text-3xl md:text-4xl font-bold text-siena-teal mb-6">
              {sienaAmenitiesPage.title}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mb-8">
              Siena amenities include a community center, pools, fitness, tennis, and over 50 clubs and groups. Dr. Jan Duffy at Berkshire Hathaway HomeServices is your Siena real estate expert for buying or selling in this Summerlin 55+ community. Call (702) 500-1942.
            </p>

            {/* Community Center */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <HomeIcon className="h-8 w-8 text-siena-teal" />
                <h2 className="font-siena-heading uppercase tracking-wide text-2xl font-bold text-siena-teal">
                  {sienaAmenitiesPage.communityCenter.heading}
                </h2>
              </div>
              <p className="text-slate-700 mb-4">
                {sienaAmenitiesPage.communityCenter.intro}
              </p>
              <p className="text-slate-700 mb-4">
                {sienaAmenitiesPage.communityCenter.heartOfSiena}
              </p>
              <div className="bg-siena-cream border border-siena-brown/30 rounded-lg p-4 flex items-start gap-3">
                <Clock className="h-5 w-5 text-siena-teal flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-siena-heading uppercase tracking-wide font-semibold text-siena-brown mb-2">
                    Community Center Hours
                  </h3>
                  <ul className="text-slate-700 text-sm space-y-1">
                    {Object.entries(hours).map(([day, time]) => (
                      <li key={day}>
                        <strong>{day}:</strong> {time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Room Rentals */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-8 w-8 text-siena-teal" />
                <h2 className="font-siena-heading uppercase tracking-wide text-2xl font-bold text-siena-teal">
                  {sienaAmenitiesPage.roomRentals.heading}
                </h2>
              </div>
              <p className="text-slate-700">{sienaAmenitiesPage.roomRentals.text}</p>
              <p className="mt-2 text-sm">
                <a
                  href={sienaAmenitiesPage.sienalvRoomRental}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-siena-teal hover:underline"
                >
                  Learn more at sienalv.org →
                </a>
              </p>
            </section>

            {/* Fitness Center */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Dumbbell className="h-8 w-8 text-siena-teal" />
                <h2 className="font-siena-heading uppercase tracking-wide text-2xl font-bold text-siena-teal">
                  {sienaAmenitiesPage.fitnessCenter.heading}
                </h2>
              </div>
              <p className="text-slate-700">{sienaAmenitiesPage.fitnessCenter.text}</p>
              <p className="mt-2 text-sm">
                <a
                  href={sienaAmenitiesPage.sienalvFitness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-siena-teal hover:underline"
                >
                  Learn more at sienalv.org →
                </a>
              </p>
            </section>

            {/* Salon & Spa */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-siena-teal" />
                <h2 className="font-siena-heading uppercase tracking-wide text-2xl font-bold text-siena-teal">
                  {sienaAmenitiesPage.salonSpa.heading}
                </h2>
              </div>
              <p className="text-slate-700">{sienaAmenitiesPage.salonSpa.text}</p>
              <p className="mt-2 text-sm">
                <a
                  href={sienaAmenitiesPage.sienalvSalon}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-siena-teal hover:underline"
                >
                  Learn more at sienalv.org →
                </a>
              </p>
            </section>

            <p className="text-slate-600">
              For real estate in Siena, contact{" "}
              <strong className="text-siena-brown">Dr. Jan Duffy</strong>:{" "}
              <a href="tel:+17025001942" className="text-siena-teal hover:underline">
                (702) 500-1942
              </a>{" "}
              | sienalasvegas.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

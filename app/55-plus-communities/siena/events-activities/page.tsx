import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Calendar, PartyPopper } from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { sienaEventsPage } from "@/lib/siena-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Siena Events & Activities | Lifestyle, Signature Events | Dr. Jan Duffy",
  description:
    "Siena Lifestyle Department and Social Committee events: Sienafest, New Year's Eve Gala, Smith Center trips, trivia, BINGO, Golf & Bistro events. Dr. Jan Duffy, Siena real estate.",
  path: "/55-plus-communities/siena/events-activities",
});

export default function SienaEventsActivitiesPage() {
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
              <span className="text-slate-900">Events & Activities</span>
            </nav>

            <div className="flex items-center gap-3 mb-8">
              <Calendar className="h-10 w-10 text-siena-teal" />
              <h1 className="font-siena-heading uppercase tracking-wide text-3xl md:text-4xl font-bold text-siena-teal">
                {sienaEventsPage.title}
              </h1>
            </div>

            <p className="text-slate-700 mb-6">{sienaEventsPage.intro}</p>
            <p className="text-slate-700 mb-10">{sienaEventsPage.intro2}</p>

            {/* Signature Events */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <PartyPopper className="h-6 w-6 text-siena-teal" />
                <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown">
                  {sienaEventsPage.signatureEvents.heading}
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                {sienaEventsPage.signatureEvents.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Lifestyle Events */}
            <section className="mb-10">
              <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-4">
                {sienaEventsPage.lifestyleEvents.heading}
              </h2>
              <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                {sienaEventsPage.lifestyleEvents.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Other Activities */}
            <section className="mb-10">
              <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-4">
                {sienaEventsPage.otherActivities.heading}
              </h2>
              <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                {sienaEventsPage.otherActivities.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Golf & Bistro Events */}
            <section className="mb-10">
              <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-4">
                {sienaEventsPage.golfBistroEvents.heading}
              </h2>
              <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                {sienaEventsPage.golfBistroEvents.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <p className="text-sm text-slate-500 mb-8">
              <a
                href={sienaEventsPage.sienalvEvents}
                target="_blank"
                rel="noopener noreferrer"
                className="text-siena-teal hover:underline"
              >
                More at sienalv.org →
              </a>
            </p>

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

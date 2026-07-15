import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Users } from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { sienaClubsPage } from "@/lib/siena-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Siena Clubs & Groups | Active, Social, Creative | Dr. Jan Duffy",
  description:
    "Siena resident-run clubs and groups: Active, Card & Game, Creative, Discussion, Informative, Social. Bocce, Golf, Pickleball, Bridge, Art, Book Group & more. Dr. Jan Duffy, Siena real estate.",
  path: "/55-plus-communities/siena/clubs-groups",
});

export default function SienaClubsGroupsPage() {
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
              <span className="text-slate-900">Clubs & Groups</span>
            </nav>

            <div className="flex items-center gap-3 mb-8">
              <Users className="h-10 w-10 text-siena-teal" />
              <h1 className="font-siena-heading uppercase tracking-wide text-3xl md:text-4xl font-bold text-siena-teal">
                {sienaClubsPage.title}
              </h1>
            </div>

            <p className="text-slate-700 mb-10">{sienaClubsPage.intro}</p>

            <div className="space-y-8">
              {sienaClubsPage.categories.map((cat) => (
                <section key={cat.name}>
                  <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-3">
                    {cat.name}
                  </h2>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                    {cat.clubs.map((club) => (
                      <li key={club}>{club}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <p className="mt-8 text-sm text-slate-500">
              Residents:{" "}
              <a
                href={sienaClubsPage.sienalvClubsPublic}
                target="_blank"
                rel="noopener noreferrer"
                className="text-siena-teal hover:underline"
              >
                Clubs and groups at sienalv.org
              </a>
              {" "}(contact information for residents at sienalv.org).
            </p>

            <p className="mt-8 text-slate-600">
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

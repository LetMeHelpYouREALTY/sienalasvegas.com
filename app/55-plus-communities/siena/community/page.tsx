import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { sienaCommunityPage } from "@/lib/siena-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Siena Community | Location & Overview | Dr. Jan Duffy",
  description:
    "Siena is a 667-acre age-privileged community in Summerlin South with 2,001 single-family homes and villas. Golf course living, I-215 access, Downtown Summerlin nearby. Dr. Jan Duffy, Siena real estate.",
  path: "/55-plus-communities/siena/community",
});

export default function SienaCommunityPage() {
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
              <span className="text-slate-900">Community</span>
            </nav>

            <div className="flex items-center gap-3 mb-8">
              <MapPin className="h-10 w-10 text-siena-teal" />
              <h1 className="font-siena-heading uppercase tracking-wide text-3xl md:text-4xl font-bold text-siena-teal">
                {sienaCommunityPage.title}
              </h1>
            </div>

            <div className="max-w-none text-slate-700 space-y-6">
              <p>{sienaCommunityPage.intro}</p>
              <p>{sienaCommunityPage.location}</p>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              <a
                href={sienaCommunityPage.link55places}
                target="_blank"
                rel="noopener noreferrer"
                className="text-siena-teal hover:underline"
              >
                See what 55places.com has to say about Siena →
              </a>
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

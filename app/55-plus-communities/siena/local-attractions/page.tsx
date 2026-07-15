import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Landmark, Utensils, ShoppingBag, Music, Trophy, TreePine } from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { sienaLocalAttractionsPage } from "@/lib/siena-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Local Attractions Near Siena | Museums, Shopping, Sports, Parks | Dr. Jan Duffy",
  description:
    "Attractions, museums, restaurants, shopping, shows, sports teams, and state & national parks near Siena Las Vegas. Dr. Jan Duffy, Siena real estate.",
  path: "/55-plus-communities/siena/local-attractions",
});

export default function SienaLocalAttractionsPage() {
  const data = sienaLocalAttractionsPage;
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
              <span className="text-slate-900">Local Attractions</span>
            </nav>

            <div className="flex items-center gap-3 mb-8">
              <Landmark className="h-10 w-10 text-siena-teal" />
              <h1 className="font-siena-heading uppercase tracking-wide text-3xl md:text-4xl font-bold text-siena-teal">
                {data.title}
              </h1>
            </div>

            <p className="text-slate-700 mb-4">{data.intro}</p>
            <p className="text-slate-600 text-sm mb-10">
              <a
                href={data.lasVegasWeekly}
                target="_blank"
                rel="noopener noreferrer"
                className="text-siena-teal hover:underline"
              >
                Las Vegas Weekly
              </a>{" "}
              — for the latest on what&apos;s new in Las Vegas.
            </p>

            {/* Attractions & Museums */}
            <section className="mb-10">
              <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-4 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-siena-teal" />
                {data.attractionsMuseums.heading}
              </h2>
              <ul className="list-disc list-inside text-slate-700 space-y-1 columns-1 sm:columns-2 marker:text-siena-teal">
                {data.attractionsMuseums.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Restaurants */}
            <section className="mb-10">
              <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-4 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-siena-teal" />
                {data.restaurants.heading}
              </h2>
              <p className="text-slate-700 mb-3">{data.restaurants.intro}</p>
              <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                {data.restaurants.categories.map((cat) => (
                  <li key={cat}>{cat}</li>
                ))}
              </ul>
            </section>

            {/* Shopping */}
            <section className="mb-10">
              <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-siena-teal" />
                {data.shopping.heading}
              </h2>
              <p className="text-slate-700 mb-3">{data.shopping.intro}</p>
              <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                {data.shopping.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Shows */}
            <section className="mb-10">
              <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-4 flex items-center gap-2">
                <Music className="h-5 w-5 text-siena-teal" />
                {data.shows.heading}
              </h2>
              <p className="text-slate-700 mb-4">{data.shows.text}</p>
              <p className="text-slate-700">{data.shows.smithCenter}</p>
            </section>

            {/* Sports */}
            <section className="mb-10">
              <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-siena-teal" />
                {data.sports.heading}
              </h2>
              <p className="text-slate-700 mb-4">{data.sports.intro}</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-siena-heading uppercase tracking-wide font-semibold text-siena-brown mb-2">
                    Major Professional Sports Teams
                  </h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                    {data.sports.major.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-siena-heading uppercase tracking-wide font-semibold text-siena-brown mb-2">
                    Minor Professional Sports Teams
                  </h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                    {data.sports.minor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-siena-heading uppercase tracking-wide font-semibold text-siena-brown mb-2">
                    Amateur Teams
                  </h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                    {data.sports.amateur.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* State and National Parks */}
            <section className="mb-10">
              <h2 className="font-siena-heading uppercase tracking-wide text-xl font-bold text-siena-brown mb-4 flex items-center gap-2">
                <TreePine className="h-5 w-5 text-siena-teal" />
                {data.parks.heading}
              </h2>
              <p className="text-slate-700 mb-4">{data.parks.intro}</p>
              <ul className="list-disc list-inside text-slate-700 space-y-1 marker:text-siena-teal">
                {data.parks.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <p className="text-sm text-slate-500 mb-8">
              <a
                href={data.sienalvLocalAttractions}
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

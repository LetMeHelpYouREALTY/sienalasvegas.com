import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Home, Search, Phone } from "lucide-react";
import { agentInfo } from "@/lib/site-config";

// A branded 404 avoids "soft 404" ambiguity in Search Console and keeps
// visitors who hit a dead/removed link on the site instead of bouncing.
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-6xl md:text-7xl font-bold text-slate-300 mb-4">404</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              We couldn&apos;t find that page
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              The page you&apos;re looking for may have moved or no longer exists.
              Here are some helpful places to start instead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                <Home className="h-5 w-5" />
                Back to Homepage
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-md hover:bg-slate-50 transition-colors"
              >
                <Search className="h-5 w-5" />
                Search Listings
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-10">
              <Link href="/55-plus-communities/siena" className="text-blue-600 hover:underline">
                Siena
              </Link>
              <Link href="/neighborhoods" className="text-blue-600 hover:underline">
                Neighborhoods
              </Link>
              <Link href="/buyers" className="text-blue-600 hover:underline">
                Buyers
              </Link>
              <Link href="/sellers" className="text-blue-600 hover:underline">
                Sellers
              </Link>
              <Link href="/about" className="text-blue-600 hover:underline">
                About
              </Link>
              <Link href="/faq" className="text-blue-600 hover:underline">
                FAQ
              </Link>
              <Link href="/market-report" className="text-blue-600 hover:underline">
                Market Report
              </Link>
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact
              </Link>
            </div>
            <p className="text-slate-500 text-sm">
              Or call {agentInfo.name} directly:{" "}
              <a href={agentInfo.phoneTel} className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {agentInfo.phone}
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Dynamically import LeafletMap (disable SSR)
const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
  loading: () => <p className="text-gray-500 mt-4">Loading map...</p>,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-zinc-100 dark:from-black dark:to-zinc-900 font-sans text-center px-6 py-12">
      
      {/* --- Hero Section --- */}
      <main className="w-full max-w-5xl flex flex-col items-center mb-12">
        <Image
          src="/next.svg"
          alt="Voltyaan Logo"
          width={100}
          height={20}
          className="dark:invert mb-4"
        />

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          ⚡ Voltyaan — Smarter Journeys. Powered by Volts.
        </h1>

        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          India’s EV intelligence and resale insight platform.  
          Discover charging points, vehicle insights, and more — all free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/valuation"
            className="bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-emerald-700 transition-all"
          >
            🚗 Check My EV Value
          </Link>
          <Link
            href="/waitlist"
            className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-full text-lg font-medium hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-all"
          >
            Join Waitlist
          </Link>
        </div>
      </main>

      {/* --- Map Section --- */}
      <section className="w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
          🔋 Explore EV Charging Stations Across India
        </h2>
        <LeafletMap />
        <p className="text-zinc-500 mt-4 text-sm">
          Explore EV charging points across India — powered by Leaflet & OpenStreetMap.
        </p>
      </section>

      {/* --- Footer --- */}
      <footer className="mt-16 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Voltyaan. All rights reserved.
      </footer>
    </div>
  );
}

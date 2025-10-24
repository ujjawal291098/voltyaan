"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Dynamically import LeafletMap (disable SSR)
const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
  loading: () => <p className="text-gray-500 mt-4">Loading map...</p>,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-emerald-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900 font-sans text-center px-6 py-12">
      
      {/* 🌟 Hero Section */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl flex flex-col items-center mb-16"
      >
        <div className="relative">
          <div className="absolute -inset-8 bg-emerald-500/20 blur-3xl rounded-full"></div>
          <Image
            src="/next.svg"
            alt="Voltyaan Logo"
            width={110}
            height={30}
            className="relative z-10 dark:invert mb-4"
          />
        </div>

        <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
          ⚡ Voltyaan  
          <span className="block text-emerald-600 dark:text-emerald-400 text-2xl mt-2">
            Smarter Journeys. Powered by Volts.
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          India’s EV intelligence platform for resale, insights & charging stations.  
          Built to empower smarter electric mobility decisions — free and open.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/valuation"
            className="bg-emerald-600 text-white px-7 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 hover:bg-emerald-700 transition-all"
          >
            🚗 Check My EV Value
          </Link>
          <Link
            href="/waitlist"
            className="border border-emerald-600 text-emerald-600 px-7 py-3 rounded-full text-lg font-semibold hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-all"
          >
            Join Waitlist
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm">
          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
            🚘 EV Resale Insights
          </span>
          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
            🔋 Charging Network Data
          </span>
          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
            🤖 GPT Analysis (Coming Soon)
          </span>
        </div>
      </motion.main>

      {/* 🗺️ Map Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full max-w-5xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
          🔋 Explore EV Charging Stations Across India
        </h2>

        <div className="overflow-hidden rounded-2xl border border-zinc-300 dark:border-zinc-700">
          <LeafletMap />
        </div>

        <p className="text-zinc-500 mt-4 text-sm">
          Data from OpenChargeMap • Built with ❤️ by the Voltyaan team
        </p>
      </motion.section>

      {/* 🦶 Footer */}
      <footer className="mt-16 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Voltyaan — Smarter Journeys, Powered by Volts ⚡
      </footer>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Dynamically import LeafletMap (disable SSR)
const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
  loading: () => <p className="text-gray-500 mt-4">Loading map...</p>,
});

// Type for News Articles
interface NewsArticle {
  title?: string;
  link?: string;
  source_id?: string;
  pubDate?: string;
}

// Type for Subsidy Data
interface SubsidyItem {
  state?: string;
  manufacturer?: string;
  vehicle_category?: string;
  total_subsidy_disbursed?: string;
  scheme_name?: string;
}

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [subsidies, setSubsidies] = useState<SubsidyItem[]>([]);

  // ✅ Fetch Indian EV News
  useEffect(() => {
    const fetchEVNews = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_6d1d6305c38b4e0ca6bac19c55202ca3&q=(EV%20OR%20electric%20vehicle)%20India&country=in&language=en"
        );
        const data = await res.json();
        if (data?.results) {
          const filtered = data.results.filter(
            (a: NewsArticle) =>
              a.title?.toLowerCase().includes("ev") ||
              a.title?.toLowerCase().includes("electric vehicle")
          );
          setArticles(filtered);
        }
      } catch (error) {
        console.error("Error fetching EV news:", error);
      }
    };

    fetchEVNews();
  }, []);

  // ✅ Fetch Indian EV Subsidy Data (FAME-II)
  useEffect(() => {
    const fetchSubsidies = async () => {
      try {
        const res = await fetch(
          "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001b0f8cf1a61ac4efc6b5dc9b35d7035d5&format=json&limit=10"
        );
        const data = await res.json();
        if (data?.records) {
          setSubsidies(data.records.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching subsidies:", error);
      }
    };

    fetchSubsidies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-50 to-emerald-100 dark:from-black dark:to-zinc-900 font-sans text-center px-6 py-12">

      {/* --- Hero Section --- */}
      <main className="w-full max-w-5xl flex flex-col items-center mb-16">

        {/* Logo */}
        <Image
          src="/voltyaan-logo.png"
          alt="Voltyaan Logo"
          width={160}
          height={160}
          className="mb-4 drop-shadow-md"
        />

        <h1 className="text-5xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
          ⚡ Voltyaan
        </h1>

        <p className="text-emerald-700 dark:text-emerald-400 text-xl font-semibold mb-4">
          Smarter Journeys. Powered by Volts.
        </p>

        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-10">
          India’s EV intelligence and resale insight platform.<br />
          Discover vehicle insights, resale value, charging stations, and more — all free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/valuation"
            className="bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-emerald-700 transition-all"
          >
            🚗 Check My EV Value
          </Link>

          <Link
            href="/insights"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-700 transition-all"
          >
            📊 EV Insights
          </Link>

          <Link
            href="/waitlist"
            className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-full text-lg font-medium hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-all"
          >
            Join Waitlist
          </Link>
        </div>
      </main>

      {/* --- Map + Sidebar Section --- */}
      <section className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-start">

        {/* Map */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            🔋 Explore EV Charging Stations Across India
          </h2>
          <LeafletMap />
          <p className="text-zinc-500 mt-4 text-sm">Built by UK ⚡</p>
        </div>

        {/* Sidebar: News + Subsidy */}
        <aside className="w-full md:w-1/3 bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-5 border border-emerald-100 dark:border-zinc-700 max-h-[800px] overflow-y-auto">
          
          {/* --- EV News --- */}
          <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">
            📰 Latest EV News
          </h2>

          {articles.length === 0 ? (
            <p className="text-gray-500 text-sm mb-6">Loading EV updates...</p>
          ) : (
            <ul className="space-y-4 text-left mb-6">
              {articles.slice(0, 6).map((article, idx) => (
                <li key={idx} className="border-b border-gray-100 dark:border-zinc-700 pb-2">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                  >
                    {article.title}
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {article.source_id?.toUpperCase() || "Source"} •{" "}
                    {new Date(article.pubDate || "").toLocaleDateString("en-IN")}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* --- EV Subsidy Tracker --- */}
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">
            💰 EV Subsidy & Policy Tracker
          </h2>

          {subsidies.length === 0 ? (
            <p className="text-gray-500 text-sm">Loading subsidy data...</p>
          ) : (
            <ul className="space-y-3 text-left">
              {subsidies.map((item, idx) => (
                <li key={idx} className="border-b border-gray-100 dark:border-zinc-700 pb-2">
                  <p className="font-medium text-emerald-700 dark:text-emerald-400">
                    {item.vehicle_category || "EV Type"} – {item.manufacturer || "Manufacturer"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    State: {item.state || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Subsidy: ₹{item.total_subsidy_disbursed || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>

      {/* --- Footer --- */}
      <footer className="mt-16 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Voltyaan. All rights reserved.
      </footer>
    </div>
  );
}

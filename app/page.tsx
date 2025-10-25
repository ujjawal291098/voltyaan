"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Dynamically import LeafletMap
const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
  loading: () => <p className="text-gray-500 mt-4">Loading map...</p>,
});

export default function Home() {
  const [articles, setArticles] = useState([]);

  // Fetch EV News (India)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_6d1d6305c38b4e0ca6bac19c55202ca3&q=EV%20India%20OR%20electric%20vehicle%20India&country=in&language=en"
        );
        const data = await res.json();
        setArticles(data.results?.slice(0, 5) || []); // top 5 news
      } catch (err) {
        console.error("Error fetching EV news:", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-zinc-100 dark:from-black dark:to-zinc-900 font-sans text-center px-6 py-12">
      
      {/* --- Hero Section --- */}
      <main className="w-full max-w-6xl flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
        {/* Left side: Intro + Map */}
        <div className="flex-1">
          <Image
            src="/logo.png"
            alt="Voltyaan Logo"
            width={120}
            height={40}
            className="mx-auto lg:mx-0 mb-6"
          />

          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 text-left">
            ⚡ Voltyaan — Smarter Journeys. Powered by Volts.
          </h1>

          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-8 text-left">
            India’s EV intelligence and resale insight platform.  
            Discover resale value, live charging points, and now — the latest EV news!
          </p>

          <div className="flex flex-wrap gap-4 justify-start mb-6">
            <Link
              href="/valuation"
              className="bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-emerald-700 transition-all"
            >
              🚗 Check My EV Value
            </Link>
            <Link
              href="/insights"
              className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-full text-lg font-medium hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-all"
            >
              📊 Explore Insights
            </Link>
          </div>

          {/* Map Section */}
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-left">
            🔋 EV Charging Stations Across India
          </h2>
          <LeafletMap />
        </div>

        {/* Right side: Live EV News */}
        <aside className="w-full lg:w-[380px] bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-5 h-fit border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4 text-left">
            📰 Latest EV News (India)
          </h2>
          {articles.length === 0 ? (
            <p className="text-gray-500">Fetching EV news...</p>
          ) : (
            <ul className="space-y-4">
              {articles.map((article, idx) => (
                <li key={idx} className="text-left">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-emerald-600 transition"
                  >
                    <h3 className="font-semibold">
                      {article.title?.slice(0, 80)}...
                    </h3>
                    <p className="text-sm text-gray-500">
                      {article.source_id?.toUpperCase()} |{" "}
                      {new Date(article.pubDate).toLocaleDateString()}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>

      {/* --- Footer --- */}
      <footer className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Voltyaan. All rights reserved.
      </footer>
    </div>
  );
}

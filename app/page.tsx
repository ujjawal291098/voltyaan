"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ✅ Dynamically load Map (no SSR)
const Map = dynamic(() => import("../components/LeafletMap.jsx"), { ssr: false });

// 📰 Define news article structure
interface NewsArticle {
  title?: string;
  link?: string;
  source_id?: string;
  pubDate?: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  // ✅ Fetch Indian EV News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_6d1d6305c38b4e0ca6bac19c55202ca3&q=EV%20India%20OR%20electric%20vehicle%20India&country=in&language=en"
        );
        const data = await res.json();
        setArticles(data.results || []);
      } catch (error) {
        console.error("Error fetching EV news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* LEFT: Map Section */}
      <section className="flex-1 relative">
        <Map />
      </section>

      {/* RIGHT: EV News Feed */}
      <aside className="w-full md:w-1/3 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">
          ⚡ Latest EV News (India)
        </h2>

        {articles.length === 0 ? (
          <p className="text-gray-500">Loading latest EV updates...</p>
        ) : (
          <ul className="space-y-4">
            {articles.slice(0, 10).map((article, idx) => (
              <li key={idx} className="text-left border-b pb-2">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-emerald-600 transition"
                >
                  <span className="font-medium">{article.title}</span>
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  {article.source_id?.toUpperCase() || "Source"} —{" "}
                  {new Date(article.pubDate || "").toLocaleDateString("en-IN")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </main>
  );
}

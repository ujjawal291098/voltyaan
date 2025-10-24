"use client";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function InsightsPage() {
  // 🔹 Mock data for Indian EVs
  const resaleData = {
    labels: ["Tata Nexon EV", "MG ZS EV", "Hyundai Kona", "Mahindra XUV400", "Ola S1 Pro"],
    datasets: [
      {
        label: "Resale Value Retention (%)",
        data: [82, 76, 74, 70, 68],
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        borderColor: "rgba(5, 150, 105, 1)",
        borderWidth: 1,
      },
    ],
  };

  const batteryHealth = {
    labels: ["0-1 Year", "1-2 Years", "2-3 Years", "3-4 Years", "4+ Years"],
    datasets: [
      {
        label: "Battery Health (%)",
        data: [99, 95, 90, 85, 80],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.3,
      },
    ],
  };

  const marketShare = {
    labels: ["Tata", "MG", "Hyundai", "Mahindra", "Ola"],
    datasets: [
      {
        data: [48, 18, 12, 10, 12],
        backgroundColor: [
          "#16a34a",
          "#2563eb",
          "#f59e0b",
          "#7c3aed",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 flex flex-col items-center p-8">
      <header className="flex justify-between items-center w-full max-w-5xl mb-10">
        <h1 className="text-3xl font-semibold">
          ⚡ Voltyaan Insights Dashboard
        </h1>
        <nav className="space-x-4">
          <Link href="/" className="text-emerald-600 hover:underline">
            Home
          </Link>
          <Link href="/valuation" className="text-emerald-600 hover:underline">
            Valuation
          </Link>
        </nav>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* 📊 Resale Value */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">
            EV Resale Value Retention
          </h2>
          <Bar data={resaleData} />
        </div>

        {/* 🔋 Battery Health */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Battery Health Trend</h2>
          <Line data={batteryHealth} />
        </div>

        {/* 🧩 Market Share */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-3">EV Market Share in India</h2>
          <div className="w-2/3 mx-auto">
            <Doughnut data={marketShare} />
          </div>
        </div>
      </div>

      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
        Data is illustrative only (Voltyaan Mock Insights)
      </footer>
    </div>
  );
}

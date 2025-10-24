"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ValuationPage() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    battery: "",
  });

  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // --- Mock logic for valuation ---
    const depreciationRate = 0.18;
    const age = new Date().getFullYear() - Number(formData.year || new Date().getFullYear());
    const baseValue = 1500000; // ₹15 L base value for sample EV
    const estValue = baseValue * Math.pow(1 - depreciationRate, age);
    const batteryHealth = 100 - age * 7 - Number(formData.mileage) / 2000 - (100 - Number(formData.battery)) * 0.5;
    const healthScore = Math.max(0, Math.min(100, batteryHealth));

    setResult({
      price: estValue.toFixed(0),
      score: healthScore.toFixed(0),
      comment:
        healthScore > 75
          ? "Excellent! Your EV battery and resale health are great."
          : healthScore > 50
          ? "Good condition, with mild depreciation."
          : "Needs inspection — resale might be low due to battery wear.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-100 dark:from-black dark:to-zinc-900 text-center px-6 py-12 font-sans">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">
        ⚡ EV Valuation Tool
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-10">
        Enter your EV details to estimate resale value and health.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 space-y-6"
      >
        {/* --- Brand & Model --- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 bg-transparent"
            required
          >
            <option value="">Select Brand</option>
            <option value="Tata">Tata</option>
            <option value="Ola">Ola</option>
            <option value="MG">MG</option>
            <option value="Hyundai">Hyundai</option>
          </select>

          <select
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 bg-transparent"
            required
          >
            <option value="">Select Model</option>
            <option value="Nexon EV">Nexon EV</option>
            <option value="Ola S1 Pro">Ola S1 Pro</option>
            <option value="MG ZS EV">MG ZS EV</option>
            <option value="Hyundai Kona">Hyundai Kona</option>
          </select>
        </div>

        {/* --- Year, Mileage, Battery --- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 bg-transparent"
            required
          />
          <input
            type="number"
            name="mileage"
            placeholder="Mileage (km)"
            value={formData.mileage}
            onChange={handleChange}
            className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 bg-transparent"
            required
          />
          <input
            type="number"
            name="battery"
            placeholder="Battery Health (%)"
            value={formData.battery}
            onChange={handleChange}
            className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 bg-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition"
        >
          🔍 Generate Valuation
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 max-w-lg mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-emerald-600 mb-3">
            💰 Estimated Resale Value: ₹{Number(result.price).toLocaleString("en-IN")}
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-2">
            Battery Health Score: <span className="font-semibold">{result.score}%</span>
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">{result.comment}</p>
        </motion.div>
      )}
    </div>
  );
}


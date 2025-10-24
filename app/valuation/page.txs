"use client";
import { useState } from "react";

export default function ValuationPage() {
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [battery, setBattery] = useState("");
  const [valuation, setValuation] = useState<number | null>(null);

  const calculateValue = () => {
    // Simple EV valuation logic (example formula)
    const baseValue = 2000000; // ₹20L base
    const age = new Date().getFullYear() - Number(year || new Date().getFullYear());
    const depreciation = age * 0.08; // 8% depreciation per year
    const batteryFactor = (Number(battery) || 100) / 100;
    const mileageFactor = 1 - (Number(mileage) || 0) / 200000;

    const finalValue = baseValue * batteryFactor * mileageFactor * (1 - depreciation);
    setValuation(Math.max(finalValue, 100000)); // min value ₹1L
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-zinc-50 dark:bg-black text-black dark:text-zinc-50">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🔋 EV Valuation Estimator
      </h1>

      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">EV Model</label>
          <input
            type="text"
            placeholder="e.g., Tata Nexon EV"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-zinc-800"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Manufacture Year</label>
          <input
            type="number"
            placeholder="e.g., 2021"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-zinc-800"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mileage (km)</label>
          <input
            type="number"
            placeholder="e.g., 15000"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-zinc-800"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Battery Health (%)</label>
          <input
            type="number"
            placeholder="e.g., 90"
            value={battery}
            onChange={(e) => setBattery(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-zinc-800"
            required
          />
        </div>

        <button
          onClick={calculateValue}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Calculate Valuation
        </button>

        {valuation && (
          <div className="mt-6 text-center bg-green-100 dark:bg-green-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Estimated Value:</h2>
            <p className="text-2xl font-bold mt-2">
              ₹ {valuation.toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


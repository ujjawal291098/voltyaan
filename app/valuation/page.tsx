'use client';
import { useState } from 'react';
import evModels from '@/data/evModels.json';

export default function ValuationPage() {
  const [selectedModel, setSelectedModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [battery, setBattery] = useState('80');
  const [valuation, setValuation] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleValuation = () => {
    if (!selectedModel || !mileage || !battery) {
      setError('⚠️ Please fill all fields to calculate valuation.');
      setValuation(null);
      return;
    }

    setError('');

    const modelData = evModels.find(m => m.model === selectedModel);
    if (!modelData) {
      setError('Model data not found.');
      return;
    }

    const { basePrice, range } = modelData;
    const mileageFactor = Math.max(0.5, 1 - Number(mileage) / 100000);
    const batteryFactor = Number(battery) / 100;
    const rangeFactor = range / 500;

    const estimatedValue = basePrice * mileageFactor * batteryFactor * rangeFactor;
    setValuation(Math.round(estimatedValue));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-emerald-700 mb-6 text-center">
          ⚡ Check My EV Value
        </h1>

        {/* EV Model Selection */}
        <label className="block mb-2 text-gray-700 font-medium">Select EV Model</label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">-- Choose your EV --</option>
          {evModels.map((m) => (
            <option key={m.model} value={m.model}>{m.model}</option>
          ))}
        </select>

        {/* Mileage Input */}
        <label className="block mb-2 text-gray-700 font-medium">Mileage</label>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            placeholder="Enter mileage"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            step={5000}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400"
          />
          <span className="text-gray-600 font-medium">km</span>
        </div>

        {/* Battery Slider */}
        <label className="block mb-2 text-gray-700 font-medium">Battery Health: {battery}%</label>
        <input
          type="range"
          min="50"
          max="100"
          step="1"
          value={battery}
          onChange={(e) => setBattery(e.target.value)}
          className="w-full accent-emerald-600 mb-6 cursor-pointer"
        />

        {/* Valuation Button */}
        <button
          onClick={handleValuation}
          className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-2 rounded-lg font-semibold transition-all"
        >
          Get Valuation
        </button>

        {/* Error Display */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Valuation Result */}
        {valuation && !error && (
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
            <h2 className="text-2xl font-semibold text-emerald-700">Estimated Value</h2>
            <p className="text-3xl font-bold mt-2">₹{valuation.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

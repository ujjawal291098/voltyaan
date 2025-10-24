import { useState } from 'react';
import DownloadReport from '../components/DownloadReport';

export default function Valuation() {
  const [model, setModel] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getValuation(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/valuate?model=${encodeURIComponent(model)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Failed to fetch' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Check My EV Value</h1>
      <form onSubmit={getValuation} className="space-y-3">
        <input value={model} onChange={e=>setModel(e.target.value)} placeholder="Enter EV Model (e.g., Tata Nexon EV)" className="w-full p-2 border rounded" />
        <button className="bg-emerald-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Working…' : 'Get Valuation'}</button>
      </form>

      {result && result.error && <div className="mt-4 text-red-600">{result.error}</div>}

      {result && !result.error && (
        <div id="report" className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="font-semibold text-lg">{result.model}</h2>
          <p className="mt-2"><strong>Estimated Value:</strong> ₹{result.estimatedValue.toLocaleString()}</p>
          <p><strong>Battery Health:</strong> {result.batteryHealth}%</p>
          <p className="text-slate-700 mt-2">{result.analysis}</p>
          <div className="mt-4"><DownloadReport /></div>
        </div>
      )}
    </div>
  );
}

import ChargingMap from '../components/ChargingMap';
import dynamic from 'next/dynamic';
import EVRegistrationsChart from '../components/EVRegistrationsChart';
import EVComparisonChart from '../components/EVComparisonChart';

export default function Insights() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold">EV Insights</h1>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">EV Registrations (sample)</h2>
        <EVRegistrationsChart />
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Charging Stations (OpenChargeMap)</h2>
        <div className="h-96"><ChargingMap /></div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Model Comparison</h2>
        <EVComparisonChart />
      </section>
    </div>
  );
}

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <img src="/logo.svg" alt="VoltYaan" className="w-32 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Welcome to VoltYaan - India’s EV resale and intelligence platform.</h1>
      <p className="text-slate-700 mt-3 mb-6 text-center max-w-2xl">Mock-first MVP: Get resale insights, battery score and a downloadable Voltyaan Report. No signup required.</p>
      <div className="flex gap-4">
        <Link href="/valuation"><a className="bg-emerald-600 text-white px-6 py-3 rounded-md">Check My EV Value</a></Link>
        <Link href="/insights"><a className="border border-slate-300 px-6 py-3 rounded-md">Insights</a></Link>
      </div>

      <div className="mt-12 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-2">Join our waitlist</h3>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe-placeholder/viewform?embedded=true" width="100%" height="360" frameBorder="0">Loading…</iframe>
      </div>
    </main>
);
}

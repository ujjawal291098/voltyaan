"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

// ✅ Dynamically import the map (no SSR)
const ChargingMap = dynamic(() => import("../components/ChargingMap"), {
  ssr: false,
  loading: () => <p className="text-gray-500">Loading map...</p>,
});

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mt-10">
          Voltyaan ⚡ — EV Charging Map
        </h1>

        <ChargingMap />

        <p className="text-zinc-500 mt-6">
          Explore EV charging points across India, powered by Leaflet and
          Next.js.
        </p>
      </main>
    </div>
  );
}

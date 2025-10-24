"use client";

import { useEffect } from "react";

// ✅ Import CSS only inside useEffect
export default function LeafletMap() {
  useEffect(() => {
    // Ensure code runs only in browser
    if (typeof window === "undefined") return;

    // Dynamically import both leaflet and its CSS
    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      const map = L.map("map").setView([20.5937, 78.9629], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
    })();
  }, []);

  return (
    <div
      id="map"
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "12px",
        marginTop: "1rem",
      }}
    />
  );
}

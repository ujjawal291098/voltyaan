"use client";

import { useEffect } from "react";

export default function LeafletMap() {
  useEffect(() => {
    // ✅ Run only in browser
    if (typeof window === "undefined") return;

    (async () => {
      // Dynamically import Leaflet + CSS
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Check if map already exists (avoid duplicates on hot reload)
      if (L.DomUtil.get("map") !== null) {
        L.DomUtil.get("map")._leaflet_id = null;
      }

      // Initialize map
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

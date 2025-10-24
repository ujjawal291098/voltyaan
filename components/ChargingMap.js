"use client";

import { useEffect } from "react";

export default function ChargingMap() {
  useEffect(() => {
    // ✅ Only run in the browser
    if (typeof window === "undefined") return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Remove existing map on re-render (hot reload/dev)
      const existingMap = L.DomUtil.get("charging-map");
      if (existingMap !== null) {
        existingMap._leaflet_id = null;
      }

      // Create map centered on India
      const map = L.map("charging-map").setView([20.5937, 78.9629], 5);

      // Add OpenStreetMap layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Example charging stations
      const stations = [
        { name: "Delhi EV Station", coords: [28.6139, 77.209] },
        { name: "Mumbai EV Hub", coords: [19.076, 72.8777] },
        { name: "Bangalore EV Point", coords: [12.9716, 77.5946] },
      ];

      // Add markers
      stations.forEach((station) => {
        const marker = L.marker(station.coords).addTo(map);
        marker.bindPopup(`<b>${station.name}</b>`);
      });
    })();
  }, []);

  return (
    <div
      id="charging-map"
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "12px",
        marginTop: "1rem",
      }}
    />
  );
}

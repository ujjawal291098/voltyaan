"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMap() {
  useEffect(() => {
    // Create the map only on the client
    const map = L.map("map").setView([28.6139, 77.209], 6); // centered on India

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org">OSM</a> contributors',
    }).addTo(map);

    // Example marker
    L.marker([28.6139, 77.209]).addTo(map).bindPopup("Welcome to Voltyaan! ⚡");
  }, []);

  return (
    <div
      id="map"
      className="w-full h-[500px] rounded-xl border border-gray-300 dark:border-gray-700 mt-10"
    />
  );
}

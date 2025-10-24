"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMap() {
  useEffect(() => {
    // Skip running on server
    if (typeof window === "undefined") return;

    const map = L.map("map").setView([20.5937, 78.9629], 5); // India coords
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  }, []);

  return (
    <div
      id="map"
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    />
  );
}

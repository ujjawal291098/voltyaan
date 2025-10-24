"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// 🚨 import Leaflet only inside useEffect to avoid SSR “window is not defined”
export default function LeafletMap() {
  useEffect(() => {
    // Make sure we only run this in the browser
    if (typeof window === "undefined") return;

    // Dynamically import leaflet only on the client
    import("leaflet").then((L) => {
      const map = L.map("map").setView([20.5937, 78.9629], 5); // India coords
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
    });
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

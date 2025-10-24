"use client";

import { useEffect } from "react";

export default function LeafletMap() {
  useEffect(() => {
    // Ensure this runs only in browser
    if (typeof window === "undefined") return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Prevent duplicate map reloads
      if (L.DomUtil.get("map") !== null) {
        L.DomUtil.get("map")._leaflet_id = null;
      }

      // Initialize map view (centered over India)
      const map = L.map("map").setView([20.5937, 78.9629], 5);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // ✅ Fetch OpenChargeMap data (no API key required)
      try {
        const res = await fetch(
          "https://api.openchargemap.io/v3/poi/?output=json&countrycode=IN&maxresults=100"
        );
        const stations = await res.json();

        // Add markers for each charging station
        stations.forEach((station) => {
          const info = station.AddressInfo;
          if (!info?.Latitude || !info?.Longitude) return;

          const marker = L.marker([info.Latitude, info.Longitude]).addTo(map);
          marker.bindPopup(`
            <b>${info.Title || "Charging Station"}</b><br/>
            ${info.Town || ""}<br/>
            <a href="https://www.google.com/maps?q=${info.Latitude},${info.Longitude}" target="_blank">📍 Open in Maps</a>
          `);
        });
      } catch (err) {
        console.error("Failed to load station data:", err);
        L.popup()
          .setLatLng([20.5, 78.9])
          .setContent("⚠️ Could not load EV station data.")
          .openOn(map);
      }
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

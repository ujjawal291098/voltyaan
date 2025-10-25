"use client";

import { useEffect } from "react";

export default function LeafletMap() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // ✅ Fix Leaflet icon loading issue in Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Remove existing map (for dev reload)
      const existingMap = L.DomUtil.get("charging-map");
      if (existingMap !== null) existingMap._leaflet_id = null;

      // ✅ Start focused on North India (Delhi region)
      const map = L.map("charging-map").setView([28.6139, 77.209], 7);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // ✅ Custom green heart icon
      const evIcon = L.icon({
        iconUrl:
          "https://cdn-icons-png.flaticon.com/512/833/833472.png", // green heart
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -25],
      });

      // Helper function to add stations
      const addStations = (stations, label = "Live") => {
        stations.forEach((s) => {
          L.marker([s.lat, s.lon], { icon: evIcon })
            .addTo(map)
            .bindPopup(
              `<b>${s.name || "EV Station"}</b><br>${s.operator || ""}<br><i>${label} data</i>`
            );
        });
      };

      // Overpass API for live EV stations
      const url =
        "https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];area[name='India']->.a;(node['amenity'='charging_station'](area.a););out;";

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data?.elements?.length) {
          const stations = data.elements
            .filter((el) => el.lat && el.lon)
            .map((el) => ({
              lat: el.lat,
              lon: el.lon,
              name: el.tags?.name,
              operator: el.tags?.operator,
            }));

          addStations(stations, "Live");
          console.log(`✅ Loaded ${stations.length} EV charging points`);
        } else {
          throw new Error("No stations found");
        }
      } catch (err) {
        console.warn("⚠️ Overpass failed, loading fallback data", err);
        const fallbackStations = [
          { lat: 28.6139, lon: 77.209, name: "Delhi EV Hub", operator: "Voltyaan" },
          { lat: 29.4727, lon: 77.7085, name: "Meerut PlugPoint", operator: "Voltyaan" },
          { lat: 28.4089, lon: 77.3178, name: "Gurgaon EV Station", operator: "Voltyaan" },
          { lat: 26.9124, lon: 75.7873, name: "Jaipur Charge Zone", operator: "Voltyaan" },
        ];
        addStations(fallbackStations, "Fallback");
      }
    })();
  }, []);

  return (
    <div
      id="charging-map"
      style={{
        height: "450px",
        width: "100%",
        borderRadius: "12px",
        marginTop: "1rem",
      }}
      className="shadow-lg"
    />
  );
}

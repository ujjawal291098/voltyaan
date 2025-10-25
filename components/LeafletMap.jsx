"use client";

import { useEffect } from "react";

export default function LeafletMap() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Fix icon path issues
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Remove previous map instance (for hot reload)
      const existingMap = L.DomUtil.get("charging-map");
      if (existingMap !== null) existingMap._leaflet_id = null;

      // ✅ Focus tightly on Delhi NCR
      const map = L.map("charging-map").setView([28.6139, 77.209], 10);

      // Add OpenStreetMap layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // ✅ Custom green battery icon
      const batteryIcon = L.icon({
        iconUrl:
          "https://cdn-icons-png.flaticon.com/512/3103/3103446.png", // green battery icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -28],
      });

      // Helper to add station markers
      const addStations = (stations, label = "Live") => {
        stations.forEach((s) => {
          L.marker([s.lat, s.lon], { icon: batteryIcon })
            .addTo(map)
            .bindPopup(
              `<b>${s.name || "EV Charging Station"}</b><br>${
                s.operator || ""
              }<br><i>${label} data</i>`
            );
        });
      };

      // Overpass API (EV charging stations in India)
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
          { lat: 28.6139, lon: 77.209, name: "Connaught Place EV Hub" },
          { lat: 28.5355, lon: 77.391, name: "Noida Supercharge" },
          { lat: 28.4089, lon: 77.3178, name: "Gurgaon ChargePoint" },
          { lat: 28.7041, lon: 77.1025, name: "West Delhi PlugZone" },
          { lat: 28.6692, lon: 77.4538, name: "Ghaziabad FastCharge" },
        ];
        addStations(fallbackStations, "Fallback");
      }
    })();
  }, []);

  return (
    <div
      id="charging-map"
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
        marginTop: "1rem",
      }}
      className="shadow-lg"
    />
  );
}

"use client";

import { useEffect } from "react";

export default function LeafletMap() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // ✅ Fix marker icon issue (Leaflet + Next.js)
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Remove old map (hot reload)
      const existingMap = L.DomUtil.get("charging-map");
      if (existingMap !== null) existingMap._leaflet_id = null;

      // Init map centered on India
      const map = L.map("charging-map").setView([20.5937, 78.9629], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Custom green EV icon
      const evIcon = L.icon({
        iconUrl:
          "https://cdn-icons-png.flaticon.com/512/2972/2972185.png", // ✅ EV plug icon
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -25],
      });

      // Add markers helper
      const addStations = (stations, label = "Live") => {
        stations.forEach((s) => {
          L.marker([s.lat, s.lon], { icon: evIcon })
            .addTo(map)
            .bindPopup(
              `<b>${s.name || "EV Station"}</b><br>${s.operator || ""}<br><i>${label} data</i>`
            );
        });
      };

      // Overpass API call
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
          console.log(`✅ Loaded ${stations.length} live EV points`);
        } else {
          throw new Error("Empty Overpass response");
        }
      } catch (err) {
        console.warn("⚠️ Overpass failed, using fallback", err);
        const fallbackStations = [
          { lat: 28.6139, lon: 77.209, name: "Delhi EV Hub", operator: "Voltyaan" },
          { lat: 19.076, lon: 72.8777, name: "Mumbai EV Station", operator: "Voltyaan" },
          { lat: 12.9716, lon: 77.5946, name: "Bangalore ChargePoint", operator: "Voltyaan" },
          { lat: 22.5726, lon: 88.3639, name: "Kolkata PlugIn", operator: "Voltyaan" },
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

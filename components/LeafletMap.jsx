"use client";

import { useEffect } from "react";

export default function LeafletMap() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Clear existing map on hot reload
      const existingMap = L.DomUtil.get("charging-map");
      if (existingMap !== null) {
        existingMap._leaflet_id = null;
      }

      // Initialize the map centered on India
      const map = L.map("charging-map").setView([20.5937, 78.9629], 5);

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Function to add markers
      const addStations = (stations, label = "Live") => {
        stations.forEach((station) => {
          const marker = L.marker([station.lat, station.lon]).addTo(map);
          marker.bindPopup(
            `<b>${station.name || "EV Station"}</b><br/>
             ${station.operator || ""}<br/>
             <i>${label} data</i>`
          );
        });
      };

      // Try fetching live stations from Overpass API
      const overpassURL =
        "https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];area[name='India']->.a;(node['amenity'='charging_station'](area.a););out;";

      try {
        const res = await fetch(overpassURL);
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
          console.log(`✅ Loaded ${stations.length} live EV stations`);
          return;
        } else {
          throw new Error("Empty Overpass response");
        }
      } catch (err) {
        console.warn("⚠️ Overpass API failed, using fallback data", err);

        // Fallback: few Indian cities with dummy points
        const fallbackStations = [
          { lat: 28.6139, lon: 77.209, name: "Delhi EV Hub", operator: "Voltyaan Demo" },
          { lat: 19.076, lon: 72.8777, name: "Mumbai EV Station", operator: "Voltyaan Demo" },
          { lat: 12.9716, lon: 77.5946, name: "Bengaluru FastCharge", operator: "Voltyaan Demo" },
          { lat: 13.0827, lon: 80.2707, name: "Chennai Supercharger", operator: "Voltyaan Demo" },
          { lat: 22.5726, lon: 88.3639, name: "Kolkata GreenPoint", operator: "Voltyaan Demo" },
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

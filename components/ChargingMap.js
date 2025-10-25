"use client";

import { useEffect } from "react";

export default function ChargingMap() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Clean up for hot reload
      if (L.DomUtil.get("charging-map") !== null) {
        L.DomUtil.get("charging-map")._leaflet_id = null;
      }

      const map = L.map("charging-map").setView([20.5937, 78.9629], 4);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const url =
        "https://api.openchargemap.io/v3/poi/?output=json&countrycode=IN&maxresults=200&compact=true";

      console.log("Fetching charging stations from:", url);

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched stations:", data.length);

        if (!data || data.length === 0) {
          console.warn("No station data returned.");
          return;
        }

        const markers = [];

        data.forEach((station) => {
          const info = station.AddressInfo;
          if (info?.Latitude && info?.Longitude) {
            const marker = L.marker([info.Latitude, info.Longitude]).addTo(map);
            marker.bindPopup(`
              <b>${info.Title || "Unknown Station"}</b><br/>
              ${info.AddressLine1 || ""}<br/>
              ${info.Town || ""}, ${info.StateOrProvince || ""}<br/>
              <small>${info.ContactTelephone1 || ""}</small>
            `);
            markers.push(marker);
          }
        });

        if (markers.length > 0) {
          const group = L.featureGroup(markers);
          map.fitBounds(group.getBounds().pad(0.2));
        } else {
          console.warn("No valid markers created.");
        }
      } catch (error) {
        console.error("Error fetching EV stations:", error);
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
    />
  );
}

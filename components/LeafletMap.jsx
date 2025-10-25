"use client";

import { useEffect } from "react";

export default function LeafletMap() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Prevent double init
      if (L.DomUtil.get("map") !== null) {
        L.DomUtil.get("map")._leaflet_id = null;
      }

      const map = L.map("map").setView([20.5937, 78.9629], 4);  // zoomed out a little

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const url = "https://api.openchargemap.io/v3/poi/?output=json&countrycode=IN&maxresults=200&compact=true";
      console.log("Fetching stations from:", url);

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched stations count:", data.length, data.slice(0,3));

        if (!data || data.length === 0) {
          console.warn("No station data returned.");
          return;
        }

        const markers = [];

        data.forEach((station) => {
          const info = station.AddressInfo;
          if (info && info.Latitude && info.Longitude) {
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

        // Adjust map view to fit all markers
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.2));

      } catch (error) {
        console.error("Error fetching EV stations:", error);
      }
    })();
  }, []);

  return (
    <div
      id="map"
      style={{ height: "450px", width: "100%", borderRadius: "12px", marginTop: "1rem" }}
    />
  );
}

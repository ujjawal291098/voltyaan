"use client";

import { useEffect } from "react";

export default function LeafletMap() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Prevent double map init
      if (L.DomUtil.get("map") !== null) {
        L.DomUtil.get("map")._leaflet_id = null;
      }

      const map = L.map("map").setView([20.5937, 78.9629], 5); // India center

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // 🟢 Fetch charging station data from OpenChargeMap API
      const url =
        "https://api.openchargemap.io/v3/poi/?output=json&countrycode=IN&maxresults=100&compact=true";

      try {
        const res = await fetch(url);
        const data = await res.json();

        console.log("Fetched stations:", data.length);

        // Add markers for each station
        data.forEach((station) => {
          const { AddressInfo } = station;
          if (AddressInfo && AddressInfo.Latitude && AddressInfo.Longitude) {
            const marker = L.marker([
              AddressInfo.Latitude,
              AddressInfo.Longitude,
            ]).addTo(map);

            marker.bindPopup(`
              <b>${AddressInfo.Title}</b><br/>
              ${AddressInfo.AddressLine1 || ""}<br/>
              ${AddressInfo.Town || ""}, ${AddressInfo.StateOrProvince || ""}<br/>
              <small>${AddressInfo.ContactTelephone1 || ""}</small>
            `);
          }
        });
      } catch (error) {
        console.error("Error fetching EV stations:", error);
      }
    })();
  }, []);

  return (
    <div
      id="map"
      style={{
        height: "450px",
        width: "100%",
        borderRadius: "12px",
        marginTop: "1rem",
      }}
    />
  );
}

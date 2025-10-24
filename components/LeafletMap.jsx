"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

export default function LeafletMap() {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden mt-10">
      <MapContainer
        center={[20.5937, 78.9629]} // India
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[20.5937, 78.9629]}>
          <Popup>Voltyaan HQ ⚡</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

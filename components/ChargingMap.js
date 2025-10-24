'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function ChargingMap() {
  const [stations, setStations] = useState([]);
  useEffect(()=>{ fetch('/api/chargers').then(r=>r.json()).then(setStations).catch(()=>{}); }, []);
  return (
    <MapContainer center={[20.5937,78.9629]} zoom={5} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {stations.map((s,i)=>(
        <Marker key={i} position={[s.AddressInfo.Latitude, s.AddressInfo.Longitude]}>
          <Popup>
            <div><strong>{s.AddressInfo.Title}</strong><div>{s.AddressInfo.Town}</div></div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

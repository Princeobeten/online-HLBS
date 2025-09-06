import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockHospitals } from '../data/mockData';
import Navbar from '../Components/Navbar';

// custom icon
const hospitalIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const Map: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [locationGranted, setLocationGranted] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [query, setQuery] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!locationGranted) return;
    if (!('geolocation' in navigator)) return;
    const id = navigator.geolocation.watchPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
    watchIdRef.current = id;
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [locationGranted]);

  const filtered = useMemo(
    () => mockHospitals.filter((h) => (h.name + ' ' + h.location + ' ' + h.specialty).toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  );

  const center: [number, number] = selectedHospitalId
    ? [mockHospitals.find((h) => h.id === selectedHospitalId)!.lat!, mockHospitals.find((h) => h.id === selectedHospitalId)!.lng!]
    : userLocation
    ? [userLocation.lat, userLocation.lng]
    : [6.5244, 3.3792];

  return (
    <>
      <Navbar />
      <div className="min-h-screen max-w-7xl mx-auto bg-white">
      {/* Location modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-2">Allow Location Access</h2>
            <p className="text-sm text-gray-600 mb-4">We need your location to center the map and show nearby hospitals in real time.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setLocationGranted(true);
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded-full shadow"
              >
                Allow Location
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-full border">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map hero */}
      <div className="w-full h-screen">
        <MapContainer center={center} zoom={13} scrollWheelZoom className="w-full h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />

          {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} />}

          {filtered.map((h) => (
            <Marker key={h.id} position={[h.lat!, h.lng!]} icon={hospitalIcon} eventHandlers={{ click: () => setSelectedHospitalId(h.id) }}>
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{h.name}</div>
                  <div className="text-xs text-gray-600">{h.location}</div>
                </div>
              </Popup>
            </Marker>
          ))}

          <Recenter center={center} />
          {userLocation && <Circle center={center} radius={50} pathOptions={{ color: 'blue' }} />}
        </MapContainer>
      </div>

      {/* Hospital cards */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-4 w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hospitals or address..."
            className="w-full rounded-full border-2 border-blue-600 px-6 py-4 text-lg placeholder-gray-400 focus:outline-none "
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((h) => (
            <div key={h.id} className="bg-white rounded-xl shadow p-4">
              <img src={h.imageUrl} alt={h.name} className="w-full h-36 object-cover rounded" />
              <h3 className="text-lg font-semibold mt-3">{h.name}</h3>
              <p className="text-sm text-gray-500">{h.location}</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setSelectedHospitalId(h.id)} className="text-sm text-blue-600 font-medium">View on Map</button>
                <a href={`/hospitals/${h.id}`} className="text-sm text-blue-600 font-medium">Open Profile</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Map;

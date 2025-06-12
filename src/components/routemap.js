import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom vehicle icon
const vehicleIcon = new L.Icon({
  iconUrl: '/vehicle.png', // Ensure this exists in /public
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default function RouteMap({ start, end }) {
  if (!start || !end) {
    return (
      <div style={{
        height: "400px",
        marginTop: "20px",
        borderRadius: "10px",
        background: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#888",
        fontStyle: "italic"
      }}>
        📍 Loading live location and route...
      </div>
    );
  }

  return (
    <MapContainer
      center={start}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", marginTop: "20px", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RouteRenderer start={start} end={end} />
    </MapContainer>
  );
}

function RouteRenderer({ start, end }) {
  const map = useMap();
  const vehicleRef = useRef(null);
  const polylineRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    const startLatLng = L.latLng(start[0], start[1]);
    const endLatLng = L.latLng(end[0], end[1]);

    // Remove previous polyline and marker
    if (polylineRef.current) {
      try {
        map.removeLayer(polylineRef.current);
      } catch (err) {}
    }

    if (vehicleRef.current) {
      try {
        map.removeLayer(vehicleRef.current);
      } catch (err) {}
    }

    // Draw route
    const polyline = L.polyline([startLatLng, endLatLng], {
      color: "blue",
      weight: 6
    }).addTo(map);
    polylineRef.current = polyline;

    map.fitBounds(polyline.getBounds(), { padding: [20, 20] });

    // Place vehicle icon at start
    const vehicle = L.marker(startLatLng, { icon: vehicleIcon }).addTo(map);
    vehicleRef.current = vehicle;

    // Animate marker along route
    let progress = 0;
    const steps = 100;
    const interval = setInterval(() => {
      progress += 1 / steps;
      if (progress >= 1) {
        vehicle.setLatLng(endLatLng);
        clearInterval(interval);
        return;
      }
      const lat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * progress;
      const lng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * progress;
      vehicle.setLatLng([lat, lng]);
    }, 100);

    return () => clearInterval(interval);
  }, [map, start, end]);

  return null;
}

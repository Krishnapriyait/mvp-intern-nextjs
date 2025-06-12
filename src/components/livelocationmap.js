// components/livelocationmap.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const LiveLocationMap = ({ lat, lon }) => {
  const position = [lat, lon];

  const icon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
  });

  return (
    <div style={{ height: "300px", width: "100%", marginTop: "20px" }}>
      <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LiveLocationMap;

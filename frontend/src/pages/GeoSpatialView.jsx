import React from 'react';
import { Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const GeoSpatialView = () => {
  // Center roughly around India/Delhi for example
  const center = [28.6139, 77.2090]; 

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#131b2e]">Geo-Spatial Analysis</h2>
          <p className="text-sm text-[#57657a]">Interactive map view of constituency operations.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#eaedff] rounded-lg text-sm font-medium hover:bg-[#f2f3ff]">
            <Layers className="w-4 h-4" /> Map Layers
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-[#d5d7e8] overflow-hidden relative shadow-inner z-0">
        <MapContainer center={center} zoom={12} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          <Marker position={[28.6139, 77.2090]}>
            <Popup>
              <div className="font-bold text-[#1f108e]">Ongoing Project</div>
              <p className="text-xs">Road resurfacing in central district.</p>
            </Popup>
          </Marker>
          
          <Marker position={[28.6250, 77.2150]}>
            <Popup>
              <div className="font-bold text-emerald-600">Resolved Issue</div>
              <p className="text-xs">Water pipeline fixed.</p>
            </Popup>
          </Marker>

          <Circle center={[28.6000, 77.2000]} pathOptions={{ fillColor: 'red', color: 'red' }} radius={800}>
            <Popup>
              <div className="font-bold text-red-600">High Complaints</div>
              <p className="text-xs">Ward 4 Alert: Sanitation issues.</p>
            </Popup>
          </Circle>
        </MapContainer>

        <div className="absolute bottom-4 right-4 bg-white px-4 py-3 rounded-lg shadow-md z-[1000]">
          <p className="text-xs font-bold mb-2 uppercase text-[#57657a]">Legend</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Ongoing Projects</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> High Complaints</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Resolved Issues</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoSpatialView;

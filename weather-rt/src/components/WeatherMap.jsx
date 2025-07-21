import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';

// Fix para los iconos de Leaflet en React
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_POSITION = [40.4168, -3.7038]; // Madrid

const WeatherMap = ({ weatherData }) => {
  let position = DEFAULT_POSITION;
  let city = 'Madrid';
  let temp = null;
  let desc = '';

  if (weatherData && weatherData.coord) {
    position = [weatherData.coord.lat, weatherData.coord.lon];
    city = weatherData.name;
    temp = weatherData.main.temp;
    desc = weatherData.weather[0].description;
  }

  return (
    <div className="weather-map-container" style={{ width: '100%', margin: '0 auto', padding: '0 1.5rem' }}>
      <div className="map-header">
        <div className="map-title">🗺️ Mapa Interactivo</div>
        <div className="map-subtitle">Haz zoom, mueve el mapa y explora la ubicación del clima actual</div>
      </div>
      <div className="map-wrapper" style={{ width: '100%' }}>
        <MapContainer center={position} zoom={11} scrollWheelZoom={true} className="weather-map" style={{ width: '100%', height: '400px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="map-popup">
                <div className="popup-header">
                  <span className="popup-icon">📍</span>
                  <span className="popup-city">{city}</span>
                </div>
                {temp !== null && (
                  <div className="popup-weather">
                    <span className="popup-temp">{Math.round(temp)}°C</span>
                    <span className="popup-desc">{desc}</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherMap; 
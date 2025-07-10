import React from 'react';
import { FaThermometerHalf, FaTint, FaWind, FaEye, FaCompass } from 'react-icons/fa';
import { 
  getWeatherIcon, 
  formatTemperature, 
  formatHumidity, 
  formatWindSpeed, 
  formatPressure,
  getWindDirection,
  getFeelsLike,
  getTemperatureColor
} from '../utils/helpers';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const {
    name,
    main: { temp, humidity, pressure },
    weather: [weather],
    wind: { speed, deg },
    visibility,
    sys: { country },
    dt
  } = weatherData;

  const weatherIcon = getWeatherIcon(weather.icon);
  const temperatureColor = getTemperatureColor(temp);
  const feelsLikeTemp = getFeelsLike(temp, humidity, speed);

  return (
    <div className="weather-card" style={{ '--temp-color': temperatureColor }}>
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-name">{name}</h2>
          <p className="country">{country}</p>
          <p className="weather-description">{weather.description}</p>
        </div>
        <div className="weather-icon">
          <span className="icon">{weatherIcon}</span>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="current-temp">
            <span className="temp-value">{formatTemperature(temp)}</span>
            <span className="temp-unit">C</span>
          </div>
          <div className="feels-like">
            <FaThermometerHalf className="feels-like-icon" />
            <span>Sensación térmica: {formatTemperature(feelsLikeTemp)}</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <div className="detail-icon">
              <FaTint />
            </div>
            <div className="detail-info">
              <span className="detail-label">Humedad</span>
              <span className="detail-value">{formatHumidity(humidity)}</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <FaWind />
            </div>
            <div className="detail-info">
              <span className="detail-label">Viento</span>
              <span className="detail-value">
                {formatWindSpeed(speed)} {getWindDirection(deg)}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <FaEye />
            </div>
            <div className="detail-info">
              <span className="detail-label">Visibilidad</span>
              <span className="detail-value">{(visibility / 1000).toFixed(1)} km</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <FaCompass />
            </div>
            <div className="detail-info">
              <span className="detail-label">Presión</span>
              <span className="detail-value">{formatPressure(pressure)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="weather-footer">
        <div className="update-time">
          <span>Actualizado: {new Date(dt * 1000).toLocaleTimeString('es-ES')}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 
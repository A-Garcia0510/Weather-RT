import React from 'react';
import { FaSun, FaMoon, FaThermometerHalf, FaTint, FaWind, FaEye, FaCompass, FaCloud } from 'react-icons/fa';
import { formatTime, formatTemperature, formatHumidity, formatWindSpeed, formatPressure } from '../utils/helpers';
import './WeatherStats.css';

const WeatherStats = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const {
    main: { temp, humidity, pressure, temp_min, temp_max },
    wind: { speed, deg },
    visibility,
    weather: [weather],
    sys: { sunrise, sunset },
    clouds: { all }
  } = weatherData;

  const sunriseTime = formatTime(sunrise);
  const sunsetTime = formatTime(sunset);

  return (
    <div className="weather-stats">
      <div className="stats-header">
        <h3>📊 Estadísticas Detalladas</h3>
        <p>Información completa del clima actual</p>
      </div>

      <div className="stats-grid">
        {/* Temperaturas */}
        <div className="stats-section">
          <h4>🌡️ Temperaturas</h4>
          <div className="stats-items">
            <div className="stat-item">
              <div className="stat-icon">
                <FaThermometerHalf />
              </div>
              <div className="stat-info">
                <span className="stat-label">Actual</span>
                <span className="stat-value">{formatTemperature(temp)}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaThermometerHalf />
              </div>
              <div className="stat-info">
                <span className="stat-label">Máxima</span>
                <span className="stat-value">{formatTemperature(temp_max)}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaThermometerHalf />
              </div>
              <div className="stat-info">
                <span className="stat-label">Mínima</span>
                <span className="stat-value">{formatTemperature(temp_min)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Condiciones atmosféricas */}
        <div className="stats-section">
          <h4>🌤️ Condiciones</h4>
          <div className="stats-items">
            <div className="stat-item">
              <div className="stat-icon">
                <FaTint />
              </div>
              <div className="stat-info">
                <span className="stat-label">Humedad</span>
                <span className="stat-value">{formatHumidity(humidity)}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaCloud />
              </div>
              <div className="stat-info">
                <span className="stat-label">Nubosidad</span>
                <span className="stat-value">{all}%</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaEye />
              </div>
              <div className="stat-info">
                <span className="stat-label">Visibilidad</span>
                <span className="stat-value">{(visibility / 1000).toFixed(1)} km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Viento y presión */}
        <div className="stats-section">
          <h4>💨 Viento y Presión</h4>
          <div className="stats-items">
            <div className="stat-item">
              <div className="stat-icon">
                <FaWind />
              </div>
              <div className="stat-info">
                <span className="stat-label">Velocidad</span>
                <span className="stat-value">{formatWindSpeed(speed)}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaCompass />
              </div>
              <div className="stat-info">
                <span className="stat-label">Dirección</span>
                <span className="stat-value">{deg}°</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaCompass />
              </div>
              <div className="stat-info">
                <span className="stat-label">Presión</span>
                <span className="stat-value">{formatPressure(pressure)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horarios solares */}
        <div className="stats-section">
          <h4>☀️ Horarios Solares</h4>
          <div className="stats-items">
            <div className="stat-item">
              <div className="stat-icon">
                <FaSun />
              </div>
              <div className="stat-info">
                <span className="stat-label">Amanecer</span>
                <span className="stat-value">{sunriseTime}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaMoon />
              </div>
              <div className="stat-info">
                <span className="stat-label">Atardecer</span>
                <span className="stat-value">{sunsetTime}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaSun />
              </div>
              <div className="stat-info">
                <span className="stat-label">Duración día</span>
                <span className="stat-value">
                  {Math.round((sunset - sunrise) / 3600)}h {Math.round(((sunset - sunrise) % 3600) / 60)}m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherStats; 
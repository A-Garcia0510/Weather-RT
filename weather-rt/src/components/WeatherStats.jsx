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
      <div className="stats-grid-cards">
        {/* Temperaturas */}
        <div className="stat-card">
          <span className="stat-icon icon-temp"><FaThermometerHalf /></span>
          <div>
            <div className="stat-label">ACTUAL</div>
            <div className="stat-value">{formatTemperature(temp)}</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon icon-temp"><FaThermometerHalf /></span>
          <div>
            <div className="stat-label">MÁXIMA</div>
            <div className="stat-value">{formatTemperature(temp_max)}</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon icon-temp"><FaThermometerHalf /></span>
          <div>
            <div className="stat-label">MÍNIMA</div>
            <div className="stat-value">{formatTemperature(temp_min)}</div>
          </div>
        </div>
        {/* Condiciones */}
        <div className="stat-card">
          <span className="stat-icon icon-humidity"><FaTint /></span>
          <div>
            <div className="stat-label">HUMEDAD</div>
            <div className="stat-value">{formatHumidity(humidity)}</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon icon-cloud"><FaCloud /></span>
          <div>
            <div className="stat-label">NUBOSIDAD</div>
            <div className="stat-value">{all}%</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon icon-visibility"><FaEye /></span>
          <div>
            <div className="stat-label">VISIBILIDAD</div>
            <div className="stat-value">{(visibility / 1000).toFixed(1)} km</div>
          </div>
        </div>
        {/* Viento y presión */}
        <div className="stat-card">
          <span className="stat-icon icon-wind"><FaWind /></span>
          <div>
            <div className="stat-label">VELOCIDAD</div>
            <div className="stat-value">{formatWindSpeed(speed)}</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon icon-pressure"><FaCompass /></span>
          <div>
            <div className="stat-label">DIRECCIÓN</div>
            <div className="stat-value">{deg}°</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon icon-pressure"><FaCompass /></span>
          <div>
            <div className="stat-label">PRESIÓN</div>
            <div className="stat-value">{formatPressure(pressure)}</div>
          </div>
        </div>
        {/* Horarios solares */}
        <div className="stat-card">
          <span className="stat-icon icon-sun"><FaSun /></span>
          <div>
            <div className="stat-label">AMANECER</div>
            <div className="stat-value">{sunriseTime}</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon icon-moon"><FaMoon /></span>
          <div>
            <div className="stat-label">ATARDECER</div>
            <div className="stat-value">{sunsetTime}</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon icon-sun"><FaSun /></span>
          <div>
            <div className="stat-label">DURACIÓN DÍA</div>
            <div className="stat-value">{Math.round((sunset - sunrise) / 3600)}h {Math.round(((sunset - sunrise) % 3600) / 60)}m</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherStats; 
import React from 'react';
import { WiHumidity, WiStrongWind, WiBarometer } from 'react-icons/wi';

function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const { main, weather, wind, name, sys } = weatherData;
  const weatherInfo = weather[0];

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 30) return 'var(--accent-red)';
    if (temp >= 25) return 'var(--accent-orange)';
    if (temp >= 20) return 'var(--accent-green)';
    if (temp >= 15) return 'var(--accent-cyan)';
    return 'var(--accent-blue)';
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-name">{name}</h2>
          <p className="country">{sys.country}</p>
        </div>
        <div className="weather-icon">
          {getWeatherIcon(weatherInfo.icon)}
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div 
            className="temperature"
            style={{ color: getTemperatureColor(main.temp) }}
          >
            {Math.round(main.temp)}°C
          </div>
          <div className="feels-like">
            Sensación: {Math.round(main.feels_like)}°C
          </div>
        </div>
        
        <div className="weather-description">
          <h3>{weatherInfo.description}</h3>
          <p>Temperatura máxima: {Math.round(main.temp_max)}°C</p>
          <p>Temperatura mínima: {Math.round(main.temp_min)}°C</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <WiHumidity className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Humedad</span>
            <span className="detail-value">{main.humidity}%</span>
          </div>
        </div>
        
        <div className="detail-item">
          <WiStrongWind className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Viento</span>
            <span className="detail-value">{Math.round(wind.speed)} km/h</span>
          </div>
        </div>
        
        <div className="detail-item">
          <WiBarometer className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Presión</span>
            <span className="detail-value">{main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard; 
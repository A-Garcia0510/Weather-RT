import React from 'react';
import { getWeatherIcon, formatTemperature, formatDate } from '../utils/helpers';
import './ForecastCard.css';

const ForecastCard = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) {
    return null;
  }

  // Agrupar datos por día (tomar medición de las 12:00 PM de cada día)
  const dailyForecasts = forecastData.list.filter((item, index) => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12; // Solo datos de mediodía
  }).slice(0, 5); // Solo 5 días

  return (
    <div className="forecast-container">
      <h3 className="forecast-title section-title">
        <span className="emoji">🔮</span>
        <span className="title-text"> PRONÓSTICO DE 5 DÍAS</span>
      </h3>
      <div className="forecast-grid">
        {dailyForecasts.map((forecast, index) => {
          const {
            dt,
            main: { temp_min, temp_max, humidity },
            weather: [weather],
            wind: { speed }
          } = forecast;

          const weatherIcon = getWeatherIcon(weather.icon);
          const date = formatDate(dt, 'short');

          return (
            <div key={index} className="forecast-day">
              <div className="forecast-date">
                <span className="day-name">{date}</span>
              </div>
              
              <div className="forecast-icon">
                <span className="weather-icon">{weatherIcon}</span>
              </div>
              
              <div className="forecast-temp">
                <span className="temp-max">{formatTemperature(temp_max)}</span>
                <span className="temp-min">{formatTemperature(temp_min)}</span>
              </div>
              
              <div className="forecast-details">
                <div className="forecast-description">
                  {weather.description}
                </div>
                <div className="forecast-humidity">
                  <span className="emoji">💧</span> {humidity}%
                </div>
                <div className="forecast-wind">
                  <span className="emoji viento">💨</span>
                  <span className="wind-value">{Math.round(speed)} km/h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard; 
import React, { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import WeatherStats from './components/WeatherStats';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ApiKeyWarning from './components/ApiKeyWarning';
import './App.css';

function App() {
  console.log('🔍 Debug - App component rendering...');
  
  const {
    weatherData,
    forecastData,
    loading,
    error,
    currentCity,
    searchWeather,
    getWeatherByLocation,
    getHistory,
    clearHistory
  } = useWeather();

  // Cargar historial al iniciar
  useEffect(() => {
    console.log('🔍 Debug - App useEffect running...');
    const history = getHistory();
    if (history.length > 0) {
      // Opcional: cargar la última ciudad buscada
      // searchWeather(history[0]);
    }
  }, [getHistory]);

  const handleSearch = (city) => {
    searchWeather(city);
  };

  const handleLocationSearch = () => {
    getWeatherByLocation();
  };

  const handleHistorySelect = (city) => {
    searchWeather(city);
  };

  const handleRetry = () => {
    if (currentCity) {
      searchWeather(currentCity);
    } else {
      getWeatherByLocation();
    }
  };

  // Función para procesar los datos del forecast - MEJORADA
  const processForecastData = (forecastData) => {
    if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
      console.log('🔍 Debug - No forecast data available');
      return [];
    }

    console.log('🔍 Debug - Processing forecast data:', forecastData.list.length, 'items');

    // Agrupar datos por día
    const dailyData = {};
    
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString(); // Usar fecha completa como clave
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = [];
      }
      dailyData[dayKey].push(item);
    });

    // Convertir a array y tomar los primeros 5 días
    const dailyForecasts = Object.values(dailyData).slice(0, 5);
    
    console.log('🔍 Debug - Daily forecasts:', dailyForecasts.length, 'days');

    return dailyForecasts.map((dayItems, index) => {
      // Tomar el primer elemento del día (o el más cercano a mediodía)
      const forecast = dayItems[0];
      const {
        dt,
        main: { temp, humidity },
        weather: [weather],
        wind: { speed }
      } = forecast;

      const date = new Date(dt * 1000);
      const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      const day = dayNames[date.getDay()];

      // Función para obtener el icono del clima
      const getWeatherIcon = (weatherMain) => {
        switch (weatherMain) {
          case 'Clear': return '☀️';
          case 'Clouds': return '⛅';
          case 'Rain': return '🌧️';
          case 'Snow': return '❄️';
          case 'Thunderstorm': return '⛈️';
          case 'Drizzle': return '🌦️';
          case 'Mist':
          case 'Fog': return '🌫️';
          default: return '🌤️';
        }
      };

      return {
        day,
        temp,
        humidity,
        windSpeed: speed,
        icon: getWeatherIcon(weather.main)
      };
    });
  };

  // Procesar los datos del forecast
  const processedForecast = processForecastData(forecastData);
  
  console.log('🔍 Debug - Processed forecast:', processedForecast.length, 'items');

  return (
    <div className="app-container">
      {/* Fondo animado */}
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <main className="main-content">
        {/* Header */}
        <header className="header-section">
          <div className="header-content">
            <h1 className="app-title">
              <span className="logo-icon">🌤️</span> Weather RT
            </h1>
            <div className="time-section">
              <div className="current-time">
                {new Date().toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="current-date">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Manteniendo la estructura original */}
        <section className="content-section">
          {/* Left Column */}
          <div className="left-column">
            {/* Buscar Clima */}
            <div className="search-section">
              <h2 className="section-title">🔍 Buscar Clima</h2>
              <ApiKeyWarning />
              <div className="search-container">
                <SearchBar
                  onSearch={handleSearch}
                  onLocationSearch={handleLocationSearch}
                  history={getHistory()}
                  onHistorySelect={handleHistorySelect}
                  onClearHistory={clearHistory}
                />
              </div>
            </div>

            {/* Información del Clima */}
            {weatherData && !loading && !error && (
              <div className="weather-section">
                <h2 className="section-title">📊 Información del Clima</h2>
                <div className="weather-main-content">
                  <div className="weather-info">
                    <div>
                      <h3 className="city-name">{weatherData.name}, {weatherData.sys.country}</h3>
                      <p className="current-temperature">{Math.round(weatherData.main.temp)}°C</p>
                      <p className="weather-description">{weatherData.weather[0].description}</p>
                      <p className="temp-range">
                        Máx: {Math.round(weatherData.main.temp_max)}°C / Mín: {Math.round(weatherData.main.temp_min)}°C
                      </p>
                    </div>
                    <div className="weather-icon-large">
                      {weatherData.weather[0].main === 'Clear' ? '☀️' : 
                       weatherData.weather[0].main === 'Clouds' ? '⛅' :
                       weatherData.weather[0].main === 'Rain' ? '🌧️' :
                       weatherData.weather[0].main === 'Snow' ? '❄️' :
                       weatherData.weather[0].main === 'Thunderstorm' ? '⛈️' :
                       weatherData.weather[0].main === 'Drizzle' ? '🌦️' :
                       weatherData.weather[0].main === 'Mist' || weatherData.weather[0].main === 'Fog' ? '🌫️' : '🌤️'}
                    </div>
                  </div>
                  <div className="weather-quick-stats">
                    <div className="quick-stat">💧 {weatherData.main.humidity}%</div>
                    <div className="quick-stat">🌬️ {Math.round(weatherData.wind.speed * 3.6)} km/h</div>
                    <div className="quick-stat">📍 {weatherData.main.pressure} hPa</div>
                  </div>
                </div>
              </div>
            )}

            {/* Welcome Section */}
            {!weatherData && !loading && !error && (
              <div className="weather-section">
                <h2 className="section-title">📊 Información del Clima</h2>
                <div className="welcome-content">
                  <div className="welcome-icon">🌤️</div>
                  <h3 className="welcome-title">¡Bienvenido a Weather RT!</h3>
                  <p className="welcome-text">Busca una ciudad para ver información detallada del clima</p>
                </div>
              </div>
            )}

            {/* Loading Section */}
            {loading && (
              <div className="weather-section">
                <LoadingSpinner 
                  message={currentCity ? `Obteniendo datos para ${currentCity}...` : 'Obteniendo tu ubicación...'} 
                />
              </div>
            )}

            {/* Error Section */}
            {error && (
              <div className="weather-section">
                <ErrorMessage 
                  error={error} 
                  onRetry={handleRetry}
                />
              </div>
            )}

            {/* Pronóstico de 5 días */}
            {processedForecast.length > 0 && !loading && !error && (
              <div className="forecast-section">
                <h2 className="section-title">📅 Pronóstico de 5 días</h2>
                <div className="forecast-grid">
                  {processedForecast.map((day, idx) => (
                    <div key={idx} className="forecast-day">
                      <div className="forecast-day-name">{day.day}</div>
                      <div className="forecast-day-icon">{day.icon}</div>
                      <div className="forecast-day-temp">{Math.round(day.temp)}°C</div>
                      <div className="forecast-day-humidity">💧{day.humidity}%</div>
                      <div className="forecast-day-wind">🌬️ {Math.round(day.windSpeed * 3.6)}km/h</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pronóstico Placeholder */}
            {!weatherData && !loading && !error && (
              <div className="forecast-section">
                <h2 className="section-title">📅 Pronóstico de 5 días</h2>
                <div className="forecast-placeholder">
                  <p>El pronóstico aparecerá aquí cuando busques una ciudad</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Estadísticas Detalladas */}
          <div className="right-column">
            <h2 className="section-title">📈 Estadísticas Detalladas</h2>
            {weatherData && !loading && !error ? (
              <div className="stats-grid">
                <div className="stats-card temp-card">
                  <p className="stats-title">🌡️ Temperaturas</p>
                  <p>Actual: <span>{Math.round(weatherData.main.temp)}°C</span></p>
                  <p>Máxima: <span>{Math.round(weatherData.main.temp_max)}°C</span></p>
                  <p>Mínima: <span>{Math.round(weatherData.main.temp_min)}°C</span></p>
                </div>
                <div className="stats-card conditions-card">
                  <p className="stats-title">💧 Condiciones</p>
                  <p>Humedad: <span>{weatherData.main.humidity}%</span></p>
                  <p>Nubosidad: <span>{weatherData.clouds.all}%</span></p>
                  <p>Visibilidad: <span>{Math.round(weatherData.visibility / 1000)} km</span></p>
                </div>
                <div className="stats-card wind-card">
                  <p className="stats-title">🌬️ Viento y Presión</p>
                  <p>Velocidad: <span>{weatherData.wind.speed} m/s</span></p>
                  <p>Dirección: <span>{weatherData.wind.deg}°</span></p>
                  <p>Presión: <span>{weatherData.main.pressure} hPa</span></p>
                </div>
                <div className="stats-card sun-card">
                  <p className="stats-title">☀️ Horarios Solares</p>
                  <p>Amanecer: <span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}</span></p>
                  <p>Atardecer: <span>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}</span></p>
                  <p>Duración: <span>{Math.floor((weatherData.sys.sunset - weatherData.sys.sunrise) / 3600)}h {Math.floor(((weatherData.sys.sunset - weatherData.sys.sunrise) % 3600) / 60)}m</span></p>
                </div>
              </div>
            ) : (
              <div className="stats-placeholder">
                <p>Aquí encontrarás estadísticas detalladas del clima</p>
                <p>Incluyendo temperaturas, humedad, viento y horarios solares</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-section">
          <div className="footer-text">
            Weather RT — Datos por OpenWeatherMap | Hecho con ❤️ en React
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { useTemperature } from './contexts/TemperatureContext';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ApiKeyWarning from './components/ApiKeyWarning';
import WeatherMap from './components/WeatherMap';
import SettingsDrawer from './components/SettingsDrawer';
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
    searchWeatherByCoords, 
    getWeatherByLocation, 
    getHistory, 
    clearHistory
  } = useWeather();

  const { unit } = useTemperature();

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
    console.log('🔍 Debug - handleSearch llamado con:', city);
    console.log('🔍 Debug - searchWeather function:', typeof searchWeather);
    try {
      searchWeather(city);
      console.log('🔍 Debug - searchWeather llamado exitosamente');
    } catch (error) {
      console.error('🔍 Debug - Error al llamar searchWeather:', error);
    }
  };

  const handleLocationSearch = () => {
    console.log('🔍 Debug - handleLocationSearch llamado');
    getWeatherByLocation();
  };

  const handleHistorySelect = (city) => {
    console.log('🔍 Debug - handleHistorySelect llamado con:', city);
    console.log('🔍 Debug - searchWeather function:', typeof searchWeather);
    try {
      searchWeather(city);
      console.log('🔍 Debug - searchWeather llamado exitosamente desde historial');
    } catch (error) {
      console.error('🔍 Debug - Error al llamar searchWeather desde historial:', error);
    }
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

      // Convertir temperatura según la unidad seleccionada
      const convertedTemp = unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;

      return {
        day,
        temp: convertedTemp,
        humidity,
        windSpeed: speed,
        icon: getWeatherIcon(weather.main)
      };
    });
  };

  // Procesar los datos del forecast
  const processedForecast = processForecastData(forecastData);
  
  console.log('🔍 Debug - Processed forecast:', processedForecast.length, 'items');

  // MODO OSCURO/CLARO
  const [theme, setTheme] = useState(() => {
    // Detectar preferencia del sistema o localStorage
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sincronizar con cambios externos del tema (desde SettingsDrawer)
  useEffect(() => {
    const updateTheme = () => {
      const isLight = document.body.classList.contains('light-theme');
      if (isLight && theme !== 'light') {
        setTheme('light');
      } else if (!isLight && theme !== 'dark') {
        setTheme('dark');
      }
    };
    
    // Observar cambios en las clases del body
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, [theme]);

  // Eliminar estado y lógica de activeView
  // const [activeView, setActiveView] = useState('weather');

  const handleLocationSelect = (lat, lng) => {
    searchWeatherByCoords(lat, lng);
  };

  // Debug logs (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Debug - App render:', {
      weatherData: !!weatherData,
      loading,
      error,
      currentCity,
      // activeView // Eliminar activeView de los logs
    });
  }

  return (
    <div className="app-container">
      {/* Fondo animado */}
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          {/* Formas adicionales para modo oscuro */}
          {theme === 'dark' && <>
            <div className="shape shape-5"></div>
            <div className="shape shape-6"></div>
            <div className="shape shape-7"></div>
            <div className="shape shape-8"></div>
          </>}
        </div>
      </div>

      <main className="main-content">
        {/* Header */}
        <header className="header-section">
          <div className="header-content">
            <h1 className="app-title">
              <span className="emoji logo-icon">🌤️</span>
              <span className="title-text">Weather RT</span>
            </h1>
            {/* Elimina el TemperatureToggle del header */}
            {/* <div className="header-controls">
              <TemperatureToggle />
            </div> */}
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

        {/* Main Content - Dos columnas */}
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

            {/* Vista de Clima Normal (si hay datos) */}
            {weatherData && !loading && !error && (
              <div className="weather-section">
                <h2 className="section-title">📊 Información del Clima</h2>
                <div className="weather-main-content">
                  <div className="weather-info">
                    <div>
                      <h3 className="city-name">{weatherData.name}, {weatherData.sys.country}</h3>
                      <p className="current-temperature">
                        {Math.round(unit === 'fahrenheit' ? (weatherData.main.temp * 9/5) + 32 : weatherData.main.temp)}°{unit === 'celsius' ? 'C' : 'F'}
                      </p>
                      <p className="weather-description">{weatherData.weather[0].description}</p>
                      <p className="temp-range">
                        Máx: {Math.round(unit === 'fahrenheit' ? (weatherData.main.temp_max * 9/5) + 32 : weatherData.main.temp_max)}°{unit === 'celsius' ? 'C' : 'F'} / 
                        Mín: {Math.round(unit === 'fahrenheit' ? (weatherData.main.temp_min * 9/5) + 32 : weatherData.main.temp_min)}°{unit === 'celsius' ? 'C' : 'F'}
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
            <div className="forecast-section forecast-flex">
              {processedForecast.length > 0 && !loading && !error ? (
                <>
                  <h2 className="section-title">📅 Pronóstico de 5 días</h2>
                  <div className="forecast-grid">
                    {processedForecast.map((day, idx) => (
                      <div key={idx} className="forecast-day">
                        <div className="forecast-day-name">{day.day}</div>
                        <div className="forecast-day-icon">{day.icon}</div>
                        <div className="forecast-day-temp">{Math.round(day.temp)}°{unit === 'celsius' ? 'C' : 'F'}</div>
                        <div className="forecast-day-humidity">💧{day.humidity}%</div>
                        <div className="forecast-day-wind">
                          <span className="emoji viento">🌬️</span>
                          <span className="wind-value">{Math.round(day.windSpeed * 3.6)}km/h</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="section-title">📅 Pronóstico de 5 días</h2>
                  <div className="forecast-placeholder">
                    <p>El pronóstico aparecerá aquí cuando busques una ciudad</p>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Right Column: Panel de Búsquedas Recientes + Estadísticas Detalladas */}
          <div className="right-column">
            {/* Panel de Búsquedas Recientes */}
            <div className="recent-searches-section">
              <h2 className="section-title">🕑 Búsquedas Recientes</h2>
              <ul className="recent-searches-list">
                {getHistory().length === 0 ? (
                  <li className="recent-searches-empty">No hay búsquedas recientes</li>
                ) : (
                  getHistory().map((city, idx) => (
                    <li key={city + idx} className="recent-searches-item" onClick={() => handleHistorySelect(city)}>
                      <span className="recent-searches-icon">📍</span> {city}
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* Estadísticas Detalladas */}
            <div className="stats-section stats-flex">
              <h2 className="section-title">📈 Estadísticas Detalladas</h2>
              {weatherData && !loading && !error ? (
                <div className="stats-grid">
                  <div className="stats-card temp-card">
                    <p className="stats-title">🌡️ Temperaturas</p>
                    <p>Actual: <span>{Math.round(unit === 'fahrenheit' ? (weatherData.main.temp * 9/5) + 32 : weatherData.main.temp)}°{unit === 'celsius' ? 'C' : 'F'}</span></p>
                    <p>Máxima: <span>{Math.round(unit === 'fahrenheit' ? (weatherData.main.temp_max * 9/5) + 32 : weatherData.main.temp_max)}°{unit === 'celsius' ? 'C' : 'F'}</span></p>
                    <p>Mínima: <span>{Math.round(unit === 'fahrenheit' ? (weatherData.main.temp_min * 9/5) + 32 : weatherData.main.temp_min)}°{unit === 'celsius' ? 'C' : 'F'}</span></p>
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
          </div>
        </section>

        {/* Mapa Interactivo como sección horizontal al final */}
        {weatherData && !loading && !error ? (
          <div className="interactive-map-section full-width-section">
            <WeatherMap
              weatherData={weatherData}
              onLocationSelect={handleLocationSelect}
              isVisible={true}
            />
          </div>
        ) : (!loading && !error && (
          <div className="interactive-map-section full-width-section">
            <div className="weather-map-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🗺️</div>
              <h3 style={{margin: 0, color: 'var(--text-primary)'}}>Aquí aparecerá el mapa interactivo</h3>
              <p style={{color: 'var(--text-secondary)', marginTop: 8, textAlign: 'center'}}>Busca una ciudad o usa tu ubicación para explorar el clima en el mapa.</p>
            </div>
          </div>
        ))}

        {/* Footer */}
        <footer className="footer-section">
          <div className="footer-text">
            Weather RT — Datos por OpenWeatherMap | Hecho con ❤️ en React
          </div>
          <div className="footer-version">Versión 2.0.0</div>
        </footer>
      </main>

      {/* Settings Drawer (Menú Flotante) */}
      <SettingsDrawer />
    </div>
  );
}

export default App;

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

  return (
    <div className="App">
      {/* Fondo animado */}
      <div className="background-animation">
        <div className="clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>
      </div>

      <div className="app-container">
        {/* Header Section */}
        <header className="app-header">
          <div className="header-content">
            <div className="logo-section">
              <h1 className="app-title">
                <span className="weather-emoji">🌤️</span>
                Weather RT
              </h1>
              <p className="app-subtitle">Clima en tiempo real • Pronóstico extendido</p>
            </div>
            <div className="header-info">
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

        {/* Main Content */}
        <main className="app-main">
          {/* Search Section */}
          <section className="search-section">
            <div className="section-header">
              <h2>🔍 Buscar Clima</h2>
              <p>Encuentra el clima de cualquier ciudad del mundo</p>
            </div>
            
            <ApiKeyWarning />
            
            <SearchBar
              onSearch={handleSearch}
              onLocationSearch={handleLocationSearch}
              history={getHistory()}
              onHistorySelect={handleHistorySelect}
              onClearHistory={clearHistory}
            />
          </section>

          {/* Loading Section */}
          {loading && (
            <section className="loading-section">
              <LoadingSpinner 
                message={currentCity ? `Obteniendo datos para ${currentCity}...` : 'Obteniendo tu ubicación...'} 
              />
            </section>
          )}

          {/* Error Section */}
          {error && (
            <section className="error-section">
              <ErrorMessage 
                error={error} 
                onRetry={handleRetry}
              />
            </section>
          )}

          {/* Weather Data Section */}
          {weatherData && !loading && !error && (
            <section className="weather-data-section">
              <div className="section-header">
                <h2>📊 Información del Clima</h2>
                <p>Datos actuales y pronóstico extendido</p>
              </div>
              
              <div className="weather-content">
                <WeatherCard weatherData={weatherData} />
                <WeatherStats weatherData={weatherData} />
                {forecastData && <ForecastCard forecastData={forecastData} />}
              </div>
            </section>
          )}

          {/* Welcome Section */}
          {!weatherData && !loading && !error && (
            <section className="welcome-section">
              <div className="welcome-content">
                <div className="welcome-header">
                  <h2>¡Bienvenido a Weather RT!</h2>
                  <p>Tu aplicación completa para consultar el clima en tiempo real</p>
                </div>
                
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🌍</div>
                    <h3>Búsqueda Global</h3>
                    <p>Busca cualquier ciudad del mundo con información detallada</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">📍</div>
                    <h3>Ubicación Actual</h3>
                    <p>Obtén el clima de tu ubicación actual automáticamente</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">📅</div>
                    <h3>Pronóstico Extendido</h3>
                    <p>Pronóstico detallado de 5 días con temperaturas y condiciones</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">📱</div>
                    <h3>Diseño Responsive</h3>
                    <p>Funciona perfectamente en móviles, tablets y computadoras</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Tiempo Real</h3>
                    <p>Datos actualizados en tiempo real desde OpenWeatherMap</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">🎨</div>
                    <h3>Interfaz Moderna</h3>
                    <p>Diseño atractivo con animaciones y efectos visuales</p>
                  </div>
                </div>
                
                <div className="quick-start">
                  <h3>🚀 Comienza ahora</h3>
                  <p>Escribe el nombre de una ciudad o usa tu ubicación para ver el clima</p>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Footer Section */}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Weather RT</h4>
              <p>Tu aplicación del clima favorita</p>
            </div>
            
            <div className="footer-section">
              <h4>Datos</h4>
              <p>Proporcionados por OpenWeatherMap</p>
              <p>Actualizados en tiempo real</p>
            </div>
            
            <div className="footer-section">
              <h4>Desarrollado con</h4>
              <p>React • JavaScript • CSS3</p>
              <p>© 2024 Weather RT</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

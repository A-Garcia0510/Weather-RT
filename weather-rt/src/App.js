import React, { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
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
      <div className="background-animation">
        <div className="clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>
      </div>

      <div className="container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="weather-emoji">🌤️</span>
            Weather App
          </h1>
          <p className="app-subtitle">Consulta el clima en tiempo real</p>
        </header>

        <main className="app-main">
          <ApiKeyWarning />
          
          <SearchBar
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
            history={getHistory()}
            onHistorySelect={handleHistorySelect}
            onClearHistory={clearHistory}
          />

          {loading && (
            <LoadingSpinner 
              message={currentCity ? `Obteniendo datos para ${currentCity}...` : 'Obteniendo tu ubicación...'} 
            />
          )}

          {error && (
            <ErrorMessage 
              error={error} 
              onRetry={handleRetry}
            />
          )}

          {weatherData && !loading && !error && (
            <>
              <WeatherCard weatherData={weatherData} />
              {forecastData && <ForecastCard forecastData={forecastData} />}
            </>
          )}

          {!weatherData && !loading && !error && (
            <div className="welcome-message">
              <div className="welcome-content">
                <h2>¡Bienvenido a Weather App!</h2>
                <p>Busca una ciudad o usa tu ubicación para ver el clima actual y el pronóstico extendido.</p>
                <div className="welcome-features">
                  <div className="feature">
                    <span className="feature-icon">🌍</span>
                    <span>Busca cualquier ciudad del mundo</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📍</span>
                    <span>Usa tu ubicación actual</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📅</span>
                    <span>Pronóstico de 5 días</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📱</span>
                    <span>Diseño responsive</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p>© 2024 Weather App - Desarrollado con React</p>
          <p>Datos proporcionados por OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

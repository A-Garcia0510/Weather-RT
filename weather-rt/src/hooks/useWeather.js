import { useState, useCallback } from 'react';
import { getCurrentWeather, getForecast, getWeatherByCoords, getForecastByCoords } from '../services/weatherApi';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState('');

  // Función para buscar clima por ciudad
  const searchWeather = useCallback(async (city) => {
    console.log('🔍 Debug - searchWeather llamado con:', city);
    
    if (!city.trim()) {
      setError('Por favor, ingresa el nombre de una ciudad');
      return;
    }

    // Evitar múltiples peticiones simultáneas usando una referencia
    setLoading(prevLoading => {
      if (prevLoading) {
        console.log('🔍 Debug - Búsqueda en progreso, ignorando nueva petición');
        return prevLoading;
      }
      return true;
    });

    setError(null);
    setCurrentCity(city);

    try {
      console.log('🔍 Debug - Iniciando búsqueda para:', city);
      
      // Obtener clima actual
      console.log('🔍 Debug - Llamando getCurrentWeather...');
      const currentWeather = await getCurrentWeather(city);
      console.log('🔍 Debug - Clima actual obtenido:', currentWeather);
      setWeatherData(currentWeather);

      // Obtener pronóstico
      console.log('🔍 Debug - Llamando getForecast...');
      const forecast = await getForecast(city);
      console.log('🔍 Debug - Pronóstico obtenido:', forecast);
      setForecastData(forecast);

      // Guardar en historial local
      saveToHistory(city);
      
      console.log('🔍 Debug - Búsqueda completada exitosamente');
    } catch (err) {
      console.error('🔍 Debug - Error en búsqueda:', err.message);
      console.error('🔍 Debug - Error completo:', err);
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Función para obtener clima por geolocalización
  const getWeatherByLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Obtener posición del usuario
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      // Obtener clima por coordenadas
      const currentWeather = await getWeatherByCoords(latitude, longitude);
      setWeatherData(currentWeather);
      setCurrentCity(currentWeather.name);

      // Obtener pronóstico por coordenadas
      const forecast = await getForecastByCoords(latitude, longitude);
      setForecastData(forecast);

      // Guardar en historial local
      saveToHistory(currentWeather.name);
    } catch (err) {
      if (err.code === 1) {
        setError('Permiso denegado para acceder a la ubicación');
      } else if (err.code === 2) {
        setError('Ubicación no disponible');
      } else if (err.code === 3) {
        setError('Tiempo de espera agotado para obtener ubicación');
      } else {
        setError(err.message || 'Error al obtener tu ubicación');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para buscar clima por coordenadas (para el mapa)
  const searchWeatherByCoords = useCallback(async (lat, lon) => {
    // Evitar múltiples peticiones simultáneas usando una referencia
    setLoading(prevLoading => {
      if (prevLoading) {
        console.log('🔍 Debug - Búsqueda en progreso, ignorando nueva petición');
        return prevLoading;
      }
      return true;
    });

    setError(null);

    try {
      console.log('🔍 Debug - Iniciando búsqueda por coordenadas:', lat, lon);
      
      // Obtener clima actual por coordenadas
      const currentWeather = await getWeatherByCoords(lat, lon);
      setWeatherData(currentWeather);
      setCurrentCity(currentWeather.name);

      // Obtener pronóstico por coordenadas
      const forecast = await getForecastByCoords(lat, lon);
      setForecastData(forecast);

      // Guardar en historial local
      saveToHistory(currentWeather.name);
      
      console.log('🔍 Debug - Búsqueda por coordenadas completada exitosamente');
    } catch (err) {
      console.error('🔍 Debug - Error en búsqueda por coordenadas:', err.message);
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Función para limpiar datos
  const clearWeather = useCallback(() => {
    setWeatherData(null);
    setForecastData(null);
    setError(null);
    setCurrentCity('');
  }, []);

  // Función para guardar en historial local
  const saveToHistory = (city) => {
    try {
      const history = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
      const newHistory = [city, ...history.filter(item => item !== city)].slice(0, 5);
      localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
    } catch (err) {
      console.error('Error al guardar historial:', err);
    }
  };

  // Función para obtener historial
  const getHistory = () => {
    try {
      return JSON.parse(localStorage.getItem('weatherHistory') || '[]');
    } catch (err) {
      console.error('Error al obtener historial:', err);
      return [];
    }
  };

  // Función para limpiar historial
  const clearHistory = () => {
    try {
      localStorage.removeItem('weatherHistory');
    } catch (err) {
      console.error('Error al limpiar historial:', err);
    }
  };

  // Promesa para obtener posición geográfica
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada por este navegador'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      });
    });
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    currentCity,
    searchWeather,
    searchWeatherByCoords,
    getWeatherByLocation,
    clearWeather,
    getHistory,
    clearHistory
  };
}; 
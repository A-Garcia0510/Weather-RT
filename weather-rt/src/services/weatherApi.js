import axios from 'axios';
import { API_CONFIG, isApiKeyValid } from '../config/api';

// Log para depuración en el navegador
console.log('API KEY ENVIADA:', API_CONFIG.API_KEY);

// Crear instancia de axios con configuración base
const weatherApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

// Interceptor para manejar errores
weatherApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API del clima:', error);
    
    // Verificar si la API key está configurada
    if (!isApiKeyValid()) {
      throw new Error('API Key no configurada. Por favor, configura tu API key de OpenWeatherMap.');
    }
    
    if (error.response?.status === 401) {
      throw new Error('API key inválida. Por favor, verifica tu configuración.');
    } else if (error.response?.status === 404) {
      throw new Error(`Ciudad "${error.config?.params?.q || 'desconocida'}" no encontrada. Verifica el nombre de la ciudad.`);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet.');
    } else {
      throw new Error('Error al obtener datos del clima. Intenta de nuevo.');
    }
  }
);

// Función para obtener el clima actual
export const getCurrentWeather = async (city) => {
  try {
    console.log('🔍 Debug - Llamando API para ciudad:', city);
    console.log('🔍 Debug - API Key usada:', API_CONFIG.API_KEY);
    console.log('🔍 Debug - URL completa:', `${API_CONFIG.BASE_URL}/weather?q=${city}&appid=${API_CONFIG.API_KEY}&units=${API_CONFIG.DEFAULT_UNITS}&lang=${API_CONFIG.DEFAULT_LANG}`);
    
    const response = await weatherApi.get('/weather', {
      params: {
        q: city,
        appid: API_CONFIG.API_KEY,
        units: API_CONFIG.DEFAULT_UNITS,
        lang: API_CONFIG.DEFAULT_LANG
      }
    });
    return response.data;
  } catch (error) {
    console.error('🔍 Debug - Error en API:', error.response?.data || error.message);
    throw error;
  }
};

// Función para obtener el pronóstico de 5 días
export const getForecast = async (city) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        appid: API_CONFIG.API_KEY,
        units: API_CONFIG.DEFAULT_UNITS,
        lang: API_CONFIG.DEFAULT_LANG
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener clima por coordenadas (geolocalización)
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        lat,
        lon,
        appid: API_CONFIG.API_KEY,
        units: API_CONFIG.DEFAULT_UNITS,
        lang: API_CONFIG.DEFAULT_LANG
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener pronóstico por coordenadas
export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        lat,
        lon,
        appid: API_CONFIG.API_KEY,
        units: API_CONFIG.DEFAULT_UNITS,
        lang: API_CONFIG.DEFAULT_LANG
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default weatherApi; 
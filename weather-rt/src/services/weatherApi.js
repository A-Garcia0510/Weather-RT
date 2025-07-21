import axios from 'axios';
import { API_CONFIG, isApiKeyValid } from '../config/api';

// Log para depuración en el navegador
console.log('API KEY ENVIADA:', API_CONFIG.API_KEY);

// Crear instancia de axios con configuración base
const weatherApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

// Interceptor para requests
weatherApi.interceptors.request.use(
  (config) => {
    console.log('🔍 Debug - Request config:', {
      url: config.url,
      method: config.method,
      params: config.params,
      baseURL: config.baseURL
    });
    return config;
  },
  (error) => {
    console.error('🔍 Debug - Error en request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
weatherApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('🔍 Debug - Error en interceptor de respuesta:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      code: error.code,
      config: error.config
    });
    
    // Verificar si la API key está configurada
    if (!isApiKeyValid()) {
      throw new Error('API Key no configurada. Por favor, configura tu API key de OpenWeatherMap.');
    }
    
    if (error.response?.status === 401) {
      throw new Error('API key inválida. Por favor, verifica tu configuración.');
    } else if (error.response?.status === 404) {
      throw new Error(`Ciudad "${error.config?.params?.q || 'desconocida'}" no encontrada. Verifica el nombre de la ciudad.`);
    } else if (error.response?.status === 429) {
      throw new Error('Demasiadas peticiones. Intenta de nuevo en unos minutos.');
    } else if (error.response?.status === 500) {
      throw new Error('Error interno del servidor. Intenta de nuevo más tarde.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet.');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Error de red. Verifica tu conexión a internet.');
    } else if (error.response?.data?.message) {
      throw new Error(`Error de la API: ${error.response.data.message}`);
    } else {
      throw new Error(`Error al obtener datos del clima (${error.response?.status || 'desconocido'}). Intenta de nuevo.`);
    }
  }
);

// Función para obtener el clima actual
export const getCurrentWeather = async (city) => {
  try {
    console.log('🔍 Debug - Llamando API para ciudad:', city);
    console.log('🔍 Debug - API Key:', API_CONFIG.API_KEY);
    console.log('🔍 Debug - URL base:', API_CONFIG.BASE_URL);
    
    const response = await weatherApi.get('/weather', {
      params: {
        q: city,
        appid: API_CONFIG.API_KEY,
        units: API_CONFIG.DEFAULT_UNITS,
        lang: API_CONFIG.DEFAULT_LANG
      }
    });
    
    console.log('🔍 Debug - Respuesta exitosa:', response.data);
    return response.data;
  } catch (error) {
    console.error('🔍 Debug - Error en API:', error.response?.data || error.message);
    console.error('🔍 Debug - Error completo:', error);
    throw error;
  }
};

// Función para obtener el pronóstico de 5 días
export const getForecast = async (city) => {
  try {
    console.log('🔍 Debug - Llamando API forecast para ciudad:', city);
    
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        appid: API_CONFIG.API_KEY,
        units: API_CONFIG.DEFAULT_UNITS,
        lang: API_CONFIG.DEFAULT_LANG
      }
    });
    
    console.log('🔍 Debug - Respuesta forecast exitosa:', response.data);
    return response.data;
  } catch (error) {
    console.error('🔍 Debug - Error en API forecast:', error.response?.data || error.message);
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
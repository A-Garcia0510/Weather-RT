// Configuración de la API del clima
export const API_CONFIG = {
  // API Key - Cambiar por tu clave real de OpenWeatherMap
  API_KEY: process.env.REACT_APP_WEATHER_API_KEY || 'ac0a378f336a5f11c764627225003fd4',
  
  // URL base de la API
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  
  // Configuración por defecto
  DEFAULT_UNITS: 'metric', // Celsius
  DEFAULT_LANG: 'es', // Español
  TIMEOUT: 10000, // 10 segundos
};

// Debug: Verificar que la API key se está leyendo
console.log('🔍 Debug - API Key configurada:', process.env.REACT_APP_WEATHER_API_KEY ? 'SÍ' : 'NO');
console.log('🔍 Debug - API Key valor:', process.env.REACT_APP_WEATHER_API_KEY);
console.log('🔍 Debug - API_CONFIG.API_KEY:', API_CONFIG.API_KEY);

// Función para verificar si la API key es válida
export const isApiKeyValid = () => {
  return API_CONFIG.API_KEY && 
         API_CONFIG.API_KEY !== 'demo_key_for_testing' && 
         API_CONFIG.API_KEY.length > 10;
};

// Función para obtener mensaje de configuración
export const getApiKeyMessage = () => {
  if (!isApiKeyValid()) {
    return {
      type: 'warning',
      message: '⚠️ API Key no configurada. Para usar la aplicación completa, obtén una API key gratuita en OpenWeatherMap y configúrala en el archivo .env',
      link: 'https://openweathermap.org/api'
    };
  }
  return null;
}; 
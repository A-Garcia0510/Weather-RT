// Constantes para la API del clima
export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
};

// Constantes para unidades de temperatura
export const TEMPERATURE_UNITS = {
  CELSIUS: 'metric',
  FAHRENHEIT: 'imperial',
};

// Constantes para iconos del clima
export const WEATHER_ICONS = {
  '01d': '☀️', // Clear sky day
  '01n': '🌙', // Clear sky night
  '02d': '⛅', // Few clouds day
  '02n': '☁️', // Few clouds night
  '03d': '☁️', // Scattered clouds
  '03n': '☁️', // Scattered clouds
  '04d': '☁️', // Broken clouds
  '04n': '☁️', // Broken clouds
  '09d': '🌧️', // Shower rain
  '09n': '🌧️', // Shower rain
  '10d': '🌦️', // Rain day
  '10n': '🌧️', // Rain night
  '11d': '⛈️', // Thunderstorm
  '11n': '⛈️', // Thunderstorm
  '13d': '🌨️', // Snow
  '13n': '🌨️', // Snow
  '50d': '🌫️', // Mist
  '50n': '🌫️', // Mist
};

// Constantes para colores según temperatura
export const TEMPERATURE_COLORS = {
  COLD: '#4A90E2',      // Azul para temperaturas frías
  COOL: '#7ED321',      // Verde para temperaturas frescas
  WARM: '#F5A623',      // Naranja para temperaturas templadas
  HOT: '#D0021B',       // Rojo para temperaturas calientes
};

// Constantes para mensajes de error
export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'Ciudad no encontrada. Verifica el nombre.',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  API_ERROR: 'Error en el servicio del clima. Intenta de nuevo.',
  LOCATION_DENIED: 'Permiso denegado para acceder a la ubicación.',
  LOCATION_UNAVAILABLE: 'Ubicación no disponible.',
  LOCATION_TIMEOUT: 'Tiempo de espera agotado para obtener ubicación.',
};

// Constantes para localStorage
export const STORAGE_KEYS = {
  WEATHER_HISTORY: 'weatherHistory',
  FAVORITES: 'weatherFavorites',
  UNITS: 'weatherUnits',
  THEME: 'weatherTheme',
};

// Constantes para breakpoints responsive
export const BREAKPOINTS = {
  MOBILE: '320px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE_DESKTOP: '1440px',
};

// Constantes para animaciones
export const ANIMATIONS = {
  FADE_IN: 'fadeIn 0.5s ease-in',
  SLIDE_UP: 'slideUp 0.3s ease-out',
  SCALE_IN: 'scaleIn 0.2s ease-out',
};

// Constantes para cache
export const CACHE_CONFIG = {
  TTL: 30 * 60 * 1000, // 30 minutos en milisegundos
  MAX_ITEMS: 10,
};

// Constantes para validación
export const VALIDATION = {
  MIN_CITY_LENGTH: 2,
  MAX_CITY_LENGTH: 50,
  DEBOUNCE_DELAY: 500, // 500ms para debounce
}; 
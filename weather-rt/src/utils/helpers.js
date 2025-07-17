import { WEATHER_ICONS, TEMPERATURE_COLORS } from './constants';

// Función para obtener el icono del clima según el código de la API
export const getWeatherIcon = (iconCode) => {
  return WEATHER_ICONS[iconCode] || '🌤️';
};

// Función para obtener el color según la temperatura
export const getTemperatureColor = (temp) => {
  if (temp < 10) return TEMPERATURE_COLORS.COLD;
  if (temp < 20) return TEMPERATURE_COLORS.COOL;
  if (temp < 30) return TEMPERATURE_COLORS.WARM;
  return TEMPERATURE_COLORS.HOT;
};

// Función para formatear la temperatura
export const formatTemperature = (temp, unit = 'C') => {
  const roundedTemp = Math.round(temp);
  return `${roundedTemp}°${unit}`;
};

// Función para convertir Celsius a Fahrenheit
export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

// Función para convertir Fahrenheit a Celsius
export const fahrenheitToCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5/9;
};

// Función para convertir temperatura entre unidades
export const convertTemperature = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    return celsiusToFahrenheit(temp);
  }
  
  if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
    return fahrenheitToCelsius(temp);
  }
  
  return temp;
};

// Función para formatear temperatura con unidad específica
export const formatTemperatureWithUnit = (temp, unit) => {
  const roundedTemp = Math.round(temp);
  const unitSymbol = unit === 'celsius' ? 'C' : 'F';
  return `${roundedTemp}°${unitSymbol}`;
};

// Función para obtener el símbolo de la unidad
export const getUnitSymbol = (unit) => {
  return unit === 'celsius' ? 'C' : 'F';
};

// Función para convertir y formatear temperatura
export const convertAndFormatTemperature = (temp, fromUnit, toUnit) => {
  const convertedTemp = convertTemperature(temp, fromUnit, toUnit);
  return formatTemperatureWithUnit(convertedTemp, toUnit);
};

// Función para formatear la fecha
export const formatDate = (timestamp, format = 'short') => {
  const date = new Date(timestamp * 1000);
  
  if (format === 'short') {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  if (format === 'time') {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return date.toLocaleDateString('es-ES');
};

// Función para formatear la hora
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Función para formatear la velocidad del viento
export const formatWindSpeed = (speed, unit = 'metric') => {
  if (unit === 'imperial') {
    return `${Math.round(speed)} mph`;
  }
  return `${Math.round(speed)} m/s`;
};

// Función para formatear la presión atmosférica
export const formatPressure = (pressure) => {
  return `${pressure} hPa`;
};

// Función para formatear la humedad
export const formatHumidity = (humidity) => {
  return `${humidity}%`;
};

// Función para obtener la dirección del viento
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

// Función para validar el nombre de una ciudad
export const validateCityName = (cityName) => {
  if (!cityName || typeof cityName !== 'string') {
    return { isValid: false, message: 'El nombre de la ciudad es requerido' };
  }
  
  const trimmedCity = cityName.trim();
  
  if (trimmedCity.length < 2) {
    return { isValid: false, message: 'El nombre de la ciudad debe tener al menos 2 caracteres' };
  }
  
  if (trimmedCity.length > 50) {
    return { isValid: false, message: 'El nombre de la ciudad es demasiado largo' };
  }
  
  // Validar que solo contenga letras, espacios, guiones y apóstrofes
  const validPattern = /^[a-zA-ZÀ-ÿ\s\-']+$/;
  if (!validPattern.test(trimmedCity)) {
    return { isValid: false, message: 'El nombre de la ciudad contiene caracteres inválidos' };
  }
  
  return { isValid: true, message: '' };
};

// Función para capitalizar la primera letra de cada palabra
export const capitalizeWords = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Función para crear un debounce
export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Función para obtener datos del cache
export const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    // Verificar si el cache ha expirado (30 minutos)
    if (now - timestamp > 30 * 60 * 1000) {
      localStorage.removeItem(key);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener datos del cache:', error);
    return null;
  }
};

// Función para guardar datos en el cache
export const setCachedData = (key, data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error al guardar datos en el cache:', error);
  }
};

// Función para limpiar el cache expirado
export const clearExpiredCache = () => {
  try {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    
    keys.forEach(key => {
      if (key.startsWith('weather_')) {
        const cached = localStorage.getItem(key);
        if (cached) {
          const { timestamp } = JSON.parse(cached);
          if (now - timestamp > 30 * 60 * 1000) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  } catch (error) {
    console.error('Error al limpiar cache expirado:', error);
  }
};

// Función para obtener la temperatura "feels like" (sensación térmica)
export const getFeelsLike = (temp, humidity, windSpeed) => {
  // Fórmula simplificada para calcular la sensación térmica
  // Basada en el índice de calor (Heat Index)
  if (temp >= 27) {
    // Para temperaturas cálidas, considerar humedad
    const heatIndex = temp + 0.348 * humidity - 0.7 * windSpeed + 0.7;
    return Math.round(heatIndex);
  } else if (temp <= 10) {
    // Para temperaturas frías, considerar viento (wind chill)
    const windChill = 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
    return Math.round(windChill);
  }
  
  return Math.round(temp);
}; 
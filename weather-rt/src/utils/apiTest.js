// Utilidad para probar el flujo completo de la API
export const testApiFlow = async () => {
  console.log('🧪 === INICIANDO PRUEBA COMPLETA DE API ===');
  
  const results = {
    config: false,
    apiKey: false,
    network: false,
    weather: false,
    forecast: false,
    errors: []
  };

  try {
    // 1. Verificar configuración
    console.log('🧪 1. Verificando configuración...');
    const { API_CONFIG, isApiKeyValid } = await import('../config/api');
    
    console.log('🧪 API_CONFIG:', {
      API_KEY: API_CONFIG.API_KEY ? 'CONFIGURADA' : 'NO CONFIGURADA',
      BASE_URL: API_CONFIG.BASE_URL,
      DEFAULT_UNITS: API_CONFIG.DEFAULT_UNITS,
      DEFAULT_LANG: API_CONFIG.DEFAULT_LANG,
      TIMEOUT: API_CONFIG.TIMEOUT
    });
    
    results.config = true;
    
    // 2. Verificar API Key
    console.log('🧪 2. Verificando API Key...');
    const keyValid = isApiKeyValid();
    console.log('🧪 API Key válida:', keyValid);
    results.apiKey = keyValid;
    
    if (!keyValid) {
      results.errors.push('API Key no válida');
      return results;
    }
    
    // 3. Verificar conectividad de red
    console.log('🧪 3. Verificando conectividad...');
    const networkTest = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=ac0a378f336a5f11c764627225003fd4&units=metric&lang=es');
    console.log('🧪 Respuesta de red:', networkTest.status, networkTest.statusText);
    results.network = networkTest.ok;
    
    if (!networkTest.ok) {
      results.errors.push(`Error de red: ${networkTest.status} ${networkTest.statusText}`);
      return results;
    }
    
    // 4. Probar API de clima actual
    console.log('🧪 4. Probando API de clima actual...');
    const weatherData = await networkTest.json();
    console.log('🧪 Datos de clima:', weatherData);
    
    if (weatherData.cod === 200) {
      results.weather = true;
      console.log('🧪 ✅ API de clima actual funciona');
    } else {
      results.errors.push(`Error en API de clima: ${weatherData.message}`);
    }
    
    // 5. Probar API de pronóstico
    console.log('🧪 5. Probando API de pronóstico...');
    const forecastTest = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=Madrid&appid=ac0a378f336a5f11c764627225003fd4&units=metric&lang=es');
    console.log('🧪 Respuesta de pronóstico:', forecastTest.status, forecastTest.statusText);
    
    if (forecastTest.ok) {
      const forecastData = await forecastTest.json();
      console.log('🧪 Datos de pronóstico:', forecastData);
      
      if (forecastData.cod === '200') {
        results.forecast = true;
        console.log('🧪 ✅ API de pronóstico funciona');
      } else {
        results.errors.push(`Error en API de pronóstico: ${forecastData.message}`);
      }
    } else {
      results.errors.push(`Error de red en pronóstico: ${forecastTest.status} ${forecastTest.statusText}`);
    }
    
  } catch (error) {
    console.error('🧪 Error en prueba de API:', error);
    results.errors.push(`Error general: ${error.message}`);
  }
  
  console.log('🧪 === RESULTADOS DE LA PRUEBA ===');
  console.log('🧪 Configuración:', results.config ? '✅' : '❌');
  console.log('🧪 API Key:', results.apiKey ? '✅' : '❌');
  console.log('🧪 Red:', results.network ? '✅' : '❌');
  console.log('🧪 Clima:', results.weather ? '✅' : '❌');
  console.log('🧪 Pronóstico:', results.forecast ? '✅' : '❌');
  
  if (results.errors.length > 0) {
    console.log('🧪 Errores encontrados:', results.errors);
  }
  
  return results;
};

// Función para probar el flujo con axios
export const testAxiosFlow = async () => {
  console.log('🧪 === PROBANDO FLUJO CON AXIOS ===');
  
  try {
    const { getCurrentWeather, getForecast } = await import('../services/weatherApi');
    
    console.log('🧪 Probando getCurrentWeather...');
    const weather = await getCurrentWeather('Madrid');
    console.log('🧪 ✅ getCurrentWeather exitoso:', weather);
    
    console.log('🧪 Probando getForecast...');
    const forecast = await getForecast('Madrid');
    console.log('🧪 ✅ getForecast exitoso:', forecast);
    
    return { success: true, weather, forecast };
  } catch (error) {
    console.error('🧪 ❌ Error en flujo de axios:', error);
    return { success: false, error: error.message };
  }
};

// Función para probar el hook useWeather
export const testHookFlow = async (searchWeather) => {
  console.log('🧪 === PROBANDO FLUJO DEL HOOK ===');
  
  try {
    console.log('🧪 Llamando searchWeather...');
    await searchWeather('Madrid');
    console.log('🧪 ✅ searchWeather completado');
    return { success: true };
  } catch (error) {
    console.error('🧪 ❌ Error en hook:', error);
    return { success: false, error: error.message };
  }
}; 
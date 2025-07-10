// Script de prueba para verificar la API key
const API_KEY = 'ac0a378f336a5f11c764627225003fd4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function testAPI() {
  console.log('🧪 Probando API key...');
  console.log('🔑 API Key:', API_KEY);
  
  try {
    const response = await fetch(`${BASE_URL}/weather?q=London&appid=${API_KEY}&units=metric&lang=es`);
    const data = await response.json();
    
    console.log('📊 Respuesta de la API:');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ API key funciona correctamente!');
    } else {
      console.log('❌ Error en la API:', data.message);
    }
  } catch (error) {
    console.error('❌ Error de red:', error.message);
  }
}

testAPI(); 
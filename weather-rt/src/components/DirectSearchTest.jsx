import React, { useState } from 'react';

const DirectSearchTest = ({ searchWeather }) => {
  const [testCity, setTestCity] = useState('');

  const handleDirectSearch = (e) => {
    e.preventDefault();
    console.log('🔧 Debug - DirectSearchTest - Llamando searchWeather directamente con:', testCity);
    searchWeather(testCity);
  };

  return (
    <div style={{ 
      margin: '1rem 0', 
      padding: '1rem', 
      background: 'rgba(255,0,0,0.1)', 
      borderRadius: '0.5rem',
      border: '2px solid red'
    }}>
      <h4 style={{ color: 'red', margin: '0 0 1rem 0' }}>🧪 PRUEBA DIRECTA - Bypass SearchBar</h4>
      <form onSubmit={handleDirectSearch} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={testCity}
          onChange={(e) => setTestCity(e.target.value)}
          placeholder="Ciudad para prueba directa..."
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}
        >
          🔧 Buscar Directo
        </button>
      </form>
      <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#666' }}>
        Esta prueba llama directamente a searchWeather sin pasar por SearchBar
      </div>
    </div>
  );
};

export default DirectSearchTest; 
import React, { createContext, useContext, useState, useEffect } from 'react';

const TemperatureContext = createContext();

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature debe usarse dentro de TemperatureProvider');
  }
  return context;
};

export const TemperatureProvider = ({ children }) => {
  const [unit, setUnit] = useState(() => {
    try {
      const saved = localStorage.getItem('temperatureUnit');
      return saved || 'celsius';
    } catch (error) {
      console.error('Error al cargar unidad de temperatura:', error);
      return 'celsius';
    }
  });

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const setUnitExplicitly = (newUnit) => {
    if (newUnit === 'celsius' || newUnit === 'fahrenheit') {
      setUnit(newUnit);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('temperatureUnit', unit);
    } catch (error) {
      console.error('Error al guardar unidad de temperatura:', error);
    }
  }, [unit]);

  const value = {
    unit,
    toggleUnit,
    setUnit: setUnitExplicitly,
    isCelsius: unit === 'celsius',
    isFahrenheit: unit === 'fahrenheit'
  };

  return (
    <TemperatureContext.Provider value={value}>
      {children}
    </TemperatureContext.Provider>
  );
}; 
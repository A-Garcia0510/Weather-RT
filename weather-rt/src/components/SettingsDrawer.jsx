import React, { useState, useEffect } from 'react';
import './SettingsDrawer.css';
import { useTemperature } from '../contexts/TemperatureContext';

const SettingsDrawer = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const { unit, setUnit } = useTemperature();

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
    document.body.classList.toggle('light-theme', !darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('temperatureUnit', unit);
  }, [unit]);

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  return (
    <>
      {/* Botón flotante mejorado */}
      <button
        className="settings-fab improved-fab"
        aria-label="Abrir configuración"
        onClick={() => setOpen(true)}
      >
        <span className="settings-gear improved-gear">⚙️</span>
        <span className="fab-glow"></span>
      </button>

      {/* Drawer lateral */}
      <div className={`settings-drawer-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`settings-drawer${open ? ' open' : ''}`}>
        <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Cerrar configuración">×</button>
        <div className="drawer-title">
          <span className="drawer-title-icon">⚙️</span>
          <h2>Configuración</h2>
        </div>
        <div className="drawer-section visual-block">
          <div className="option-icon-block">
            {darkMode ? <span role="img" aria-label="Oscuro" className="option-emoji">🌙</span> : <span role="img" aria-label="Claro" className="option-emoji">☀️</span>}
          </div>
          <span className="option-label">Modo de color</span>
          <div className="toggle-switch-row">
            <button
              className={`toggle-switch-btn${!darkMode ? ' active' : ''}`}
              onClick={() => setDarkMode(false)}
            >
              Claro
            </button>
            <button
              className={`toggle-switch-btn${darkMode ? ' active' : ''}`}
              onClick={() => setDarkMode(true)}
            >
              Oscuro
            </button>
          </div>
        </div>
        <div className="drawer-section visual-block">
          <div className="option-icon-block">
            {unit === 'celsius' ? <span role="img" aria-label="Celsius" className="option-emoji">🌡️</span> : <span role="img" aria-label="Fahrenheit" className="option-emoji">❄️</span>}
          </div>
          <span className="option-label">Unidad de temperatura</span>
          <div className="toggle-switch-row">
            <button
              className={`toggle-switch-btn${unit === 'celsius' ? ' active' : ''}`}
              onClick={() => handleUnitChange('celsius')}
            >
              °C
            </button>
            <button
              className={`toggle-switch-btn${unit === 'fahrenheit' ? ' active' : ''}`}
              onClick={() => handleUnitChange('fahrenheit')}
            >
              °F
            </button>
          </div>
        </div>
        {/* Espacio para futuras opciones */}
        <div className="drawer-section drawer-future">
          <span>Próximamente más opciones…</span>
        </div>
      </aside>
    </>
  );
};

export default SettingsDrawer; 
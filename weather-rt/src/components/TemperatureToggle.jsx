import React, { useState } from 'react';
import { useTemperature } from '../contexts/TemperatureContext';
import './TemperatureToggle.css';

const TemperatureToggle = () => {
  const { toggleUnit, isCelsius } = useTemperature();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleUnit();
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="temperature-toggle-container">
      <button
        className={`temperature-toggle ${isCelsius ? 'celsius-active' : 'fahrenheit-active'} ${isAnimating ? 'animating' : ''}`}
        onClick={handleToggle}
        aria-label={`Cambiar a ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
        title={`Cambiar a ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
      >
        <div className="toggle-background">
          <div className="toggle-track"></div>
          <div className="toggle-slider"></div>
        </div>
        
        <div className="toggle-content">
          <div className="toggle-icon-container">
            <span className="toggle-icon">🌡️</span>
            <div className="icon-glow"></div>
          </div>
          
          <div className="unit-display">
            <span className={`unit-option celsius ${isCelsius ? 'active' : ''}`}>
              <span className="unit-text">°C</span>
              <span className="unit-label">Celsius</span>
            </span>
            <span className={`unit-option fahrenheit ${!isCelsius ? 'active' : ''}`}>
              <span className="unit-text">°F</span>
              <span className="unit-label">Fahrenheit</span>
            </span>
          </div>
        </div>
        
        <div className="toggle-ripple"></div>
      </button>
    </div>
  );
};

export default TemperatureToggle; 
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Cargando datos del clima...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner; 
import React from 'react';
import { FaRedo } from 'react-icons/fa';
import './ErrorMessage.css';

const ErrorMessage = ({ error, onRetry }) => {
  const getErrorMessage = (error) => {
    if (typeof error === 'string') {
      return error;
    }
    
    // Manejar diferentes tipos de errores
    if (error?.message) {
      return error.message;
    }
    
    return 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.';
  };

  const getErrorIcon = (error) => {
    if (error?.includes('ubicación') || error?.includes('location')) {
      return '📍';
    }
    if (error?.includes('ciudad') || error?.includes('city')) {
      return '🏙️';
    }
    if (error?.includes('conexión') || error?.includes('network')) {
      return '📡';
    }
    return '⚠️';
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">
          <span className="error-emoji">{getErrorIcon(error)}</span>
        </div>
        <h3 className="error-title">¡Ups! Algo salió mal</h3>
        <p className="error-message">{getErrorMessage(error)}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            <FaRedo className="retry-icon" />
            Intentar de nuevo
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage; 
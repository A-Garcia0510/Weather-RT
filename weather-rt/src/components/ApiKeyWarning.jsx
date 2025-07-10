import React from 'react';
import { FaExclamationTriangle, FaExternalLinkAlt } from 'react-icons/fa';
import { getApiKeyMessage } from '../config/api';
import './ApiKeyWarning.css';

const ApiKeyWarning = () => {
  const apiKeyMessage = getApiKeyMessage();

  if (!apiKeyMessage) {
    return null;
  }

  return (
    <div className="api-key-warning">
      <div className="warning-content">
        <div className="warning-icon">
          <FaExclamationTriangle />
        </div>
        <div className="warning-text">
          <h3>Configuración Requerida</h3>
          <p>{apiKeyMessage.message}</p>
          <a 
            href={apiKeyMessage.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="warning-link"
          >
            Obtener API Key <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyWarning; 
import React, { useState, useEffect } from 'react';
import { FaSearch, FaLocationArrow, FaHistory, FaTimes } from 'react-icons/fa';
import { capitalizeWords } from '../utils/helpers';
import './SearchBar.css';

const SearchBar = ({ onSearch, onLocationSearch, history, onHistorySelect, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [localHistory, setLocalHistory] = useState([]);

  // Sincronizar localHistory con localStorage y prop history
  useEffect(() => {
    let stored = [];
    if (typeof window !== 'undefined') {
      stored = JSON.parse(localStorage.getItem('weather_search_history') || '[]');
    }
    setLocalHistory(stored.length ? stored : history || []);
  }, [history]);

  // Manejar cambios en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setValidationError('');
  };

  // Función simplificada para validar ciudad
  const validateCity = (city) => {
    const trimmed = city.trim();
    if (!trimmed) return { isValid: false, message: 'Por favor, ingresa el nombre de una ciudad' };
    if (trimmed.length < 2) return { isValid: false, message: 'El nombre debe tener al menos 2 caracteres' };
    if (trimmed.length > 50) return { isValid: false, message: 'El nombre es demasiado largo' };
    return { isValid: true, message: '' };
  };

  // Manejar envío del formulario - VERSIÓN SIMPLIFICADA
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔍 Debug - SearchBar handleSubmit llamado');
    console.log('🔍 Debug - searchTerm:', searchTerm);
    console.log('🔍 Debug - isSearching:', isSearching);
    
    const trimmedCity = searchTerm.trim();
    
    if (!trimmedCity) {
      setValidationError('Por favor, ingresa el nombre de una ciudad');
      return;
    }
    
    if (isSearching) {
      console.log('🔍 Debug - Ya está buscando, ignorando nueva petición');
      return;
    }
    
    const validation = validateCity(trimmedCity);
    console.log('🔍 Debug - Validación:', validation);
    
    if (!validation.isValid) {
      setValidationError(validation.message);
      return;
    }
    
    // Ejecutar búsqueda
    console.log('🔍 Debug - Ejecutando búsqueda para:', trimmedCity);
    setIsSearching(true);
    setValidationError('');
    
    try {
      onSearch(trimmedCity);
      console.log('🔍 Debug - onSearch llamado exitosamente');
    } catch (error) {
      console.error('🔍 Debug - Error al llamar onSearch:', error);
      setValidationError('Error al procesar la búsqueda');
    } finally {
      // Resetear el estado después de un tiempo
      setTimeout(() => {
        setIsSearching(false);
        console.log('🔍 Debug - Estado de búsqueda reseteado');
      }, 3000);
    }
  };

  // Manejar búsqueda por ubicación
  const handleLocationSearch = () => {
    console.log('🔍 Debug - handleLocationSearch llamado');
    if (!isSearching) {
      onLocationSearch();
    }
  };

  // Manejar selección del historial - VERSIÓN SIMPLIFICADA
  const handleHistorySelect = (city) => {
    console.log('🔍 Debug - handleHistorySelect llamado con:', city);
    
    if (isSearching) {
      console.log('🔍 Debug - Ya está buscando, ignorando selección del historial');
      return;
    }
    
    setSearchTerm(city);
    setShowHistory(false);
    setValidationError('');
    
    console.log('🔍 Debug - Ejecutando búsqueda desde historial para:', city);
    setIsSearching(true);
    
    try {
      onHistorySelect(city);
      console.log('🔍 Debug - onHistorySelect llamado exitosamente');
    } catch (error) {
      console.error('🔍 Debug - Error al llamar onHistorySelect:', error);
      setValidationError('Error al procesar la búsqueda');
    } finally {
      setTimeout(() => {
        setIsSearching(false);
        console.log('🔍 Debug - Estado de búsqueda reseteado (historial)');
      }, 3000);
    }
  };

  // Nueva función para eliminar una búsqueda individual
  const handleDeleteHistoryItem = (city, e) => {
    e.stopPropagation();
    let stored = [];
    if (typeof window !== 'undefined') {
      stored = JSON.parse(localStorage.getItem('weather_search_history') || '[]');
      stored = stored.filter(item => item.toLowerCase() !== city.toLowerCase());
      localStorage.setItem('weather_search_history', JSON.stringify(stored));
    }
    setLocalHistory(stored);
  };

  // Cerrar historial al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowHistory(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Ciudades populares para sugerencias
  const popularCities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga', 'Zaragoza', 'Murcia'];

  return (
    <div className="search-container" style={{ marginTop: '2.5rem' }}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowHistory(true)}
            placeholder="Escribe el nombre de una ciudad..."
            className={`search-input ${validationError ? 'error' : ''}`}
            autoComplete="off"
            disabled={isSearching}
          />
          {searchTerm && !isSearching && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="clear-button"
            >
              <FaTimes />
            </button>
          )}
        </div>
        
        <button 
          type="submit" 
          className="search-button" 
          disabled={isSearching}
          onClick={handleSubmit}
        >
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
        
        <button
          type="button"
          onClick={handleLocationSearch}
          className="location-button"
          title="Usar mi ubicación"
          disabled={isSearching}
        >
          <FaLocationArrow />
          <span>Mi ubicación</span>
        </button>
      </form>

      {validationError && (
        <div className="validation-error">
          {validationError}
        </div>
      )}

      {showHistory && (
        <div className="search-history">
          <button
            onClick={() => setShowHistory(false)}
            className="close-history-button"
            title="Cerrar"
            style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
          >
            <FaTimes />
          </button>
          <div className="history-header">
            {localHistory.length > 0 ? (
              <div className="history-header-left">
                <FaHistory className="history-icon" />
                <span>Búsquedas recientes</span>
              </div>
            ) : (
              <div className="history-header-left">
                <FaSearch className="history-icon" />
                <span>Ciudades populares</span>
              </div>
            )}
          </div>
          <ul className="history-list">
            {localHistory.length > 0 ? (
              localHistory.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleHistorySelect(city)}
                  className="history-item"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{capitalizeWords(city)}</span>
                  </span>
                  <button
                    className="delete-history-item"
                    title="Eliminar esta búsqueda"
                    onClick={e => handleDeleteHistoryItem(city, e)}
                  >
                    <FaTimes />
                  </button>
                </li>
              ))
            ) : (
              popularCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleHistorySelect(city)}
                  className="history-item"
                >
                  <span>{city}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
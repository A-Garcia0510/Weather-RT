import React, { useState, useEffect } from 'react';
import { FaSearch, FaLocationArrow, FaHistory, FaTimes } from 'react-icons/fa';
import { validateCityName, debounce, capitalizeWords } from '../utils/helpers';
import './SearchBar.css';

const SearchBar = ({ onSearch, onLocationSearch, history, onHistorySelect, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Manejar cambios en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setValidationError('');
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && !isSearching) {
      const validation = validateCityName(searchTerm);
      if (validation.isValid) {
        setIsSearching(true);
        onSearch(searchTerm);
        setShowHistory(false);
        setValidationError('');
        // Resetear el estado de búsqueda después de 2 segundos
        setTimeout(() => setIsSearching(false), 2000);
      } else {
        setValidationError(validation.message);
      }
    }
  };

  // Manejar búsqueda por ubicación
  const handleLocationSearch = () => {
    onLocationSearch();
    setShowHistory(false);
  };

  // Manejar selección del historial
  const handleHistorySelect = (city) => {
    if (!isSearching) {
      setSearchTerm(city);
      setIsSearching(true);
      onHistorySelect(city);
      setShowHistory(false);
      // Resetear el estado de búsqueda después de 2 segundos
      setTimeout(() => setIsSearching(false), 2000);
    }
  };

  // Manejar limpieza del historial
  const handleClearHistory = (e) => {
    e.stopPropagation();
    onClearHistory();
  };

  // Cerrar historial al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => {
      setShowHistory(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Ciudades populares para sugerencias
  const popularCities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga', 'Zaragoza', 'Murcia'];

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowHistory(true)}
            placeholder="Buscar ciudad..."
            className={`search-input ${validationError ? 'error' : ''}`}
            autoComplete="off"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="clear-button"
            >
              <FaTimes />
            </button>
          )}
        </div>
        
        <button type="submit" className="search-button" disabled={isSearching}>
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
        </button>
      </form>

      {validationError && (
        <div className="validation-error">
          {validationError}
        </div>
      )}

      {showHistory && (
        <div className="search-history">
          {history.length > 0 ? (
            <>
              <div className="history-header">
                <FaHistory className="history-icon" />
                <span>Búsquedas recientes</span>
                <button
                  onClick={handleClearHistory}
                  className="clear-history-button"
                  title="Limpiar historial"
                >
                  <FaTimes />
                </button>
              </div>
              <ul className="history-list">
                {history.map((city, index) => (
                  <li
                    key={index}
                    onClick={() => handleHistorySelect(city)}
                    className="history-item"
                  >
                    <FaSearch className="history-search-icon" />
                    <span>{capitalizeWords(city)}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="history-header">
                <FaSearch className="history-icon" />
                <span>Ciudades populares</span>
              </div>
              <ul className="history-list">
                {popularCities.map((city, index) => (
                  <li
                    key={index}
                    onClick={() => handleHistorySelect(city)}
                    className="history-item"
                  >
                    <FaSearch className="history-search-icon" />
                    <span>{city}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
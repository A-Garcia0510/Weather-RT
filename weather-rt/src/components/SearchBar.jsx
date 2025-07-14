import React, { useState, useEffect } from 'react';
import { FaSearch, FaLocationArrow, FaHistory, FaTimes } from 'react-icons/fa';
import { validateCityName, debounce, capitalizeWords } from '../utils/helpers';
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

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && !isSearching) {
      const validation = validateCityName(searchTerm);
      if (validation.isValid) {
        setIsSearching(true);
        onSearch(searchTerm);
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
  };

  // Manejar selección del historial
  const handleHistorySelect = (city) => {
    if (!isSearching) {
      setSearchTerm(city);
      setIsSearching(true);
      onHistorySelect(city);
      // Resetear el estado de búsqueda después de 2 segundos
      setTimeout(() => setIsSearching(false), 2000);
    }
  };

  // Manejar limpieza del historial
  const handleClearHistory = (e) => {
    e.stopPropagation();
    onClearHistory();
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
      // No cerrar si el clic es dentro del contenedor de búsqueda
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
    <div className="search-container">
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
          <span>Mi ubicación</span>
        </button>
      </form>

      {validationError && (
        <div className="validation-error">
          {validationError}
        </div>
      )}

      {/* Elimina el panel de búsquedas recientes de la barra de búsqueda */}
    </div>
  );
};

export default SearchBar; 
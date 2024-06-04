import React from 'react';

const Filtro = ({ categorias, onFilterChange }) => {
  return (
    <div className="filtro-container">
      <select onChange={(e) => onFilterChange(e.target.value)} className="form-select">
        <option value="">Todas las categorías</option>
        {categorias.map((categoria, index) => (
          <option key={index} value={categoria}>{categoria}</option>
        ))}
      </select>
    </div>
  );
};

export default Filtro;

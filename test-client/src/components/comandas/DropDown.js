import React, { useState } from 'react';

const DropDown = ({ opciones_in, selectedValue, onDropdownChange }) => {
  // Asignar opciones_in directamente a opciones
  const opcionesPredeterminadas = ['Opciones'];
  const opciones = opciones_in && opciones_in.length > 0 ? opciones_in : opcionesPredeterminadas;

  // Función para manejar el cambio en el dropdown
  const handleSelectChange = (event) => {
    const value = event.target.value;
    // Llama a la función proporcionada desde el componente principal
    onDropdownChange(value);
  };

  return (
    <div>
      <select id="burgerStyle" className="custom-select mb-3" value={selectedValue} onChange={handleSelectChange}>
        {opciones.map((opcion, index) => (
          <option key={index} value={opcion.toLowerCase().replace(/\s/g, '_')}>
            {opcion}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;

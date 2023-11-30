import React, { useState } from 'react';

const DropDown = ({ opciones_in, selectedValue, onDropdownChange, precios }) => {
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
      {/* bold to drop down, and font size 15 */}
      <select id="burgerStyle" className="custom-select mb-3" value={selectedValue} onChange={handleSelectChange} style={{ fontWeight: 'bold', fontSize: '30px' }}>
        {opciones.map((opcion, index) => (
          <option key={index} value={opcion.toLowerCase().replace(/\s/g, '_')}>
             {precios && precios.length > 0 ? `$${precios[index]} ` : ''}{opcion}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;

import React, { useState } from 'react';
import Select from 'react-select';

const DropDown = ({ opciones_in, selectedValue, onDropdownChange, precios, precios_papas, hide_show_toggle, setToggleChecked }) => {
  // Asignar opciones_in directamente a opciones
  const opcionesPredeterminadas = ['Opciones'];
  const opciones_dropdown = opciones_in && opciones_in.length > 0 ? opciones_in : opcionesPredeterminadas;

  const options = opciones_dropdown.map((opcion_dropdown, index) => ({
    value: opcion_dropdown.toLowerCase().replace(/\s/g, '_'),
    label: (
      <div style={{ display: 'flex', justifyContent: 'left' }}>
            <span style={{ color: 'red' }}>
            {hide_show_toggle
              ? (precios_papas && precios_papas.length > 0 ? `$${precios_papas[index]} ` : '')
              : (precios && precios.length > 0 ? `$${precios[index]} ` : '')}
            </span>
            <span style={{ color: 'black' }}>
            &nbsp;{opcion_dropdown}
            </span>
      </div>
    )
    ,
  }));

  const MyComponent = ({selectedValue, handleChange}) => (
    <div className="mb-3" style={{ fontWeight: 'bold', fontSize: '30px' }}>
      {console.log('selectedValue', selectedValue)}
      {/* set selectedValue has selected option */}
      <Select
      options={options}
      value={options.find(obj => obj.value === selectedValue)}
      onChange={handleChange}
      />
    </div>
    )

  return (
    <div>
      {/* bold to drop down, and font size 15 */}
      {/* <select id="burgerStyle" className="custom-select mb-3" value={selectedValue} onChange={handleSelectChange} style={{ fontWeight: 'bold', fontSize: '22px', color: 'red' }}>
        {opciones_dropdown.map((opcion_dropdown, index) => (
          <option key={index} value={opcion_dropdown.toLowerCase().replace(/\s/g, '_')}>
            {hide_show_toggle
            ? (precios_papas && precios_papas.length > 0 ? `$${precios_papas[index]} ` : '') + opcion_dropdown
            : (precios && precios.length > 0 ? `$${precios[index]} ` : '') + opcion_dropdown}
          </option>
        ))}
      </select> */}
      <MyComponent selectedValue={selectedValue} handleChange={onDropdownChange} />
    </div>
  );
};

export default DropDown;

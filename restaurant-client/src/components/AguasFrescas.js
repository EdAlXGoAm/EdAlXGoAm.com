import React, { useState } from 'react';

import DropDown from './x10DropDown';

const AguasFrescas = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const dessertOptions = [
        '1 Litro',
        '2 Litros',
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('1_litro');

    const handleDropdownChange = (e) => {
        setSelectedTamano(e.value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedValue={selectedTamano} onDropdownChange={handleDropdownChange} precios={[25, 50]}/>
        </div>
    );
};

export default AguasFrescas;

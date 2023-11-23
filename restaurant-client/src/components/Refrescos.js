import React, { useState } from 'react';

import DropDown from './DropDown';

const Refrescos = ({ index, comanda, platillo, platillo_espacios }) => {
    const dessertOptions = [
        '600 ml',
        'Lata',
        'Otro'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('$30 Mediano');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange} precios={[20, 20, 0]}/>
        </div>
    );
};

export default Refrescos;

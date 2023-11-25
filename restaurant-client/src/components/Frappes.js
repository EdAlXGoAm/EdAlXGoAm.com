import React, { useState } from 'react';

import DropDown from './DropDown';

const Frappes = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const dessertOptions = [
        'Oreo',
        'Moka',
        'Fresa',
        'Chocolate',
        'Café',
        'Nutella',
        'Mazapán',
        'Ferrero',
        'Gansito',
        'Chocorrol',
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('$30 Mediano');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange} precios={[48, 48, 48, 48, 48, 68, 68, 68, 68, 68]}/>
        </div>
    );
};

export default Frappes;

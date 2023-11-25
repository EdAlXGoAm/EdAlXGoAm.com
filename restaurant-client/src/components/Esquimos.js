import React, { useState } from 'react';

import DropDown from './DropDown';

const Esquimos = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    
    //Esquimo
    const dessertOptions = [
        'Fresa',
        'Chocolate',
        'Pistache',
        'Moka',
        'Rompope',
        'Cajeta'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('$30 Mediano');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange} precios={[25, 25, 25, 25, 30, 30]}/>
        </div>
    );
};

export default Esquimos;

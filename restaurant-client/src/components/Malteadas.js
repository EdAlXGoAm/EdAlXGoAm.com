import React, { useState } from 'react';

import DropDown from './DropDown';

const Malteadas = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
   
    //Malteada
    const dessertOptions = [
        'Fresa',
        'Vainilla',
        'Chocolate'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('$30 Mediano');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange} precios={[58, 58, 58]}/>
        </div>
    );
};

export default Malteadas;

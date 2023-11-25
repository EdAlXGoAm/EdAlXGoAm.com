import React, { useState } from 'react';

import DropDown from './DropDown';

const Cafés = ({ index, comanda, platillo, platillo_espacios, status }) => {
    
    //Cafe
    const dessertOptions = [
        'Americano',
        'Americano con Leche',
        'De Olla',
        'Dalgona'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('$30 Mediano');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange} precios={[15, 20, 15, 25]}/>
        </div>
    );
};

export default Cafés;

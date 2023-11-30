import React, { useState } from 'react';

import DropDown from './x10DropDown';

const Postre = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const dessertOptions = [
        'Mediano',
        'Grande',
        '3 Divisiones',
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('mediano');

    const handleDropdownChange = (e) => {
        setSelectedTamano(e.value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedValue={selectedTamano} onDropdownChange={handleDropdownChange} precios={[30, 35, 40]}/>
        </div>
    );
};

export default Postre;

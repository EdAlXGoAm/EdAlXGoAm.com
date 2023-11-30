import React, { useState } from 'react';

import DropDown from './x10DropDown';

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
    const [selectedSaborFrappe, setselectedSaborFrappe] = useState('oreo');

    const handleDropdownChange = (e) => {
        setselectedSaborFrappe(e.value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedValue={selectedSaborFrappe} onDropdownChange={handleDropdownChange} precios={[48, 48, 48, 48, 48, 68, 68, 68, 68, 68]}/>
        </div>
    );
};

export default Frappes;

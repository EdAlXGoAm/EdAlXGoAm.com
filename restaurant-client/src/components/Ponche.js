import React, { useState } from 'react';

import DropDown from './x10DropDown';

const Refrescos = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const dessertOptions = [
        'Vaso',
        'Medio litro',
        'Litro'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('vaso');

    const handleDropdownChange = (e) => {
        setSelectedTamano(e.value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedValue={selectedTamano} onDropdownChange={handleDropdownChange} precios={[20, 30, 0]}/>
        </div>
    );
};

export default Refrescos;

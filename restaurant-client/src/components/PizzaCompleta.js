import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const Doriesquites = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const maruchanOptions = [
        'Hawaiana',
        'Pepperoni',
    ];
    const doritosOptions = [
        'Hawaiana',
        'Pepperoni',
    ];
    
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedMaruchan, setSelectedMaruchan] = useState('Hawaiana');

    const handleDropdownChangeMaruchan = (value) => {
        setSelectedMaruchan(value);
    };

    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('Hawaiana');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
            <h5>Mitad</h5> 
            <div>
                <DropDown opciones_in={maruchanOptions} selectedSabor={selectedMaruchan} onDropdownChange={handleDropdownChangeMaruchan} precios={[180, 180]}/>
            </div>
            <h5>Mitad</h5>
            <div>
                <DropDown opciones_in={doritosOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange}/>
            </div>
        </div>
    );
};

export default Doriesquites;

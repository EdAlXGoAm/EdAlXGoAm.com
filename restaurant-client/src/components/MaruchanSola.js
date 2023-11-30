import React, { useState } from 'react';

import DropDown from './x10DropDown';

const Doriesquites = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const maruchanOptions = [
        'Camarón',
        'Camarón Habanero',
        'Camarón Piquin',
        'Pollo',
        'Res'
    ];
    
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedMaruchan, setSelectedMaruchan] = useState('camarón');

    const handleDropdownChangeMaruchan = (e) => {
        setSelectedMaruchan(e.value);
    };

    return (
        <div>
            <div>
                <DropDown opciones_in={maruchanOptions} selectedValue={selectedMaruchan} onDropdownChange={handleDropdownChangeMaruchan} precios={[25, 25, 25, 25, 25]}/>
            </div>
        </div>
    );
};

export default Doriesquites;

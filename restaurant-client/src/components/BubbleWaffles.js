import React, { useState } from 'react';

import DropDown from './DropDown';
import ToogleButton_CheckButtons from './ToogleButton_CheckButtons';

const BubbleWaffles = ({ index, comanda, platillo, platillo_espacios, status }) => {
    const tamanoOptions = [
        'Brillitos',
        'Ferrero',
        'Unicornio',
        'Choco Fresa'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('$30 Mediano');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
            <div>
                <DropDown opciones_in={tamanoOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange} precios={[60, 70, 70, 70]}/>
            </div>
        </div>
    );
};

export default BubbleWaffles;

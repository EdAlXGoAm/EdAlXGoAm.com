import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const BubbleWaffles = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const tamanoOptions = [
        'Brillitos',
        'Ferrero',
        'Unicornio',
        'Choco Fresa'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedSaborWaffle, setselectedSaborWaffle] = useState('brillitos');

    const handleDropdownChange = (e) => {
        setselectedSaborWaffle(e.value);
    };

    return (
        <div>
            <div>
                <DropDown opciones_in={tamanoOptions} selectedValue={selectedSaborWaffle} onDropdownChange={handleDropdownChange} precios={[60, 70, 70, 70]}/>
            </div>
        </div>
    );
};

export default BubbleWaffles;

import React, { useState } from 'react';

import DropDown from './DropDown';
import ToogleButton_CheckButtons from './ToogleButton_CheckButtons';

const BubbleSodas = ({ index, comanda, platillo, platillo_espacios, status }) => {
    const proteinasOptions = [
        'Mora Azul',
        'Fresa',
        'Manzana Verde',
        'Kiwi',
    ];
    const crocantesOptions = [
        'Mora Azul',
        'Manzana Verde',
        'Chamoy'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedMaruchan, setSelectedMaruchan] = useState('Camarón');

    const handleDropdownChangeMaruchan = (value) => {
        setSelectedMaruchan(value);
    };

    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('$30 Mediano');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
        <div>
            <DropDown opciones_in={proteinasOptions} selectedSabor={selectedMaruchan} onDropdownChange={handleDropdownChangeMaruchan} precios={[55, 55, 55, 55]}/>
        </div>
            <div>
                <DropDown opciones_in={crocantesOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange}/>
            </div>
            
        </div>
    );
};

export default BubbleSodas;

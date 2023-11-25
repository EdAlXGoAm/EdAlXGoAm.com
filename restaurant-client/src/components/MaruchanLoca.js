import React, { useState } from 'react';

import DropDown from './DropDown';
import ToogleButton_CheckButtons from './ToogleButton_CheckButtons';

const Doriesquites = ({ index, comanda, platillo, platillo_espacios, status }) => {
    const maruchanOptions = [
        'Camarón',
        'Camarón Habanero',
        'Camarón Piquin',
        'Pollo',
        'Res'
    ];
    const doritosOptions = [
        'Nachos (Rojos)',
        'Diablo (Naranjas)',
        'Pizzerolas (Verdes)',
        'Incognita (Negros)',
        'Flaming Hot (Morados)',
        'Cheetos Naranjas',
        'Cheetos Flaming Hot'
    ];
    const aderezos = [
        'Mayonesa',
        'Q Rayado',
        'Q Amarillo',
        'Chile Piquin',
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
            <DropDown opciones_in={maruchanOptions} selectedSabor={selectedMaruchan} onDropdownChange={handleDropdownChangeMaruchan} precios={[55, 55, 55, 55, 55]}/>
        </div>
            <div>
                <DropDown opciones_in={doritosOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange}/>
            </div>
            
            <div className="row">
                <div className="col">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='aderezos' ingredientes_checkbutton={aderezos} despliegue='horizontal' />
                </div>
            </div>
        </div>
    );
};

export default Doriesquites;

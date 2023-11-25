import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const Donas = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const proteinasOptions = [
        'Lechera',
        'Mermelada',
        'Cajeta',
        'Nutella',
    ];
    const crocantesOptions = [
        'Fresas',
        'Durazno',
    ];
    const aderezos = [
        'Tutin',
        'Gotas Bicolor',
        'Gotas Blancas',
        'Oreo',
        'Lunetas',
        'Laposse'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedMaruchan, setSelectedMaruchan] = useState('Camarón');

    const handleDropdownChangeMaruchan = (value) => {
        setSelectedMaruchan(value);
    };

    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('$40 Orden');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
        <div>
            <DropDown opciones_in={proteinasOptions} selectedSabor={selectedMaruchan} onDropdownChange={handleDropdownChangeMaruchan} precios={[40, 40, 40, 40]}/>
        </div>
            <div>
                <DropDown opciones_in={crocantesOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange}/>
            </div>
            
            <div className="row">
                <div className="col">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='aderezos' ingredientes_checkbutton={aderezos} despliegue='horizontal' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                </div>
            </div>
        </div>
    );
};

export default Donas;

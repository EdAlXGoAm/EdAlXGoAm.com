import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const Doriesquites = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const doritosOptions = [
        'Dor. Nachos (Rojos)',
        'Dor. Diablo (Naranjas)',
        'Dor. Pizzerolas (Verdes)',
        'Dor. Incognita (Negros)',
        'Dor. Flaming Hot (Morados)',
        'Dor. Mix',
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
    const [selectedTamano, setSelectedTamano] = useState('$30 Mediano');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (
        <div>
            <div>
                <DropDown opciones_in={doritosOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange} precios={[35, 35, 35, 35, 35, 35, 35, 35]}/>
            </div>
            
            <div className="row">
                <div className="col">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='aderezos' ingredientes_checkbutton={aderezos} despliegue='horizontal' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                </div>
            </div>
        </div>
    );
};

export default Doriesquites;

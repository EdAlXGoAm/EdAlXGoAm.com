import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const Doriesquites = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const maruchanOptions = [
        'Camarón',
        'Camarón Habanero',
        'Camarón Piquin',
        'Pollo',
        'Res'
    ];
    const doritosOptions = [
        'Dor. Nachos (Rojos)',
        'Dor. Diablo (Naranjas)',
        'Dor. Pizzerolas (Verdes)',
        'Dor. Incognita (Negros)',
        'Dor. Flaming Hot (Morados)',
        'Dor. Mix',
        'Cheetos Naranjas',
        'Cheetos Flaming Hot',
        'Otros'
    ];
    const aderezos = [
        'Mayonesa',
        'Q Rayado',
        'Q Amarillo',
        'Chile Piquin',
    ];
    
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedMaruchan, setSelectedMaruchan] = useState('camarón');

    const handleDropdownChangeMaruchan = (e) => {
        setSelectedMaruchan(e.value);
    };

    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedDoritos, setselectedDoritos] = useState('dor._nachos_(rojos)');

    const handleDropdownChange = (e) => {
        setselectedDoritos(e.value);
    };

    return (
        <div>
        <div>
            <DropDown opciones_in={maruchanOptions} selectedValue={selectedMaruchan} onDropdownChange={handleDropdownChangeMaruchan} precios={[55, 55, 55, 55, 55]}/>
        </div>
            <div>
                <DropDown opciones_in={doritosOptions} selectedValue={selectedDoritos} onDropdownChange={handleDropdownChange}/>
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

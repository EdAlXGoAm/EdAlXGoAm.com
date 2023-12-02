import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const Dorilocos = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status, propiedadesComanda, handleUpdatePropiedadesComanda}) => {
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
        'Chamoy',
        'Tajin',
        'Valentina',
        'Botanera',
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedDoritos, setselectedDoritos] = useState('dor._nachos_(rojos)');

    const handleDropdownChange = (e) => {
        setselectedDoritos(e.value);
    };

    return (
        <div>
            <div>
                <DropDown opciones_in={doritosOptions} selectedValue={selectedDoritos} onDropdownChange={handleDropdownChange} precios={[30, 30, 30, 30, 30, 30, 30, 30, 30]}/>
            </div>
            
            <div className="row">
                <div className="col">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='aderezos' ingredientes_checkbutton={aderezos} despliegue='horizontal' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                </div>
            </div>
        </div>
    );
};

export default Dorilocos;

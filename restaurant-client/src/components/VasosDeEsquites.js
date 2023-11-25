import React, { useState } from 'react';

import DropDown from './DropDown';
import ToogleButton_CheckButtons from './ToogleButton_CheckButtons';

const VasosDeEsquites = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const tamanoOptions = [
        'Mediano',
        'Grande',
        '1 Litro',
    ];
    const aderezos = [
        'Mayonesa',
        'Q Rayado',
        'Chile Piquin',
        ''
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('$30 Mediano');

    const handleDropdownChange = (value) => {
        setSelectedTamano(value);
    };

    return (

        <div>
            <div>
                <DropDown opciones_in={tamanoOptions} selectedSabor={selectedTamano} onDropdownChange={handleDropdownChange} precios={[20, 25, 80]}/>
            </div>
            
            <div className="row">
                <div className="col">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='aderezos' ingredientes_checkbutton={aderezos} despliegue='horizontal' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                </div>
            </div>
        </div>
    );
};

export default VasosDeEsquites;

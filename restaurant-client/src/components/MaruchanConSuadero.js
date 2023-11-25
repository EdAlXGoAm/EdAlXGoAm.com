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
    const aderezos = [
        'Cebolla',
        'Cilantro',
        'Salsa de Tacos',
        ''
    ];
    
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedMaruchan, setSelectedMaruchan] = useState('Camarón');

    const handleDropdownChangeMaruchan = (value) => {
        setSelectedMaruchan(value);
    };

    return (
        <div>
            <div>
                <DropDown opciones_in={maruchanOptions} selectedSabor={selectedMaruchan} onDropdownChange={handleDropdownChangeMaruchan} precios={[45, 45, 45, 45, 45]}/>
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

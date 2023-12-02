import React, { useState } from 'react';

import DropDown from './x10DropDown';

const Malteadas = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status, propiedadesComanda, handleUpdatePropiedadesComanda}) => {
   
    //Malteada
    const dessertOptions = [
        'Fresa',
        'Vainilla',
        'Chocolate'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedSaborMalteada, setselectedSaborMalteada] = useState('fresa');

    const handleDropdownChange = (e) => {
        setselectedSaborMalteada(e.value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedValue={selectedSaborMalteada} onDropdownChange={handleDropdownChange} precios={[58, 58, 58]}/>
        </div>
    );
};

export default Malteadas;

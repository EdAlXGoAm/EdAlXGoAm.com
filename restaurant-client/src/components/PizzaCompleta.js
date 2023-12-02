import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const Doriesquites = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status, propiedadesComanda, handleUpdatePropiedadesComanda}) => {
    const mitad1Options = [
        'Pepperoni',
        'Mexicana',
    ];
    const mitad2Options = [
        'Pepperoni',
        'Mexicana',
    ];
    
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedMitad1, setselectedMitad1] = useState('pepperoni');

    const handleDropdownChangeMaruchan = (e) => {
        setselectedMitad1(e.value);
    };

    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedMitad2, setselectedMitad2] = useState('pepperoni');

    const handleDropdownChange = (e) => {
        setselectedMitad2(e.value);
    };

    return (
        <div>
            <h5>Mitad</h5> 
            <div>
                <DropDown opciones_in={mitad1Options} selectedValue={selectedMitad1} onDropdownChange={handleDropdownChangeMaruchan} precios={[180, 180]}/>
            </div>
            <h5>Mitad</h5>
            <div>
                <DropDown opciones_in={mitad2Options} selectedValue={selectedMitad2} onDropdownChange={handleDropdownChange}/>
            </div>
        </div>
    );
};

export default Doriesquites;

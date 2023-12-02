import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const BubbleSodas = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status, propiedadesComanda, handleUpdatePropiedadesComanda}) => {
    const jarabeOptions = [
        'Mora Azul',
        'Fresa',
        'Manzana Verde',
        'Kiwi',
        'Mango',
    ];
    const perlasOptions = [
        'Mora Azul',
        'Manzana Verde',
        'Chamoy'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedJarabe, setselectedJarabe] = useState('mora_azul');

    const handleDropdownChangeMaruchan = (e) => {
        setselectedJarabe(e.value);
    };

    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedPerlas, setselectedPerlas] = useState('mora_azul');

    const handleDropdownChange = (e) => {
        setselectedPerlas(e.value);
    };

    return (
        <div>
        <div>
            <DropDown opciones_in={jarabeOptions} selectedValue={selectedJarabe} onDropdownChange={handleDropdownChangeMaruchan} precios={[55, 55, 55, 55, 55]}/>
        </div>
            <div>
                <DropDown opciones_in={perlasOptions} selectedValue={selectedPerlas} onDropdownChange={handleDropdownChange}/>
            </div>
            
        </div>
    );
};

export default BubbleSodas;

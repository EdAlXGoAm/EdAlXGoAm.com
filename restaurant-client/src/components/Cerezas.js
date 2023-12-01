import React, { useState } from 'react';

import DropDown from './x10DropDown';

const Cerezas = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const dessertOptions = [
        'Vaso de Cerezas',
        'Vaso con Crema Batida'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedTamano, setSelectedTamano] = useState('vaso_de_cerezas');

    const handleDropdownChange = (e) => {
        setSelectedTamano(e.value);
    };

    return (
        <div>
            <DropDown opciones_in={dessertOptions} selectedValue={selectedTamano} onDropdownChange={handleDropdownChange} precios={[40, 45]}/>
        </div>
    );
};

export default Cerezas;

import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const Ensaladas = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const proteinasOptions = [
        'Pollo',
        'Atun',
        'Queso Panela'
    ];
    const crocantesOptions = [
        'Crotones',
        'Arandanos',
        'Ajonjoli',
        'Cacahuate'
    ];
    const aderezos = [
        'Miel con Mostaza',
        'Tamarindo'
    ];
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedProteina, setselectedProteina] = useState('pollo');

    const handleDropdownChangeMaruchan = (e) => {
        setselectedProteina(e.value);
    };

    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedCrocante, setselectedCrocante] = useState('crotones');

    const handleDropdownChange = (e) => {
        setselectedCrocante(e.value);
    };

    return (
        <div>
        <div>
            <DropDown opciones_in={proteinasOptions} selectedValue={selectedProteina} onDropdownChange={handleDropdownChangeMaruchan} precios={[45, 45, 45]}/>
        </div>
            <div>
                <DropDown opciones_in={crocantesOptions} selectedValue={selectedCrocante} onDropdownChange={handleDropdownChange}/>
            </div>
            
            <div className="row">
                <div className="col">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='aderezos' ingredientes_checkbutton={aderezos} despliegue='horizontal' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                </div>
            </div>
        </div>
    );
};

export default Ensaladas;

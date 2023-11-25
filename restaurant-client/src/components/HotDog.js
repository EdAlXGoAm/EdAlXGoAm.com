import React, { useState } from 'react';

import DropDown from './DropDown';
import ToogleButton_CheckButtons from './ToogleButton_CheckButtons';

const HotDog = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const pizzaOptions = [
        'Sencillo',
        'Q Oaxaca',
        'Q Manchego',
        'Especial'
    ];
    
    const vegetales = [
        'Jitomate',
        'Cebolla',
        'Chiles',
        ''
    ];
    const aderezos = [
        'Mayonesa',
        'Catsup',
        'Mostaza',
        ''
    ];

    const ingredientes_papas_opcional = [
        'Q Amarillo',
        'Mayonesa',
        'Catsup',
        'Valentina',
    ];
    
    
    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedMaruchan, setSelectedMaruchan] = useState('Camarón');

    const handleDropdownChangeMaruchan = (value) => {
        setSelectedMaruchan(value);
    };

    const [hide_show_toggle, setToggleChecked] = useState(false);
    const [hide_show_display, setToggleDisplay] = useState('none');

    const handleToggleChange = () => {
        if (hide_show_toggle) {
            setToggleDisplay('none');
        }
        else {
            setToggleDisplay('block');
        }
        setToggleChecked(!hide_show_toggle);
    };
    const hide_show_style = {
        display: hide_show_display,
    }

    const inputId = `togglePapas_${index}`;

    return (
        <div>
            <div>
                <DropDown opciones_in={pizzaOptions} selectedSabor={selectedMaruchan} onDropdownChange={handleDropdownChangeMaruchan} precios={[30, 38, 38, 45]}/>
            </div>
            
            
            <div className="row">
                <div className="col">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='vegetales' ingredientes_checkbutton={vegetales} despliegue='horizontal' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                </div>
                </div>
            <div className="row">
                <div className="col">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='aderezos' ingredientes_checkbutton={aderezos} despliegue='horizontal' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col">
                    <div className="custom-control custom-switch">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id={inputId}
                            checked={hide_show_toggle} // Global Variable
                            onChange={handleToggleChange} // Event
                        />
                        <label className="custom-control-label" htmlFor={inputId}>Con papas</label>
                    </div>
                </div>
            </div>
            <div style={hide_show_style}>
                <div className="row">
                    <div className="col-6">
                        <img src="papas.png" alt="Papas Fritas"className="img-fluid" style={{ width: '150px' }}></img>
                    </div>
                    <div className="col-6">
                        <ToogleButton_CheckButtons index={index} platillo='Papas' tipo_ingrediente='aderezos' ingredientes_checkbutton={ingredientes_papas_opcional} despliegue='vertical' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotDog;

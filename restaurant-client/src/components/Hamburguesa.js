import React, { useState } from 'react';

import DropDown from './x10DropDown';
import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';
import IngredientesAndQuesos from './x13IngredientesAndQuesos';
// Component Hamburguesa
const Hamburguesa = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const opcionesDosDimensiones = [
        ['Sencilla',
            [
                'Carne',
                'Amarillo'
            ]
        ],
        ['Suiza',
            [
                'Jamón, ',
                'Amarillo, Oaxaca'
            ]
        ],
        ['Gringa',
            [
                'Jamón, Chorizo',
                'Amarillo, Oaxaca'
            ]
        ],
        ['Hawaiana',
            [
                'Jamón, Píña',
                'Amarillo, Oaxaca'
            ]
        ],
        ['Rusa',
            [
                'Tocino, Piña',
                'Manchego, '
            ]
        ],
        ['Chilena',
            [
                'Jamón, Tocino',
                'Oaxaca, '
            ]
        ],
        ['Inglesa',
            [
                'Chorizo, Piña',
                'Oaxaca, '
            ]
        ],
        ['Italiana',
            [
                'Chorizo, Tocino',
                'Manchego, '
            ]
        ],
        ['Francesa',
            [
                'Tocino, Piña',
                'Oaxaca, '
            ]
        ],
        ['Española',
            [
                'Salchicha, Tocino',
                'Oaxaca, '
            ]
        ],
        ['Doble Carne',
            [
                'Dos Carnes',
                'Q a Elegir'
            ]
        ],
        ['Cubana',
            [
                'Dos Carnes, Jamón, Piña, Tocino',
                'Amarillo, Oaxaca, Manchego'
            ]
        ],
        ['Pardo Especial (Dos carnes)',
            [
                'Jamón, Tocino, Chorizo, Salchicha',
                'Piña, Amarillo, Oaxava, Manchego'
            ]
        ]
    ];
    const drop_down_opciones = opcionesDosDimensiones.map(par => par[0]);
    const ingredientesPorSabor = {};

    opcionesDosDimensiones.forEach(opcion => {
        const sabor = opcion[0].toLowerCase().replace(/\s/g, '_');
        const ingredientes = opcion[1];
        ingredientesPorSabor[`array_${sabor}`] = ingredientes;
    });

    const vegetales = [
        'Lechuga',
        'Jitomate',
        'Cebolla Caramelizada'
    ];
    
    const aderezos = [
        'Mayonesa',
        'Mostaza',
        'Catsup',
        'Chiles'
    ];

    const ingredientes_papas_opcional = [
        'Q Amarillo',
        'Mayonesa',
        'Catsup',
        'Valentina',
    ];

    // Estado para almacenar el valor seleccionado del dropdown
    const [selectedSabor, setSelectedSabor] = useState('sencilla');

    const handleDropdownChange = (e) => {
        setSelectedSabor(e.value);
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <DropDown opciones_in={drop_down_opciones} selectedValue={selectedSabor} onDropdownChange={handleDropdownChange}      precios={[ 47, 57, 60, 60, 60, 60, 60, 60, 60, 70, 75, 100, 120]}
                                                                                                                                    precios_papas={[ 67, 77, 80, 80, 80, 80, 80, 80, 80, 90, 95, 120, 140]} hide_show_toggle={hide_show_toggle} setToggleChecked={setToggleChecked}/>
                    <IngredientesAndQuesos selectedSabor={selectedSabor} ingredientesPorSabor={ingredientesPorSabor} />
                </div>
                <div className="col-6">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='vegetales' ingredientes_checkbutton={vegetales} despliegue='vertical' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                </div>
            </div>
            <hr />
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

export default Hamburguesa;
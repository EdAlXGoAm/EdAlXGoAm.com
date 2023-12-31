import React, { useState } from 'react';

import DropDown from './DropDown';
import ToogleButton_CheckButtons from './ToogleButton_CheckButtons';
import IngredientesAndQuesos from './IngredientesAndQuesos';
// Component Hamburguesa
const Hamburguesa = ({ index }) => {
    const opcionesDosDimensiones = [
        ['Sencilla',
            [
                'Carne, , , , ',
                'Amarillo, , , , '
            ]
        ],
        ['Suiza',
            [
                'Jamón, , , , ',
                'Amarillo, Oaxaca, , , '
            ]
        ],
        ['Gringa',
            [
                'Jamón, Chorizo, , , ',
                'Amarillo, Oaxaca, , , '
            ]
        ],
        ['Hawaiana',
            [
                'Jamón, Píña, , , ',
                'Amarillo, Oaxaca, , , '
            ]
        ],
        ['Rusa',
            [
                'Tocino, Piña, , , ',
                'Manchego, , , , '
            ]
        ],
        ['Chilena',
            [
                'Jamón, Tocino, , , ',
                'Oaxaca, , , , '
            ]
        ],
        ['Inglesa',
            [
                'Chorizo, Piña, , , ',
                'Oaxaca, , , , '
            ]
        ],
        ['Italiana',
            [
                'Chorizo, Tocino, , , ',
                'Manchego, , , , '
            ]
        ],
        ['Francesa',
            [
                'Tocino, Piña, , , ',
                'Oaxaca, , , , '
            ]
        ],
        ['Española',
            [
                'Salchicha, Tocino, , , ',
                'Oaxaca, , , , '
            ]
        ],
        ['Doble Carne',
            [
                'Dos Carnes, , , , ',
                'Q a Elegir, , , , '
            ]
        ],
        ['Cubana',
            [
                'Dos Carnes, Jamón, Piña, Tocino, , ',
                'Amarillo, Oaxaca, Manchego, , '
            ]
        ],
        ['Pardo Especial (Dos carnes)',
            [
                'Jamón, Tocino, Chorizo, Salchicha, ',
                'Piña, Amarillo, Oaxava, Manchego, '
            ]
        ],
    ];
    const drop_down_opciones = opcionesDosDimensiones.map(par => par[0]);
    const ingredientesPorSabor = {};

    opcionesDosDimensiones.forEach(opcion => {
        const sabor = opcion[0].toLowerCase().replace(/\s/g, '_');
        const ingredientes = opcion[1];
        ingredientesPorSabor[`array_${sabor}`] = ingredientes;
    });

    const ingredientes_hamburguesa_opcional = [
        'Lechuga',
        'Jitomate',
        'Cebolla Caramelizada',
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

    const handleDropdownChange = (value) => {
        setSelectedSabor(value);
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
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <DropDown opciones_in={drop_down_opciones} selectedSabor={selectedSabor} onDropdownChange={handleDropdownChange} />
                    <IngredientesAndQuesos selectedSabor={selectedSabor} ingredientesPorSabor={ingredientesPorSabor} />
                </div>
                <div className="col-6">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' ingredientes_checkbutton={ingredientes_hamburguesa_opcional} />
                </div>
            </div>
            <div className="row">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <div className="custom-control custom-switch mb-3">
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
                    <div className="row" style={hide_show_style}>
                        <div className="col-6">
                            <img src="papas.png" alt="Papas Fritas"className="img-fluid" style={{ width: '50px' }}></img>
                        </div>
                        <div className="col-6">
                            <ToogleButton_CheckButtons index={index} platillo='Papas' ingredientes_checkbutton={ingredientes_papas_opcional} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Hamburguesa;
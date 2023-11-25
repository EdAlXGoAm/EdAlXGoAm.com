import React, { useState } from 'react';

import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const PapasALaFrancesa = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const Label = ["$40 Orden"];
    const aderezos = [
        'Q Amarillo',
        'Mayonesa',
        'Catsup',
        'Valentina'
    ];
    return (
        <div>
            <div className="row">
                <div className="col">
                    <label htmlFor="PapasALaFrancesa"  style={{ fontWeight: 'bold', fontSize: '22px', border: '1px solid #2d2d2d', borderRadius: '15px', padding: '15px', width: '100%'
                }}>{Label}</label>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ToogleButton_CheckButtons index={index} platillo='Burguer' tipo_ingrediente='aderezos' ingredientes_checkbutton={aderezos} despliegue='horizontal' toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status} />
                </div>
            </div>
        </div>
    );
};

export default PapasALaFrancesa;

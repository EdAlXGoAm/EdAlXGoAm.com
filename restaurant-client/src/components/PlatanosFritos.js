import React, { useState } from 'react';

import ToogleButton_CheckButtons from './x11ToogleButton_CheckButtons';

const PlatanosFritos = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status, propiedadesComanda, handleUpdatePropiedadesComanda}) => {
    
    const aderezos = [
        'Crema',
        'Lechera',
        'Mermelada',
        'Chispas'
    ];
    const Label = ["$40 Orden"];
    
    return (
        <div>
            <div className="row">
                <div className="col">
                    <label htmlFor="PlatanosFritos"  style={{ fontWeight: 'bold', fontSize: '22px', border: '1px solid #2d2d2d', borderRadius: '15px', padding: '15px', width: '100%'
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

export default PlatanosFritos;

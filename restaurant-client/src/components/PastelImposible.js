import React, { useState } from 'react';


const PastelImposible = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const Label = ["$50 Rebanada"];
    
    return (
        <div>
            <div className="row">
                <div className="col">
                    <label htmlFor="PastelImposible"  style={{ fontWeight: 'bold', fontSize: '30px', border: '1px solid #2d2d2d', borderRadius: '15px', padding: '15px', width: '100%'
                }}>{Label}</label>
                </div>
            </div>
        </div>
    );
}

export default PastelImposible;

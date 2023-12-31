import React, { useState } from 'react';


const PayDeLimón = ({ index, comanda, platillo, platillo_espacios, toggleChecked_Status, setToggleChecked_Status }) => {
    const Label = ["$40 Rebanada"];
    
    return (
        <div>
            <div className="row">
                <div className="col">
                    <label htmlFor="PayDeLimón"  style={{ fontWeight: 'bold', fontSize: '22px', border: '1px solid #2d2d2d', borderRadius: '15px', padding: '15px', width: '100%'
                }}>{Label}</label>
                </div>
            </div>
        </div>
    );
};

export default PayDeLimón;

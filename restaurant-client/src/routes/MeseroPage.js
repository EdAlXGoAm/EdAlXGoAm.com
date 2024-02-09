import './MeseroPage.css';
import React, { useState } from 'react';
import OrdersInterface from '../components/MeseroPage/OrdersInterface';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const MeseroPage = ({ modeInterface }) => {

    return (
    <div className="App">
        <div className="container-fluid">
            {/* Row with Switch Button */}
            <div className="row">
                <div className="col">
                {modeInterface ? (
                    <h2 style={{color:"#ffffff"}}>Mesero</h2>
                ) : (
                    <h2 style={{color:"#ffffff"}}>Cocina</h2>
                )
                }
                </div>
            </div>
            <div className="row">
                <div className="col">
                <OrdersInterface modeInterface={modeInterface} />
                </div>
            </div>
        </div>
    </div>
    )
}

export default MeseroPage;
import './MeseroPage.css';
import React, { useState } from 'react';
import OrdersInterface from '../components/MeseroPage/OrdersInterface';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const MeseroPage = () => {
    const [modeInterface, setModeInterface] = useState(true);
    const handleModeInterface = () => {
        setModeInterface(!modeInterface);
    };

    return (
    <div className="App">
        <div className="container-fluid">
            {/* Row with Switch Button */}
            <div className="row">
                <div className="col">
                <BootstrapSwitchButton
                    checked={modeInterface} onChange={handleModeInterface}
                    onlabel='Mesero' offlabel='Cocina'
                    width={100}/>
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
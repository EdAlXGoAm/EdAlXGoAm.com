import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import ShowComandasInterface from './components/comandas/ShowComandasInterface';
import io from 'socket.io-client';

import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// proxy configured in package.json
const socket = io("http://localhost:3001");

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {

  const [toggleChecked_CocinaMesero, setToggleChecked_CocinaMesero] = useState(false);

  const handleToggleChange_CocinaMesero = () => {
    setToggleChecked_CocinaMesero(!toggleChecked_CocinaMesero);
  };

  const numButtons = 1; // número de botones a crear
  const buttonColors = ["lightblue", "lightgreen"]; // colores de los botones

  // crear los elementos de JSX para los botones
  const buttons = [];
  for (let i = 0; i < numButtons; i++) {
    const color = buttonColors[i % buttonColors.length];
    buttons.push(
      <div key={i} className="col-xl-2 d-flex justify-content-center" style={{backgroundColor: color}}>
        <div className="card"
          style={{
            width: "100%",
            margin: "10px",
            padding: "10px",
            border: "1px solid black",
            borderRadius: "10px"}}>
          <div className="row mb-3">
            <div className='col' style={{ display: 'flex', justifyContent: 'space-between' }}> {/* row for the fold button and the lock button */}
              <button className="btn btn-primary">Nuevo Pedido</button>
              <button className="btn btn-primary">Nuevo Pedido</button>
            </div>
          </div>
          <div className="row mb-3">
            <div className='col' style={{ display: 'flex', justifyContent: 'space-between' }}> {/* row for the fold button and the lock button */}
              <button className="btn btn-primary">Nuevo Pedido</button>
              <button className="btn btn-primary">Nuevo Pedido</button>
            </div>
          </div>
          <div className="row mb-3">
            <div className='col'>
              <div className="comanda" 
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1px solid black",
                  borderRadius: "10px"
                }}>
                <div className="card-body">
                  <button className="btn btn-primary">Nuevo Pedido</button>
                  <h5 className="card-title">Comanda</h5>
                  <p className="card-text">Comanda de prueba</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1>Comandas</h1>
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "black" }}>
          {buttons} {/* renderizar los botones */}
        </div>

        <div className="row justify-content-center">
          <div className="col-12"> <ShowComandasInterface cocina_mesero_switch={toggleChecked_CocinaMesero} /> </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

root.render(<App />);
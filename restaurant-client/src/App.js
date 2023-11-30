import React, { useState } from 'react';
// import io from 'socket.io-client';

import ShowComandasInterface from './components/x01ShowComandasInterface';

import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// proxy configured in package.json
// const socket = io("http://localhost:3001");

const App = () => {

  
  
  const App_Styles = {
    textAlign: "center",
  };

  const [toggleChecked_CocinaMesero, setToggleChecked_CocinaMesero] = useState(false);
  const handleToggleChange_CocinaMesero = () => {
    setToggleChecked_CocinaMesero(!toggleChecked_CocinaMesero);
  };

  return (
    <div className="App" style={App_Styles}>
      <div className="container-fluid">
        {/* Row with Switch Button */}
        <div className="row">
            <div className="col">
            <BootstrapSwitchButton
                checked={toggleChecked_CocinaMesero}
                onlabel='Mesero'
                offlabel='Cocina'
                width={100}
                onChange={handleToggleChange_CocinaMesero}
            />
            </div>
        </div>
        <div className="row">
            <div className="col">
            <ShowComandasInterface cocina_mesero_switch={toggleChecked_CocinaMesero}/>
            </div>
        </div>
      </div>
    </div>

  );
}


export default App;

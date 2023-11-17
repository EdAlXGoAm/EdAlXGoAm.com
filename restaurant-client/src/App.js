import React, { useState } from 'react';
import io from 'socket.io-client';

import ShowComandasInterface from './components/ShowComandasInterface';

import BootstrapSwitchButton from 'bootstrap-switch-button-react';

// proxy configured in package.json
const socket = io("http://localhost:3001");

const App = () => {

  const example1 = [
    {
      "OrderID": 1,
      "Customer": "",
      "CuentaTotal": 0,
      "ComandasList": [
        {
          "ComandaID": 1,
          "UniqueID": "1_1",
          "Platillo": "DobleCarne",
          "Propiedades": [
            ["Sencilla",
              [
                'Carne',
                'Amarillo'
              ]
            ],
            [
              ["Lechuga", true],
              ["Tomate", true],
              ["Cebolla", true],
            ],
            [
              ["Mayonesa", true],
              ["Mostaza", true],
              ["Catsup", true],
              ["Chiles", true],
            ],
            [
              ["Papas a la Francesa", true],
              ["Mayonesa", true],
              ["Mostaza", true],
              ["Catsup", true],
              ["valentina", true],
            ]
          ],
          "Precio": 50,
          "Status": "Preparando",
        },
        {
          "ComandaID": 2,
          "UniqueID": "1_2",
          "Platillo": "Hamburguesa",
          "Propiedades": [
            ["Hawaiana",
              [
                'Jamón, Píña',
                'Amarillo, Oaxaca'
              ]
            ],
            [
              ["Lechuga", true],
              ["Tomate", false],
              ["Cebolla", true],
            ],
            [
              ["Mayonesa", true],
              ["Mostaza", true],
              ["Catsup", true],
              ["Chiles", true],
            ],
            [
              ["Papas a la Francesa", true],
              ["Mayonesa", true],
              ["Mostaza", true],
              ["Catsup", true],
              ["valentina", true],
            ]
          ],
          "Precio": 50,
          "Status": "Preparando",
        }
      ]
    },
    {
      "OrderID": 2,
      "Customer": "",
      "CuentaTotal": 0,
      "ComandasList": [
        {
          "ComandaID": 1,
          "UniqueID": "2_1",
          "Platillo": "Hamburguesa",
          "Propiedades": [
            ["Sencilla",
              [
                'Carne',
                'Amarillo'
              ]
            ],
            [
              ["Lechuga", true],
              ["Tomate", true],
              ["Cebolla", true],
            ],
            [
              ["Mayonesa", true],
              ["Mostaza", true],
              ["Catsup", true],
              ["Chiles", true],
            ],
            [
              ["Papas a la Francesa", true],
              ["Mayonesa", true],
              ["Mostaza", true],
              ["Catsup", true],
              ["valentina", true],
            ]
          ],
          "Precio": 50,
          "Status": "Preparando",
        },
        {
          "ComandaID": 2,
          "UniqueID": "2_2",
          "Platillo": "Hamburguesa",
          "Propiedades": [
            ["Hawaiana",
              [
                'Jamón, Píña',
                'Amarillo, Oaxaca'
              ]
            ],
            [
              ["Lechuga", true],
              ["Tomate", false],
              ["Cebolla", true],
            ],
            [
              ["Mayonesa", true],
              ["Mostaza", true],
              ["Catsup", true],
              ["Chiles", true],
            ],
            [
              ["Papas a la Francesa", true],
              ["Mayonesa", true],
              ["Mostaza", true],
              ["Catsup", true],
              ["valentina", true],
            ]
          ],
          "Precio": 50,
          "Status": "Preparando",
        }
      ]
    }
  ];
  
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
            <ShowComandasInterface cocina_mesero_switch={toggleChecked_CocinaMesero} orders_collection={example1}/>
            </div>
        </div>
      </div>
    </div>

  );
}

export default App;

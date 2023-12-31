import React, { useState, useEffect } from 'react';

import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Postre from './Postre';
import PayDeLimón from './PayDeLimon';
import PastelImposible from './PastelImposible';
import VasosDeEsquites from './VasosDeEsquites';
import Doriesquites from './Doriesquites';
import MaruchanLoca from './MaruchanLoca';
import MaruchanConSuadero from './MaruchanConSuadero';
import PapasALaFrancesa from './PapasALaFrancesa';
import RebanadaDePizza from './RebanadaDePizza';
import HotDog from './HotDog';
import Sincronizadas from './Sincronizadas';
import Ensaladas from './Ensaladas';
import AlitasBBQ from './AlitasBbq';
import Hamburguesa from './Hamburguesa';
import BubbleWaffles from './BubbleWaffles';
import Donas from './Donas';
import Frappés from './Frappes';
import Malteadas from './Malteadas';
import Esquimos from './Esquimos';
import Cafés from './Cafes';
import BubbleSodas from './BubbleSodas';
import BombasDeChocolate from './BombasDeChocolate';
import AguasFrescas from './AguasFrescas';
import Refrescos from './Refrescos';
// Component Comanda
const Comanda = ({ index, comanda, platillo, platillo_espacios, lock }) => {
  const [toggleChecked_LlevarAqui, setToggleChecked_LlevarAqui] = useState(false);
  const handleToggleChange_LlevarAqui = () => {
    setToggleChecked_LlevarAqui(!toggleChecked_LlevarAqui);
  };
  const [toggleChecked_Status, setToggleChecked_Status] = useState(false);
  const handleToggleChange_Status = () => {
    setToggleChecked_Status(!toggleChecked_Status);
  };
  const [toggleChecked_Comment, setToggleChecked_Comment] = useState(false);
  const handleToggleChange_Comment = () => {
    setToggleChecked_Comment(!toggleChecked_Comment);
  };
  const ComandaStyleFondo = {
    margin: '0px 10px 10px 10px',
  };
  const ComandaStyleText = {
    fontSize: "20px",
    color: toggleChecked_Status ? '#fff' : '#000',
    backgroundColor: toggleChecked_Status ? '#2d2d2d' : '#00ff04', // Color de fondo pastel
    borderRadius: '40px',       // Bordes redondeados
    padding: '0px 10px',       // Padding para no pegar el texto a los bordes
    margin: '0px 10px 0px 10px',
    
  };
  const divStyle = {
    fontWeight: 'bold',
    border: toggleChecked_Status ? '10px solid #2d2d2d' : '10px solid #FF2559',
    borderRadius: '15px',
    padding: '15px',
  }
  const id = 0;
  const día = '09 Nov 2023';
  const status = 'Preparando';

  return (
        <div className="card-body mb-3" style={divStyle}>
          <div className="row mb-3">
            <div className='col'>
              <div className='row mb-2'>
                <div className='col-12'>
                  <h1 className="title" style={ComandaStyleText}>{platillo}</h1>
                </div>
              </div>
              <div className='row'>
                <div className="col-3">
                  <BootstrapSwitchButton
                      checked={toggleChecked_LlevarAqui}
                      onlabel='Aqui'
                      offlabel='Llevar'
                      width={100}
                      onChange={handleToggleChange_LlevarAqui}
                  />
                </div>
                <div className="col-3">
                    <img src="icons/Aqui.png" alt="icon"className="img-fluid" style={{ width: '40px',  display: toggleChecked_LlevarAqui ? 'flex' : 'none'}}></img>
                    <img src="icons/Llevar.png" alt="icon"className="img-fluid" style={{ width: '40px',  display: !toggleChecked_LlevarAqui ? 'flex' : 'none'}}></img>
                </div>
                <div className="col-3">
                  <BootstrapSwitchButton
                      checked={toggleChecked_Status}
                      onlabel='Entregada'
                      offlabel='Preparando'
                      width={100}
                      onChange={handleToggleChange_Status}
                  />
                </div>
                <div className="col-3">
                  <BootstrapSwitchButton
                      checked={toggleChecked_Comment}
                      onlabel='Nota'
                      offlabel='Nota'
                      width={100}
                      onChange={handleToggleChange_Comment}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{display: toggleChecked_Status && lock ? 'none' : 'flex'}}>
            <div className='col'>
              {/* const BUTTON_NAMES_DEFAULT = [
                  ["Postre", true, [0, 30, 35, 40]],
                  ["Pay de Limón", true, [0, 40]],
                  ["Pastel Imposible", true, [0, 40]],
                  ["Vasos de Esquites", true, [0, 20, 25, 75]],
                  ["Doriesquites", true, [0, 35]],
                  ["Maruchan Loca", true, [0, 55]],
                  ["Maruchan con Suadero", true, [0, 45]],
                  ["Papas a la Francesa", true, [0, 40]],
                  ["Rebanada de Pizza", true, [0, 25]],
                  ["Hot Dog", true, [0, 30, 38, 45]],
                  ["Sincronizadas", true, [0, 45]],
                  ["Ensaladas", true, [0, 45]],
                  ["Alitas BBQ", true, [0, 80]],
                  ["Hamburguesas", true, [0, 47, 57, 60, 60, 60, 60, 60, 60, 60, 70, 75, 100, 120]],
                  ["Bubble Waffles", true, [0, 60, 70, 70, 70]],
                  ["Donas", true, [0, 40]],
                  ["Frappés", true, [0, 48, 48, 48, 48, 48, 68, 68, 68, 68, 68]],
                  ["Malteadas", true, [0, 58, 58, 58]],
                  ["Esquimos", true, [0, 25, 25, 25, 25, 30, 30]],
                  ["Cafés", true, [0, 15, 20, 15, 25]],
                  ["Bubble Sodas", true, [0, 55]],
                  ["Bombas de Chocolate", true, [0, 45]],
                  ["Aguas Frescas", true, [25, 50]],
                  ["Refrescos", true, [0, 20, 20]],
                  ]; */}
              {/* Si buttonValue == 'Postre, desplegar Componente Postre */}
              {platillo == 'Postre' && <Postre key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Pay de Limón, desplegar Componente Pay de Limón */}
              {platillo == 'PayDeLimón' && <PayDeLimón key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Pastel Imposible, desplegar Componente Pastel Imposible */}
              {platillo == 'PastelImposible' && <PastelImposible key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Vasos de Esquites, desplegar Componente Vasos de Esquites */}
              {platillo == 'VasosDeEsquites' && <VasosDeEsquites key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Doriesquites, desplegar Componente Doriesquites */}
              {platillo == 'Doriesquites' && <Doriesquites key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Maruchan Loca, desplegar Componente Maruchan Loca */}
              {platillo == 'MaruchanLoca' && <MaruchanLoca key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Maruchan con Suadero, desplegar Componente Maruchan con Suadero */}
              {platillo == 'MaruchanConSuadero' && <MaruchanConSuadero key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Papas a la Francesa, desplegar Componente Papas a la Francesa */}
              {platillo == 'PapasALaFrancesa' && <PapasALaFrancesa key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Rebanada de Pizza, desplegar Componente Rebanada de Pizza */}
              {platillo == 'RebanadaDePizza' && <RebanadaDePizza key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Hot Dog, desplegar Componente Hot Dog */}
              {platillo == 'HotDog' && <HotDog key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Sincronizadas, desplegar Componente Sincronizadas */}
              {platillo == 'Sincronizadas' && <Sincronizadas key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Ensaladas, desplegar Componente Ensaladas */}
              {platillo == 'Ensaladas' && <Ensaladas key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Alitas BBQ, desplegar Componente Alitas BBQ */}
              {platillo == 'AlitasBbq' && <AlitasBBQ key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Hamburguesa, desplegar Componente Hamburguesa */}
              {platillo == 'Hamburguesas' && <Hamburguesa key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Bubble Waffles, desplegar Componente Bubble Waffles */}
              {platillo == 'BubbleWaffles' && <BubbleWaffles key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Donas, desplegar Componente Donas */}
              {platillo == 'Donas' && <Donas key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Frappés, desplegar Componente Frappés */}
              {platillo == 'Frappés' && <Frappés key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Malteadas, desplegar Componente Malteadas */}
              {platillo == 'Malteadas' && <Malteadas key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Esquimos, desplegar Componente Esquimos */}
              {platillo == 'Esquimos' && <Esquimos key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Cafés, desplegar Componente Cafés */}
              {platillo == 'Cafés' && <Cafés key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Bubble Sodas, desplegar Componente Bubble Sodas */}
              {platillo == 'BubbleSodas' && <BubbleSodas key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Bombas de Chocolate, desplegar Componente Bombas de Chocolate */}
              {platillo == 'PlatanosFritos' && <BombasDeChocolate key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Aguas Frescas, desplegar Componente Aguas Frescas */}
              {platillo == 'AguasFrescas' && <AguasFrescas key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}
              {/* Si buttonValue == 'Refrescos, desplegar Componente Refrescos */}
              {platillo == 'Refrescos' && <Refrescos key={index} index={index} comanda={comanda} platillo={platillo} toggleChecked_Status={toggleChecked_Status} setToggleChecked_Status={setToggleChecked_Status}/>}

            </div>
          </div>
          <div className="row" style={{display: !toggleChecked_Comment ? 'none' : 'flex'}}>
            <div className='col'>
              {/* Text box editable backgroudn red and text blanco BOLD */}
              <div className='row'>
                <div className='col'>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Agregar notas"
                  style={{backgroundColor: '#FF2559', color: '#fff', fontWeight: 'bold', fontSize: '20px'
                }}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Comanda;
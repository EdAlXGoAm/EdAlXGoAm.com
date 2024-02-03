import './ComandaCard.css';
import React, { useState, useEffect } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import DetailsComanda from './DetailsComandaComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const ComandaCard = ({modeInterface, Comanda, updateComanda, removeComanda}) => {

    const [nota, setNota] = useState('');
    const [liveStatusNota, setLiveStatusNota] = useState('#33d457')

    const handleUpdateComandaPaidStatus = () => {
        const updatedComanda = {
            ...Comanda,
            ComandaPaidStatus: Comanda.ComandaPaidStatus === "Pending" ? "Paid" : "Pending"
        }
        console.log("newComanda after UpdateComandaPaidStatus: ", updatedComanda);
        updateComanda(updatedComanda);
    };

    const handleUpdateComandaPrepStatus = () => {
        const updatedComanda = {
            ...Comanda,
            ComandaPrepStatus: Comanda.ComandaPrepStatus === "Preparing" ? "Served" : "Preparing"
        }
        console.log("newComanda after UpdateComandaPaidStatus: ", updatedComanda);
        updateComanda(updatedComanda);
    };

    const handleUpdateComandaDeliverMode = () => {
        const updatedComanda = {
            ...Comanda,
            ComandaDeliverMode: Comanda.ComandaDeliverMode === "Delivery" ? "Table-0" : "Delivery"
        }
        console.log("newComanda after UpdateComandaDeliverMode: ", updatedComanda);
        updateComanda(updatedComanda);
    };

    const handleUpdateComandaSwitchNota = () => {
        const updatedComanda = {
            ...Comanda,
            ComandaSwitchNota: !Comanda.ComandaSwitchNota
        }
        console.log("newComanda after UpdateComandaSwitchNota: ", updatedComanda);
        updateComanda(updatedComanda);
    };

    const handleChangeNota = (event) => {
        setNota(event.target.value);
      };

    const handleUpdateNota = (event) => {
        if (event.key === 'Enter') {
            const updatedComanda = {
                ...Comanda,
                Notas: nota
            }
            console.log("liveStatusNota: ", liveStatusNota);
            updateComanda(updatedComanda);
            setLiveStatusNota('#33d457')
        }
        else {
            setLiveStatusNota('#ff69b4')
        }
    };
    const fetchNota = () => {
        setNota(Comanda.Notas);
    };

    useEffect(() => {
        fetchNota();
    },[])
    const [toggleArrowStatus, setToggleArrowStatus] = useState(true); // false: plegado, true: desplegado

    const [colorStatus, setColorStatus] = useState('#ffffff');

    useEffect(() => {
        if (Comanda.ComandaPrepStatus === "Served") {
            setToggleArrowStatus(false);
            setColorStatus("#00ff6e");
        }
        else {
            setToggleArrowStatus(true);
            setColorStatus("#ffffff");
        }
    },[Comanda]);

    return(
        <div className="row"><div className="col-12">
            <div className="card-body mb-1 divStyle" style={{backgroundColor: colorStatus}}>
            <div className="row mb-3">
                <div className='col'>
                <div className='row mb-2' style={{padding: "0px 20px"}}>
                    <div className="toggleArrowButtons">
                        <button style={{backgroundColor:  toggleArrowStatus ? "#7ed65b" : "#ffffff"}} onClick={() => setToggleArrowStatus(!toggleArrowStatus)}>
                            <FontAwesomeIcon style={{color: toggleArrowStatus ? "#ffffff" : "#5d5d5d"}} icon={toggleArrowStatus ? faAngleUp : faAngleDown} size="2x" />
                        </button>
                    </div>
                        <div className="faButton ml-auto" onClick={() => removeComanda(Comanda)} style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faTrash} style={{color: 'red'}} size="xl" />
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-2'>
                    <img src={Comanda.Imagen} alt="icon"className="img-fluid" style={{ width: '60px'}}></img>
                    </div>
                    <div className="col-8 d-flex align-items-center personalizarTitle">
                        <h2 className="title comandaTextStyle">{Comanda.Platillo}&nbsp;&nbsp;<span style={{textShadow: "0px 0px 10px red"}}>${Comanda.Precio}</span></h2>
                    </div>
                    <div className='col-2'>
                    <img src={Comanda.Imagen} alt="icon"className="img-fluid" style={{ width: '60px'}}></img>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-3">
                        <BootstrapSwitchButton checked={Comanda.ComandaDeliverMode === "Delivery" ? false : true}
                            onlabel='Aqui' offlabel='Llevar' width={100} onChange={handleUpdateComandaDeliverMode} />
                    </div>
                    <div className="col-3">
                        <img src="icons/Mesa.png" alt="icon"className="img-fluid" style={{ width: '40px',  display: (Comanda.ComandaDeliverMode === "Delivery" ? false : true) ? 'flex' : 'none'}}></img>
                        <img src="icons/Llevar.png" alt="icon"className="img-fluid" style={{ width: '40px',  display: !(Comanda.ComandaDeliverMode === "Delivery" ? false : true) ? 'flex' : 'none'}}></img>
                    </div>
                    <div className="col-3">
                        <BootstrapSwitchButton checked={Comanda.ComandaPrepStatus === "Preparing" ? false : true}
                            onlabel='Entregada' offlabel='Preparando' width={100} onChange={handleUpdateComandaPrepStatus} />
                    </div>
                    <div className="col-3">
                        <BootstrapSwitchButton checked={Comanda.ComandaSwitchNota}
                            onlabel='Nota' offlabel='Nota' width={100} onChange={handleUpdateComandaSwitchNota} />
                    </div>
                </div>
                </div>
            </div>
            {toggleArrowStatus && (
            <div>
                <div className="row">
                    <div className='col'>
                    <DetailsComanda Comanda={Comanda} updateComanda={updateComanda} />
                    </div>
                </div>
                <div className="row" style={{display: !Comanda.ComandaSwitchNota ? 'none' : 'flex'}}>
                    <div className='col'>
                    {/* Text box editable backgroudn red and text blanco BOLD */}
                        <div className='row'>
                            <div className='col'>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Agregar notas" onChange={handleChangeNota} onKeyDown={handleUpdateNota}
                            value={nota} style={{backgroundColor: liveStatusNota, color: '#fff', fontWeight: 'bold', fontSize: '30px'
                            }}
                            ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            </div>
        </div></div>
    );
}

export default ComandaCard;
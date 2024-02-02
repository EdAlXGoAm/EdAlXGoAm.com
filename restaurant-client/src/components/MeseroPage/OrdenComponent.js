import './Orden.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import PlatilloSelector from './PlatilloSelectorComponent';
import ComandaCard from './ComandaCardComponent'

const Orden = ({modeInterface, iInterface, Order, UpdateOrder, DeleteOrder}) => {
    const [toggleArrowStatus, setToggleArrowStatus] = useState(true); // false: plegado, true: desplegado

    const fetchToggleArrowStatus = () => {
        if (modeInterface) {
            if (iInterface) {
                setToggleArrowStatus(true);
            }
            else {
                setToggleArrowStatus(false);
            }
        }
        else {
            setToggleArrowStatus(true);
        }
    };

    useEffect(() => {
        fetchToggleArrowStatus();
    },[modeInterface])

    const addComanda = (platillo) => {
        const Comanda = {
            OrderID: Order.OrderID,
            ComandaId: Order.ComandasList.length > 0 ? Order.ComandasList[Order.ComandasList.length - 1].ComandaId + 1 : 1,
            Platillo: platillo.NombrePlatillo,
            Precio: platillo.Variants[0].Precio,
            Imagen: platillo.Imagen,
            ComandaPaidStatus: "Pending", // Paid
            ComandaPrepStatus: "Preparing", // ReadyToServe-Served
            ComandaDeliverMode: "Delivery", // Table-0
            ComandaSwitchNota: false,
            Notas: "",
            Details: platillo
        }
        const newOrder = {...Order, ComandasList: [...Order.ComandasList, Comanda]};
        console.log("newOrder after Add Comanda: ", newOrder);
        const socketMsg = "Add" + Comanda.Platillo;
        UpdateOrder(newOrder, socketMsg);
    };

    const updateComanda = (comanda) => {
        const newOrder = {...Order, ComandasList: Order.ComandasList.map((comandaTemp) => {
            if(comandaTemp.ComandaId === comanda.ComandaId) {
                return comanda;
            }
            return comandaTemp;
        })};
        console.log("newOrder for UpdateComanda: ", newOrder)
        UpdateOrder(newOrder);
    }

    const removeComanda = (comanda) => {
        const confirm = window.confirm("Eliminar Platillo");
            if (confirm) {
                const newOrder = {...Order, CuentaTotal: Order.CuentaTotal - comanda.Precio, ComandasList: Order.ComandasList.filter((comandaTemp) => comandaTemp.ComandaId !== comanda.ComandaId)};
                UpdateOrder(newOrder);
            }
    };

    return (
        <div className="card">
            <div className="row">
                <div className="col-2 d-flex align-items-center">
                    <div className="toggleArrowButtons">
                        <button style={{backgroundColor:  toggleArrowStatus ? "#ffffff" : "#7ed65b"}} onClick={() => setToggleArrowStatus(!toggleArrowStatus)}>
                            <FontAwesomeIcon style={{color: toggleArrowStatus ? "#5d5d5d" : "#ffffff"}} icon={toggleArrowStatus ? faAngleUp : faAngleDown} size="2x" />
                        </button>
                    </div>
                </div>
                <div className="col-5 d-flex align-items-center orderNum">
                    <div className="orderNumText">{`Pedido: ${Order.OrderID}`}</div>
                    <button onClick={() => DeleteOrder(Order.OrderID)}>
                        <FontAwesomeIcon icon={faTrash} size="2x" />
                    </button>
                </div>
                <div className="col-5 d-flex align-items-center orderTotal">
                    <div className="orderTotalText">{`Total: $${Order.CuentaTotal}`}</div>
                    <button onClick={null}> {/* Will allow change Paid Prep and Cust Status */}
                        <FontAwesomeIcon icon={faCashRegister} size="2x" />
                    </button>
                </div>
            </div>
            {toggleArrowStatus && (
            <div>
                {modeInterface && (
                    <PlatilloSelector addPlatilloToOrder={addComanda}/>
                )}
                {Order.ComandasList.map((comanda, indexComanda) => (
                <div key={indexComanda}>
                <ComandaCard modeInterface={modeInterface} Comanda={comanda} updateComanda={updateComanda} removeComanda={removeComanda} />
                </div>
                ))}
            </div>
            )}
        </div>
    )
}

export default Orden;
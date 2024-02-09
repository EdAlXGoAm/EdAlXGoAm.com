import './OrdenComponent.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import PlatilloSelector from './PlatilloSelectorComponent';
import ComandaCard from './ComandaCardComponent'
import comandasApi from './../../api/comandasApi';
import io from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_API_URL}`);

const Orden = ({modeInterface, iInterface, Order, DeleteOrder, UpdateOrder, handleOrderCustStatus}) => {
    const [comandas, setComandas] = useState([])
    const [toggleArrowStatus, setToggleArrowStatus] = useState(true); // false: plegado, true: desplegado
    const [colorOrder, setColorOrder] = useState("#ffffff")
    const fetchColorOrder = () => {
        if (Order.OrderCustStatus === "Done") {
            setColorOrder("#5d5d5d");
        } else if (Order.OrderCustStatus === "InPlace") {
            setColorOrder("#ffffff");
        }
    }
    useEffect(() => {
        fetchColorOrder();
    }, []);

    const fetchComandas = () => {
        comandasApi.getComandasByOrderId(Order.OrderID)
        .then((res) => {
            setComandas(res);
            let cuentaTotal = 0;
            res.forEach((comanda) => {
                cuentaTotal = cuentaTotal + comanda.Precio;
            })
            UpdateOrder(Order, cuentaTotal);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetchComandas();
    },[]);

    const fetchToggleArrowStatus = () => {
        if (modeInterface) {
            if (iInterface) {
                setToggleArrowStatus(true);
            }
            else {
                setToggleArrowStatus(true);
            }
        }
        else {
            setToggleArrowStatus(true);
        }
    };

    useEffect(() => {
        fetchToggleArrowStatus();
    },[modeInterface])

    const handleComandas = (Action) => {
        console.log(`Action: ${Action}`);
        // Evaluar si Action split('-')[0] es igual a Add
        if (Action.split('-')[0] === "Add") {
            socket.emit('NuevaComandaDesdeCliente', {msg: Action});
        }
        else if (Action.split('-')[0] === "Update") {
            console.log("Se Editó");
            socket.emit('UpdateComandaDesdeCliente', {msg: Action});
        }
        else if (Action.split('-')[0] === "Del") {
            console.log("Se Eliminó");
            socket.emit('DeleteComandaDesdeCliente', {msg: Action});
        }
    };

    useEffect(() => { // NewComanda
        socket.on('NuevaComandaDesdeServidor', (data) => {
            console.log("Mensaje: ", data.msg)
            fetchComandas();
            if (data.msg === "Add-Hamburguesa") {
                const audio = new Audio("ComandaAudios/Solicitan-Hamburguesa.wav");
                audio.play();
            }
            else if (data.msg === "Add-Vaso de Postre") {
                const audio = new Audio("ComandaAudios/Solicitan-VasoDePostre.wav");
                audio.play();
            }
            else if (data.msg === "Add-Pay de Limón") {
                const audio = new Audio("ComandaAudios/Solicitan-Pay-de-Limon.wav");
                audio.play();
            }
            else if (data.msg === "Add-Cheese Cake") {
                const audio = new Audio("ComandaAudios/Solicitan-Cheese-Cake.wav");
                audio.play();
            }
            else if (data.msg === "Add-Maruchan Loca") {
                const audio = new Audio("ComandaAudios/Solicitan-Maruchan-Loca.wav");
                audio.play();
            }
            else if (data.msg === "Add-Vaso de Esquites") {
                const audio = new Audio("ComandaAudios/Solicitan-Esquites.wav");
                audio.play();
            }
            else if (data.msg === "Add-Doriesquites") {
                const audio = new Audio("ComandaAudios/Solicitan-Doriesquites.wav");
                audio.play();
            }
            else if (data.msg === "Add-Maruchan con Suadero") {
                const audio = new Audio("ComandaAudios/Solicitan-Maruchan-Suadero.wav");
                audio.play();
            }
            else if (data.msg === "Add-Alitas a la BBQ") {
                const audio = new Audio("ComandaAudios/Solicitan-Alitas.wav");
                audio.play();
            }
            else if (data.msg === "Add-Rebanada de Pizza") {
                const audio = new Audio("ComandaAudios/Solicitan-Rebanada-Pizza.wav");
                audio.play();
            }
            else if (data.msg === "Add-Papas a la Francesa") {
                const audio = new Audio("ComandaAudios/Solicitan-Papas.wav");
                audio.play();
            }
            else if (data.msg === "Add-Hot Dog") {
                const audio = new Audio("ComandaAudios/Solicitan-Hotdog.wav");
                audio.play();
            }
            else if (data.msg === "Add-Salchipulpos") {
                const audio = new Audio("ComandaAudios/Solicitan-Salchipulpos.wav");
                audio.play();
            }
            else if (data.msg === "Add-Sincronizadas") {
                const audio = new Audio("ComandaAudios/Solicitan-Sincronizadas.wav");
                audio.play();
            }
            else if (data.msg === "Add-Donitas") {
                const audio = new Audio("ComandaAudios/Solicitan-Donitas.wav");
                audio.play();
            }
            else if (data.msg === "Add-Bubble Waffle") {
                const audio = new Audio("ComandaAudios/Solicitan-Waffle.wav");
                audio.play();
            }
            else if (data.msg === "Add-Café") {
                const audio = new Audio("ComandaAudios/Solicitan-Cafe.wav");
                audio.play();
            }
            else if (data.msg === "Add-Frappé") {
                const audio = new Audio("ComandaAudios/Solicitan-Frappe.wav");
                audio.play();
            }
            else if (data.msg === "Add-Malteada") {
                const audio = new Audio("ComandaAudios/Solicitan-Malteada.wav");
                audio.play();
            }
            else if (data.msg === "Add-Esquimo") {
                const audio = new Audio("ComandaAudios/Solicitan-Esquimo.wav");
                audio.play();
            }
            else if (data.msg === "Add-Bubble Soda") {
                const audio = new Audio("ComandaAudios/Solicitan-Bubble-Soda.wav");
                audio.play();
            }
            else if (data.msg === "Add-Agua Fresca") {
                const audio = new Audio("ComandaAudios/Solicitan-Agua-Fresca.wav");
                audio.play();
            }
            else if (data.msg === "Add-Refresco") {
                const audio = new Audio("ComandaAudios/Solicitan-Refresco.wav");
                audio.play();
            }
            else if (data.msg === "Add-Ensalada") {
                const audio = new Audio("ComandaAudios/Solicitan-Ensalada.wav");
                audio.play();
            }
        });
        return () => {
            socket.off('NuevaComandaDesdeServidor');
        };
    }, []);
    useEffect(() => { // UpdateComanda
        socket.on('UpdateComandaDesdeServidor', (data) => {
            console.log("Mensaje: ", data.msg)
            fetchComandas();
        });
        return () => {
            socket.off('UpdateComandaDesdeServidor');
        };
    }, []);
    useEffect(() => { // DeleteComanda
        socket.on('DeleteComandaDesdeServidor', (data) => {
            console.log("Mensaje: ", data.msg)
            fetchComandas();
        });
        return () => {
            socket.off('DeleteComandaDesdeServidor');
        };
    }, []);
    const addComanda = (platillo) => {
        const Comanda = {
            OrderID: Order.OrderID,
            ComandaId: comandas.length > 0 ? comandas[comandas.length - 1].ComandaId + 1 : 1,
            Platillo: platillo.NombrePlatillo,
            Precio: platillo.Variants[0].Precio,
            Imagen: platillo.Imagen,
            ComandaPaidStatus: "Editing", // Paid
            ComandaPrepStatus: "Preparing", // ReadyToServe-Served
            ComandaDeliverMode: "Delivery", // Table-0
            ComandaSwitchNota: false,
            Notas: "",
            Details: platillo
        }
        const newOrder = {...Order};
        console.log("newOrder after Add Comanda: ", newOrder);
        comandasApi.addComanda(Comanda)
        .then((res) => {
            const socketMsg = "Add-" + Comanda.Platillo;
            handleComandas(socketMsg);
            fetchComandas();
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const updateComanda = (comanda) => {
        comandasApi.updateComanda(comanda)
        .then((res) => {
            const socketMsg = "Update-";
            handleComandas(socketMsg);
            fetchComandas();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const removeComanda = (comanda) => {
        const confirm = window.confirm("Eliminar Platillo");
            if (confirm) {
                const newOrder = {...Order, CuentaTotal: Order.CuentaTotal - comanda.Precio};
                comandasApi.deleteComanda(comanda._id)
                .then((res) => {
                    const socketMsg = "Del-";
                    handleComandas(socketMsg);
                    fetchComandas();
                })
                .catch((err) => {
                    console.log(err);
                });
            }
    };

    const handleOrderCustStatusButton = () => {
        if (Order.OrderCustStatus === "InPlace") {
            const confirm = window.confirm("La ORDEN ha sido COMPLETADA?");
                if (confirm) {
                    setColorOrder("#5d5d5d");
                    // comandas.forEach((comanda) => {
                    //     comanda.ComandaPrepStatus = "Served";
                        
                    //     comandasApi.updateComanda(comanda)
                    //     .then((res) => {
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     });
                    // })
                    handleOrderCustStatus(Order.OrderID, "Done");
                    // const socketMsg = "Update-";
                    // handleComandas(socketMsg);
                    // fetchComandas();
                }
        } else if (Order.OrderCustStatus === "Done") {
            const confirm = window.confirm("La ORDEN ha sido PREPARADA?");
                if (confirm) {
                    setColorOrder("#ffffff");
                    // comandas.forEach((comanda) => {
                    //     comanda.ComandaPrepStatus = "ReadyToServe";
                        
                    //     comandasApi.updateComanda(comanda)
                    //     .then((res) => {
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     });
                    // })
                    handleOrderCustStatus(Order.OrderID, "InPlace");
                    // const socketMsg = "Update-";
                    // handleComandas(socketMsg);
                    // fetchComandas();
                }
        }
    }

    return (
        <div className="card" style={{backgroundColor: colorOrder}}>
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
                    <button onClick={() => handleOrderCustStatusButton(Order)}> {/* Will allow change Paid Prep and Cust Status */}
                        <FontAwesomeIcon icon={faCashRegister} size="2x" />
                    </button>
                </div>
            </div>
            {toggleArrowStatus && (
            <div>
                {modeInterface && (
                    <PlatilloSelector addPlatilloToOrder={addComanda}/>
                )}
                {comandas.map((comanda, indexComanda) => (
                <div key={indexComanda}>
                <ComandaCard order={Order} modeInterface={modeInterface} Comanda={comanda} updateComanda={updateComanda} removeComanda={removeComanda} />
                </div>
                ))}
            </div>
            )}
        </div>
    )
}

export default Orden;
import React, { useState, useEffect } from 'react';
import Orden from './OrdenComponent';
import Button from 'react-bootstrap/Button';

import ordersApi from '../../api/ordersApi';

import io from 'socket.io-client';
const socket = io('http://192.168.100.38:3010');

const ShowComandasInterface = ({ modeInterface }) => {

    const [orders, setOrders] = useState([]);
    const [numOrders, setNumOrders] = useState(0);
    const [ComandasPerScreen, setComandasPerScreen] = useState(3);
    const [slide, setSlide] = useState(1);
    const fetchOrders = () => {
        ordersApi.getOrders()
        .then(data => {
            setOrders(prevOrders => {return (data);});
            setNumOrders(prevNumOrders => {return data.length;});
        })
        .catch(err => {
            console.log(err)
            alert("Error al cargar las comandas");
        });
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    const handleSlideChange = (newSlide) => {
        const maxSlide = numOrders;
        if (newSlide > 0 && newSlide <= maxSlide) {
            setSlide(prevSlide => {return(newSlide);})
        }
    };
    const renderOrders = () => {
        const OrdersArray = [];
        if (modeInterface) {
            const start = (numOrders - (slide - 1));
            const end = Math.max((numOrders - (slide + ComandasPerScreen - 1)), 0);
            for (let i = start - 1; i >= end; i--) {
                let iInterfaceFlag = false;
                if (i === start - 1) {
                    iInterfaceFlag = true
                }
                OrdersArray.push(
                <div key={orders[i].OrderID} className={`col-xl-${12/ComandasPerScreen} d-flex justify-content-center`}>
                    <Orden modeInterface={modeInterface} iInterface={iInterfaceFlag} Order={orders[i]}
                    UpdateOrder={handleUpdateOrder} DeleteOrder={handleDeleteOrder}/>
                </div>
                )
            }
        }
        else {
            const start = (slide - 1);
            const end = Math.min(slide - 1 + ComandasPerScreen, numOrders);
            for (let i = start; i < end; i++) {
                OrdersArray.push(
                <div key={orders[i].OrderID} className={`col-xl-${12/ComandasPerScreen} d-flex justify-content-center`}>
                    <Orden modeInterface={modeInterface} iInterface={i} Order={orders[i]}
                    UpdateOrder={handleUpdateOrder} DeleteOrder={handleDeleteOrder}/>
                </div>
                )
            }
        }
        return OrdersArray;
    };
    const SocketNewOrder = () => {
        socket.emit('NuevaOrdenDesdeCliente', {});
    };
    useEffect(() => {
        socket.on('NuevaOrdenDesdeServidor', (data) => {
            console.log("Mensaje: ", data)
            fetchOrders();
            const audio = new Audio("ComandaAudios/Pedido.wav");
            audio.play();
        });

        return () => {
            socket.off('NuevaOrdenDesdeServidor');
        };
    }, []);
    const SocketDeleteOrder = () => {
        socket.emit('OrdenEliminadaDesdeCliente', {});
    };
    useEffect(() => {
        socket.on('OrdenEliminadaDesdeServidor', (data) => {
            console.log("Mensaje: ", data)
            fetchOrders();
        });

        return () => {
            socket.off('OrdenEliminadaDesdeServidor');
        };
    }, []);
    const handleNewOrderClick = () => {
        ordersApi.getLastOrderID()
        .then(data => {
            const newOrderId = data + 1;
            let newOrder = {
                OrderID: newOrderId,
                OrderPaidStatus: "Pending", // Partial-Paid
                OrderPrepStatus: "Preparing", // Served-Done
                OrderCustStatus: "InPlace", // BeBack-Done
                Customer: "",
                CuentaTotal: 0,
                ComandasList: []
            };
            ordersApi.addOrder(newOrder)
            .then(() => {
                const audio = new Audio("ComandaAudios/Pedido.wav");
                audio.play();
                fetchOrders();
                SocketNewOrder();
            })
            .catch(err => {
                console.log(err)
                alert("Error al agregar una nueva comanda");
            });
        })
        .catch(err => {
            console.log(err)
            alert("Error de comunicación con la base de datos para 'Ordenes'");
        });
    };
    const calculateCuentaTotal = (order) => {
        let CuentaTotal = 0;
        for (let i = 0; i < order.ComandasList.length; i ++) {
            CuentaTotal += order.ComandasList[i].Precio;
        }
        const newOrder = {...order, CuentaTotal: CuentaTotal};
        return newOrder;
    };
    const handleUpdateOrder = (order, Action) => {
        const newOrder = calculateCuentaTotal(order);
        ordersApi.updateOrder(newOrder)
        .then(() => {
            fetchOrders();
            console.log(`Msg for Socket = ${Action}`)
            socket.emit('NuevaComandaDesdeCliente', {msg: Action});
        })
        .catch(err => {
            console.log(err)
            alert("Error al actualizar una comanda");
        });
    };
    const handleDeleteOrder = (OrderID) => {
        const confirm = window.confirm("Eliminar Platillo");
            if (confirm) {
                ordersApi.deleteOrder(OrderID)
                .then(() => {
                    fetchOrders();
                    SocketDeleteOrder();
                })
                .catch(err => {
                    console.log(err)
                    alert("Error al eliminar una comanda");
                });
            }
    };

    useEffect(() => {
        socket.on('NuevaComandaDesdeServidor', (data) => {
            console.log("Mensaje: ", data.msg)
            fetchOrders();
            if (data.msg === "AddHamburguesa") {
                const audio = new Audio("ComandaAudios/Solicitan-Hamburguesa.wav");
                audio.play();
            }
            else if (data.msg === "AddVaso de Postre") {
                const audio = new Audio("ComandaAudios/Solicitan-VasoDePostre.wav");
                audio.play();
            }
        });
        return () => {
            socket.off('NuevaComandaDesdeCliente');
        };
    }, []);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1 style={{ color: "#ffffff" }}>Comandas</h1>
                    <Button variant="primary" onClick={() => setComandasPerScreen(6)}>6</Button>
                    <Button variant="primary" onClick={() => setComandasPerScreen(4)}>4</Button>
                    <Button variant="primary" onClick={() => setComandasPerScreen(3)}>3</Button>
                </div>
            </div>
            <hr style={{backgroundColor:"white"}}/>
            <div className="row">
                {/* Botón para navegar entre comandas */}
                <div className="col-2">
                    <Button variant="success" size="lg" onClick={() => handleSlideChange(slide - 1)}>←</Button>
                </div>
                {/* Botón para agregar una nueva comanda */}
                <div className="col-8">
                    <Button variant="success" size="lg" onClick={handleNewOrderClick}>Nueva Orden</Button>
                </div>
                {/* Botón para navegar entre comandas */}
                <div className="col-2">
                    <Button variant="success" size="lg" onClick={() => handleSlideChange(slide + 1)}>→</Button>
                </div>
            </div>
            <div className="row">
                {renderOrders()}
            </div>
        </div>
    )
}

export default ShowComandasInterface

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
    const [TotalDia, setTotalDia] = useState(0);

    useEffect(() => {
        let newTotal = 0;
        for (let order of orders) {
            newTotal += order.CuentaTotal;
        }
        setTotalDia(newTotal);
    },[]);

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
            else if (data.msg === "AddPay de Limón") {
                const audio = new Audio("ComandaAudios/Solicitan-Pay-de-Limon.wav");
                audio.play();
            }
            else if (data.msg === "AddCheese Cake") {
                const audio = new Audio("ComandaAudios/Solicitan-Cheese-Cake.wav");
                audio.play();
            }
            else if (data.msg === "AddMaruchan Loca") {
                const audio = new Audio("ComandaAudios/Solicitan-Maruchan-Loca.wav");
                audio.play();
            }
            else if (data.msg === "AddVaso de Esquites") {
                const audio = new Audio("ComandaAudios/Solicitan-Esquites.wav");
                audio.play();
            }
            else if (data.msg === "AddDoriesquites") {
                const audio = new Audio("ComandaAudios/Solicitan-Doriesquites.wav");
                audio.play();
            }
            else if (data.msg === "AddMaruchan con Suadero") {
                const audio = new Audio("ComandaAudios/Solicitan-Maruchan-Suadero.wav");
                audio.play();
            }
            else if (data.msg === "AddAlitas a la BBQ") {
                const audio = new Audio("ComandaAudios/Solicitan-Alitas.wav");
                audio.play();
            }
            else if (data.msg === "AddRebanada de Pizza") {
                const audio = new Audio("ComandaAudios/Solicitan-Rebanada-Pizza.wav");
                audio.play();
            }
            else if (data.msg === "AddPapas a la Francesa") {
                const audio = new Audio("ComandaAudios/Solicitan-Papas.wav");
                audio.play();
            }
            else if (data.msg === "AddHot Dog") {
                const audio = new Audio("ComandaAudios/Solicitan-Hotdog.wav");
                audio.play();
            }
            else if (data.msg === "AddSalchipulpos") {
                const audio = new Audio("ComandaAudios/Solicitan-Salchipulpos.wav");
                audio.play();
            }
            else if (data.msg === "AddSincronizadas") {
                const audio = new Audio("ComandaAudios/Solicitan-Sincronizadas.wav");
                audio.play();
            }
            else if (data.msg === "AddDonitas") {
                const audio = new Audio("ComandaAudios/Solicitan-Donitas.wav");
                audio.play();
            }
            else if (data.msg === "AddBubble Waffle") {
                const audio = new Audio("ComandaAudios/Solicitan-Waffle.wav");
                audio.play();
            }
            else if (data.msg === "AddCafé") {
                const audio = new Audio("ComandaAudios/Solicitan-Cafe.wav");
                audio.play();
            }
            else if (data.msg === "AddFrappé") {
                const audio = new Audio("ComandaAudios/Solicitan-Frappe.wav");
                audio.play();
            }
            else if (data.msg === "AddMalteada") {
                const audio = new Audio("ComandaAudios/Solicitan-Malteada.wav");
                audio.play();
            }
            else if (data.msg === "AddEsquimo") {
                const audio = new Audio("ComandaAudios/Solicitan-Esquimo.wav");
                audio.play();
            }
            else if (data.msg === "AddBubble Soda") {
                const audio = new Audio("ComandaAudios/Solicitan-Bubble-Soda.wav");
                audio.play();
            }
            else if (data.msg === "AddAgua Fresca") {
                const audio = new Audio("ComandaAudios/Solicitan-Agua-Fresca.wav");
                audio.play();
            }
            else if (data.msg === "AddRefresco") {
                const audio = new Audio("ComandaAudios/Solicitan-Refresco.wav");
                audio.play();
            }
            else if (data.msg === "AddEnsalada") {
                const audio = new Audio("ComandaAudios/Solicitan-Ensalada.wav");
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
                    <h1 style={{ color: "#ffffff" }}>Comandas ${TotalDia}</h1>
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

import React, { useState } from 'react';
import Orden from './Orden';
import Button from 'react-bootstrap/Button';

const ShowComandasInterface = ({ cocina_mesero_switch, orders_collection }) => {

    const [orders, setOrders] = useState([]);

    /* Si orders_collection no es undefined, entonces asignar orders_collection a orders */
    if (orders_collection) {
        if (orders_collection.length > 0) {
            if (orders.length === 0) {
                setOrders(prevOrders => {
                    const newOrders = [...prevOrders, ...orders_collection];
                    console.log("orders después de asignar orders_collection: ", newOrders);
                    return newOrders;
                }
                );
            }
        }
    }

    const handleNuevoPedidoClick = () => {
        const newOrder = {
            OrderID: orders.length + 1,
            Customer: "",
            CuentaTotal: 0,
            ComandasList: []
        };
        setOrders(prevOrders => {
            const newOrders = [...prevOrders, newOrder];
            console.log("orders después de agregar un nuevo pedido: ", newOrders);
            return newOrders;
        });
        /* Quiero ejectar el audio del archivo public/ComandaAudios/Audios para comandas-0001.wav */
        const audio = new Audio("ComandaAudios/Pedido.wav");
        audio.play();
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1 style={{ color: "#ffffff" }}
                    >Comandas</h1>
                </div>
            </div>
            <hr />
            {/* Botón para agregar una nueva comanda */}
            <div className="row">
                <div className="col">
                    <Button variant="success" size="lg" onClick={handleNuevoPedidoClick}>Nueva Orden</Button>
                </div>
            </div>
            <div className="row">
                {cocina_mesero_switch ? (
                    orders.slice().reverse().map((order) => (
                        <Orden key={order.OrderID} Interfaz={cocina_mesero_switch} Order={order} />
                    ))
                ) : (
                    orders.map((order) => (
                        <Orden key={order.OrderID} Interfaz={cocina_mesero_switch} Order={order} />
                    ))
                )}
            </div>
        </div>
    )
}

export default ShowComandasInterface

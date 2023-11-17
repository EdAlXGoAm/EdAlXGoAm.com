import React, { useState } from 'react';
import Orden from './Orden';
import Button from 'react-bootstrap/Button';

const ShowComandasInterface = ({ cocina_mesero_switch }) => {

    const [orders, setOrders] = useState([]);

    const handleNuevoPedidoClick = () => {
        const newOrder = {
            OrderId: orders.length + 1,
            CuentaTotal: 0,
            ComandasList: []
        };
        setOrders(prevOrders => {
            const newOrders = [...prevOrders, newOrder];
            console.log("orders después de agregar un nuevo pedido: ", newOrders);
            return newOrders;
        });
        /* Quiero ejectar el audio del archivo public/ComandaAudios/Audios para comandas-0001.wav */
        const audio = new Audio("/ComandaAudios/Audios para comandas-0001.wav");
        audio.play();
    };

    const PlatillosDisponibles = [
        ["Postre", true],
        ["Pay de Limón", true],
        ["Pastel Imposible", true],
        ["Vasos de Esquites", true],
        ["Doriesquites", true],
        ["Maruchan Loca", true],
        ["Maruchan con Suadero", true],
        ["Papas a la Francesa", true],
        ["Rebanada de Pizza", true],
        ["Hot Dog", true],
        ["Sincronizadas", true],
        ["Ensaladas", true],
        ["Alitas BBQ", true],
        ["Hamburguesas", true],
        ["Bubble Waffles", true],
        ["Donas", true],
        ["Frappés", true],
        ["Malteadas", true],
        ["Esquimos", true],
        ["Cafés", true],
        ["Bubble Sodas", true],
        ["Bombas de Chocolate", true],
        ["Aguas Frescas", true],
        ["Refrescos", true]
    ];

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <h1>Comandas</h1>
            </div>
            <hr />
            {/* Botón para agregar una nueva comanda */}
            <div className="row justify-content-center">
                <div className="col-4 d-flex justify-content-center">
                    <Button variant="success" size="lg" onClick={handleNuevoPedidoClick}>Nueva Orden</Button>
                </div>
            </div>
            <div className="row justify-content-center">
                {cocina_mesero_switch ? (
                    orders.slice().reverse().map((order) => (
                        <Orden key={order.OrderId} Order={order} PlatillosDisponibles={PlatillosDisponibles} />
                    ))
                ) : (
                    orders.map((order) => (
                        <Orden key={order.OrderId} Order={order} PlatillosDisponibles={PlatillosDisponibles} />
                    ))
                )}
            </div>
        </div>
    )
}

export default ShowComandasInterface

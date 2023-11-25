import React, { useState } from 'react';
import Orden from './x02Orden';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

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
    
    const navigationButtonStyle = {
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        border: 'none'
    }
    
    const ORDERS_PER_SLIDE = 5;
    const [slide, setSlide] = useState(1);

    const handleSlideChange = (newSlide) => {
        const maxSlide = Math.ceil(orders.length);
        if (newSlide > 0 && newSlide <= maxSlide) {
            setSlide(newSlide);
        }
    };

    const renderOrders = () => {
        const start = (slide - 1);
        const end = slide + ORDERS_PER_SLIDE;
        return orders.slice(start, end-1).map((order) => (
            <div className='col-xl-2 d-flex justify-content-center'>
              <Orden key={order.OrderID} Interfaz={cocina_mesero_switch} Order={order} />
            </div>
          ))
    };
    const renderOrdersInverse = () => {
        const start = (slide - 1);
        const end = slide + ORDERS_PER_SLIDE;
        return orders.slice(start, end-1).reverse().map((order) => (
            <div className='col-xl-2 d-flex justify-content-center'>
              <Orden key={order.OrderID} Interfaz={cocina_mesero_switch} Order={order} />
            </div>
          ))
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
                <div className="col-1">
                    <button
                        style={navigationButtonStyle}
                        onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                        onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                        onClick={() => handleSlideChange(slide - 1)}
                    >
                        <FontAwesomeIcon icon={faArrowCircleLeft} size="4x" />
                    </button>
                </div>
                {/* <div className="col-10">
                    <div className="row"> */}
                        {cocina_mesero_switch ? (
                            /* Call to renderOrders() */
                            renderOrdersInverse()
                        ) : (
                            renderOrders()
                        )}
                    {/* </div>
                </div> */}
                <div className="col-1">
                    <button
                        style={navigationButtonStyle}
                        onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                        onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                        onClick={() => handleSlideChange(slide + 1)}
                    >
                        <FontAwesomeIcon icon={faArrowCircleRight} size="4x" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShowComandasInterface

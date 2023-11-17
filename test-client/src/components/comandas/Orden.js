import React, { useState } from 'react';
import Comanda from './Comanda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
const TOTAL_BUTTONS = 24;
const BUTTONS_PER_SLIDE = 4;


const buttonStyle_disable = {
    width: '100px',
    height: '100px',
    whiteSpace: 'normal',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '16px',
    textTransform: 'uppercase',
    fontFamily: 'Bebas Neue',
    margin: '5px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    border: 'none',
    opacity: '0.5'
};

const textStyle = {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center', // Centra el contenido
    justifyContent: 'center'
};

const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};




const Orden = ({ Order, PlatillosDisponibles }) => {
    const BUTTON_NAMES_DEFAULT = [
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

    const BUTTON_ICONS = [
        'icons/btn_postre.png',
        'icons/btn_pay_de_limon.png',
        'icons/btn_pastel_imposible.png',
        'icons/btn_vasos_de_esquites.png',
        'icons/btn_doriesquites.png',
        'icons/btn_maruchan_loca.png',
        'icons/btn_maruchan_con_suadero.png',
        'icons/btn_papas_a_la_francesa.png',
        'icons/btn_rebanada_de_pizza.png',
        'icons/btn_hotdog.png',
        'icons/btn_sincronizadas.png',
        'icons/btn_ensaladas.png',
        'icons/btn_alitas_bbq.png',
        'icons/btn_hamburguesas.png',
        'icons/btn_bubble_waffles.png',
        'icons/btn_donas.png',
        'icons/btn_frappes.png',
        'icons/btn_malteadas.png',
        'icons/btn_esquimos.png',
        'icons/btn_cafes.png',
        'icons/btn_bubble_sodas.png',
        'icons/btn_bombas_de_chocolate.png',
        'icons/btn_aguas_frescas.png',
        'icons/btn_refrescos.png'
    ];


    const BUTTON_NAMES = PlatillosDisponibles && PlatillosDisponibles.length > 0 ? PlatillosDisponibles.map(par => par[0]) : BUTTON_NAMES_DEFAULT.map(par => par[0]);
    const BUTTON_AVAILABLE = PlatillosDisponibles && PlatillosDisponibles.length > 0 ? PlatillosDisponibles.map(par => par[1]) : BUTTON_NAMES_DEFAULT.map(par => par[1]);

    const [CobroPendiente, setCobroPendiente] = useState(0);
    const [slide, setSlide] = useState(1);
    const [comandas, setComandas] = useState([]);
    const [comandaCount, setComandaCount] = useState(0);
    const [orderFoldStatus, setOrderFoldStatus] = useState(false); // false: desplegado, true: plegado
    const [orderLockStatus, setOrderLockStatus] = useState(false); // false: desbloqueado, true: bloqueado

    const handleAddComanda = (comanda, buttonName) => {
        const buttonValue = buttonName.toLowerCase().replace(/\s+/g, '');
        const comandaId = `${Order.OrderId}_${comandaCount}`;
        if (buttonValue == 'hamburguesas'){
            // Reproducir audio de hamburguesas
            const audio = new Audio("/ComandaAudios/Audios para comandas-0002.wav");
            audio.play();
        }
        setComandas([...comandas, { ...comanda, buttonName, buttonValue, id: comandaId }]);
        setComandaCount(comandaCount + 1);
    };

    const handleSlideChange = (newSlide) => {
        const maxSlide = Math.ceil(TOTAL_BUTTONS / BUTTONS_PER_SLIDE);
        if (newSlide > 0 && newSlide <= maxSlide) {
            setSlide(newSlide);
        }
    };

    const renderComandas = () => {
        return comandas.map((comanda) => (
            <Comanda key={comanda.id} comandaId={comanda.id} orderId={Order.OrderId} buttonName={comanda.buttonName} buttonValue={comanda.buttonValue} width_div={570} />
        ));
    };

    const renderButtons = () => {
        const buttons = [];
        const start = (slide - 1) * BUTTONS_PER_SLIDE;
        const end = Math.min(slide * BUTTONS_PER_SLIDE, TOTAL_BUTTONS);
        for (let i = start; i < end; i++) {
            if (BUTTON_AVAILABLE[i] == true) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handleAddComanda({ id: i }, BUTTON_NAMES[i])}
                        style={comandaButtonStyle}
                        onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                        onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                    >
                        <div style={textStyle}>
                            {BUTTON_NAMES[i]}
                        </div>
                        <div style={iconStyle}>
                            <img src={BUTTON_ICONS[i]} alt="" style={{ width: '50px', height: '50px' }} />
                        </div>
                    </button>
                );
            }
            // display a disabled BUTTON that displays a temporal (2 secs) message when clicked that says "Platillo no disponible"
            else {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => { alert("Platillo no disponible"); }}
                        style={buttonStyle_disable}
                        // colors for disable buttons
                        // use a light gray color for the onTouchStart and onMouseOver events
                        onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                        // use a white color for the onTouchEnd and onMouseOut events
                        onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}

                    >
                        <div style={textStyle}>
                            {BUTTON_NAMES[i]}
                        </div>
                        <div style={iconStyle}>
                            <img src={BUTTON_ICONS[i]} alt="" style={{ width: '50px', height: '50px' }} />
                        </div>
                    </button>
                );
            }

        }
        return buttons;
    };

    const OrderContainerStyle = {
        borderRadius: '10px',
        border: '5px solid #abe1e3',
        backgroundColor: '#ffffff',
        padding: '10px',
        margin: '10px'
    };

    const headerOrderStyle = {
        width: "590px"
    }

    const OrderIdStyle = {
        fontSize: "20px",
        color: '#000',
        backgroundColor: '#abe1e3', // Color de fondo pastel
        borderRadius: '40px',       // Bordes redondeados
        padding: '0px 10px',       // Padding para no pegar el texto a los bordes
        margin: '0px 10px 10px 0px',
    };

    const orderContentFold = {
        display: orderFoldStatus ? 'none' : 'flex',
        justifyContent: 'center'
    };

    const angle_up_buttonStyle = {
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        marginBottom: '15px',
        borderRadius: '30px',
        backgroundColor: '#ffffff',
        border: 'none'
    }

    const lockIconStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '15px',
        borderRadius: '30px',
        backgroundColor: '#ffffff',
        border: 'none',
        // color is red if the order is locked, else color is black
        color: orderLockStatus ? '#ff0000' : '#000000'
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
        border: 'none',
        // is disabled if order is locked
        opacity: orderLockStatus ? '0.5' : '1',
        pointerEvents: orderLockStatus ? 'none' : 'auto'
    }

    const comandaButtonStyle = {
        width: '100px',
        height: '100px',
        whiteSpace: 'normal',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: '16px',
        textTransform: 'uppercase',
        fontFamily: 'Bebas Neue',
        margin: '5px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        border: 'none',
        // is disabled if order is locked
        opacity: orderLockStatus ? '0.5' : '1',
        pointerEvents: orderLockStatus ? 'none' : 'auto'
    };

    const slider_row_slide = {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
        width: '540px'
    };

    return (
        <div className='col-3' style={OrderContainerStyle}>
            <div className='row justify-content-center' style={headerOrderStyle}> {/* row for the order header */}
                <div className='container-fluid'> {/* container for the order header */}
                    <div className='col-12' style={{ display: 'flex', justifyContent: 'space-between' }}> {/* row for the fold button and the lock button */}
                        {/* colors gray in onTouchStart and onMouseOver events */}
                        <button
                            style={angle_up_buttonStyle}
                            onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                            onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            onClick={() => setOrderFoldStatus(!orderFoldStatus)}
                        >
                            {/* if (orderFoldStatus == false) icon = fa-solid fa-angle-down, else icon = fa-solid fa-angle-up */}
                            <FontAwesomeIcon icon={orderFoldStatus ? faAngleUp : faAngleDown} size="2x" />
                        </button>

                        {/* colors gray in onTouchStart and onMouseOver events */}
                        <button
                            style={lockIconStyle}
                            onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                            onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            onClick={() => setOrderLockStatus(!orderLockStatus)}
                        >
                            {/* if (orderFoldStatus == false) icon = fa-solid fa-lock, else icon = fa-solid fa-unlock */}
                            <FontAwesomeIcon icon={orderLockStatus ? faLock : faUnlock} size="2x" />
                        </button>
                    </div>
                    <div className='col-12' style={{ display: 'flex', justifyContent: 'space-between' }}> {/* row for the order id and the pending payment */}
                        <div style={OrderIdStyle}>{`Número de Pedido: ${Order.OrderId}`}</div>
                        <div>{`Por cobrar: $${CobroPendiente.toFixed(2)}`}</div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center' style={orderContentFold}> {/* row for the order content */}
                <div className='container-fluid'> {/* container for the order content */}
                    <div className='row justify-content-center' style={slider_row_slide}> {/* row for the comandas buttons */}
                        <button
                            style={navigationButtonStyle}
                            onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                            onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            onClick={() => handleSlideChange(slide - 1)}
                        >
                            <FontAwesomeIcon icon={faArrowCircleLeft} size="4x" /> {/* Increased size */}
                        </button>
                        {renderButtons()}
                        <button
                            style={navigationButtonStyle}
                            onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                            onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFC0CB'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            onClick={() => handleSlideChange(slide + 1)}
                        >
                            <FontAwesomeIcon icon={faArrowCircleRight} size="4x" /> {/* Increased size */}
                        </button>
                    </div>
                    <div className='row justify-content-center'> {/* row for the comandas */}
                        {renderComandas()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orden;

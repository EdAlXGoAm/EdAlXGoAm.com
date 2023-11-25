import React, { useState, useEffect } from 'react';
import Comanda from './x03Comanda';
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




const Orden = ({ Interfaz, Order }) => {
    const BUTTON_NAMES_DEFAULT = [
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
        ["Platanos Fritos", true, [0, 45]],
        ["Aguas Frescas", true, [25, 50]],
        ["Refrescos", true, [0, 20, 20]]
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


    const BUTTON_NAMES = BUTTON_NAMES_DEFAULT.map(par => par[0]);
    const BUTTON_AVAILABLE = BUTTON_NAMES_DEFAULT.map(par => par[1]);

    const [CobroPendiente, setCobroPendiente] = useState(0);
    const [slide, setSlide] = useState(1);
    const [comandas, setComandas] = useState([]);
    const [comandaCount, setComandaCount] = useState(0);
    const [orderFoldStatus, setOrderFoldStatus] = useState(false); // false: desplegado, true: plegado
    const [orderLockStatus, setOrderLockStatus] = useState(false); // false: desbloqueado, true: bloqueado

    /* Si Order.ComandasList no es undefined, entonces asignar Order.ComandasList a comandas */
    if (Order.ComandasList) { // Si Order.ComandasList no es undefined
        if (Order.ComandasList.length > 0) { // Si Order.ComandasList no está vacío
            if (comandas.length === 0) { // Si comandas está vacío
                // Agregar las comandas de Order.ComandasList a comandas
                setComandas(prevComandas => { // prevComandas es el valor de comandas antes de actualizarlo
                    const newComandas = [...prevComandas, ...Order.ComandasList]; // Agregar las comandas de Order.ComandasList a comandas
                    return newComandas; // Regresar el nuevo valor de comandas a setComandas
                });
                /* setComandaCount en el último elemento de Order.ComandasList */
                setComandaCount(Order.ComandasList.length + 1);
                /* Calcular el cobro pendiente */
                let cobro = 0;
                Order.ComandasList.forEach(comanda => {
                    cobro += comanda.Precio;
                });
                setCobroPendiente(prevCobroPendiente => cobro);
            }
        }
    }


    /* Separa el string en palabras, deja la primera como mayuscula, el resto como minusculas y después quita los espacios */
    function capitalizeFirstLetter(string) {
        const words = string.split(' ');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        const capitalizedString = capitalizedWords.join('');
        return capitalizedString;
    }

    const handleAddComanda = (buttonName) => {
        console.log("buttonName: ", buttonName);
        const buttonValue = capitalizeFirstLetter(buttonName[0]);
        const comandaId = `${Order.OrderID}_${comandaCount}`;
        if (buttonValue == 'Postre'){
            // Reproducir audio de postres
            const audio = new Audio("/ComandaAudios/Solicitan un-0001.wav");
            audio.play();
        }
        if (buttonValue == 'PayDeLimón'){
            // Reproducir audio de pay de limón
            const audio = new Audio("/ComandaAudios/Solicitan un-0002.wav");
            audio.play();
        }
        if (buttonValue == 'PastelImposible'){
            // Reproducir audio de pastel imposible
            const audio = new Audio("/ComandaAudios/Solicitan un-0003.wav");
            audio.play();
        }
        if (buttonValue == 'VasosDeEsquites'){
            // Reproducir audio de vasos de esquites
            const audio = new Audio("/ComandaAudios/Solicitan un-0004.wav");
            audio.play();
        }
        if (buttonValue == 'Doriesquites'){
            // Reproducir audio de doriesquites
            const audio = new Audio("/ComandaAudios/Solicitan un-0005.wav");
            audio.play();
        }
        if (buttonValue == 'MaruchanLoca'){
            // Reproducir audio de maruchan loca
            const audio = new Audio("/ComandaAudios/Solicitan un-0006.wav");
            audio.play();
        }
        if (buttonValue == 'MaruchanConSuadero'){
            // Reproducir audio de maruchan con suadero
            const audio = new Audio("/ComandaAudios/Solicitan un-0007.wav");
            audio.play();
        }
        if (buttonValue == 'PapasALaFrancesa'){
            // Reproducir audio de papas a la francesa
            const audio = new Audio("/ComandaAudios/Solicitan un-0008.wav");
            audio.play();
        }
        if (buttonValue == 'RebanadaDePizza'){
            // Reproducir audio de rebanada de pizza
            const audio = new Audio("/ComandaAudios/Solicitan un-0009.wav");
            audio.play();
        }
        if (buttonValue == 'HotDog'){
            // Reproducir audio de hotdog
            const audio = new Audio("/ComandaAudios/Solicitan un-0010.wav");
            audio.play();
        }
        if (buttonValue == 'Sincronizadas'){
            // Reproducir audio de sincronizadas
            const audio = new Audio("/ComandaAudios/Solicitan un-0011.wav");
            audio.play();
        }
        if (buttonValue == 'Ensaladas'){
            // Reproducir audio de ensaladas
            const audio = new Audio("/ComandaAudios/Solicitan un-0012.wav");
            audio.play();
        }
        if (buttonValue == 'AlitasBbq'){
            // Reproducir audio de alitas BBQ
            const audio = new Audio("/ComandaAudios/Solicitan un-0013.wav");
            audio.play();
        }
        if (buttonValue == 'Hamburguesas'){
            // Reproducir audio de hamburguesas
            const audio = new Audio("/ComandaAudios/Solicitan un-0014.wav");
            audio.play();
        }
        if (buttonValue == 'BubbleWaffles'){
            // Reproducir audio de bubble waffles
            const audio = new Audio("/ComandaAudios/Solicitan un-0015.wav");
            audio.play();
        }
        if (buttonValue == 'Donas'){
            // Reproducir audio de donas
            const audio = new Audio("/ComandaAudios/Solicitan un-0016.wav");
            audio.play();
        }
        if (buttonValue == 'Frappés'){
            // Reproducir audio de frappes
            const audio = new Audio("/ComandaAudios/Solicitan un-0017.wav");
            audio.play();
        }
        if (buttonValue == 'Malteadas'){
            // Reproducir audio de malteadas
            const audio = new Audio("/ComandaAudios/Solicitan un-0018.wav");
            audio.play();
        }
        if (buttonValue == 'Esquimos'){
            // Reproducir audio de esquimos
            const audio = new Audio("/ComandaAudios/Solicitan un-0019.wav");
            audio.play();
        }
        if (buttonValue == 'Cafés'){
            // Reproducir audio de cafes
            const audio = new Audio("/ComandaAudios/Solicitan un-0020.wav");
            audio.play();
        }
        if (buttonValue == 'BubbleSodas'){
            // Reproducir audio de bubble sodas
            const audio = new Audio("/ComandaAudios/Solicitan un-0021.wav");
            audio.play();
        }
        if (buttonValue == 'PlatanosFritos'){
            // Reproducir audio de bombas de chocolate
            const audio = new Audio("/ComandaAudios/Solicitan un-0022.wav");
            audio.play();
        }
        if (buttonValue == 'AguasFrescas'){
            // Reproducir audio de aguas frescas
            const audio = new Audio("/ComandaAudios/Solicitan un-0023.wav");
            audio.play();
        }
        if (buttonValue == 'Refrescos'){
            // Reproducir audio de refrescos
            const audio = new Audio("/ComandaAudios/Solicitan un-0024.wav");
            audio.play();
        }
        let precio = buttonName[2][0];
        /* Switch case if the buttonName selected has just 2 indices in the array buttonName[2] */
        switch (buttonName[2].length) {
            case 2:
                precio = buttonName[2][1];
                break;
            default:
                break;
        }
        const newComanda = {
            ComandaID: comandaCount,
            UniqueID: comandaId,
            Platillo: buttonValue,
            Platillo_espacios: buttonName[0],
            Propiedades: [],
            Precio: precio,
            Status: "Preparando"
        };
        // version de setComandas con función callback
        setComandas(prevComandas => {
            const newComandas = [...prevComandas, newComanda];
            return newComandas;
        });
        // save comanda in order.ComamdasList with callback function
        Order.ComandasList.push(newComanda);
        // set comandaCount to the next value
        setComandaCount(prevComandaCount => prevComandaCount + 1);
        // calculate the pending payment
        let cobro = 0;
        Order.ComandasList.forEach(comanda => {
            cobro += comanda.Precio;
        });
        setCobroPendiente(prevCobroPendiente => {
            const newCobroPendiente = prevCobroPendiente + precio;
            return newCobroPendiente;
        });
        console.log("Order.ComandasList: ", Order.ComandasList);
    };

    const handleSlideChange = (newSlide) => {
        const maxSlide = Math.ceil(TOTAL_BUTTONS / BUTTONS_PER_SLIDE);
        if (newSlide > 0 && newSlide <= maxSlide) {
            setSlide(newSlide);
        }
    };

    const renderComandas = () => {
        return comandas.map((comanda, i) => (
            <Comanda key={(Order.OrderID*1000)+comanda.ComandaID} index={(Order.OrderID*1000)+comanda.ComandaID} comanda={comanda} platillo={comanda.Platillo} platillo_espacios={comanda.Platillo_espacios} lock={orderLockStatus}/>
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
                        onClick={() => handleAddComanda(BUTTON_NAMES_DEFAULT[i])}
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
        width: '100%',
        margin: '10px',
        padding: '20px',
        border: '5px solid #abe1e3',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        height: comandas.length == 0 ? '300px' : 'auto'
    };


    const OrderIdStyle = {
        fontSize: "20px",
        color: '#000',
        backgroundColor: '#abe1e3', // Color de fondo pastel
        borderRadius: '40px',       // Bordes redondeados
        padding: '0px 10px',       // Padding para no pegar el texto a los bordes
        margin: '0px 10px 10px 0px',
    };

    const orderContentFold = {
        display: orderFoldStatus ? 'none' : 'flex'
    };

    const angle_up_buttonStyle = {
        width: '30px',
        height: '30px',
        borderRadius: '30px',
        backgroundColor: '#ffffff',
        border: 'none'
    }

    const lockIconStyle = {
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
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        /* Ocultar cuando Interfaz == true */
        display: !Interfaz ? 'flex' : 'none'
    };

    return (
            <div className="card" style={OrderContainerStyle}>
                <div className='row mb-3'> {/* row for the order header */}
                    <div className='col' style={{ display: 'flex', justifyContent: 'space-between' }}> {/* row for the fold button and the lock button */}
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
                            {/* Llevar opacidad de  a 0 cuando Interfaz == true */}
                            <FontAwesomeIcon icon={orderLockStatus ? faLock : faUnlock} size="2x" style={{opacity: !Interfaz ? '1' : '0'}}/>
                        </button>
                    </div>
                </div>
                <div className='row mb-3'> {/* row for the order header */}
                    <div className='col' style={{ display: 'flex', justifyContent: 'space-between' }}> {/* row for the order id and the pending payment */}
                        <div style={OrderIdStyle}>{`Número de Pedido: ${Order.OrderID}`}</div>
                        <div>{`Por cobrar: $${CobroPendiente}`}</div>
                    </div>
                </div>
                <div className='row' style={orderContentFold}>
                    <div className='col'>
                        <div className='row mb-3' style={slider_row_slide}> {/* row for the order content */}
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
                        <div className='row'> {/* row for the order content */}
                            <div className='col'> {/* row for the comandas */}
                                {renderComandas()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Orden;

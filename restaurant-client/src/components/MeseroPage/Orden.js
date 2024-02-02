import React, { useState, useEffect } from 'react';
import Comanda from '../x03Comanda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import io from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_API_URL}:3010`);

const TOTAL_BUTTONS = 34;
const BUTTONS_PER_SLIDE = 3;


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
    justifyContent: 'center',
    fontSize: '20px',
};

const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};




const Orden = ({ Interfaz, ComandasPerScreen, Order }) => {
    const BUTTON_NAMES_DEFAULT = [
        ["Postre", true, [0, 30, 35, 40]],
        ["Pay de Limón", true, [0, 40]],
        ["Pastel Imposible", true, [0, 40]],
        ["Chesse Cake Zarzamora", true, [0, 50]],
        ["Cerezas", true, [0, 40, 45]],
        ["Vasos de Esquites", true, [0, 20, 25, 75]],
        ["Doriesquites", true, [0, 35]],
        ["Dorilocos", true, [0, 30]],
        ["Maruchan Loca", true, [0, 55]],
        ["Maruchan con Suadero", true, [0, 45]],
        ["Maruchan Sola", true, [0, 25]],
        ["Papas a la Francesa", true, [0, 40]],
        ["Salchipulpos", true, [0, 50]],
        ["Nuggets", true, [0, 50]],
        ["Rebanada de Pizza", true, [0, 25]],
        ["Hot Dog", true, [0, 30, 38, 45]],
        ["Sincronizadas", true, [0, 45]],
        ["Ensaladas", true, [0, 45]],
        ["Alitas BBQ", true, [0, 80]],
        ["Costillas BBQ", true, [0, 110]],
        ["Hamburguesas", true, [0, 47, 57, 60, 60, 60, 60, 60, 60, 60, 70, 75, 100, 120]],
        ["Pizza Completa", true, [0, 180]],
        ["Bubble Waffles", true, [0, 60, 70, 70, 70]],
        ["Donas", true, [0, 40]],
        ["Platanos Fritos", true, [0, 45]],
        ["Ponche", true, [0, 30]],
        ["Frappés", true, [0, 48, 48, 48, 48, 48, 68, 68, 68, 68, 68]],
        ["Malteadas", true, [0, 58, 58, 58]],
        ["Esquimos", true, [0, 25, 25, 25, 25, 30, 30]],
        ["Cafés", true, [0, 15, 20, 15, 25]],
        ["Bomba De Chocolate", true, [0, 45]],
        ["Bubble Sodas", true, [0, 55]],
        ["Aguas Frescas", true, [25, 50]],
        ["Refrescos", true, [0, 20, 20]]
    ];

    const BUTTON_ICONS = [
        1'icons/btn_postre.png',
        2'icons/btn_pay_de_limon.png',
        3'icons/btn_chesse_cacke_zarzamora.png',
        4'icons/btn_pastel_imposible.png',
        5'icons/btn_cerezas.png',
        6'icons/btn_vasos_de_esquites.png',
        7'icons/btn_doriesquites.png',
        'icons/btn_dorilocos.png',
        'icons/btn_maruchan_loca.png',
        'icons/btn_maruchan_con_suadero.png',
        'icons/btn_maruchan_loca.png',
        'icons/btn_papas_a_la_francesa.png',
        'icons/btn_salchipulpos.png',
        'icons/btn_nuggets.png',
        'icons/btn_rebanada_de_pizza.png',
        'icons/btn_hotdog.png',
        'icons/btn_sincronizadas.png',
        'icons/btn_ensaladas.png',
        'icons/btn_alitas_bbq.png',
        'icons/btn_costillas_bbq.png',
        'icons/btn_hamburguesas.png',
        'icons/btn_pizza_completa.png',
        'icons/btn_bubble_waffles.png',
        'icons/btn_donas.png',
        'icons/btn_platanos_fritos.png',
        'icons/btn_ponche.png',
        'icons/btn_frappes.png',
        'icons/btn_malteadas.png',
        'icons/btn_esquimos.png',
        'icons/btn_cafes.png',
        'icons/btn_bomba_de_chocolate.png',
        'icons/btn_bubble_sodas.png',
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

    const generateLocalComandas = () => {
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
                        cobro += comanda.propiedades.precio;
                    });
                    setCobroPendiente(prevCobroPendiente => {
                        return cobro;
                    });
                }
            }
        }
    }
    
    useEffect(() => {
        generateLocalComandas();
        // console.log('comandas: ', comandas);
    }, [Order]);

    const handleUpdateComanda = (comanda) => {
        // find the index of the comanda in comandas
        const index = comandas.findIndex(c => c.UniqueID === comanda.UniqueID);
        // update the comanda in comandas
        setComandas(prevComandas => {
            const newComandas = [...prevComandas];
            newComandas[index] = comanda;
            return newComandas;
        });
        // update the comanda in Order.ComandasList
        const index2 = Order.ComandasList.findIndex(c => c.UniqueID === comanda.UniqueID);
        Order.ComandasList[index2] = comanda;
        let cobro = 0;
        Order.ComandasList.forEach(comanda => {
            cobro += comanda.Propiedades.precio;
        });
        setCobroPendiente(prevCobroPendiente => {
            return cobro;
        });
    };

    const handleRemoveComanda = (comanda) => {
        // find the index of the comanda in comandas
        const index = comandas.findIndex(c => c.UniqueID === comanda.UniqueID);
        // remove the comanda from comandas
        setComandas(prevComandas => {
            const newComandas = [...prevComandas];
            newComandas.splice(index, 1);
            return newComandas;
        });
        // remove the comanda from Order.ComandasList
        const index2 = Order.ComandasList.findIndex(c => c.UniqueID === comanda.UniqueID);
        Order.ComandasList.splice(index2, 1);
        let cobro = 0;
        Order.ComandasList.forEach(comanda => {
            cobro += comanda.Propiedades.precio;
        });
        setCobroPendiente(prevCobroPendiente => {
            return cobro;
        });
    };

    // const handleRemoveOrder = () => {
    //     // find the index of the order in orders
    //     const index = orders.findIndex(o => o.OrderID === Order.OrderID);
    //     // remove the order from orders
    //     setOrders(prevOrders => {
    //         const newOrders = [...prevOrders];
    //         newOrders.splice(index, 1);
    //         return newOrders;
    //     });
    // };



    /* Separa el string en palabras, deja la primera como mayuscula, el resto como minusculas y después quita los espacios */
    function capitalizeFirstLetter(string) {
        const words = string.split(' ');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        const capitalizedString = capitalizedWords.join('');
        return capitalizedString;
    }

    const handleAddComanda = (buttonName) => {
        const buttonValue = capitalizeFirstLetter(buttonName[0]);
        const comandaId = `${Order.OrderID}_${comandaCount}`;
        
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
            Precio: precio,
            Status: "Preparando",

            Propiedades: [],
            switch_llevar_aqui: false, // false: Llevar, true: Aquí
            switch_preparando_entregado: false, // false: Preparando, true: Entregado
            switch_nota: false, // false: No hay nota, true: Hay nota
            text_nota: "", // Nota
        };
        if (buttonValue == 'Postre'){
            // Reproducir audio de postres
            const audio = new Audio("/ComandaAudios/Solicitan un-0001.wav");
            audio.play();
            const newPropiedades = {
                precio: 30,
                image: 'icons/btn_postre.png',
                selectedTamano: 'mediano',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'PayDeLimón'){
            // Reproducir audio de pay de limón
            const audio = new Audio("/ComandaAudios/Solicitan un-0002.wav");
            audio.play();
            const newPropiedades = {
                precio: 40,
                image: 'icons/btn_pay_de_limon.png',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'PastelImposible'){
            // Reproducir audio de pastel imposible
            const audio = new Audio("/ComandaAudios/Solicitan un-0003.wav");
            audio.play();
            const newPropiedades = {
                precio: 50,
                image: 'icons/btn_pastel_imposible.png',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'ChesseCakeZarzamora'){
            // Reproducir audio de chesse cacke de zarzamora
            const audio = new Audio("/ComandaAudios/Solicitan un-CheeseCakeZarzamora.wav");
            audio.play();
            const newPropiedades = {
                precio: 50,
                image: 'icons/btn_chesse_cacke_zarzamora.png',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Cerezas'){
            // Reproducir audio de cerezas
            const audio = new Audio("/ComandaAudios/Solicitan un-Cerezas.wav");
            audio.play();
            const newPropiedades = {
                precio: 40,
                image: 'icons/btn_cerezas.png',
                selectedTamano: 'vaso_de_cerezas',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'VasosDeEsquites'){
            // Reproducir audio de vasos de esquites
            const audio = new Audio("/ComandaAudios/Solicitan un-0004.wav");
            audio.play();
            const newPropiedades = {
                precio: 25,
                image: 'icons/btn_vasos_de_esquites.png',
                selectedTamano: 'chico',
                cb_mayonesa: false,
                cb_qrayado: false,
                cb_chilepiquin: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Doriesquites'){
            // Reproducir audio de doriesquites
            const audio = new Audio("/ComandaAudios/Solicitan un-0005.wav");
            audio.play();
            const newPropiedades = {
                precio: 40,
                image: 'icons/btn_doriesquites.png',
                selectedDoritos: 'dor._nachos_(rojos)',
                cb_mayonesa: false,
                cb_qrayado: false,
                cb_qamarillo: false,
                cb_chilepiquin: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Dorilocos'){
            // Reproducir audio de dorilocos
            const audio = new Audio("/ComandaAudios/Solicitan un-Dorilocos.wav");
            audio.play();
            const newPropiedades = {
                precio: 30,
                image: 'icons/btn_dorilocos.png',
                selectedDoritos: 'dor._nachos_(rojos)',
                cb_chamoy: false,
                cb_miguelito: false,
                cb_tajin: false,
                cb_valentina: false,
                cb_botanera: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'MaruchanLoca'){
            // Reproducir audio de maruchan loca
            const audio = new Audio("/ComandaAudios/Solicitan un-0006.wav");
            audio.play();
            const newPropiedades = {
                precio: 60,
                image: 'icons/btn_maruchan_loca.png',
                selectedMaruchan: 'camarón',
                selectedDoritos: 'dor._nachos_(rojos)',
                cb_mayonesa: false,
                cb_qrayado: false,
                cb_qamarillo: false,
                cb_chilepiquin: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'MaruchanConSuadero'){
            // Reproducir audio de maruchan con suadero
            const audio = new Audio("/ComandaAudios/Solicitan un-0007.wav");
            audio.play();
            const newPropiedades = {
                precio: 45,
                image: 'icons/btn_maruchan_con_suadero.png',
                selectedMaruchan: 'camarón',
                cb_cebolla: false,
                cb_cilantro: false,
                cb_salsadetacos: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'MaruchanSola'){
            // Reproducir audio de maruchan sola
            const audio = new Audio("/ComandaAudios/Solicitan un-MaruchanSola.wav");
            audio.play();
            const newPropiedades = {
                precio: 25,
                image: 'icons/btn_maruchan_loca.png',
                selectedMaruchan: 'camarón',
                cb_valentina: false,
                cb_limón: false,
                cb_sal: false,
                cb_jugomaggi: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'PapasALaFrancesa'){
            // Reproducir audio de papas a la francesa
            const audio = new Audio("/ComandaAudios/Solicitan un-0008.wav");
            audio.play();
            const newPropiedades = {
                precio: 40,
                image: 'icons/btn_papas_a_la_francesa.png',
                selectedTamano: 'orden',
                cb_qamarillo: false,
                cb_mayonesa: false,
                cb_catsup: false,
                cb_valentina: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Salchipulpos'){
            // Reproducir audio de salchipulpos
            const audio = new Audio("/ComandaAudios/Solicitan un-Salchipulpos.wav");
            audio.play();
            const newPropiedades = {
                precio: 50,
                image: 'icons/btn_salchipulpos.png',
                selectedSalchipulpo: 'orden_de_5',
                cb_qamarillo: false,
                cb_mayonesa: false,
                cb_catsup: false,
                cb_valentina: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Nuggets'){
            // Reproducir audio de nuggets
            const audio = new Audio("/ComandaAudios/Solicitan un-Nuggets.wav");
            audio.play();
            const newPropiedades = {
                precio: 60,
                image: 'icons/btn_nuggets.png',
                selectedNuggetOptions: 'con_papas_a_la_francesa',
                cb_qamarillo: false,
                cb_mayonesa: false,
                cb_catsup: false,
                cb_valentina: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'RebanadaDePizza'){
            // Reproducir audio de rebanada de pizza
            const audio = new Audio("/ComandaAudios/Solicitan un-0009.wav");
            audio.play();
            const newPropiedades = {
                precio: 25,
                image: 'icons/btn_rebanada_de_pizza.png',
                selectedTamanoPizza: 'rebanada',
                selectedSaborPizza: 'pepperoni',
                cb_catsup: false,
                cb_valentina: false,
                cb_jugomaggi: false,
                cb_salsainglesa: false,
                switch_papas: false,
                papas_cb_qamarillo: false,
                papas_cb_mayonesa: false,
                papas_cb_catsup: false,
                papas_cb_valentina: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'HotDog'){
            // Reproducir audio de hotdog
            const audio = new Audio("/ComandaAudios/Solicitan un-0010.wav");
            audio.play();
            const newPropiedades = {
                precio: 30,
                image: 'icons/btn_hotdog.png',
                selectedHotDog: 'sencillo',
                cb_jitomate: false,
                cb_cebolla: false,
                cb_chiles: false,
                cb_mayonesa: false,
                cb_catsup: false,
                cb_mostaza: false,
                switch_papas: false,
                papas_cb_qamarillo: false,
                papas_cb_mayonesa: false,
                papas_cb_catsup: false,
                papas_cb_valentina: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Sincronizadas'){
            // Reproducir audio de sincronizadas
            const audio = new Audio("/ComandaAudios/Solicitan un-0011.wav");
            audio.play();
            const newPropiedades = {
                precio: 45,
                image: 'icons/btn_sincronizadas.png',
                cb_lechuga: false,
                cb_jitomate: false,
                cb_qamarillo: false,
                cb_chile: false,
                cb_mayonesa: false,
                cb_catsup: false,
                switch_papas: false,
                papas_cb_qamarillo: false,
                papas_cb_mayonesa: false,
                papas_cb_catsup: false,
                papas_cb_valentina: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Ensaladas'){
            // Reproducir audio de ensaladas
            const audio = new Audio("/ComandaAudios/Solicitan un-0012.wav");
            audio.play();
            const newPropiedades = {
                precio: 50,
                image: 'icons/btn_ensaladas.png',
                selectedProteina: 'pollo',
                selectedCrocante: 'crotones',
                cb_miel_con_mostaza: false,
                cb_tamarindo: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'AlitasBbq'){
            // Reproducir audio de alitas BBQ
            const audio = new Audio("/ComandaAudios/Solicitan un-0013.wav");
            audio.play();
            const newPropiedades = {
                precio: 95,
                image: 'icons/btn_alitas_bbq.png',
                selectedAlitasBBQ: 'orden_de_6',
                cb_bbq: false,
                cb_catsup: false,
                cb_valentina: false,
                cb_jugomaggi: false,
                cb_salsainglesa: false,
                cb_tajin: false,
                switch_papas: true,
                papas_cb_qamarillo: false,
                papas_cb_mayonesa: false,
                papas_cb_catsup: false,
                papas_cb_valentina: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'CostillasBbq'){
            // Reproducir audio de alitas BBQ
            const audio = new Audio("/ComandaAudios/Solicitan un-CostillasBbq.wav");
            audio.play();
            const newPropiedades = {
                precio: 110,
                image: 'icons/btn_costillas_bbq.png',
                selectedCostillasBbq: 'orden_de_2',
                cb_bbq: false,
                cb_catsup: false,
                cb_valentina: false,
                cb_jugomaggi: false,
                cb_salsainglesa: false,
                cb_tajin: false,
                switch_papas: true,
                papas_cb_qamarillo: false,
                papas_cb_mayonesa: false,
                papas_cb_catsup: false,
                papas_cb_valentina: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Hamburguesas'){
            // Reproducir audio de hamburguesas
            const audio = new Audio("/ComandaAudios/Solicitan un-0014.wav");
            audio.play();
            const newPropiedades = {
                precio: 47,
                image: 'icons/btn_hamburguesas.png',
                selectedHamburguesa: 'sencilla',
                cb_lechuga: false,
                cb_jitomate: false,
                cb_cebolla: false,
                cb_mayonesa: false,
                cb_mostaza: false,
                cb_catsup: false,
                cb_chiles: false,
                switch_papas: false,
                papas_cb_qamarillo: false,
                papas_cb_mayonesa: false,
                papas_cb_catsup: false,
                papas_cb_valentina: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'PizzaCompleta'){
            // Reproducir audio de pizza completa
            const audio = new Audio("/ComandaAudios/Solicitan un-PizzaCompleta.wav");
            audio.play();
            const newPropiedades = {
                precio: 180,
                image: 'icons/btn_pizza_completa.png',
                selectedMitad1: 'pepperoni',
                selectedMitad2: 'pepperoni',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'BubbleWaffles'){
            // Reproducir audio de bubble waffles
            const audio = new Audio("/ComandaAudios/Solicitan un-0015.wav");
            audio.play();
            const newPropiedades = {
                precio: 60,
                image: 'icons/btn_bubble_waffles.png',
                selectedSaborWaffle: 'brillitos',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Donas'){
            // Reproducir audio de donas
            const audio = new Audio("/ComandaAudios/Solicitan un-0016.wav");
            audio.play();
            const newPropiedades = {
                precio: 40,
                image: 'icons/btn_donas.png',
                selectedBase: 'lechera',
                selectedFruta: 'fresas',
                cb_turin: false,
                cb_gotas_bicolor: false,
                cb_gotas_blancas: false,
                cb_oreo: false,
                cb_lunetas: false,
                cb_laposse: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'PlatanosFritos'){
            // Reproducir audio de platanos fritos
            const audio = new Audio("/ComandaAudios/Solicitan un-PlatanosFritos.wav");
            audio.play();
            const newPropiedades = {
                precio: 40,
                image: 'icons/btn_platanos_fritos.png',
                selectedTamano: 'orden',
                cb_crema: false,
                cb_lechera: false,
                cb_mermelada: false,
                cb_chispas: false,
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Ponche'){
            // Reproducir audio de ponche
            const audio = new Audio("/ComandaAudios/Solicitan un-Ponche.wav");
            audio.play();
            const newPropiedades = {
                precio: 20,
                image: 'icons/btn_ponche.png',
                selectedTamano: 'vaso',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Frappés'){
            // Reproducir audio de frappes
            const audio = new Audio("/ComandaAudios/Solicitan un-0017.wav");
            audio.play();
            const newPropiedades = {
                precio: 48,
                image: 'icons/btn_frappes.png',
                selectedSaborFrappe: 'oreo',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Malteadas'){
            // Reproducir audio de malteadas
            const audio = new Audio("/ComandaAudios/Solicitan un-0018.wav");
            audio.play();
            const newPropiedades = {
                precio: 58,
                image: 'icons/btn_malteadas.png',
                selectedSaborMalteada: 'fresa',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Esquimos'){
            // Reproducir audio de esquimos
            const audio = new Audio("/ComandaAudios/Solicitan un-0019.wav");
            audio.play();
            const newPropiedades = {
                precio: 25,
                image: 'icons/btn_esquimos.png',
                selectedSaborEsquimo: 'fresa',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Cafés'){
            // Reproducir audio de cafes
            const audio = new Audio("/ComandaAudios/Solicitan un-0020.wav");
            audio.play();
            const newPropiedades = {
                precio: 15,
                image: 'icons/btn_cafes.png',
                selectedSaborCafe: 'americano',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'BubbleSodas'){
            // Reproducir audio de bubble sodas
            const audio = new Audio("/ComandaAudios/Solicitan un-0021.wav");
            audio.play();
            const newPropiedades = {
                precio: 55,
                image: 'icons/btn_bubble_sodas.png',
                selectedJarabe: 'mora_azul',
                selectedPerlas: 'mora_azul',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'BombaDeChocolate'){
            // Reproducir audio de bomba de chocolate
            const audio = new Audio("/ComandaAudios/Solicitan un-BombaDeChocolate.wav");
            audio.play();
            const newPropiedades = {
                precio: 45,
                image: 'icons/btn_bomba_de_chocolate.png',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'AguasFrescas'){
            // Reproducir audio de aguas frescas
            const audio = new Audio("/ComandaAudios/Solicitan un-0023.wav");
            audio.play();
            const newPropiedades = {
                precio: 25,
                image: 'icons/btn_aguas_frescas.png',
                selectedTamano: '1_litro',
            }
            newComanda.Propiedades = newPropiedades;
        }
        if (buttonValue == 'Refrescos'){
            // Reproducir audio de refrescos
            const audio = new Audio("/ComandaAudios/Solicitan un-0024.wav");
            audio.play();
            const newPropiedades = {
                precio: 13,
                image: 'icons/btn_refrescos.png',
                selectedTamano: 'coca_600_ml_(taquera)',
            }
            newComanda.Propiedades = newPropiedades;
        }
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
            const newCobroPendiente = prevCobroPendiente + newComanda.Propiedades.precio;
            return newCobroPendiente;
        });
    };

    const enviarMensaje = (data) => {
        handleAddComanda(data)
        socket.emit('NuevaComandaDesdeCliente', { data });
      };
    
    const actualizarMensaje = (data) => {
        console.log("data", data)
        handleUpdateComanda(data)
        socket.emit('UpdateComandaDesdeCliente', { data });
    }
    
    useEffect(() => {
    socket.on('NuevaComandaDesdeServidor', (data) => {
        handleAddComanda(data.data)
        console.log("Comandas nuevas", Order);
    });

    return () => {
        socket.off('NuevaComandaDesdeServidor');
    };
    }, []);


    useEffect(() => {
    socket.on('UpdateComandaDesdeServidor', (data) => {
        console.log("Actualizando comanda con la data", data.data);
        handleUpdateComanda(data.data);
        console.log("Comandas nuevas", Order);
    });

    return () => {
        socket.off('UpdateComandaDesdeServidor');
    };
    }, []);

    const handleSlideChange = (newSlide) => {
        const maxSlide = Math.ceil(TOTAL_BUTTONS / BUTTONS_PER_SLIDE);
        if (newSlide > 0 && newSlide <= maxSlide) {
            setSlide(newSlide);
        }
    };

    const renderComandas = () => {
        return comandas.map((comanda, i) => (
            <Comanda key={(Order.OrderID*1000)+comanda.ComandaID} index={(Order.OrderID*1000)+comanda.ComandaID} comanda={comanda} platillo={comanda.Platillo} platillo_espacios={comanda.Platillo_espacios} lock={orderLockStatus} handleUpdateComanda={actualizarMensaje} handleRemoveComanda={handleRemoveComanda} />
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
                        onClick={() => enviarMensaje(BUTTON_NAMES_DEFAULT[i])}
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
                            <img src={BUTTON_ICONS[i]} alt="" style={{ width: '60px', height: '60px' }} />
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
                            <img src={BUTTON_ICONS[i]} alt="" style={{ width: '60px', height: '60px' }} />
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
        pointerEvents: orderLockStatus ? 'auto' : 'auto'
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
        pointerEvents: orderLockStatus ? 'auto' : 'auto'
    };

    const slider_row_slide = {
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        /* Ocultar cuando Interfaz == true */
        display: !Interfaz ? 'flex' : 'flex'
    };

    return (
        <div className={`col-xl-${12/ComandasPerScreen} d-flex justify-content-center`}>
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
                            <FontAwesomeIcon icon={orderLockStatus ? faDollarSign : faDollarSign} size="2x" style={{opacity: !Interfaz ? '1' : '1'}}/>
                        </button>
                    </div>
                </div>
                <div className='row mb-3'> {/* row for the order header */}
                    <div className='col' style={{ display: 'flex', justifyContent: 'space-between' }}> {/* row for the order id and the pending payment */}
                        <div style={OrderIdStyle}>{`Número de Pedido: ${Order.OrderID}`}</div>
                        <div style={{fontSize: "25px", fontWeight: "bold", color: "red"}}>{`Por cobrar: $${CobroPendiente}`}</div>
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
        </div>
    );
};

export default Orden;

import './PlatilloSelector.css';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import platillosApi from '../../api/platillosApi';

const PlatilloSelector = ({addPlatilloToOrder}) => {
    const [platillos, setPlatillos] = useState([]);
    const [numPlatillos, setNumPlatillos] = useState(0);
    const [numPlatilloButtonsPerSlide, setNumPlatilloButtonsPerSlide] = useState (4);
    const containerRef = useRef(null);
    const [slide, setSlide] = useState(1);
    const fetchPlatillos = () => {
        platillosApi.getPlatillos()
        .then(data => {
            setPlatillos(prevPlatillos => {return (data);});
            setNumPlatillos(prevNumPlatillos => {return data.length;});
        })
        .catch(err => {
            console.log(err)
            alert("Error al cargar las comandas");
        });
    };
    useEffect(() => {
        fetchPlatillos();
    }, []);
    const handleSlideChange = (newSlide) => {
        const maxSlide = Math.ceil(numPlatillos / numPlatilloButtonsPerSlide);
        if (newSlide > 0 && newSlide <= maxSlide) {
            setSlide(newSlide);
        }
    };
    const updateNumPlatilloButtonsPerSlide = (width) => {
        const buttonWidth = 85;
        const newButtonsPerSlide = Math.floor(width / buttonWidth)*2;
        setNumPlatilloButtonsPerSlide(prevNumPlatilloButtonsPerSlide => {
            return newButtonsPerSlide;
        });
    }
    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                updateNumPlatilloButtonsPerSlide(width);
            }
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, []);
    const renderButtons = () => {
        const buttons = [];
        const start = (slide - 1) * numPlatilloButtonsPerSlide;
        const end = Math.min(slide * numPlatilloButtonsPerSlide, numPlatillos);
        for (let i = start; i < end; i++) {
            if (platillos[i].Disponibilidad !== 0) {
                buttons.push(
                    <button key={i} className="platilloButton" onClick={() => addPlatilloToOrder(platillos[i])}>
                        <div className="divImagePlatilloButton">
                            <img src={platillos[i].Imagen} alt={platillos[i].NombrePlatillo} style={{ width: '60px', height: '60px' }} />
                        </div>
                        <div className="textPlatilloButton">{platillos[i].NombrePlatillo}</div>
                    </button>
                );
            }
            else {
                buttons.push(
                    <button key={i} className="platilloButton disabled" onClick={() => alert("Platillo no disponible")}>
                        <div className="divImagePlatilloButton">
                            <img src={platillos[i].Imagen} alt={platillos[i].NombrePlatillo} style={{ width: '60px', height: '60px' }} />
                        </div>
                        <div className="textPlatilloButton">{platillos[i].NombrePlatillo}</div>
                    </button>
                );
            }

        }
        return buttons;
    };

    return (
        <div className="row">
            <div className="col-2 containerArrowPlatillosButton">
                <button className="buttonArrowPlatillosSelector" onClick={() => handleSlideChange(slide - 1)}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} size="3x" /> {/* Increased size */}
                </button>
            </div>
            <div className="col-8">
                <div className="row slider_row_slide" ref={containerRef}>
                    {renderButtons()}
                </div>
            </div>
            <div className="col-2 containerArrowPlatillosButton">
                <button className="buttonArrowPlatillosSelector" onClick={() => handleSlideChange(slide + 1)}>
                    <FontAwesomeIcon icon={faArrowCircleRight} size="3x" /> {/* Increased size */}
                </button>
            </div>
        </div>
    )
}

export default PlatilloSelector;
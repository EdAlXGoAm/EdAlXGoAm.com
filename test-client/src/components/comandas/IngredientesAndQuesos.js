import React from 'react';

const IngredientesAndQuesos = ({ selectedSabor, ingredientesPorSabor }) => {
    let ingredientes = '';
    let quesos = '';

    const ingredientListStyle = {
        listStyle: 'none',
        paddingLeft: 0,
        color: 'white',
        textDecoration: 'underline',
        fontWeight: 'bold',
    };
    const contentListStyle = {
        backgroundColor: 'black',
        padding: '5px 0px',
        margin: '0px 0px 15px 0px',
        borderRadius: '5px',
    };

    // Obtén los ingredientes y quesos del sabor seleccionado
    if (selectedSabor) {
        ingredientes = ingredientesPorSabor[`array_${selectedSabor}`][0];
        quesos = ingredientesPorSabor[`array_${selectedSabor}`][1];
    }

    const arr_ingredientes = ingredientes.split(", ");
    const arr_quesos = quesos.split(", ");

    return (
        <div>
            <div className="row" style={contentListStyle}>
                <div className="col-6">
                    {arr_ingredientes.map((ingrediente, index) => (
                        <div>
                            &nbsp;
                            <a style={ingredientListStyle}>{ingrediente}</a>
                        </div>
                    ))}
                </div>
                <div className="col-6">
                    {arr_quesos.map((queso, index) => (
                        <div>
                            &nbsp;
                            <a style={ingredientListStyle}>{queso}</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IngredientesAndQuesos;

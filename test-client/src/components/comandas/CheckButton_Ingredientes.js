import React, { useState, useEffect } from 'react';

const CheckButton_Ingredientes = ({ index, opciones_in, toggleChecked }) => {
    // Asignar opciones_in directamente a opciones
    const opcionesPredeterminadas = ['Opciones'];
    const opciones = opciones_in && opciones_in.length > 0 ? opciones_in : opcionesPredeterminadas;

    // Mantén un estado local para cada checkbox
    const [checkboxStates, setCheckboxStates] = useState(opciones.map(() => false));

    // Función para manejar el cambio de estado de un checkbox individual
    const handleCheckboxChange = (index) => {
        if (!toggleChecked) {
            const newCheckboxStates = [...checkboxStates];
            newCheckboxStates[index] = !checkboxStates[index];
            setCheckboxStates(newCheckboxStates);
        }
    };

    // Actualiza el estado de los checkboxes cuando toggleChecked cambia
    useEffect(() => {
      if (toggleChecked) {
        setCheckboxStates(opciones.map(() => true));
      }
    }, [toggleChecked]);

    return (
        <div>
            {opciones.map((opcion, local_index) => (
                <div key={local_index}>
                    <input
                        type="checkbox"
                        id={`${index}_opcion_${local_index}`} // Puedes usar un id único para cada checkbox
                        className="tu-clase-aqui" // Agrega tus clases CSS aquí
                        checked={checkboxStates[local_index]} // Establecer el estado del checkbox según el estado del interruptor
                        onChange={() => handleCheckboxChange(local_index)}
                        disabled={toggleChecked} // Deshabilitar el checkbox si el interruptor está activado
                    />
                    <label htmlFor={`${index}_opcion_${local_index}`}>&nbsp;{opcion}</label>
                </div>
            ))}
        </div>
    );
};

export default CheckButton_Ingredientes;

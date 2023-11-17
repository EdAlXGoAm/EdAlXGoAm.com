import React, { useState } from 'react';

import CheckButton_Ingredientes from './CheckButton_Ingredientes';

const ToogleButton_CheckButtons = ({ index, platillo, ingredientes_checkbutton }) => {
  const [toggleChecked, setToggleChecked] = useState(false);

  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
  };

  const inputId = `toggle${platillo}All_${index}`;

  return (
    <div>
      <div className="custom-control custom-switch mb-3">
        <input
          type="checkbox"
          className="custom-control-input"
          id={inputId}
          checked={toggleChecked} // Global Variable
          onChange={handleToggleChange} // Event
        />
        <label className="custom-control-label" htmlFor={inputId}>Con todo</label>
      </div>
      <CheckButton_Ingredientes
        index={inputId}
        opciones_in={ingredientes_checkbutton}
        toggleChecked={toggleChecked} />
    </div>
  );
};

export default ToogleButton_CheckButtons;

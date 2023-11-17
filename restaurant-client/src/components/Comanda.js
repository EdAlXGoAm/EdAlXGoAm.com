import Hamburguesa from './Hamburguesa';
// Component Comanda
const Comanda = ({ comanda, buttonName }) => {
  const ComandaStyleFondo = {
    margin: '0px 10px 10px 10px',
  };
  const ComandaStyleText = {
    fontSize: "20px",
    color: '#000',
    backgroundColor: '#abe1e3', // Color de fondo pastel
    borderRadius: '40px',       // Bordes redondeados
    padding: '0px 10px',       // Padding para no pegar el texto a los bordes
    margin: '0px 10px 0px 10px',
  };
  const divStyle = {
    fontWeight: 'bold',
    border: '5px solid #FFC0CB',
    borderRadius: '15px',
    padding: '15px',
  }
  const id = 0;
  const día = '09 Nov 2023';
  const status = 'Preparando';

  function capitalizeFirstLetter(string) {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    const capitalizedString = capitalizedWords.join('');
    return capitalizedString;
  }
  const buttonValue = capitalizeFirstLetter(buttonName[0]);

  return (
        <div className="card-body mb-3" style={divStyle}>
          <div className="row mb-3">
            <div className='col'>
              
              <h1 className="title" style={ComandaStyleText}>{buttonName[0]}</h1>
            </div>
          </div>
          <div className="row">
            <div className='col'>
              <Hamburguesa comandaId={comanda.comandaID} />
            </div>
          </div>
        </div>
  );
};

export default Comanda;
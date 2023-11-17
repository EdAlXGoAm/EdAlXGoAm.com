import Hamburguesa from './Hamburguesa';
// Component Comanda
const Comanda = ({ comandaId, orderId, width_div, buttonName, buttonValue }) => {
  const ComandaStyleFondo = {
    margin: '0px 10px 10px 10px',
  };
  const ComandaStyleText = {
    fontSize: "20px",
    color: '#000',
    backgroundColor: '#abe1e3', // Color de fondo pastel
    borderRadius: '40px',       // Bordes redondeados
    padding: '0px 10px',       // Padding para no pegar el texto a los bordes
    margin: '0px 10px 10px 0px',
  };
  const divStyle = {
    width: width_div,
    fontWeight: 'bold',
    border: '5px solid #FFC0CB',
    borderRadius: '15px',
    margin: '15px',
    padding: '15px',
  }
  const id = 0;
  const día = '09 Nov 2023';
  const status = 'Preparando';
  return (
    <div style={divStyle}>
      <div style={{ textAlign: 'center' }}>
        <div style={ComandaStyleFondo}>
          <h1 className="title" style={ComandaStyleText}>{buttonName}</h1>
        </div>
      </div>
      <Hamburguesa comandaId={comandaId} />
    </div>
  );
};

export default Comanda;
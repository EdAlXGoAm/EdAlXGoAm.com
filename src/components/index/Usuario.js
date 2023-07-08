// Component Usuario
const Usuario = () => {
    const color = 'red';
    const nombre = 'Juan';
    const amigos = ['Pedro', 'Pablo', 'Maria'];
    return (
      <div>
        <h1 className="title" style={{ color: color }}>Hola {nombre}!</h1>
        <p>Tu lista de amigos es:</p>
        <ul>
          {amigos.map((amigo, index) => {
            return <li key={index}>{amigo}</li>;
          })}
        </ul>
      </div>
    );
  };

  export default Usuario;
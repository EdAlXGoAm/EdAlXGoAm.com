import React from 'react';
import ReactDOM from 'react-dom/client';
import Usuario from './components/index/usuario';
import FormLogin from './components/index/FormLogin';
const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [session, setSession] = React.useState(false);
  return (
    <React.StrictMode>
      {session === true ?
        <>
          <h1>Session is true</h1>
          <Usuario color="green" nombre="Alexis" amigos={['Pedro', 'Pablo', 'Maria']}/>
          {/* <button onClick={() => setSession(false)}>Cerrar sesión</button> */}
        </>
        : 
        <>
          <FormLogin />
          {/* <button onClick={() => setSession(true)}>Iniciar sesión</button> */}
        </>}
    </React.StrictMode>
  );
};

root.render(<App />);
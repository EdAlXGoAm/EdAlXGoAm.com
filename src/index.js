import React from 'react';
import ReactDOM from 'react-dom/client';
import Usuario from './components/index/Usuario';
const root = ReactDOM.createRoot(document.getElementById('root'));

const session = true;

const App = () => {
  return (
    <React.StrictMode>
      {session === true ? <Usuario /> : <h1>Session is false</h1>}
    </React.StrictMode>
  );
};

root.render(<App />);
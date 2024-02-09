import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MeseroPage from './routes/MeseroPage'

const MeseroScreen = ({modeInterface}) => {
  return (
    <MeseroPage modeInterface={modeInterface}/>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MeseroScreen modeInterface={true}/>} />
        <Route path="/cocina" element={<MeseroScreen modeInterface={false}/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

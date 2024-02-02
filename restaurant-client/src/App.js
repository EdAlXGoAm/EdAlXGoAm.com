import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MeseroPage from './routes/MeseroPage'

const MeseroScreen = () => {
  return (
    <MeseroPage />
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MeseroScreen />} />
        <Route path="/mesero" element={<MeseroScreen />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

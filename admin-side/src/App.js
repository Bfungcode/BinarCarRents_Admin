import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cars from './pages/cars';
import Dashboard from './pages/dashboard';

const App = () => {
  return (
    // route menentukan URL
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
    </>
  );
};

export default App;

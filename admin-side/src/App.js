import './App.css';
import './styles/LoginForm.css'
import './styles/cars.css'
import { Route, Routes } from 'react-router-dom'
import Cars from './pages/cars';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    // route menentukan URL
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='cars' element={<Cars />} />
      </Routes>
    </>
  );
};

export default App;

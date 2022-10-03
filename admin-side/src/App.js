import './App.css';
import './styles/LoginForm.css'
import './styles/cars.css'
import { Route, Routes } from 'react-router-dom'
import Cars from './pages/cars';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/dashboard';

const App = () => {
  return (
    // route menentukan URL
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='cars' element={<Cars />} />
      </Routes>
    </>
  );
};

export default App;

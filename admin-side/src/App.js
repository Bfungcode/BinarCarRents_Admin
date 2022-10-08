import './styles/cars.css'
import { Route, Routes } from 'react-router-dom'
import Cars from './pages/cars';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CarAddEditPage from './pages/CarAddEditPage';
import Cars from './pages/CarsPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import './styles/cars.css';
import './styles/LoginForm.css';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    // route menentukan URL
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="cars">
          <Route index element={<Cars />} />
          <Route path="add" element={<CarAddEditPage />} />
          <Route path=":id" element={<CarAddEditPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

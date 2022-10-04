import { Route, Routes } from 'react-router-dom';
import './App.css';
import CarAddEditPage from './pages/CarAddEditPage';
import Cars from './pages/CarsPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import './styles/Cars.css';
import './styles/LoginForm.css';

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

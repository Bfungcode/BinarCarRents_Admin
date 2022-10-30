import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CarAddEditPage from './pages/CarAddEditPage';
import Cars from './pages/CarsPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import OrderDetailPage from './pages/OrderDetailPage';
import './styles/cars.css';
import './styles/Dashboard.css';
import './styles/LoginForm.css';

const App = () => {
  return (
    // route menentukan URL
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="dashboard">
          <Route index element={<DashboardPage />} />
          <Route path=":orderId" element={<OrderDetailPage />} />
        </Route>
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

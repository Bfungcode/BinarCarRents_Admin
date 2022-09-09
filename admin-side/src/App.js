import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './routing/HomePage';
import NotFound from './routing/NotFound';
import LoginPage from './routing/LoginPage';

const App = () => {
  return (
    // route menentukan URL
    <>
    <Routes>  
      {/* url "/" untuk login, */}
      <Route path="/" element={<LoginPage />}/>
      <Route path="/home" element={<HomePage />} /> 
      <Route path='*' element={<NotFound />} />
    </Routes>

      {/* <Routes>
        <Route path="/" element={<LandingPage />} />

      </Routes> */}
    </>
  );
};

export default App;

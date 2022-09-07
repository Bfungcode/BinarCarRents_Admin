import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    // route menentukan URL
    <>
    <Routes>  
      {/* url "/" untuk login, */}
      <Route path="/" element={<LoginPage />}/>
      <Route path="/home" element={<Homepage />} /> 
      <Route path='*' element={<NotFound />} />
    </Routes>

      {/* <Routes>
        <Route path="/" element={<LandingPage />} />

      </Routes> */}
    </>
  );
};

export default App;

import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './components/navbar/Navbar';
import Dashbaord from './pages/dashboard/Dashbaord';


const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<> <Navbar /><LandingPage /></>} />
        <Route path="/dashboard" element={<Dashbaord />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );

};

export default App;

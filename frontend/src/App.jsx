import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './components/navbar/Navbar';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );

};

export default App;

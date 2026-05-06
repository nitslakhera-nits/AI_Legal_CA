import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './components/navbar/Navbar';
import DashboardLayout from './layouts/DashboardLayout';
import { ResetPassword } from './components/auth/ResetPassword';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Navbar /><LandingPage /></>} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );

};

export default App;

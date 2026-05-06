import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import CADashboard from '../pages/dashboard/CADashboard';
import AdvocateDashboard from '../pages/dashboard/AdvocateDashboard';
import HybridDashboard from '../pages/dashboard/HybridDashboard';

const DashboardLayout = () => {
  const navigate = useNavigate();

  // Get user role from localStorage (saved during login)
  const userRole = localStorage.getItem('userRole');
  const role = userRole?.trim().toLowerCase();

  useEffect(() => {
    // If no role found, redirect to home
    if (!userRole) {
      navigate('/');
    }
  }, [userRole, navigate]);

  // Select dashboard based on role
  const getDashboard = () => {
    switch (role) {
      case 'ca':
        return <CADashboard />;
      case 'advocate':
        return <AdvocateDashboard />;
      case 'hybrid':
        return <HybridDashboard />;

    }
  };

  return (
    <Sidebar>
      {getDashboard()}
    </Sidebar>
  );
};

export default DashboardLayout;

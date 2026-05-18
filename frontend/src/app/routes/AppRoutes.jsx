import { Routes, Route, Navigate } from "react-router-dom";
import { ResetPassword } from "../../components/auth/ResetPassword";
import useRole from "../../hooks/auth/useRole";
import { LandingPage } from "../../pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import advocateRoutes from "./roleRoutes/advocateRoutes";
import caRoutes from "./roleRoutes/caRoutes";
import hybridRoutes from "./roleRoutes/hybridRoutes";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ROLES } from "../../utils/constants/roles";
// import Navbar from "../../components/navbar/Navbar"
import { Navbar } from "../../components/navbar/Navbar"



const AppRoutes = () => {
  const role = useRole();

  let routes = [];

  switch (role) {
    case ROLES.CA:
      routes = caRoutes;
      break;

    case ROLES.ADVOCATE:
      routes = advocateRoutes;
      break;

    case ROLES.HYBRID:
      routes = hybridRoutes;
      break;

    default:
      routes = [];
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<> <Navbar /> <LandingPage /> </>} />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
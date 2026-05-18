import AdvocateDashboard from "../../../pages/dashboard/advocate/AdvocateDashboard";
import CasesPage from "../../../pages/dashboard/advocate/CasesPage";
import ClientsPage from "../../../pages/dashboard/clients/ClientsPage";
import AddClientPage from "../../../components/client/ClientForm";

const advocateRoutes = [
  {
    path: "",
    element: <AdvocateDashboard />,
  },
  {
    path: "cases",
    element: <CasesPage />,
  },
  {
    path: "clients",
    element: <ClientsPage />,
  },
  {
    path: "clients/add",
    element: <AddClientPage />,
  },
];

export default advocateRoutes;
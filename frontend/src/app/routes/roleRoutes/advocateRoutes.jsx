import AdvocateDashboard from "../../../pages/dashboard/advocate/AdvocateDashboard";
import CasesPage from "../../../pages/dashboard/advocate/CasesPage";
import ClientsPage from "../../../pages/dashboard/clients/ClientsPage";
import AddClientPage from "../../../components/client/ClientForm";
import UploadDocumentPage from "../../../pages/document/UploadDocumentPage";
import DocumentsPage from "../../../pages/document/DocumentsPage";
import ClientDocumentsPage from "../../../pages/document/ClientDocumentsPage";
import SingleDocumentPage from "../../../pages/document/SingleDocumentPage";
import EditDocumentPage from "../../../pages/document/EditDocumentPage";
import AIChatbotPage from "../../../pages/ai/AIChatbotPage";

const advocateRoutes = [
  {
    path: "",
    element: <AdvocateDashboard />,
  },
  {
    path: "ai-assistant",
    element: <AIChatbotPage />,
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

  {
    path: "upload-document",
    element: <UploadDocumentPage />
  },
  // ALL DOCUMENTS 
  {
    path: "documents",
    element: <DocumentsPage />
  },
  // CLIENT DOCUMENTS
  {
    path: "client-documents/:clientId",
    element: <ClientDocumentsPage />
  },
  // SINGLE DOCUMENT
  {
    path: "document/:id",
    element: <SingleDocumentPage />
  },
  //EDIT DOCUMENT
  {
    path: "document/edit/:id",
    element: <EditDocumentPage />
  }
];

export default advocateRoutes;
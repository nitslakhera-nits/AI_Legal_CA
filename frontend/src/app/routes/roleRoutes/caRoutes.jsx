import AddClientPage from "../../../components/client/ClientForm";
import CADashboard from "../../../pages/dashboard/ca/CADashboard";
import ClientsPage from "../../../pages/dashboard/clients/ClientsPage";
import UploadDocumentPage from "../../../pages/document/UploadDocumentPage";
import DocumentsPage from "../../../pages/document/DocumentsPage";
import SingleDocumentPage from "../../../pages/document/SingleDocumentPage";
import ClientDocumentsPage from "../../../pages/document/ClientDocumentsPage";
import EditDocumentPage from "../../../pages/document/EditDocumentPage";
import AIChatbotPage from "../../../pages/ai/AIChatbotPage";


const caRoutes = [
    {
        path: "",
        element: <CADashboard />,
    },
    {
        path: "ai-assistant",
        element: <AIChatbotPage />,
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

export default caRoutes;
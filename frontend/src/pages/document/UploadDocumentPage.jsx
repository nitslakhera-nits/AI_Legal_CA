
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetAllClients } from "../../hooks/client/useGetAllClients";
import { useUploadDocument } from "../../hooks/docuement/useUploadDocument";
import { useScanDocument } from "../../hooks/docuement/useScanDocument";

import ClientDropdown from "../../components/document/ClientDropdown";
import DocumentTypeDropdown from "../../components/document/DocumentTypeDropdown";
import FileUploadPreview from "../../components/document/FileUploadPreview";
import DynamicDocumentForm from "../../components/document/DynamicDocumentForm";
import EmptyScanState from "../../components/document/EmptyScanState";

import { DOCUMENT_FIELDS } from "../../utils/constants/documentFields";

const UploadDocumentPage = () => {

    const navigate = useNavigate();

    const { clients } = useGetAllClients();

    const handleUploadDocument = useUploadDocument();
    const handleScanDocument = useScanDocument();

    const [selectedClient, setSelectedClient] = useState(null);
    const [documentType, setDocumentType] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [extractedData, setExtractedData] = useState({});
    const [showManualForm, setShowManualForm] = useState(false);

    const fields = DOCUMENT_FIELDS[documentType] || [];

    // OCR SCAN
    useEffect(() => {

        if (!selectedFile) return;

        handleOCR();

    }, [selectedFile]);

    // OCR
    const handleOCR = async () => {

        try {

            const response =
                await handleScanDocument(selectedFile);

            setExtractedData(response.extractedData);

        } catch (error) {

            console.log(error);
        }
    };

    // SAVE DOCUMENT
    const handleSaveDocument = async () => {

        if (!selectedClient) {
            toast.error("Please select a client");
            return;
        }

        if (!documentType) {
            toast.error("Please select a document type");
            return;
        }

        if (fields.length > 0) {
            const missingField = fields.find((field) => {
                const value = extractedData[field.name];
                return !value || value.toString().trim() === "";
            });

            if (missingField) {
                toast.error("All fields are required");
                return;
            }
        }

        try {

            const formData = new FormData();

            formData.append("clientId", selectedClient._id);
            formData.append("documentType", documentType);

            formData.append(
                "extractedData",
                JSON.stringify(extractedData)
            );

            if (selectedFile) {

                formData.append(
                    "document",
                    selectedFile
                );
            }

            const uploadedDocument =
                await handleUploadDocument(
                    formData,
                    toast
                );

            if (uploadedDocument) {

                navigate("/dashboard/documents");
            }

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-[#f8f8fc] p-4 md:p-5">

            {/* HEADER */}
            <div className="mb-6">

                <h1 className="text-3xl font-bold text-gray-900">
                    Upload Documents
                </h1>

                <p className="text-gray-500 mt-1 text-sm">
                    Upload and manage client documents
                </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                {/* LEFT CARD */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                    <h2 className="text-xl font-semibold text-gray-900 mb-5">
                        Document Information
                    </h2>

                    <div className="space-y-5">

                        <ClientDropdown
                            clients={clients}
                            selectedClient={selectedClient}
                            setSelectedClient={setSelectedClient}
                        />

                        <DocumentTypeDropdown
                            documentType={documentType}
                            setDocumentType={setDocumentType}
                        />

                        <FileUploadPreview
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                        />

                        <button
                            onClick={() => setShowManualForm(true)}
                            className="
                                w-full
                                bg-purple-600
                                hover:bg-purple-700
                                text-white
                                py-3
                                rounded-xl
                                font-medium
                                transition-all
                            "
                        >

                            Fill Manually

                        </button>
                    </div>
                </div>

                {/* RIGHT CARD */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm min-h-[620px]">

                    {
                        Object.keys(extractedData).length > 0 ||
                        showManualForm ? (

                            <div>

                                {/* HEADER */}
                                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">

                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Extracted Document Data
                                    </h2>

                                    <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-xs font-medium">

                                        OCR Detected

                                    </div>
                                </div>

                                {/* FORM */}
                                <DynamicDocumentForm
                                    fields={fields}
                                    formData={extractedData}
                                    setFormData={setExtractedData}
                                />

                                {/* SAVE */}
                                <button
                                    onClick={handleSaveDocument}
                                    className="
                                        mt-6
                                        w-full
                                        bg-purple-600
                                        hover:bg-purple-700
                                        text-white
                                        py-3
                                        rounded-xl
                                        font-medium
                                        text-base
                                        transition-all
                                    "
                                >

                                    Save Document

                                </button>
                            </div>

                        ) : (

                            <EmptyScanState />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default UploadDocumentPage;

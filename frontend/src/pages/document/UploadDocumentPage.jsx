import { toast } from "react-toastify";

import { useEffect, useState } from "react";

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

    const { clients } = useGetAllClients();

    const handleUploadDocument = useUploadDocument();

    const handleScanDocument = useScanDocument();

    const [selectedClient, setSelectedClient] = useState(null);

    const [documentType, setDocumentType] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

    const [extractedData, setExtractedData] = useState({});

    const [showManualForm, setShowManualForm] = useState(false);

    // OCR SCAN
    useEffect(() => {

        if (!selectedFile) return;

        handleOCR();

    }, [selectedFile]);

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

        try {

            const formData = new FormData();

            formData.append("clientId", selectedClient._id);
            formData.append("documentType", documentType);
            formData.append("extractedData", JSON.stringify(extractedData));

            if (selectedFile) {
                formData.append("document", selectedFile);
            }

            await handleUploadDocument(formData, toast);


        } catch (error) {

            console.log(error);


        }
    };

    const fields =
        DOCUMENT_FIELDS[documentType] || [];

    return (

        <div className="min-h-screen bg-[#f8f8fc] p-6">

            {/* PAGE HEADER */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-900">

                    Upload Documents

                </h1>

                <p className="text-gray-500 mt-2">

                    Upload and manage client documents

                </p>

            </div>

            {/* GRID */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* LEFT CARD */}

                <div className="bg-white border border-gray-200 rounded-[30px] p-7 shadow-sm">

                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">

                        Document Information

                    </h2>

                    <div className="space-y-6">

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
                            rounded-2xl
                            font-semibold
                            transition-all
                            duration-300
                            "
                        >

                            Fill Manually

                        </button>

                    </div>

                </div>

                {/* RIGHT CARD */}

                <div className="bg-white border border-gray-200 rounded-[30px] p-7 shadow-sm min-h-[700px]">

                    {
                        Object.keys(extractedData).length > 0 ||
                            showManualForm ? (

                            <div>

                                <div className="flex items-center justify-between mb-6">

                                    <h2 className="text-2xl font-semibold text-gray-900">

                                        Extracted Document Data

                                    </h2>

                                    <div className="
                                    bg-purple-100
                                    text-purple-700
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    ">

                                        OCR Detected

                                    </div>

                                </div>

                                <DynamicDocumentForm
                                    fields={fields}
                                    formData={extractedData}
                                    setFormData={setExtractedData}
                                />

                                <button
                                    onClick={handleSaveDocument}
                                    className="
                                    mt-8
                                    w-full
                                    bg-purple-600
                                    hover:bg-purple-700
                                    text-white
                                    py-4
                                    rounded-2xl
                                    font-semibold
                                    text-lg
                                    transition-all
                                    duration-300
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
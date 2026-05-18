import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FilePenLine } from "lucide-react";
import { useGetSingleDocument } from "../../hooks/docuement/useGetSingleDocument";
import { useUpdateDocument } from "../../hooks/docuement/useUpdateDocument";
import EditDocumentForm from "../../components/document/EditDocumentForm";
// import DynamicDocumentForm from "../../components/document/DynamicDocumentForm";

const EditDocumentPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { document } = useGetSingleDocument(id);
    const handleUpdateDocument = useUpdateDocument();
    const [formData, setFormData] = useState({});

    // SET INITIAL DATA
    useEffect(() => {

        if (document) {

            setFormData(
                document.extractedData || {}
            );
        }

    }, [document]);

    // UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        toast.info(

            <div className="space-y-3">

                <p className="font-medium">

                    Update this document?

                </p>

                <div className="flex gap-2">

                    <button
                        onClick={async () => {

                            const success =
                                await handleUpdateDocument(
                                    id,
                                    {
                                        extractedData:
                                            formData
                                    },
                                    toast
                                );

                            toast.dismiss();

                            navigate(`/dashboard/document/${id}`, { replace: true });
                        }}
                        className="
                            px-4
                            py-2
                            bg-purple-600
                            text-white
                            rounded-lg
                        "
                    >

                        Update

                    </button>

                    <button
                        onClick={() =>
                            toast.dismiss()
                        }
                        className="
                            px-4
                            py-2
                            bg-gray-200
                            rounded-lg
                        "
                    >

                        Cancel

                    </button>
                </div>
            </div>,

            {
                autoClose: false,
                closeOnClick: false
            }
        );
    };

    if (!document) {

        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }

    return (

        <div className="p-6">

            <div
                className="
                    bg-white
                    border
                    rounded-2xl
                    p-6
                    shadow-sm
                    space-y-6
                "
            >

                {/* HEADER */}
                <div className="flex items-center gap-3">

                    <div
                        className="
                            p-3
                            rounded-xl
                            bg-purple-100
                        "
                    >

                        <FilePenLine
                            size={22}
                            className="
                                text-purple-600
                            "
                        />

                    </div>

                    <div>

                        <h1
                            className="
                                text-2xl
                                font-bold
                            "
                        >

                            Edit Document

                        </h1>

                        <p className="text-gray-500">

                            {document.documentType}

                        </p>
                    </div>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <EditDocumentForm
                        documentType={
                            document.documentType
                        }
                        formData={formData}
                        setFormData={setFormData}
                    />

                    <button
                        type="submit"
                        className="
                            px-5
                            py-3
                            rounded-xl
                            bg-purple-600
                            text-white
                            hover:bg-purple-700
                            transition-all
                        "
                    >

                        Save Changes

                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditDocumentPage;

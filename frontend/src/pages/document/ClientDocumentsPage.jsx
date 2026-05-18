
import { useParams } from "react-router-dom";

import { FolderOpen, User } from "lucide-react";
import { useGetClientDocuments } from "../../hooks/docuement/useGetClientDocuments";
import EmptyDocuments from "../../components/document/EmptyDocuments";
import DocumentDetailsCard from "../../components/document/DocumentDetailsCard";
import { toast } from "react-toastify";
import { useDeleteDocument } from "../../hooks/docuement/useDeleteDocument";


const ClientDocumentsPage = () => {

    const { clientId } = useParams();
    const { documents } = useGetClientDocuments(clientId);
    const client = documents[0]?.clientId;
    const handleDeleteDocument = useDeleteDocument();

    const onDelete = async (id) => {

        toast.info(
            <div className="space-y-3">
                <p className="font-medium">Delete this document?</p>

                <div className="flex gap-2">
                    <button
                        onClick={async () => {
                            const success = await handleDeleteDocument(id, toast);
                            toast.dismiss();

                            if (success) {
                                window.location.reload();
                            }
                        }}
                        className="  px-3 py-1  bg-red-500   text-white  rounded-lg" >
                        Yes
                    </button>

                    <button
                        onClick={() => toast.dismiss()}
                        className="  px-3 py-1  bg-gray-300 rounded-lg "  >
                        Cancel
                    </button>

                </div>

            </div>,
            {
                autoClose: false,
                closeOnClick: false,
            }
        );
    };

    return (

        <div className="p-6 space-y-6">


            {/* CLIENT HEADER */}
            {
                client && (

                    <div
                        className="
                bg-white
                border
                border-gray-200
                rounded-xl
                px-5
                py-4
                shadow-sm
            "
                    >

                        <div
                            className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                "
                        >

                            {/* LEFT */}
                            <div className="flex items-center gap-3">

                                {/* ICON */}
                                <div
                                    className="
                            p-2
                            rounded-lg
                            bg-purple-100
                        "
                                >

                                    <User
                                        size={20}
                                        className="text-purple-600"
                                    />

                                </div>

                                {/* INFO */}
                                <div>

                                    <h1
                                        className="
                                text-xl
                                md:text-2xl
                                font-semibold
                                text-gray-800
                            "
                                    >

                                        {client.firstName} {client.lastName}

                                    </h1>

                                    <div
                                        className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                                mt-1
                                text-sm
                                text-gray-500
                            "
                                    >

                                        <span>

                                            Client ID :
                                            {" "}
                                            {client._id}

                                        </span>

                                        <span className="text-gray-300">

                                            |

                                        </span>

                                        <span className="text-purple-600">

                                            Total Documents :
                                            {" "}
                                            {documents.length}

                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT TEXT */}
                            <p
                                className="
                        text-sm
                        text-gray-400
                    "
                            >

                                Uploaded Client Documents

                            </p>
                        </div>
                    </div>
                )
            }

            {/* EMPTY */}
            {
                documents.length === 0 && (

                    <EmptyDocuments
                        title="No Documents Found"
                        description="This client has not uploaded any documents yet."
                    />
                )
            }

            {/* DOCUMENTS */}
            <div className="space-y-5">

                {
                    documents.map((doc) => (

                        <DocumentDetailsCard
                            key={doc._id}
                            document={doc}
                            onDelete={onDelete}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ClientDocumentsPage;

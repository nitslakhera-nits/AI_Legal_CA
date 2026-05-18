import { FileText } from "lucide-react";
import { useGetAllDocuments } from "../../hooks/docuement/useGetAllDocuments";
import EmptyDocuments from "../../components/document/EmptyDocuments";
import DocumentClientCard from "../../components/document/DocumentClientCard";

const DocumentsPage = () => {

    const { documents } = useGetAllDocuments();

    // GROUP DOCUMENTS BY CLIENT
    const groupedDocuments = documents.reduce(

        (acc, doc) => {

            const clientId = doc.clientId?._id;

            if (!clientId) return acc;

            // CREATE CLIENT GROUP
            if (!acc[clientId]) {

                acc[clientId] = {

                    client: doc.clientId,

                    documents: []
                };
            }

            // PUSH DOCUMENT
            acc[clientId].documents.push(doc);

            return acc;

        },

        {}
    );

    // CONVERT OBJECT TO ARRAY
    const clientsDocuments = Object.values(
        groupedDocuments
    );

    return (

        <div className="p-5 space-y-5">

            {/* HEADER */}
            <div
                className="
                    flex
                    items-center
                    justify-between
                    flex-wrap
                    gap-4
                "
            >

                {/* LEFT */}
                <div className="flex items-center gap-3">

                    <div
                        className="
                            p-3
                            rounded-2xl
                            bg-purple-600
                            text-white
                            shadow-sm
                        "
                    >

                        <FileText size={22} />

                    </div>

                    <div>

                        <h1
                            className="
                                text-2xl
                                md:text-3xl
                                font-bold
                                text-gray-800
                            "
                        >

                            Documents

                        </h1>

                        <p className="text-gray-500 text-sm">

                            Manage all uploaded client documents

                        </p>
                    </div>
                </div>

                {/* TOTAL */}
                <div
                    className="
                        px-4
                        py-2
                        rounded-xl
                        bg-purple-100
                        text-purple-700
                        text-sm
                        font-semibold
                    "
                >

                    Total Clients : {clientsDocuments.length}

                </div>
            </div>

            {/* EMPTY STATE */}
            {
                clientsDocuments.length === 0 && (

                    <EmptyDocuments
                        title="No Documents Uploaded"
                        description="Upload client documents to manage them here."
                    />
                )
            }

            {/* CARDS */}
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-4
                "
            >

                {
                    clientsDocuments.map((item) => (

                        <DocumentClientCard
                            key={item.client._id}
                            client={item.client}
                            documents={item.documents}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default DocumentsPage;

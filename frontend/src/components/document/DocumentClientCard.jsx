
import { useNavigate } from "react-router-dom";

import {
    FileText,
    User
} from "lucide-react";

const DocumentClientCard = ({
    client,
    documents
}) => {

    const navigate = useNavigate();

    return (

        <div
            className="
                bg-white
                border
                border-gray-200
                rounded-xl
                p-4
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
            "
        >

            {/* TOP SECTION */}
            <div className="flex items-start justify-between gap-4">

                {/* CLIENT INFO */}
                <div
                    onClick={() =>
                        navigate(
                            `/dashboard/client-documents/${client._id}`
                        )
                    }
                    className="cursor-pointer flex-1"
                >

                    <div className="flex items-center gap-2">

                        {/* USER ICON */}
                        <div
                            className="
                                p-2
                                rounded-lg
                                bg-purple-100
                            "
                        >

                            <User
                                size={18}
                                className="text-purple-600"
                            />

                        </div>

                        {/* NAME */}
                        <div>

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    text-gray-800
                                    hover:text-purple-600
                                    transition
                                "
                            >

                                {client.firstName} {client.lastName}

                            </h2>

                            <p
                                className="
                                    text-xs
                                    text-gray-500
                                    mt-1
                                "
                            >

                                Client ID : {client._id}

                            </p>
                        </div>
                    </div>
                </div>

                {/* DOCUMENT COUNT */}
                <div
                    className="
                        px-3
                        py-1
                        rounded-full
                        bg-purple-100
                        text-purple-700
                        text-xs
                        font-semibold
                        whitespace-nowrap
                    "
                >

                    {documents.length} Docs

                </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t my-4"></div>

            {/* DOCUMENT BUTTONS */}
            <div className="flex flex-wrap gap-2">

                {
                    documents.map((doc) => (

                        <button
                            key={doc._id}
                            onClick={() =>
                                navigate(
                                    `/dashboard/document/${doc._id}`
                                )
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                bg-purple-600
                                text-white
                                text-sm
                                hover:bg-purple-700
                                transition-all
                            "
                        >

                            <FileText size={14} />

                            {doc.documentType}

                        </button>
                    ))
                }
            </div>

            {/* FOOTER */}
            <div
                className="
                    mt-4
                    text-xs
                    text-gray-400
                "
            >

                Uploaded documents for this client

            </div>
        </div>
    );
};

export default DocumentClientCard;

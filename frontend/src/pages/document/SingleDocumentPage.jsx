
import { useParams } from "react-router-dom";

import {
    FileText,
    User,
    ExternalLink
} from "lucide-react";

import { useGetSingleDocument } from "../../hooks/docuement/useGetSingleDocument";

const SingleDocumentPage = () => {

    const { id } = useParams();

    const { document } = useGetSingleDocument(id);

    // LOADING
    if (!document) {

        return (

            <div className="p-5">

                <div
                    className="
                        bg-white
                        rounded-xl
                        border
                        p-6
                        text-center
                        text-gray-500
                    "
                >

                    Loading Document...

                </div>
            </div>
        );
    }

    return (

        <div className="p-5 space-y-5">

            {/* CLIENT HEADER */}
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

                        <div>

                            <h1
                                className="
                                    text-xl
                                    font-semibold
                                    text-gray-800
                                "
                            >

                                {document.clientId?.firstName}
                                {" "}
                                {document.clientId?.lastName}

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
                                    {document.clientId?._id}

                                </span>

                                <span className="text-gray-300">

                                    |

                                </span>

                                <span>

                                    {document.documentType}

                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <p
                        className="
                            text-sm
                            text-gray-400
                        "
                    >

                        Document Details

                    </p>
                </div>
            </div>

            {/* DOCUMENT DETAILS */}
            <div
                className="
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    p-5
                    shadow-sm
                    space-y-5
                "
            >

                {/* HEADER */}
                <div className="flex items-center gap-3">

                    <div
                        className="
                            p-2
                            rounded-lg
                            bg-purple-100
                        "
                    >

                        <FileText
                            size={20}
                            className="text-purple-600"
                        />

                    </div>

                    <div>

                        <h2
                            className="
                                text-lg
                                font-semibold
                                text-gray-800
                            "
                        >

                            Document Information

                        </h2>

                        <p
                            className="
                                text-sm
                                text-gray-500
                            "
                        >

                            Extracted details

                        </p>
                    </div>
                </div>

                {/* DATA GRID */}
                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-3
                    "
                >

                    {
                        Object.entries(
                            document.extractedData || {}
                        ).map(([key, value]) => (

                            <div
                                key={key}
                                className="
                                    border
                                    rounded-lg
                                    p-3
                                    bg-gray-50
                                "
                            >

                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                        capitalize
                                    "
                                >

                                    {
                                        key.replace(
                                            /([A-Z])/g,
                                            " $1"
                                        )
                                    }

                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-gray-800
                                        break-words
                                    "
                                >

                                    {value || "N/A"}

                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* DOCUMENT PREVIEW */}
            <div
                className="
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    p-5
                    shadow-sm
                    space-y-4
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        flex-wrap
                        gap-4
                    "
                >

                    <div>

                        <h2
                            className="
                                text-lg
                                font-semibold
                                text-gray-800
                            "
                        >

                            Document Preview

                        </h2>

                        <p
                            className="
                                text-sm
                                text-gray-500
                            "
                        >

                            Uploaded file

                        </p>
                    </div>

                    {/* OPEN BUTTON */}
                    {
                        document.fileUrl && (

                            <a
                                href={document.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2
                                    rounded-lg
                                    bg-purple-600
                                    text-white
                                    text-sm
                                    hover:bg-purple-700
                                    transition-all
                                "
                            >

                                <ExternalLink size={16} />

                                Open File

                            </a>
                        )
                    }
                </div>

                {/* PREVIEW */}
                {
                    document.fileUrl ? (

                        <img
                            src={document.fileUrl}
                            alt={document.documentType}
                            className="
                                w-full
                                max-w-2xl
                                rounded-xl
                                border
                                object-cover
                            "
                        />

                    ) : (

                        <div
                            className="
                                border
                                rounded-xl
                                p-6
                                text-center
                                bg-gray-50
                                text-gray-500
                                text-sm
                            "
                        >

                            No Document Preview Available

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SingleDocumentPage;

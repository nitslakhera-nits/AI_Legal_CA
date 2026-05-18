
import { useNavigate } from "react-router-dom";

import { FileText, Eye, Trash2, Pencil } from "lucide-react";

const DocumentDetailsCard = ({ document, onDelete }) => {

    const navigate = useNavigate();

    const {
        _id,
        documentType,
        extractedData,
        fileUrl
    } = document;

    return (

        <div
            className="
                bg-white
                border
                border-gray-200
                rounded-xl
                p-4
                shadow-sm
                space-y-4
                hover:shadow-md
                transition-all
            "
        >

            {/* TOP */}
            <div className="flex items-start justify-between gap-3">

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

                        <FileText
                            size={18}
                            className="text-purple-600"
                        />

                    </div>

                    {/* TITLE */}
                    <div>

                        <h2
                            className="
                                text-base
                                font-semibold
                                text-gray-800
                            "
                        >

                            {documentType}

                        </h2>

                        <p
                            className="
                                text-xs
                                text-gray-500
                            "
                        >

                            Document Details

                        </p>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-2">

                    {/* VIEW */}
                    <button
                        onClick={() =>
                            navigate(
                                `/dashboard/document/${_id}`
                            )
                        }
                        className="
                            flex
                            items-center
                            gap-1
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

                        <Eye size={14} />

                        View

                    </button>

                    {/* EDIT */}
                    <button
                        onClick={() => navigate(`/dashboard/document/edit/${_id}`)}
                        className="
                            p-2
                            rounded-lg
                            border
                            hover:bg-gray-100
                            transition
                        "
                    >

                        <Pencil size={16} />

                    </button>

                    {/* DELETE */}
                    <button
                        onClick={() => onDelete(_id)}
                        className="
                            p-2
                            rounded-lg
                            border
                            text-red-500
                            hover:bg-red-50
                            transition
                        "
                    >

                        <Trash2 size={16} />

                    </button>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t"></div>

            {/* DOCUMENT DATA */}
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
                        extractedData || {}
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
                                    font-medium
                                    text-sm
                                    text-gray-800
                                    mt-1
                                    break-words
                                "
                            >

                                {value || "N/A"}

                            </p>
                        </div>
                    ))
                }
            </div>

            {/* DOCUMENT PREVIEW */}
            {
                fileUrl && (

                    <div className="space-y-2">

                        <h3
                            className="
                                font-medium
                                text-sm
                                text-gray-700
                            "
                        >

                            Document Preview

                        </h3>

                        <img
                            src={fileUrl}
                            alt={documentType}
                            className="
                                w-full
                                max-w-xl
                                rounded-xl
                                border
                                object-cover
                            "
                        />
                    </div>
                )
            }
        </div>
    );
};

export default DocumentDetailsCard;

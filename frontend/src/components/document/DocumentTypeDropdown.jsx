// src/components/document/DocumentTypeDropdown.jsx

const DocumentTypeDropdown = ({
    documentType,
    setDocumentType
}) => {

    return (

        <div className="space-y-3">

            <label className="text-gray-700 font-medium">

                Document Type

            </label>

            <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                outline-none
                focus:border-purple-500
                focus:ring-4
                focus:ring-purple-100
                transition-all
                "
            >

                <option value="">
                    Select Document Type
                </option>

                <option value="AADHAR">
                    Aadhar Card
                </option>

                <option value="PAN">
                    PAN Card
                </option>

                <option value="GST">
                    GST
                </option>

                <option value="TDS">
                    TDS
                </option>

                <option value="ITR">
                    ITR
                </option>

            </select>

        </div>
    );
};

export default DocumentTypeDropdown;
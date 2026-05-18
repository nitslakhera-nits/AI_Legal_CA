import { DOCUMENT_FIELDS } from "../../utils/constants/documentFields";

const EditDocumentForm = ({
    documentType,
    formData,
    setFormData
}) => {

    const fields =
        DOCUMENT_FIELDS[documentType] || [];

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
            "
        >

            {
                fields.map((field) => (

                    <div
                        key={field.name}
                        className="space-y-2"
                    >

                        <label
                            className="
                                text-sm
                                font-medium
                                text-gray-700
                            "
                        >

                            {field.label}

                        </label>

                        <input
                            type={field.type}
                            name={field.name}
                            value={
                                formData[field.name] || ""
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:ring-2
                                focus:ring-purple-500
                            "
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default EditDocumentForm;

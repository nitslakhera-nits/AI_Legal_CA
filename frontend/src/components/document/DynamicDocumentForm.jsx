// src/components/document/DynamicDocumentForm.jsx

const DynamicDocumentForm = ({
    fields,
    formData,
    setFormData
}) => {

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {
                fields.map((field) => (

                    <div key={field.name}>

                        <label className="block mb-2 text-gray-700 font-medium">

                            {field.label}

                        </label>

                        <input
                            type="text"
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
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
                        />

                    </div>
                ))
            }

        </div>
    );
};

export default DynamicDocumentForm;
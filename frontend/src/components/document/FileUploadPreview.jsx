// src/components/document/FileUploadPreview.jsx

const FileUploadPreview = ({
    selectedFile,
    setSelectedFile
}) => {

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        setSelectedFile(file);
    };

    return (

        <div className="space-y-3">

            <label className="text-gray-700 font-medium">

                Upload File

            </label>

            <div className="
            border-2
            border-dashed
            border-purple-200
            rounded-3xl
            p-8
            bg-purple-50
            ">

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full"
                />

                {
                    selectedFile && (

                        <div className="
                        mt-5
                        bg-white
                        border
                        border-purple-200
                        rounded-2xl
                        p-4
                        ">

                            <p className="text-gray-900 font-medium">

                                {selectedFile.name}

                            </p>

                            <p className="text-sm text-gray-500 mt-1">

                                File selected successfully

                            </p>

                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default FileUploadPreview;
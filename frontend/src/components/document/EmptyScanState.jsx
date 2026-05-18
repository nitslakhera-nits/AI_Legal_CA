// src/components/document/EmptyScanState.jsx

const EmptyScanState = () => {

    return (

        <div className="h-full flex items-center justify-center">

            <div className="text-center">

                <div className="
                w-28
                h-28
                rounded-full
                bg-purple-100
                flex
                items-center
                justify-center
                mx-auto
                mb-6
                ">

                    <span className="text-5xl">
                        📄
                    </span>

                </div>

                <h2 className="text-2xl font-bold text-gray-900">

                    Upload file for OCR Scan

                </h2>

                <p className="text-gray-500 mt-3">

                    Extracted document data will appear here

                </p>

            </div>

        </div>
    );
};

export default EmptyScanState;
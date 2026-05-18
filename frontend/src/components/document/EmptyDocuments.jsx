import { FileX } from "lucide-react";

const EmptyDocuments = ({
    title = "No Documents Found",
    description = "There are no uploaded documents available right now."
}) => {

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                text-center
                py-20
                px-5
                border
                border-dashed
                border-gray-300
                rounded-2xl
                bg-white
            "
        >

            {/* ICON */}
            <div
                className="
                    w-20
                    h-20
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    mb-5
                "
            >

                <FileX
                    size={40}
                    className="text-gray-400"
                />

            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-gray-800">

                {title}

            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-500 mt-2 max-w-md">

                {description}

            </p>
        </div>
    );
};

export default EmptyDocuments;
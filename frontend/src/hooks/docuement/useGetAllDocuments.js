import { useEffect, useState } from "react";
import { getAllDocuments } from "../../api/services/documentService";

export const useGetAllDocuments = () => {

    const [documents, setDocuments] = useState([]);

    const fetchDocuments = async () => {

        try {

            const res = await getAllDocuments();

            if (res.data.success) {

                setDocuments(res.data.data);
            }

        } catch (error) {

            console.log(error);

        } 
    };

    useEffect(() => {

        fetchDocuments();

    }, []);

    return {
        documents,
        refetch: fetchDocuments
    };
};
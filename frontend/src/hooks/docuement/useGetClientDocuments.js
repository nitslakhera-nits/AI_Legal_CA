import { useEffect, useState } from "react";
import apiClient from "../../api/client";
import { getClientDocuments } from "../../api/services/documentService";

export const useGetClientDocuments = (clientId) => {

    const [documents, setDocuments] = useState([]);

    const fetchDocuments = async () => {

        try {

            const res = await getClientDocuments(clientId);

            if (res.data.success) {
                setDocuments(res.data.data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        if (clientId) {
            fetchDocuments();
        }

    }, [clientId]);

    return {
        documents,
        refetch: fetchDocuments
    };
};
import { useEffect, useState } from "react";
import { getSingleDocument } from "../../api/services/documentService";

export const useGetSingleDocument = (id) => {

    const [document, setDocument] = useState(null);

    const fetchDocument = async () => {

        try {

            const res = await getSingleDocument(id);

            if (res.data.success) {

                setDocument(res.data.data);
            }

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        if (id) {
            fetchDocument();
        }

    }, [id]);

    return {
        document,
        refetch: fetchDocument
    };
};
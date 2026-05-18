import { updateDocument } from "../../api/services/documentService";

export const useUpdateDocument = () => {

    const handleUpdateDocument = async (id, data, toast) => {

        try {

            const res = await updateDocument(id, data);

            if (res.data.success) {

                toast.success(res.data.message || "Document Updated");

                return true;
            }

            return false;

        } catch (error) {

            const message =
                error.response?.data?.message || "Document Update Failed";

            toast.error(message);

            return false;
        }
    };

    return handleUpdateDocument;
};
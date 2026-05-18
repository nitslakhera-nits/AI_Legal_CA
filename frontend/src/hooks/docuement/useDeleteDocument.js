import { deleteDocument } from "../../api/services/documentService";

export const useDeleteDocument = () => {

    const handleDeleteDocument = async (id, toast) => {

        try {

            const res = await deleteDocument(id);

            if (res.data.success) {

                toast.success(res.data.message || "Document Deleted");

                return true;
            }

            return false;

        } catch (error) {

            const message =
                error.response?.data?.message || "Delete Failed";

            toast.error(message);

            return false;
        }
    };

    return handleDeleteDocument;
};
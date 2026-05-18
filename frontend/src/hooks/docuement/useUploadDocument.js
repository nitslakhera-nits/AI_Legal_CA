import { uploadDocument } from "../../api/services/documentService";

export const useUploadDocument = () => {

    const handleUploadDocument = async (formData, toast) => {

        try {

            const res = await uploadDocument(formData);

            if (res.data.success) {

                toast.success(res.data.message || "Document Uploaded");

                return res.data.data;
            }

        } catch (error) {

            const message =
                error.response?.data?.message || "Document Upload Failed";

            toast.error(message);

            return null;
        }
    };

    return handleUploadDocument;
};
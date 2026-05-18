import apiClient from "../../api/client";

export const useScanDocument = () => {

    const handleScanDocument = async (file) => {

        try {

            const formData = new FormData();

            formData.append("document", file);

            const response = await apiClient.post(
                "/document/scan",
                formData
            );

            return response.data;

        } catch (error) {

            console.log(error);
            throw error;
        }
    };

    return handleScanDocument;
};
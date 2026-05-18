import { Navigate } from "react-router-dom";
import { clientRegister } from "../../api/services/clientService"

export const useClientRegister = () => {
    const handleClientRegister = async (formData, toast) => {
        try {
            const res = await clientRegister(formData);

            if (res.data.success) {
                toast.success(res.data.message || "Client Added");
                return true;
            }
            return false;

        }
        catch (error) {

            const message = error.response?.data?.message || "";

            if (message.includes("duplicate key")) {

                if (message.includes("panCardNo")) {
                    toast.error("PAN Card already exists");
                }

                else if (message.includes("aadharNumber")) {
                    toast.error("Aadhaar already exists");
                }

                else {
                    toast.error("Client already exists");
                }

            } else {

                toast.error(message || "Something went wrong");
            }

            return false;
        }
    };
    return handleClientRegister;

}
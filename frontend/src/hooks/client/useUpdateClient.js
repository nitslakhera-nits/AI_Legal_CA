import { updateClient } from "../../api/services/clientService"

export const useUpdateClient = () =>{
    const handleUpdateClient = async(id,toast ,formData)=>{
        try {
            const res = await updateClient(id , formData);

            if(res.data.success){
                toast.success(res.data.message || " Client Updated SuccessFully");
            }
            return res.data;
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        }
    }
    return handleUpdateClient;
}
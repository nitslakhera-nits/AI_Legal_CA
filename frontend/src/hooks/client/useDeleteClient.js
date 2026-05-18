import { deleteClient } from "../../api/services/clientService"

export const useDeleteClient = () =>{
    const handleDeleteClient = async(id,toast ,fetchClients) =>{
        try {
            const res = await deleteClient(id);

            if(res.data.success){
                toast.success(res.data.message);

                if(fetchClients){
                    fetchClients();
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message|| "Delete Failed" );
        }
    }
    return handleDeleteClient;
}
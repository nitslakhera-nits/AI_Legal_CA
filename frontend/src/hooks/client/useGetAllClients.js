import { useState } from "react"
import { getAllClients } from "../../api/services/clientService";
import { useEffect } from "react";


export const useGetAllClients = () => {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        try {
            const res = await getAllClients();
            // console.log(res.data);

            if (res.data.success) {
                setClients(res.data.data);
            }

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(()=>{
        fetchClients();
    }, []);

    return {
        clients,
        fetchClients
    };

}
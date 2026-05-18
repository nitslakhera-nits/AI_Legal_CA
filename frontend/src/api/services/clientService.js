import apiClient from "../client"
import { API_ENDPOINTS } from "../endpoints"

//REGISTER CLIENT
export const clientRegister = async(data) => {
    return apiClient.post(API_ENDPOINTS.CLIENT_REGISTER, data);
}

//GET ALL CLIENT
export const getAllClients = async() =>{
    return apiClient.get(API_ENDPOINTS.ALL_CLIENT);
}

//GET SINGLE DOCUMENT
export const getSingleClient = async(id) => {
    return apiClient.get(`${API_ENDPOINTS.SINGLE_CLIENT}/${id}`);
}

//UPDATE CLIENT
export const updateClient = async(id ,data) => {
    return apiClient.patch(`${API_ENDPOINTS.UPDATE_CLIENT}/${id}` ,data);
}

//DELETE CLIENT
export const deleteClient = async(id) =>{
    return apiClient.delete(`${API_ENDPOINTS.DELETE_CLIENT}/${id}`);
}
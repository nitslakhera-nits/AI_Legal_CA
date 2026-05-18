import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

//UPLOAD DOCUMENT
export const uploadDocument = async (data) => {
    return apiClient.post(API_ENDPOINTS.DOCS_UPLOAD, data);
};

//GET ALL DOCUMENTS
export const getAllDocuments = async () => {
    return apiClient.get(API_ENDPOINTS.ALL_DOCS);
};

//GET SINGLE DOCUMENT
export const getSingleDocument = async (id) => {
    return apiClient.get(`${API_ENDPOINTS.SINGLE_DOCS}/${id}`);
};

//GET CLIENT DOCUMENTS
export const getClientDocuments = async (clientId) => {
    return apiClient.get(`${API_ENDPOINTS.CLIENT_DOCS}/${clientId}`);
};

//UPDATE DOCUMENT
export const updateDocument = async (id, data) => {
    return apiClient.patch(`${API_ENDPOINTS.UPDATE_DOCS}/${id}`, data);
};

//DELETE DOCUMENT
export const deleteDocument = async (id) => {
    return apiClient.delete(`${API_ENDPOINTS.DELETE_DOCS}/${id}`);
};
import apiClient from "../client"
import { API_ENDPOINTS } from "../endpoints"

//register api
export const registerUser = async(data) => {
    return apiClient.post(API_ENDPOINTS.REGISTER, data);
};

//verify otp api
export const verifyOtp = async(data) => {
    return apiClient.post(API_ENDPOINTS.VERIFY_OTP, data);
};

//login api
export const loginUser = async(data) =>{
    return apiClient.post(API_ENDPOINTS.LOGIN, data);
}

//logout api
export const logoutUser = async () =>{
    return apiClient.post(API_ENDPOINTS.LOGOUT);
};



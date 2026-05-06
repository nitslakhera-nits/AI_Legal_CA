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

//resend otp api
export const resendOtp = async(email) => {
    return apiClient.post(API_ENDPOINTS.RESEND_OTP, {email});
};
//forgot password api
export const forgotPassword = async(email) => {
    return apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, {email});
};
//reset password api
export const resetPassword = async(token, newPassword) => {
    return apiClient.post(`${API_ENDPOINTS.RESET_PASSWORD}/${token}`, {newPassword});
};

//login api
export const loginUser = async(data) =>{
    return apiClient.post(API_ENDPOINTS.LOGIN, data);
}

//logout api
export const logoutUser = async () =>{
    return apiClient.post(API_ENDPOINTS.LOGOUT);
};



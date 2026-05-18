

export const API_ENDPOINTS = {
    //USER API
    REGISTER: "/user/register",
    VERIFY_OTP: "/user/verify-otp",
    RESEND_OTP: "/user/resend-otp",
    FORGOT_PASSWORD: "/user/forgot-password",
    RESET_PASSWORD: "/user/reset-password",
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",

    //CLIENT API
    CLIENT_REGISTER: "/client/register-client",
    ALL_CLIENT: "/client/all-clients",
    SINGLE_CLIENT: "/client/get-single-client",
    UPDATE_CLIENT: "/client/update-client",
    DELETE_CLIENT: "/client/delete-client",

    //DOCUMENTS UPLOADS API
    DOCS_UPLOAD: "/document/upload",
    ALL_DOCS: "/document/all",
    CLIENT_DOCS: "/document/client",
    SINGLE_DOCS: "/document",
    UPDATE_DOCS: "/document/update",
    DELETE_DOCS: "/document/delete",

}
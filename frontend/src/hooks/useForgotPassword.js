import { forgotPassword } from "../api/services/authService";

export const useForgotPassword = () => {
    const handleForgotPassowrd = async (email, toast) => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            const res = await forgotPassword(email);

            if (res.data.success) {
                toast.success(res.data.message || "Reset link sent to your email");
            }
            else {
                toast.error(res.data.message || "Something went wrong");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
    return handleForgotPassowrd;
}
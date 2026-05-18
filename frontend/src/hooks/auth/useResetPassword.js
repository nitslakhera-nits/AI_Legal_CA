import { resetPassword } from "../../api/services/authService";


export const useResetPassword = () => {
    const handleResetPassoword = async (token, newPassword, Navigate, toast) => {
        if (!newPassword) {
            toast.error("Please enter new password");
            return;
        }

        try {
            const res = await resetPassword(token, newPassword);

            if (res.data.success) {
                toast.success(res.data.message || "Password reset successful");
                Navigate("/")
            }
            else {
                toast.error(res.data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid or expired link");
        }
    };
    return handleResetPassoword;
}
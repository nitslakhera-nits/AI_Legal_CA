import { registerUser } from "../../api/services/authService"


export const useRegister = () => {
    const handleRegister = async (formData, setEmailForOtp, setView, toast) => {
        try {
            const res = await registerUser(formData);

            if (res.data.success) {
                toast.success(res.data.message || "Registration successful. Please verify OTP sent to your email.");
                setEmailForOtp(formData.email);
                setView("otp");
            }
            else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            // console.error("Registration failed:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    return handleRegister;
}
import { verifyOtp } from "../../api/services/authService"

export const useVerifyOtp = () => {
    const handleVerifyOtp = async (otpData, setView, toast) => {
        if (!otpData.otp) {
            toast.error("Please enter OTP");
            return;
        }

        try {
            const res = await verifyOtp(otpData);

            if (res.data.success) {
                toast.success(res.data.message || "OTP verified successfully. You can now log in.");
                setView("login");
            }
            else {
                toast.error(res.data.message || "OTP verification failed");
            }
        } catch (error) {
            // console.error("OTP verification failed:", error);
            toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
        }
    };
    return handleVerifyOtp;
}
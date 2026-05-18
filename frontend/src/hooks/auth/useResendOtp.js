import { resendOtp } from "../../api/services/authService";

export const useResendOtp = () => {
    const handleResendOtp = async (otp, toast) => {
        //  if (!otp.otp) {
        //     toast.error("Please enter OTP");
        //     return;
        // }

        try {
            const res = await resendOtp(otp);

            if (res.data.success) {
                toast.success(res.data.message || "OTP resent successfully");
            } else {
                toast.error(res.data.message || "Failed to resend OTP");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        }
    };

    return handleResendOtp;
};
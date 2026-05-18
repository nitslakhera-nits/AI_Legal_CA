import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/services/authService";

export const useLogin = () => {
    const navigate = useNavigate();

    // ✅ 2 extra parameters add kiye
    const handleLogin = async (loginForm, onclose, toast, setEmailForOtp, setCurrentView) => {

        if (!loginForm.email || !loginForm.password || !loginForm.role) {
            toast.error("All fields are required");
            return;
        }

        try {
            const res = await loginUser(loginForm);

            if (res.data.success) {
                const { message, data } = res.data;
                const user = data.user;
                localStorage.setItem("userRole", user.role);
                toast.success(message || "Login successful");
                navigate("/dashboard");
                onclose();
            } else {
                toast.error(res.data.message || "Invalid credentials");
            }

        } catch (error) {
            const message = error.response?.data?.message;

            if (message === "User not found") {
                toast.error("No account found with this email");

            } else if (message === "Please verify your email before logging in") {
                // ✅ Toast nahi — OTP view open karo
                toast.info("Please verify your email first");
                setEmailForOtp(loginForm.email);   // ← email set karo
                setCurrentView('otp');              // ← otp view pe bhejo

            } else if (message === "Invalid password") {
                toast.error("Incorrect password");

            } else if (message === "Invalid role") {
                toast.error("Selected role does not match your account");

            } else {
                toast.error(message || "Login failed. Please try again");
            }
        }
    };

    return handleLogin;
}
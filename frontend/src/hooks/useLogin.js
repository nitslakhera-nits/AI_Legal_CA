import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/services/authService"

export const useLogin = () => {
    const navigate = useNavigate();

    const handleLogin = async (loginForm, onclose, toast) => {
        try {
            const res = await loginUser(loginForm);
            // console.log(res);

            if (res.data.success) {
                const { user, message } = res.data;

                localStorage.setItem("userRole", user.role);
                toast.success(message || " Login Successful");
                navigate("/dashboard");
                onclose();
            }
            else {
                toast.error(res.data.message || "Invalid credentials");
            }

        } catch (error) {
            // console.error(error);
            toast.error("All fields are required");
        }

    };
    return handleLogin;
}
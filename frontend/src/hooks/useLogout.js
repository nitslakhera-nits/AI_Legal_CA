import { useNavigate } from "react-router-dom"
import { logoutUser } from "../api/services/authService";
import { toast } from "react-toastify";

export const useLogout = () => {
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            const response = await logoutUser();
            
            // console.log("Logout response:", response.data); // Debug log

            // Check if logout was successful
            if (response.data && response.data.success) {
                localStorage.removeItem('userRole');
                sessionStorage.clear();
                
                toast.success(response.data.message || "Logged out successfully");
                navigate("/");
            } else {
                toast.error(response.data?.message || "Logout failed");
            }
        }
        catch (error) {
            // console.error("Logout failed:", error);
            const errorMsg = error.response?.data?.message || "Logout failed. Please try again.";
            toast.error(errorMsg);
        }
    }
    return handleLogout;
};
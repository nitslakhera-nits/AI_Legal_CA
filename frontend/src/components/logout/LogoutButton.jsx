// src/components/logout/LogoutButton.jsx
import { LogOut } from "lucide-react";
import { useLogout } from "../../hooks/useLogout.js";

export default function LogoutButton({ collapsed }) {
    const handleLogout = useLogout();

    return (
        <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-red-500/10"
            style={{
                justifyContent: collapsed ? "center" : "flex-start",
                color: "oklch(0.72 0.03 260.05)",
            }}
        >
            <LogOut className="w-5 h-5" />

            {!collapsed && (
                <span
                    className="text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Logout
                </span>
            )}
        </button>
    );
}
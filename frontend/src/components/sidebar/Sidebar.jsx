// src/components/sidebar/Sidebar.jsx
import { useState } from "react";
import LogoutButton from "../logout/LogoutButton";

const navItems = [
  { label: "Overview", active: true },
  { label: "Analytics", active: false },
  { label: "Reports", active: false },
  { label: "Users", active: false },
  { label: "Products", active: false },
  { label: "Messages", active: false },
];

export default function Sidebar({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <aside
        className="flex flex-col h-screen transition-all duration-300 relative"
        style={{
          width: collapsed ? "72px" : "240px",
          background:
            "linear-gradient(180deg, oklch(0.24 0.05 265.05), oklch(0.21 0.04 260.05))",
          borderRight: "1px solid oklch(0.36 0.04 260.05)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5">
          <div className="w-9 h-9 rounded-xl bg-purple-500 flex items-center justify-center">
            <img src="./LegalMind.png" alt="logo" className="w-5 h-5" />
          </div>

          {!collapsed && (
            <span className="text-lg text-white font-bold">
              Legal<span className="text-purple-400">Mind</span>
            </span>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-purple-500 text-white"
        >
          ⇄
        </button>

        {/* Nav */}
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{
                justifyContent: collapsed ? "center" : "flex-start",
                color: item.active ? "#c084fc" : "#9ca3af",
                background: item.active
                  ? "rgba(192, 132, 252, 0.15)"
                  : "transparent",
              }}
            >
              {/* Dummy icon */}
              <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>

              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-gray-700 space-y-2">
          {/* User */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white">
              R
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm text-white">Rahul Sharma</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            )}
          </div>

          {/* Logout */}
          <LogoutButton collapsed={collapsed} />
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
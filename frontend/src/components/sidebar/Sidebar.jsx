

import { useState } from "react";
import { ROLES } from "../../utils/constants/roles";
import caSidebar from "./sidebarConfig/caSidebar";
import advocateSidebar from "./sidebarConfig/advocateSidebar";
import hybridSidebar from "./sidebarConfig/hybridSidebar";
import useRole from "../../hooks/auth/useRole";
import SidebarItem from "./SidebarItem";
import LogoutButton from "../logout/LogoutButton";


export default function Sidebar({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const role = useRole();

  let navItems = [];

  switch (role) {
    case ROLES.CA:
      navItems = caSidebar;
      break;

    case ROLES.ADVOCATE:
      navItems = advocateSidebar;
      break;

    case ROLES.HYBRID:
      navItems = hybridSidebar;
      break;

    default:
      navItems = [];
  }

  return (
    <div className="flex h-screen">
      <aside
        className="flex flex-col h-screen transition-all duration-300 relative"
        style={{
          width: collapsed ? "72px" : "240px",
          background:
            "linear-gradient(180deg, oklch(0.24 0.05 265.05), oklch(0.21 0.04 260.05))",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5">
          <img src="/LegalMind.png" alt="LegalMind Logo" className="w-9 h-9 rounded-xl object-cover" />
          {!collapsed && (
            <span className="text-lg text-white font-bold">
              LegalMind
            </span>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-7 w-6 h-6 rounded-full cursor-pointer bg-purple-500 text-white"
        >
          ⇄
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </nav>
        <div className="p-3 border-t border-gray-700 space-y-2">
          {/* User */}
          {/* <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white">
              R
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm text-white">Rahul Sharma</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            )}
          </div> */}

          {/* Logout */}
          <LogoutButton collapsed={collapsed} />
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
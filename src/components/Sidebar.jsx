import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import {
  LayoutDashboard,
  FolderKanban,
  Ticket,
  Users,
  Briefcase,
  WalletCards,
  AppWindow,
  Layers,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { title: "Projects", icon: <FolderKanban size={18} /> },
    { title: "Tickets", icon: <Ticket size={18} /> },
    { title: "Our Clients", icon: <Users size={18} /> },
    { title: "Employees", icon: <Briefcase size={18} /> },
    { title: "Accounts", icon: <WalletCards size={18} /> },
    { title: "Payroll", icon: <WalletCards size={18} /> },
    { title: "App", icon: <AppWindow size={18} /> },
    { title: "Other Pages", icon: <Layers size={18} /> },
    { title: "UI Components", icon: <Settings size={18} /> },
  ];

  return (
    <aside
      className="
        w-64 bg-[#0f172a] dark:bg-[#111827] text-white 
        min-h-screen py-8 px-6 flex flex-col gap-8 shadow-xl
      "
    >
      {/* Logo */}
      <div className="text-2xl font-bold flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
          </svg>
        </div>
        My-Task
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="
              flex items-center gap-3 py-2.5 px-3 rounded-lg
              hover:bg-white/10 transition-all group
            "
          >
            <span className="text-white opacity-70 group-hover:opacity-100 transition">
              {item.icon}
            </span>
            <span className="text-sm font-medium opacity-90 group-hover:opacity-100">
              {item.title}
            </span>
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="h-[1px] bg-white/20"></div>

      {/* Settings */}
      <div className="flex flex-col gap-4 text-sm">
        

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          Enable RTL Mode
        </label>
      </div>
    </aside>
  );
}

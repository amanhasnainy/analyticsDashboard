// src/components/Sidebar.jsx
import React from "react";
import {
  HomeIcon,
  BriefcaseIcon,
  TicketIcon,
  UsersIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const MENU = [
  { title: "Dashboard", icon: HomeIcon },
  { title: "Projects", icon: BriefcaseIcon },
  { title: "Tickets", icon: TicketIcon },
  { title: "Our Clients", icon: UsersIcon },
  { title: "Employees", icon: UsersIcon },
  { title: "Accounts", icon: BuildingOfficeIcon },
  { title: "Payroll", icon: CurrencyDollarIcon },
  { title: "App", icon: Squares2X2Icon },
  { title: "Settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
  return (
    <aside
      className="
        w-72 
        bg-[#1E293B]          /* ALWAYS DARK */
        text-white 
        min-h-screen 
        py-8 
        px-6 
        flex 
        flex-col 
        gap-6
      "
    >
      {/* Logo */}
      <div className="text-2xl font-bold flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Squares2X2Icon className="w-6 h-6 text-white" />
        </div>
        My-Task
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 mt-4">
        {MENU.map((item, index) => (
          <button
            key={index}
            className="
              flex items-center gap-3 
              py-2.5 px-3 rounded-lg
              hover:bg-[#334155]
              transition
            "
          >
            <item.icon className="w-5 h-5 text-gray-200" />
            <span className="text-gray-100">{item.title}</span>
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="h-px bg-white/20 my-4"></div>

      {/* Shortcuts */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="text-gray-300">Shortcuts</div>
        <button className="px-3 py-2 bg-white/10 rounded hover:bg-white/20">
          + New Task
        </button>
        <button className="px-3 py-2 bg-white/10 rounded hover:bg-white/20">
          Reports
        </button>
      </div>
    </aside>
  );
}

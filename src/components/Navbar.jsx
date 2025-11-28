// src/components/Navbar.jsx
import React from "react";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import RoleSwitch from "./RoleSwitch";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((s) => s.role.currentUser);

  return (
    <header className="w-full bg-white dark:bg-[#0f172a] shadow-sm h-20 px-6 flex items-center justify-between">
      
      {/* Left: Search */}
      <div className="hidden md:block">
        <div className="w-72">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm transition">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search…"
              className="bg-transparent w-full outline-none text-gray-700 dark:text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        
        {/* Avatars Group */}
        <div className="hidden md:flex -space-x-2">
          <img src="https://i.pravatar.cc/40?img=11" className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-700" />
          <img src="https://i.pravatar.cc/40?img=12" className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-700" />
          <img src="https://i.pravatar.cc/40?img=13" className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-700" />
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
          <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Role Switch */}
        <RoleSwitch />

        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-sm text-right leading-4">
            <div className="font-medium text-gray-800 dark:text-gray-100">{user}</div>
            <div className="text-xs text-gray-500">Team Lead</div>
          </div>
          <img
            src={`https://i.pravatar.cc/40?u=${user}`}
            className="w-10 h-10 rounded-full shadow-sm"
          />
        </div>

      </div>
    </header>
  );
}

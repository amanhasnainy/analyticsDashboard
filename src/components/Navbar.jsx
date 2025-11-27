// src/components/Navbar.jsx
import { Search, Moon, Sun, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { setRole } from "../redux/slices/roleSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // Redux states
  const theme = useSelector((s) => (s.theme.darkMode ? "dark" : "light"));
  const role = useSelector((s) => s.role.currentRole);

  // Theme Toggle
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark");
  };

  // Role Change
  const handleRoleChange = (newRole) => {
    dispatch(setRole(newRole));
    setOpen(false);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow-md h-20 flex items-center px-8 justify-between">

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl w-96">
        <Search size={18} className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search…"
          className="bg-transparent w-full outline-none text-gray-700 dark:text-gray-300"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Role Switch Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 text-sm"
          >
            Role: <span className="font-medium">{role}</span>
            <ChevronDown size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => handleRoleChange("Admin")}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                Admin
              </button>
              <button
                onClick={() => handleRoleChange("Manager")}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                Manager
              </button>
              <button
                onClick={() => handleRoleChange("User")}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                User
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-200"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="rounded-full"
          />
          <div className="text-gray-700 dark:text-gray-300">
            <p className="font-medium">Dylan Hunter</p>
            <p className="text-sm">{role} Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

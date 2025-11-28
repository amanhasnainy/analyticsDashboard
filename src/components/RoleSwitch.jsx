// src/components/RoleSwitch.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRole } from "../redux/slices/roleSlice";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  UserIcon
} from "@heroicons/react/24/outline";

export default function RoleSwitch() {
  const dispatch = useDispatch();
  const current = useSelector((s) => s.role.currentRole);

  const roles = [
    { id: "lead", label: "Lead", icon: <UserGroupIcon className="w-4 h-4" /> },
    { id: "member", label: "Member", icon: <UserIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="relative flex bg-gray-200 dark:bg-gray-800 rounded-full p-1 w-[180px] h-9 items-center select-none">

      {/* Sliding Highlight */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-1 bottom-1 w-[85px] rounded-full bg-white dark:bg-gray-700 shadow"
        style={{
          left: current === "lead" ? "4px" : "90px",
        }}
      />

      {/* Buttons */}
      {roles.map((r) => (
        <button
          key={r.id}
          onClick={() => dispatch(setRole(r.id))}
          className={`z-10 flex-1 flex items-center justify-center gap-1 font-medium 
            text-xs transition ${
              current === r.id
                ? "text-black dark:text-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
        >
          {r.icon}
          {r.label}
        </button>
      ))}
    </div>
  );
}

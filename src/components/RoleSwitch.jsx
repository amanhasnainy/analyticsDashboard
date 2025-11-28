// src/components/RoleSwitch.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRole } from "../redux/slices/roleSlice";

export default function RoleSwitch() {
  const dispatch = useDispatch();
  const current = useSelector((s) => s.role.currentRole);

  return (
    <div className="switch-pill">
      {/* MANAGER / LEAD */}
      <button
        onClick={() => dispatch(setRole("lead"))}
        className={`px-3 py-1 rounded-full text-xs font-medium transition ${
          current === "lead"
            ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow"
            : "text-gray-600 dark:text-gray-300"
        }`}
      >
        Lead
      </button>

      {/* EMPLOYEE */}
      <button
        onClick={() => dispatch(setRole("member"))}
        className={`px-3 py-1 rounded-full text-xs font-medium transition ${
          current === "member"
            ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow"
            : "text-gray-600 dark:text-gray-300"
        }`}
      >
        Member
      </button>
    </div>
  );
}

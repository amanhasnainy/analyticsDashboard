// src/components/DarkModeToggle.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../redux/slices/themeSlice";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function DarkModeToggle() {
  const dispatch = useDispatch();
  const dark = useSelector((s) => s.theme.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => dispatch(setDarkMode(!dark))}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition"
    >
      {dark ? (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}

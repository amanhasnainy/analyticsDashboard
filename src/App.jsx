import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "./redux/slices/themeSlice";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((s) => s.theme.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return <Dashboard />;
}

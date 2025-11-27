// src/App.jsx
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const theme = useSelector((s) => s.theme.darkMode); // TRUE / FALSE

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">
      <Dashboard />
    </div>
  );
}

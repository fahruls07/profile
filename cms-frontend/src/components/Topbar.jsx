import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar({ setSidebarOpen }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow-md">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Menu />
        </button>
        <h1 className="font-bold text-lg">Admin Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>
        <button className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600">
          <LogOut />
        </button>
      </div>
    </header>
  );
}

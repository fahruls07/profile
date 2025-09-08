import { useEffect, useState } from 'react';
import { logInfo } from '@/utils/logger';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    logInfo("[THEME] initial:", isDark ? "dark" : "light");
    return isDark;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      logInfo("[THEME] switched → dark");
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      logInfo("[THEME] switched → light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => {
        logInfo("[THEME] toggle clicked, next:", !darkMode ? "dark" : "light");
        setDarkMode(!darkMode);
      }}
      className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded text-sm"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

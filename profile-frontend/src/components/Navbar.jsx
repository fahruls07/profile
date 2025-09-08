import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { logInfo } from '@/utils/logger';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/experience', label: 'Experience' },
    { to: '/education', label: 'Education' },
    { to: '/contact', label: 'Contact' },
    { to: '/articles', label: 'Articles' },
  ];

  useEffect(() => {
    logInfo("[NAVBAR] Current route:", location.pathname);
  }, [location]);

  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => {
        logInfo(`[NAVBAR] Navigate to: ${to}`);
        setMenuOpen(false);
      }}
      className={`px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium transition-colors duration-200
        ${
          location.pathname === to
            ? 'bg-orange-500 text-white shadow-md'
            : 'text-gray-800 dark:text-white hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-500'
        }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Tengah Menu */}
          <div className="hidden md:flex items-center justify-center space-x-4 mx-auto">
            {navItems.map((item) => navLink(item.to, item.label))}
          </div>

          {/* Dark Mode Toggle */}
          <div className="hidden md:flex items-center ml-4">
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => {
                logInfo("[NAVBAR] Toggle menu:", !menuOpen);
                setMenuOpen(!menuOpen);
              }}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-3 border-t dark:border-gray-700">
          {navItems.map((item) => navLink(item.to, item.label))}
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

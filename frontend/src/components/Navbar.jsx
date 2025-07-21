import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`block px-3 py-2 rounded-md text-sm font-medium ${
        location.pathname === to
          ? 'text-orange-500 font-semibold'
          : 'text-gray-800 dark:text-white hover:text-orange-500'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo as Link */}
          <Link to="/" className="text-2xl font-bold text-orange-500 hover:underline">
            My <span className="block sm:inline">Resume</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLink('/', 'Home')}
            {navLink('/experience', 'Experience')}
            {navLink('/education', 'Education')}
            {navLink('/contact', 'Contact')}
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2 border-t dark:border-gray-700">
          {navLink('/', 'Home')}
          {navLink('/experience', 'Experience')}
          {navLink('/education', 'Education')}
          {navLink('/contact', 'Contact')}
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
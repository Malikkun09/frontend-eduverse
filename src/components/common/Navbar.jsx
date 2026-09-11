import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
    navigate('/login');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const linkClass = 'btn-brutal text-sm text-center block w-full';

  const navLinks = isAuthenticated ? (
    <>
      <Link to="/dashboard" onClick={closeMobileMenu} className={`${linkClass} btn-brutal-secondary`}>
        Dashboard
      </Link>
      <Link to="/profile" onClick={closeMobileMenu} className={`${linkClass} bg-white dark:bg-gray-800 text-black dark:text-white shadow-brutal`}>
        Profile
      </Link>
      {user?.role === 'admin' && (
        <Link to="/admin" onClick={closeMobileMenu} className={`${linkClass} bg-yellow-400 text-black shadow-brutal`}>
          Admin
        </Link>
      )}
      <button onClick={handleLogout} className={`${linkClass} btn-brutal-primary`}>
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" onClick={closeMobileMenu} className={`${linkClass} btn-brutal-secondary`}>
        Login
      </Link>
      <Link to="/register" onClick={closeMobileMenu} className={`${linkClass} btn-brutal-primary`}>
        Sign Up
      </Link>
    </>
  );

  return (
    <nav className="border-b-4 border-black dark:border-white bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0" onClick={closeMobileMenu}>
            <img
              src="/EduVerse.png"
              alt="EduVerse"
              className="h-9 w-9 sm:h-12 sm:w-12 object-contain flex-shrink-0"
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-black dark:text-white uppercase tracking-tighter hover:text-primary-pink dark:hover:text-primary-blue transition-colors truncate">
              EduVerse
            </h1>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-black dark:border-white bg-yellow-300 dark:bg-purple-900 hover:translate-x-1 hover:translate-y-1 transition-all flex-shrink-0"
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-3 [&_a]:w-auto [&_a]:inline-block [&_button]:w-auto">
              {navLinks}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border-2 border-black dark:border-white bg-primary-blue hover:translate-x-1 hover:translate-y-1 transition-all flex-shrink-0"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="block w-5 h-0.5 bg-black mb-1" />
              <span className="block w-5 h-0.5 bg-black mb-1" />
              <span className="block w-5 h-0.5 bg-black" />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-4 border-black dark:border-white py-4 flex flex-col gap-3">
            {navLinks}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

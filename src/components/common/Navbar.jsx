import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="border-b-4 border-black dark:border-white bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/EduVerse.png"
              alt="EduVerse"
              className="h-12 w-12 object-contain"
            />
            <h1 className="text-3xl font-display font-black text-black dark:text-white uppercase tracking-tighter hover:text-primary-pink dark:hover:text-primary-blue transition-colors">
              EduVerse
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-black dark:border-white bg-yellow-300 dark:bg-purple-900 hover:translate-x-1 hover:translate-y-1 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn-brutal btn-brutal-secondary text-sm">
                  Dashboard
                </Link>
                <Link to="/profile" className="btn-brutal bg-white dark:bg-gray-800 text-black dark:text-white shadow-brutal text-sm">
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="btn-brutal bg-yellow-400 text-black shadow-brutal text-sm">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="btn-brutal btn-brutal-primary text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-brutal btn-brutal-secondary text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-brutal btn-brutal-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

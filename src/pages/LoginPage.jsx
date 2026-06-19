import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ username, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-display font-black text-black dark:text-white uppercase mb-4">
            Login
          </h1>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
            Welcome back to EduVerse
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500 border-4 border-black dark:border-white p-4 shadow-brutal">
              <p className="font-bold text-white">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-brutal w-full"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-brutal w-full"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn-brutal btn-brutal-primary w-full text-xl py-4"
            disabled={loading}
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>

          <div className="text-center">
            <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-pink dark:text-primary-blue underline">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="bg-yellow-300 dark:bg-yellow-600 border-4 border-black dark:border-white p-4 shadow-brutal">
            <p className="font-bold text-black text-center">
              Continue as guest? Your progress won't be saved permanently.
            </p>
            <Link
              to="/dashboard"
              className="btn-brutal bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full mt-4 text-center block"
            >
              Browse as Guest
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

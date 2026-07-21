import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLoadingScreen from '../components/common/AuthLoadingScreen';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAuthLoading, setShowAuthLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    setShowAuthLoading(true);
  };

  const handleGuestBrowse = (e) => {
    e.preventDefault();
    setShowAuthLoading(true);
  };

  if (showAuthLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-display font-black text-black dark:text-white uppercase mb-4">
            Login
          </h1>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
            Welcome back to EduVerse — Demo Mode
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="demo"
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
              placeholder="demo"
            />
          </div>

          <button
            type="submit"
            className="btn-brutal btn-brutal-primary w-full text-xl py-4"
          >
            LOGIN
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
            <button
              onClick={handleGuestBrowse}
              className="btn-brutal bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full mt-4 text-center block cursor-pointer"
            >
              Browse as Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

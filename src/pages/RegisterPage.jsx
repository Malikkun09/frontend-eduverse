import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLoadingScreen from '../components/common/AuthLoadingScreen';

const RegisterPage = () => {
  const [showAuthLoading, setShowAuthLoading] = useState(false);

  const handleSubmit = (e) => {
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
            Sign Up
          </h1>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
            Join EduVerse today — Demo Mode
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="input-brutal w-full"
              required
              placeholder="Demo User"
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="input-brutal w-full"
              required
              placeholder="demo"
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input-brutal w-full"
              required
              placeholder="demo@eduverse.id"
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="input-brutal w-full"
              required
              minLength={8}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              className="input-brutal w-full"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn-brutal btn-brutal-primary w-full text-xl py-4"
          >
            CREATE ACCOUNT
          </button>

          <div className="text-center">
            <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-pink dark:text-primary-blue underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-display font-black text-black dark:text-white uppercase mb-4">
            Sign Up
          </h1>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
            Join EduVerse today
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
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-brutal w-full"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-brutal w-full"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-brutal w-full"
              required
              disabled={loading}
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
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
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
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

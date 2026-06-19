import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/api';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    school: '',
    class: '',
    region: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.PROFILE.GET);
        setProfile(response.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    try {
      await api.put(API_ENDPOINTS.PROFILE.UPDATE, profile);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <h2 className="text-5xl font-display font-black text-black dark:text-white uppercase">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-7xl font-display font-black text-black dark:text-white uppercase mb-4 text-shadow-brutal">
            Profile
          </h1>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Manage your account information
          </p>
        </div>

        <div className="bg-primary-pink dark:bg-primary-blue border-4 border-black dark:border-white p-8 shadow-brutal mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white dark:bg-gray-800 border-4 border-black dark:border-white flex items-center justify-center">
              <span className="text-4xl font-black text-black dark:text-white">
                {user?.name?.charAt(0).toUpperCase() || '?'}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-display font-black text-black dark:text-white uppercase">
                {user?.name}
              </h2>
              <p className="font-bold text-black dark:text-white">
                @{user?.username}
              </p>
              <p className="font-bold text-black dark:text-white">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <div className="bg-green-500 border-4 border-black dark:border-white p-4 shadow-brutal">
              <p className="font-bold text-white">{message}</p>
            </div>
          )}

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
              value={profile.name}
              onChange={handleChange}
              className="input-brutal w-full"
              required
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              School
            </label>
            <input
              type="text"
              name="school"
              value={profile.school}
              onChange={handleChange}
              className="input-brutal w-full"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Class
            </label>
            <input
              type="text"
              name="class"
              value={profile.class}
              onChange={handleChange}
              className="input-brutal w-full"
              placeholder="e.g., XI IPA 1"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-black dark:text-white mb-2 uppercase">
              Region
            </label>
            <input
              type="text"
              name="region"
              value={profile.region}
              onChange={handleChange}
              className="input-brutal w-full"
              placeholder="e.g., Jakarta, Indonesia"
              disabled={saving}
            />
          </div>

          <button
            type="submit"
            className="btn-brutal btn-brutal-primary w-full text-xl py-4"
            disabled={saving}
          >
            {saving ? 'SAVING...' : 'SAVE CHANGES'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/api';

const AdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    fetchData();
  }, [isAuthenticated, user, navigate]);

  const fetchData = async () => {
    try {
      const [statsRes, subjectsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/subjects'),
      ]);
      
      setStats(statsRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScanContent = async () => {
    setScanning(true);
    setMessage('');
    
    try {
      const response = await api.post('/admin/scan-content');
      setMessage(`Success! Discovered ${response.data.subjects_count} subjects and ${response.data.sources_count} learning sources.`);
      fetchData();
    } catch (error) {
      setMessage('Failed to scan content directory. Check server logs.');
    } finally {
      setScanning(false);
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-7xl font-display font-black text-black dark:text-white uppercase mb-4 text-shadow-brutal">
            Admin Panel
          </h1>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Manage your EduVerse platform
          </p>
        </div>

        {message && (
          <div className={`mb-8 p-6 border-4 border-black dark:border-white shadow-brutal ${
            message.includes('Success') ? 'bg-green-400' : 'bg-red-400'
          }`}>
            <p className="font-bold text-black">{message}</p>
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card-brutal bg-primary-pink p-8">
              <div className="text-6xl font-black text-white mb-2">
                {stats.total_users}
              </div>
              <div className="font-bold text-white uppercase text-xl">
                Total Users
              </div>
            </div>
            
            <div className="card-brutal bg-primary-blue p-8">
              <div className="text-6xl font-black text-black mb-2">
                {stats.total_subjects}
              </div>
              <div className="font-bold text-black uppercase text-xl">
                Subjects
              </div>
            </div>
            
            <div className="card-brutal bg-yellow-400 p-8">
              <div className="text-6xl font-black text-black mb-2">
                {stats.total_sources}
              </div>
              <div className="font-bold text-black uppercase text-xl">
                Learning Sources
              </div>
            </div>
            
            <div className="card-brutal bg-green-400 p-8">
              <div className="text-6xl font-black text-black mb-2">
                {stats.active_users}
              </div>
              <div className="font-bold text-black uppercase text-xl">
                Active Users
              </div>
            </div>
          </div>
        )}

        <div className="mb-12">
          <div className="bg-primary-pink dark:bg-primary-blue border-4 border-black dark:border-white p-8 shadow-brutal">
            <h2 className="text-4xl font-display font-black text-white dark:text-black uppercase mb-6">
              Content Management
            </h2>
            <p className="text-lg font-bold text-white dark:text-black mb-6">
              Scan the soal/ directory to discover new subjects and learning materials.
            </p>
            <button
              onClick={handleScanContent}
              disabled={scanning}
              className="btn-brutal bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-xl px-8 py-4"
            >
              {scanning ? 'SCANNING...' : 'SCAN CONTENT DIRECTORY'}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-5xl font-display font-black text-black dark:text-white uppercase mb-6">
            Subjects
          </h2>
          {subjects.length === 0 ? (
            <div className="bg-yellow-300 dark:bg-yellow-600 border-4 border-black dark:border-white p-8 shadow-brutal">
              <p className="font-bold text-black text-xl">
                No subjects found. Click "Scan Content Directory" to discover subjects.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-6 shadow-brutal"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{subject.icon || '📚'}</span>
                      <div>
                        <h3 className="text-2xl font-display font-black text-black dark:text-white uppercase">
                          {subject.name}
                        </h3>
                        <p className="font-bold text-gray-700 dark:text-gray-300">
                          {subject.learning_sources_count || 0} Learning Sources
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-4 py-2 border-2 border-black dark:border-white font-bold ${
                        subject.active ? 'bg-green-400' : 'bg-red-400'
                      }`}>
                        {subject.active ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

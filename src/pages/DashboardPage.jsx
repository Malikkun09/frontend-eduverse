import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate } from 'motion';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/api';

const DashboardPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.SUBJECTS.LIST);
        setSubjects(response.data);
      } catch (err) {
        setError('Failed to load subjects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!loading) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          animate(
            card,
            { 
              scale: [0.9, 1],
              opacity: [0, 1],
              rotate: [2, 0]
            },
            { 
              duration: 0.5, 
              delay: index * 0.08,
              easing: 'ease-out' 
            }
          );
        }
      });
    }
  }, [loading, subjects]);

  const colors = [
    'bg-primary-pink',
    'bg-primary-blue',
    'bg-yellow-400',
    'bg-green-400',
    'bg-purple-400',
    'bg-orange-400',
    'bg-red-400',
    'bg-indigo-400',
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-display font-black text-black dark:text-white uppercase mb-4">
            Loading...
          </h2>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-4 h-4 bg-black dark:bg-white"
                style={{
                  animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-red-500 border-4 border-black dark:border-white p-8 shadow-brutal max-w-md">
          <h2 className="text-3xl font-display font-black text-white uppercase mb-4">
            Error
          </h2>
          <p className="font-bold text-white">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-7xl font-display font-black text-black dark:text-white uppercase mb-4 text-shadow-brutal">
            Dashboard
          </h1>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Choose a subject to start learning
          </p>
        </div>

        {subjects.length === 0 ? (
          <div className="bg-yellow-300 dark:bg-yellow-600 border-4 border-black dark:border-white p-8 shadow-brutal text-center">
            <h2 className="text-3xl font-display font-black text-black uppercase mb-4">
              No Subjects Found
            </h2>
            <p className="font-bold text-black text-lg">
              Add some learning materials to the soal/ directory to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Link
                key={subject.id}
                to={`/subject/${subject.slug}`}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`card-brutal ${colors[index % colors.length]} p-8 group cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl font-display font-black text-black uppercase">
                    {subject.name}
                  </h3>
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {subject.icon || '📚'}
                  </span>
                </div>
                <p className="text-lg font-bold text-black mb-4">
                  {subject.description || `Learn ${subject.name}`}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-black">
                    {subject.sources_count || 0} Materials
                  </span>
                  <span className="text-2xl group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 border-4 border-black dark:border-white bg-primary-blue dark:bg-primary-pink p-8 shadow-brutal">
          <h2 className="text-4xl font-display font-black text-black dark:text-white uppercase mb-4">
            Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
              <div className="text-5xl font-black text-black dark:text-white mb-2">
                {subjects.length}
              </div>
              <div className="font-bold text-black dark:text-white uppercase">
                Total Subjects
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
              <div className="text-5xl font-black text-black dark:text-white mb-2">
                {subjects.reduce((sum, s) => sum + (s.sources_count || 0), 0)}
              </div>
              <div className="font-bold text-black dark:text-white uppercase">
                Total Materials
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
              <div className="text-5xl font-black text-black dark:text-white mb-2">
                0%
              </div>
              <div className="font-bold text-black dark:text-white uppercase">
                Progress
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

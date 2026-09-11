import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { animate } from 'motion';
import api from '../services/api';

const SubjectDetailPage = () => {
  const { slug } = useParams();
  const [subject, setSubject] = useState(null);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchSubjectDetail = async () => {
      try {
        const response = await api.get(`/subjects/${slug}`);
        setSubject(response.data);
        setSources(response.data.learning_sources || []);
      } catch (err) {
        setError('Failed to load subject details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectDetail();
  }, [slug]);

  useEffect(() => {
    if (!loading) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          animate(
            card,
            { 
              x: [-50, 0],
              opacity: [0, 1],
            },
            { 
              duration: 0.5, 
              delay: index * 0.1,
              easing: 'ease-out' 
            }
          );
        }
      });
    }
  }, [loading, sources]);

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

  if (error || !subject) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-red-500 border-4 border-black dark:border-white p-8 shadow-brutal max-w-md text-center">
          <h2 className="text-3xl font-display font-black text-white uppercase mb-4">
            Error
          </h2>
          <p className="font-bold text-white mb-6">{error || 'Subject not found'}</p>
          <Link to="/dashboard" className="btn-brutal bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto min-w-0">
        {/* Subject Header */}
        <div className="mb-8 sm:mb-12">
          <Link to="/dashboard" className="inline-flex items-center gap-2 font-bold text-primary-pink dark:text-primary-blue mb-4 sm:mb-6 hover:translate-x-1 transition-transform">
            <span className="text-xl sm:text-2xl">←</span>
            <span className="text-base sm:text-lg md:text-xl">Back to Dashboard</span>
          </Link>
          
          <div className="bg-primary-pink dark:bg-primary-blue border-4 border-black dark:border-white p-5 sm:p-6 md:p-8 shadow-brutal">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <span className="text-5xl sm:text-6xl md:text-7xl flex-shrink-0">{subject.icon || '📚'}</span>
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white dark:text-black uppercase mb-2 break-words">
                  {subject.name}
                </h1>
                <p className="text-base sm:text-lg md:text-2xl font-bold text-white dark:text-black break-words">
                  {subject.description || `Master ${subject.name}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Path Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-black dark:text-white uppercase mb-3 sm:mb-4">
            Learning Path
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300">
            Complete each lesson to unlock the next challenge
          </p>
        </div>

        {sources.length === 0 ? (
          <div className="bg-yellow-300 dark:bg-yellow-600 border-4 border-black dark:border-white p-8 shadow-brutal text-center">
            <h2 className="text-3xl font-display font-black text-black uppercase mb-4">
              No Lessons Available
            </h2>
            <p className="font-bold text-black text-lg">
              Check back soon for new learning materials!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sources.map((source, index) => {
              const isLocked = false; // In production, check user progress
              const isCompleted = false; // In production, check completion status
              
              return (
                <div
                  key={source.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < sources.length - 1 && (
                    <div className="absolute left-12 top-full w-1 h-6 bg-gray-300 dark:bg-gray-700 z-0" />
                  )}

                  <div className={`relative z-10 ${isLocked ? 'opacity-50' : ''}`}>
                    <Link
                      to={isLocked ? '#' : `/learn/${source.id}`}
                      className={`block bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-6 shadow-brutal ${
                        !isLocked ? 'hover:translate-x-2 hover:translate-y-2 hover:shadow-none' : 'cursor-not-allowed'
                      } transition-all duration-200`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        {/* Lesson Number/Status Circle */}
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 border-4 border-black dark:border-white flex items-center justify-center flex-shrink-0 ${
                          isCompleted ? 'bg-green-400' : 
                          isLocked ? 'bg-gray-400' : 
                          'bg-primary-blue'
                        }`}>
                          <span className="text-3xl font-black text-black">
                            {isCompleted ? '✓' : isLocked ? '🔒' : index + 1}
                          </span>
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-black text-black dark:text-white uppercase mb-2 break-words">
                            {source.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400">
                            {source.question_count > 0 && (
                              <span>📝 {source.question_count} Questions</span>
                            )}
                            {source.file_type && (
                              <span>📄 {source.file_type.toUpperCase()}</span>
                            )}
                          </div>
                        </div>

                        {/* Action Button */}
                        {!isLocked && (
                          <div className="btn-brutal btn-brutal-primary text-sm sm:text-base w-full sm:w-auto text-center flex-shrink-0">
                            {isCompleted ? 'Review' : 'Start'}
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Progress Summary */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-primary-blue border-4 border-black dark:border-white p-4 sm:p-6 shadow-brutal">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2">
              {sources.length}
            </div>
            <div className="font-bold text-black uppercase text-lg">
              Total Lessons
            </div>
          </div>

          <div className="bg-yellow-400 border-4 border-black dark:border-white p-4 sm:p-6 shadow-brutal">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2">
              0
            </div>
            <div className="font-bold text-black uppercase text-base sm:text-lg">
              Completed
            </div>
          </div>

          <div className="bg-primary-pink border-4 border-black dark:border-white p-4 sm:p-6 shadow-brutal">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
              0%
            </div>
            <div className="font-bold text-white uppercase text-lg">
              Progress
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailPage;

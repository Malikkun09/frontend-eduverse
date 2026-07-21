import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useRef } from 'react';
import { animate } from 'motion';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (heroRef.current) {
      animate(
        heroRef.current,
        { y: [50, 0], opacity: [0, 1] },
        { duration: 0.8, easing: 'ease-out' }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        animate(
          card,
          { 
            y: [100, 0], 
            opacity: [0, 1],
            rotate: [5, 0]
          },
          { 
            duration: 0.6, 
            delay: index * 0.1,
            easing: 'ease-out' 
          }
        );
      }
    });
  }, []);

  const features = [
    { title: 'Multiple Subjects', desc: 'Matematika, Fisika, IPA, IPS, and more', color: 'bg-primary-pink' },
    { title: 'Track Progress', desc: 'Monitor your learning journey', color: 'bg-primary-blue' },
    { title: 'Local PDFs', desc: 'All content stored locally', color: 'bg-yellow-400' },
    { title: 'Brutalist Design', desc: 'Bold and experimental UI', color: 'bg-green-400' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div ref={heroRef} className="text-center mb-20">
          <h1 className="text-7xl md:text-9xl font-display font-black text-black dark:text-white uppercase mb-6 text-shadow-brutal">
            Learn<br/>Different
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            A brutalist educational platform for independent learners
          </p>
          
          {!isAuthenticated && (
            <div className="bg-yellow-300 dark:bg-yellow-600 border-4 border-black dark:border-white p-6 max-w-2xl mx-auto mb-12 shadow-brutal">
              <p className="font-bold text-lg text-black">
                ⚠️ If you do not log in, your progress will only be cached temporarily and may be lost.
              </p>
            </div>
          )}

          <div className="flex gap-6 justify-center flex-wrap">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-brutal btn-brutal-primary text-xl px-10 py-5">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-brutal btn-brutal-primary text-xl px-10 py-5">
                  Start Learning
                </Link>
                <Link to="/login" className="btn-brutal btn-brutal-secondary text-xl px-10 py-5">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`card-brutal ${feature.color} p-8`}
            >
              <h3 className="text-3xl font-display font-black text-black uppercase mb-4">
                {feature.title}
              </h3>
              <p className="text-xl font-bold text-black">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-4 border-black dark:border-white bg-primary-pink dark:bg-primary-blue p-12 text-center shadow-brutal">
          <h2 className="text-5xl font-display font-black text-white dark:text-black uppercase mb-6">
            Ready to Start?
          </h2>
          <p className="text-2xl font-bold text-white dark:text-black mb-8">
            Join EduVerse today and transform your learning experience
          </p>
          {!isAuthenticated && (
            <Link to="/register" className="btn-brutal bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-xl px-10 py-5">
              Create Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

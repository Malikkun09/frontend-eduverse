import { useEffect, useRef } from 'react';
import { animate } from 'motion';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const sequence = async () => {
      if (!textRef.current) return;

      await animate(
        textRef.current,
        { 
          scale: [0.8, 1.1, 1],
          opacity: [0, 1, 1] 
        },
        { duration: 0.6, easing: 'ease-out' }
      );

      await animate(
        textRef.current,
        { 
          y: [0, -10, 0],
        },
        { 
          duration: 1.5, 
          repeat: 2,
          easing: 'ease-in-out' 
        }
      );

      await animate(
        containerRef.current,
        { 
          opacity: [1, 0],
          scale: [1, 1.2]
        },
        { duration: 0.5, easing: 'ease-in' }
      );

      if (onComplete) onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <div ref={textRef} className="mb-8">
          <img
            src="/EduVerse.png"
            alt="EduVerse"
            className="w-64 h-64 mx-auto object-contain"
          />
        </div>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-primary-blue border-2 border-white"
              style={{
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { animate } from 'motion';
import api from '../services/api';

const LearningPage = () => {
  const { sourceId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const questionRef = useRef(null);
  const feedbackRef = useRef(null);

  // Sample questions - In production, load from backend
  useEffect(() => {
    const loadQuestions = async () => {
      // Simulate loading questions
      const sampleQuestions = [
        {
          id: 1,
          question: "Suatu barisan geometri: 16, 8, 4, 2, …, maka jumlah n suku pertama adalah ….?",
          options: [
            { id: 'A', text: '2^(n-5) - 32', correct: false },
            { id: 'B', text: '2^(5-n) - 32', correct: false },
            { id: 'C', text: '32 - 2^(5-n)', correct: true },
            { id: 'D', text: '32 - 2^(n-5)', correct: false },
          ]
        },
        {
          id: 2,
          question: "Adit menabung setiap bulan di sebuah bank. Pada bulan pertama Adit menabung sebesar Rp80.000,00 dan pada bulan-bulan berikutnya uang yang ditabung selalu Rp5.000,00 lebih besar. Jumlah uang tabungan Adit selama satu tahun adalah?",
          options: [
            { id: 'A', text: 'Rp1.015.000,00', correct: false },
            { id: 'B', text: 'Rp1.150.000,00', correct: false },
            { id: 'C', text: 'Rp1.290.000,00', correct: false },
            { id: 'D', text: 'Rp1.320.000,00', correct: true },
          ]
        },
        {
          id: 3,
          question: "Sebuah zat radioaktif meluruh menjadi setengahnya dalam waktu 2 jam. Jika pada pukul 06.00 massa zat tersebut 1.600 gram, massa zat yang tersisa pada pukul 14.00 adalah?",
          options: [
            { id: 'A', text: '100 gram', correct: false },
            { id: 'B', text: '50 gram', correct: false },
            { id: 'C', text: '25 gram', correct: true },
            { id: 'D', text: '12,5 gram', correct: false },
          ]
        },
      ];
      
      setQuestions(sampleQuestions);
      setLoading(false);
    };

    loadQuestions();
  }, [sourceId]);

  useEffect(() => {
    if (questionRef.current && !showFeedback) {
      animate(
        questionRef.current,
        { x: [50, 0], opacity: [0, 1] },
        { duration: 0.5, easing: 'ease-out' }
      );
    }
  }, [currentQuestion, showFeedback]);

  useEffect(() => {
    if (feedbackRef.current && showFeedback) {
      animate(
        feedbackRef.current,
        { y: [20, 0], opacity: [0, 1] },
        { duration: 0.3, easing: 'ease-out' }
      );
    }
  }, [showFeedback]);

  const handleAnswerSelect = (optionId) => {
    if (showFeedback) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const question = questions[currentQuestion];
    const correct = question.options.find(opt => opt.id === selectedAnswer)?.correct;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Finish quiz
      navigate('/dashboard', { 
        state: { 
          message: `Quiz completed! Score: ${score + (isCorrect ? 1 : 0)}/${questions.length}` 
        } 
      });
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

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-5xl font-display font-black text-black dark:text-white uppercase mb-4">
            No Questions Available
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-brutal btn-brutal-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Progress Bar */}
      <div className="bg-gray-200 dark:bg-gray-800 h-3 border-b-4 border-black dark:border-white">
        <div
          className="bg-primary-blue h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Question Counter */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        {/* Question Card */}
        <div ref={questionRef} className="mb-8">
          <div className="bg-primary-pink dark:bg-primary-blue border-4 border-black dark:border-white p-8 shadow-brutal mb-8">
            <h2 className="text-3xl font-display font-black text-white dark:text-black leading-tight">
              {question.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const showCorrect = showFeedback && option.correct;
              const showWrong = showFeedback && isSelected && !option.correct;

              let bgColor = 'bg-white dark:bg-gray-800';
              if (showCorrect) bgColor = 'bg-green-400';
              if (showWrong) bgColor = 'bg-red-400';
              if (isSelected && !showFeedback) bgColor = 'bg-primary-blue';

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={showFeedback}
                  className={`w-full ${bgColor} border-4 border-black dark:border-white p-6 text-left shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-black dark:text-white">
                      {option.id}
                    </span>
                    <span className="text-xl font-bold text-black dark:text-white flex-1">
                      {option.text}
                    </span>
                    {showCorrect && <span className="text-3xl">✓</span>}
                    {showWrong && <span className="text-3xl">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        {showFeedback && (
          <div ref={feedbackRef} className="mb-8">
            <div className={`border-4 border-black dark:border-white p-8 shadow-brutal ${
              isCorrect ? 'bg-green-400' : 'bg-red-400'
            }`}>
              <h3 className="text-4xl font-display font-black text-black mb-4 uppercase">
                {isCorrect ? '🎉 Correct!' : '❌ Wrong!'}
              </h3>
              <p className="text-xl font-bold text-black">
                {isCorrect 
                  ? 'Great job! Keep it up!' 
                  : `The correct answer is ${question.options.find(o => o.correct)?.id}`
                }
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          {!showFeedback ? (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-brutal bg-gray-300 text-black shadow-brutal flex-1"
              >
                Exit
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="btn-brutal btn-brutal-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className="btn-brutal btn-brutal-primary w-full text-2xl py-6"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Finish Quiz 🎯'}
            </button>
          )}
        </div>

        {/* Score Display */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-yellow-400 border-4 border-black dark:border-white px-8 py-4 shadow-brutal">
            <span className="text-3xl font-black text-black">
              Score: {score}/{questions.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;

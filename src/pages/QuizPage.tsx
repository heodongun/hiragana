import React, { useState, useEffect } from 'react';
import { 
  basicHiragana, 
  dakutenHiragana, 
  combinationHiragana,
  HiraganaChar 
} from '../data/hiraganaData';
import QuizQuestion from '../components/ui/QuizQuestion';
import ProgressBar from '../components/ui/ProgressBar';

const QuizPage: React.FC = () => {
  const [quizMode, setQuizMode] = useState<'kana-to-romaji' | 'romaji-to-kana'>('kana-to-romaji');
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<HiraganaChar[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  
  // Handle starting a new quiz
  const startQuiz = () => {
    let pool: HiraganaChar[] = [];
    
    // Select character pool based on difficulty
    switch (difficultyLevel) {
      case 'easy':
        pool = [...basicHiragana];
        break;
      case 'medium':
        pool = [...basicHiragana, ...dakutenHiragana];
        break;
      case 'hard':
        pool = [...basicHiragana, ...dakutenHiragana, ...combinationHiragana];
        break;
    }
    
    // Shuffle and select questions
    const questionCount = difficultyLevel === 'easy' ? 10 : difficultyLevel === 'medium' ? 15 : 20;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, questionCount);
    
    setQuizQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setQuizComplete(false);
    setIsQuizActive(true);
  };
  
  // Handle answer submission
  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };
  
  // Generate multiple choice options for current question
  const generateOptions = (): HiraganaChar[] => {
    if (quizQuestions.length === 0) return [];
    
    const correctAnswer = quizQuestions[currentQuestionIndex];
    let optionPool: HiraganaChar[] = [];
    
    // Use the appropriate character pool based on the current question type
    if (basicHiragana.some(char => char.kana === correctAnswer.kana)) {
      optionPool = [...basicHiragana];
    } else if (dakutenHiragana.some(char => char.kana === correctAnswer.kana)) {
      optionPool = [...dakutenHiragana];
    } else {
      optionPool = [...combinationHiragana];
    }
    
    // Filter out the correct answer
    const filteredPool = optionPool.filter(char => char.kana !== correctAnswer.kana);
    
    // Shuffle and get 3 distractors
    const shuffled = [...filteredPool].sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3);
    
    // Combine with correct answer and shuffle again
    return [...distractors, correctAnswer].sort(() => Math.random() - 0.5);
  };

  // Reset quiz when difficulty or mode changes
  useEffect(() => {
    if (isQuizActive) {
      setIsQuizActive(false);
      setQuizComplete(false);
    }
  }, [difficultyLevel, quizMode]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hiragana Quiz</h1>
        <p className="text-gray-600">
          Test your hiragana knowledge with multiple-choice quizzes.
        </p>
      </div>
      
      {!isQuizActive && !quizComplete && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quiz Settings</h2>
          
          <div className="space-y-6">
            {/* Quiz mode selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Mode</label>
              <div className="flex flex-wrap gap-3">
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    quizMode === 'kana-to-romaji'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setQuizMode('kana-to-romaji')}
                >
                  Kana to Romaji
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    quizMode === 'romaji-to-kana'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setQuizMode('romaji-to-kana')}
                >
                  Romaji to Kana
                </button>
              </div>
            </div>
            
            {/* Difficulty selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <div className="flex flex-wrap gap-3">
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    difficultyLevel === 'easy'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setDifficultyLevel('easy')}
                >
                  Easy (Basic)
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    difficultyLevel === 'medium'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setDifficultyLevel('medium')}
                >
                  Medium (+ Dakuten)
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    difficultyLevel === 'hard'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setDifficultyLevel('hard')}
                >
                  Hard (All Characters)
                </button>
              </div>
            </div>
            
            {/* Start quiz button */}
            <div className="pt-4">
              <button
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
                onClick={startQuiz}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Active quiz */}
      {isQuizActive && !quizComplete && quizQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              <span className="text-gray-700">
                Score: {correctAnswers}/{currentQuestionIndex}
              </span>
            </div>
            <ProgressBar 
              percent={(currentQuestionIndex / quizQuestions.length) * 100} 
              showPercent={false}
              height={6}
            />
          </div>
          
          <QuizQuestion
            question={quizQuestions[currentQuestionIndex]}
            options={generateOptions()}
            onAnswer={handleAnswer}
            mode={quizMode}
          />
        </div>
      )}
      
      {/* Quiz results */}
      {quizComplete && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-xl mb-6">
            Your Score: <span className="font-bold text-indigo-600">{correctAnswers}</span> out of <span>{quizQuestions.length}</span>
            {' '}({Math.round((correctAnswers / quizQuestions.length) * 100)}%)
          </p>
          
          <div className="mb-8">
            <ProgressBar 
              percent={(correctAnswers / quizQuestions.length) * 100} 
              height={12}
              color={
                correctAnswers / quizQuestions.length >= 0.8 ? 'green' :
                correctAnswers / quizQuestions.length >= 0.6 ? 'blue' :
                correctAnswers / quizQuestions.length >= 0.4 ? 'yellow' : 'red'
              }
            />
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
              onClick={startQuiz}
            >
              Try Again
            </button>
            <button
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
              onClick={() => {
                setIsQuizActive(false);
                setQuizComplete(false);
              }}
            >
              Change Settings
            </button>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      {!isQuizActive && !quizComplete && (
        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h3 className="text-lg font-semibold text-indigo-800 mb-3">Quiz Instructions</h3>
          <ul className="space-y-2 text-indigo-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Kana to Romaji:</strong> You'll see a hiragana character and need to select the correct reading</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Romaji to Kana:</strong> You'll see a romaji reading and need to select the correct hiragana</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Easy mode:</strong> Only basic hiragana characters (10 questions)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Medium mode:</strong> Basic and dakuten characters (15 questions)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Hard mode:</strong> All hiragana characters (20 questions)</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
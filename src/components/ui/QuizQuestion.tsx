import React, { useState, useEffect } from 'react';
import { HiraganaChar } from '../../data/hiraganaData';
import { useUserProgress } from '../../context/UserProgressContext';

interface QuizQuestionProps {
  question: HiraganaChar;
  options: HiraganaChar[];
  onAnswer: (correct: boolean) => void;
  mode: 'kana-to-romaji' | 'romaji-to-kana';
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  onAnswer,
  mode
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { updateProgress } = useUserProgress();

  useEffect(() => {
    // Reset state when question changes
    setSelectedOption(null);
    setShowFeedback(false);
  }, [question]);

  const handleSelectOption = (option: HiraganaChar) => {
    if (showFeedback) return; // Prevent changing answer after feedback

    let correct = false;
    if (mode === 'kana-to-romaji') {
      correct = option.romaji === question.romaji;
    } else {
      correct = option.kana === question.kana;
    }

    setSelectedOption(mode === 'kana-to-romaji' ? option.romaji : option.kana);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Update progress
    updateProgress(question.kana, correct);

    // Delay for feedback display
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  const getOptionClass = (option: HiraganaChar) => {
    const optionValue = mode === 'kana-to-romaji' ? option.romaji : option.kana;
    
    if (!showFeedback || selectedOption !== optionValue) {
      return 'bg-white hover:bg-indigo-50 border-gray-200';
    }
    
    if (isCorrect) {
      return 'bg-green-100 border-green-500 text-green-800';
    }
    
    const correctOption = mode === 'kana-to-romaji' 
      ? options.find(o => o.romaji === question.romaji)
      : options.find(o => o.kana === question.kana);
    
    const correctValue = mode === 'kana-to-romaji' ? correctOption?.romaji : correctOption?.kana;
    
    if (optionValue === correctValue) {
      return 'bg-green-100 border-green-500 text-green-800';
    }
    
    return 'bg-red-100 border-red-500 text-red-800';
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="mb-8 text-center">
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          {mode === 'kana-to-romaji' ? 'What is the reading of this character?' : 'Select the matching hiragana:'}
        </h3>
        <div className="text-7xl font-japanese mb-4">
          {mode === 'kana-to-romaji' ? question.kana : question.romaji}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={mode === 'kana-to-romaji' ? option.romaji : option.kana}
            className={`p-4 rounded-lg border-2 transition-colors ${getOptionClass(option)}`}
            onClick={() => handleSelectOption(option)}
            disabled={showFeedback}
          >
            <span className={`text-2xl ${mode === 'romaji-to-kana' ? 'font-japanese' : ''}`}>
              {mode === 'kana-to-romaji' ? option.romaji : option.kana}
            </span>
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg text-center ${
          isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {isCorrect ? (
            <p>Correct! Well done!</p>
          ) : (
            <p>
              Incorrect. The correct answer is{' '}
              <span className="font-bold">
                {mode === 'kana-to-romaji' ? question.romaji : question.kana}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HiraganaChar } from '../../data/hiraganaData';
import { useUserProgress } from '../../context/UserProgressContext';

interface FlashCardProps {
  character: HiraganaChar;
  onNext: () => void;
  showRomaji?: boolean;
  autoFlip?: boolean;
  autoFlipDelay?: number;
}

const FlashCard: React.FC<FlashCardProps> = ({
  character,
  onNext,
  showRomaji = false,
  autoFlip = false,
  autoFlipDelay = 3000,
}) => {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(showRomaji);
  const [answered, setAnswered] = useState(false);
  const { getMasteryLevel, updateProgress } = useUserProgress();
  const masteryLevel = getMasteryLevel(character.kana);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setFlipped(showRomaji);
    setAnswered(false);
    setShowFeedback(false);
    setIsCorrect(null);
    
    let flipTimer: number;
    if (autoFlip && !showRomaji) {
      flipTimer = window.setTimeout(() => {
        setFlipped(true);
      }, autoFlipDelay);
    }
    
    return () => {
      if (flipTimer) clearTimeout(flipTimer);
    };
  }, [character, showRomaji, autoFlip, autoFlipDelay]);

  const handleFlip = () => {
    if (!flipped || !answered) {
      setFlipped(!flipped);
    }
  };

  const handleAnswer = (correct: boolean) => {
    setIsCorrect(correct);
    setShowFeedback(true);
    setAnswered(true);
    updateProgress(character.kana, correct);
    
    // 피드백을 3초 동안 보여준 후 다음 카드로 넘어갑니다
    setTimeout(() => {
      setShowFeedback(false);
      onNext();
    }, 3000);
  };

  const getMasteryColorClass = () => {
    switch (masteryLevel) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-blue-200';
      case 2: return 'bg-green-200';
      case 3: return 'bg-green-300';
      case 4: return 'bg-green-400';
      case 5: return 'bg-yellow-300';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <div
        className={`relative w-full aspect-[3/4] cursor-pointer transition-transform duration-700 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        {/* Card front (Hiragana) */}
        <div 
          className={`absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-8 border-2 ${
            masteryLevel > 0 ? 'border-indigo-300' : 'border-gray-200'
          }`}
        >
          <div className="absolute top-3 right-3">
            <div 
              className={`w-4 h-4 rounded-full ${getMasteryColorClass()}`} 
              title={`Mastery level: ${masteryLevel}`}
            />
          </div>
          <span className="text-9xl font-japanese mb-4">{character.kana}</span>
          <span className="text-sm text-gray-500">{t('common.clickToFlip')}</span>
        </div>
        
        {/* Card back (Romaji) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-50 rounded-xl shadow-lg flex flex-col items-center justify-center p-8 border-2 border-indigo-300">
          <span className="text-4xl font-medium text-indigo-800 mb-8">{character.romaji}</span>
          
          {!answered && (
            <div className="flex space-x-4 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(false);
                }}
                className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-md transition-colors"
              >
                {t('common.incorrect')}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(true);
                }}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-md transition-colors"
              >
                {t('common.correct')}
              </button>
            </div>
          )}
          
          {showFeedback && (
            <div className={`mt-4 p-4 rounded-lg text-center ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <p className="text-lg font-medium">
                {isCorrect ? t('feedback.correct') : t('feedback.incorrect')}
              </p>
              <p className="text-sm mt-1">
                {isCorrect ? t('feedback.goodJob') : t('feedback.tryAgain')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
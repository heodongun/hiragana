import React, { useState, useEffect } from 'react';
import { 
  basicHiragana, 
  dakutenHiragana, 
  combinationHiragana,
  HiraganaChar 
} from '../data/hiraganaData';
import FlashCard from '../components/ui/FlashCard';
import { useUserProgress } from '../context/UserProgressContext';

const FlashcardPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'review' | 'practice'>('review');
  const [selectedType, setSelectedType] = useState<'basic' | 'dakuten' | 'combination' | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceChars, setPracticeChars] = useState<HiraganaChar[]>([]);
  const { getNextReviewCharacters } = useUserProgress();

  // For practice mode
  useEffect(() => {
    if (activeMode === 'practice') {
      let selectedChars: HiraganaChar[] = [];
      
      switch (selectedType) {
        case 'basic':
          selectedChars = [...basicHiragana];
          break;
        case 'dakuten':
          selectedChars = [...dakutenHiragana];
          break;
        case 'combination':
          selectedChars = [...combinationHiragana];
          break;
        case 'all':
          selectedChars = [
            ...basicHiragana,
            ...dakutenHiragana,
            ...combinationHiragana
          ];
          break;
      }
      
      // Shuffle the array
      const shuffled = [...selectedChars].sort(() => Math.random() - 0.5);
      setPracticeChars(shuffled);
      setCurrentIndex(0);
    } else {
      // Review mode - get characters due for review
      const reviewChars = getNextReviewCharacters(20);
      setPracticeChars(reviewChars.length > 0 ? reviewChars : [
        ...basicHiragana.slice(0, 5) // Fallback if no reviews
      ]);
      setCurrentIndex(0);
    }
  }, [activeMode, selectedType, getNextReviewCharacters]);

  const handleNext = () => {
    if (currentIndex < practiceChars.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of deck, reshuffle or get new review cards
      if (activeMode === 'review') {
        const reviewChars = getNextReviewCharacters(20);
        setPracticeChars(reviewChars.length > 0 ? reviewChars : practiceChars);
      } else {
        // For practice mode, just shuffle the current set
        setPracticeChars([...practiceChars].sort(() => Math.random() - 0.5));
      }
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hiragana Flashcards</h1>
        <p className="text-gray-600">
          Practice hiragana recognition and recall with these interactive flashcards.
        </p>
      </div>
      
      {/* Mode selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            activeMode === 'review'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveMode('review')}
        >
          Review Due Cards
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            activeMode === 'practice'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveMode('practice')}
        >
          Free Practice
        </button>
      </div>
      
      {/* Type selector (only in practice mode) */}
      {activeMode === 'practice' && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              selectedType === 'all'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedType('all')}
          >
            All Characters
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              selectedType === 'basic'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedType('basic')}
          >
            Basic
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              selectedType === 'dakuten'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedType('dakuten')}
          >
            Dakuten
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              selectedType === 'combination'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedType('combination')}
          >
            Combination
          </button>
        </div>
      )}
      
      {/* Flashcard display */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        {practiceChars.length > 0 ? (
          <>
            <div className="w-full mb-6 flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                Card {currentIndex + 1} of {practiceChars.length}
              </span>
              <span className="text-gray-500 text-sm">
                {activeMode === 'review' ? 'Review Mode' : 'Practice Mode'}
              </span>
            </div>
            
            <FlashCard
              character={practiceChars[currentIndex]}
              onNext={handleNext}
              autoFlip={false}
            />
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              No cards available for review right now. Try again later or switch to practice mode.
            </p>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
        <h3 className="text-lg font-semibold text-indigo-800 mb-3">How to Use Flashcards</h3>
        <ul className="space-y-2 text-indigo-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Click on a card to flip and see the romaji reading</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Mark your answer as correct or incorrect</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Your progress is tracked for spaced repetition</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Review Mode shows characters that are due for review</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Practice Mode lets you practice any character set</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FlashcardPage;
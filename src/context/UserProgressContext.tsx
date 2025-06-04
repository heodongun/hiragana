import React, { createContext, useContext, useState, useEffect } from 'react';
import { HiraganaChar } from '../data/hiraganaData';

interface CharacterProgress {
  kana: string;
  correctCount: number;
  incorrectCount: number;
  lastPracticed: Date | null;
  nextReview: Date | null;
  mastered: boolean;
}

interface UserProgressContextType {
  progress: Record<string, CharacterProgress>;
  updateProgress: (kana: string, correct: boolean) => void;
  getMasteryLevel: (kana: string) => number;
  resetProgress: () => void;
  getNextReviewCharacters: (count: number) => HiraganaChar[];
}

const defaultContext: UserProgressContextType = {
  progress: {},
  updateProgress: () => {},
  getMasteryLevel: () => 0,
  resetProgress: () => {},
  getNextReviewCharacters: () => [],
};

const UserProgressContext = createContext<UserProgressContextType>(defaultContext);

interface UserProgressProviderProps {
  children: React.ReactNode;
  initialCharacters: HiraganaChar[];
}

export const UserProgressProvider: React.FC<UserProgressProviderProps> = ({ 
  children, 
  initialCharacters 
}) => {
  const [progress, setProgress] = useState<Record<string, CharacterProgress>>({});

  // Initialize progress from localStorage or create new entries
  useEffect(() => {
    const savedProgress = localStorage.getItem('hiraganaProgress');
    
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Convert string dates back to Date objects
        Object.keys(parsed).forEach(key => {
          if (parsed[key].lastPracticed) {
            parsed[key].lastPracticed = new Date(parsed[key].lastPracticed);
          }
          if (parsed[key].nextReview) {
            parsed[key].nextReview = new Date(parsed[key].nextReview);
          }
        });
        setProgress(parsed);
      } catch (e) {
        console.error('Error parsing saved progress:', e);
        initializeProgress();
      }
    } else {
      initializeProgress();
    }
  }, [initialCharacters]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem('hiraganaProgress', JSON.stringify(progress));
    }
  }, [progress]);

  // Initialize progress for all characters
  const initializeProgress = () => {
    const newProgress: Record<string, CharacterProgress> = {};
    
    initialCharacters.forEach(char => {
      newProgress[char.kana] = {
        kana: char.kana,
        correctCount: 0,
        incorrectCount: 0,
        lastPracticed: null,
        nextReview: new Date(), // Available for review immediately
        mastered: false
      };
    });
    
    setProgress(newProgress);
  };

  // Calculate spaced repetition interval based on performance
  const calculateNextReview = (char: CharacterProgress, correct: boolean): Date => {
    const now = new Date();
    const totalAnswers = char.correctCount + char.incorrectCount;
    const correctRatio = totalAnswers > 0 ? char.correctCount / totalAnswers : 0;
    
    // Base interval in hours
    let interval = 1;
    
    if (correct) {
      // If answered correctly, interval grows based on correct ratio and count
      if (char.correctCount <= 1) {
        interval = 1; // 1 hour for first correct answer
      } else if (char.correctCount <= 3) {
        interval = 6; // 6 hours
      } else if (char.correctCount <= 5) {
        interval = 24; // 1 day
      } else if (char.correctCount <= 8) {
        interval = 72; // 3 days
      } else {
        interval = 168; // 1 week
      }
      
      // Adjust based on historical performance
      interval *= (0.5 + correctRatio);
    } else {
      // If answered incorrectly, short interval for review
      interval = 0.5 + (correctRatio * 2); // 30 min to 2.5 hours
    }
    
    const nextReview = new Date(now.getTime() + (interval * 60 * 60 * 1000));
    return nextReview;
  };

  // Update progress for a character
  const updateProgress = (kana: string, correct: boolean) => {
    setProgress(prev => {
      if (!prev[kana]) return prev;
      
      const updated = { ...prev };
      updated[kana] = {
        ...updated[kana],
        correctCount: correct ? updated[kana].correctCount + 1 : updated[kana].correctCount,
        incorrectCount: correct ? updated[kana].incorrectCount : updated[kana].incorrectCount + 1,
        lastPracticed: new Date(),
        nextReview: calculateNextReview(updated[kana], correct),
        mastered: correct && updated[kana].correctCount >= 7 && (updated[kana].correctCount / (updated[kana].correctCount + updated[kana].incorrectCount) >= 0.85)
      };
      
      return updated;
    });
  };

  // Get mastery level (0-5) for a character
  const getMasteryLevel = (kana: string): number => {
    if (!progress[kana]) return 0;
    
    const char = progress[kana];
    const totalAnswers = char.correctCount + char.incorrectCount;
    
    if (totalAnswers === 0) return 0;
    
    const correctRatio = char.correctCount / totalAnswers;
    
    if (char.mastered) return 5;
    if (char.correctCount >= 5 && correctRatio >= 0.8) return 4;
    if (char.correctCount >= 3 && correctRatio >= 0.7) return 3;
    if (char.correctCount >= 2 && correctRatio >= 0.6) return 2;
    if (char.correctCount >= 1) return 1;
    
    return 0;
  };

  // Reset all progress
  const resetProgress = () => {
    initializeProgress();
  };

  // Get characters due for review based on nextReview date
  const getNextReviewCharacters = (count: number): HiraganaChar[] => {
    const now = new Date();
    const dueChars = Object.values(progress)
      .filter(char => char.nextReview && char.nextReview <= now)
      .sort((a, b) => {
        // Prioritize less practiced characters
        const aTotalAnswers = a.correctCount + a.incorrectCount;
        const bTotalAnswers = b.correctCount + b.incorrectCount;
        
        if (aTotalAnswers === 0) return -1; // Never practiced comes first
        if (bTotalAnswers === 0) return 1;
        
        // Then prioritize by mastery level (lower first)
        const aMastery = getMasteryLevel(a.kana);
        const bMastery = getMasteryLevel(b.kana);
        
        if (aMastery !== bMastery) return aMastery - bMastery;
        
        // Then by last practiced time (oldest first)
        if (a.lastPracticed && b.lastPracticed) {
          return a.lastPracticed.getTime() - b.lastPracticed.getTime();
        }
        
        return 0;
      })
      .slice(0, count)
      .map(char => {
        const matchingChar = initialCharacters.find(c => c.kana === char.kana);
        return matchingChar!;
      });
    
    return dueChars;
  };

  return (
    <UserProgressContext.Provider
      value={{
        progress,
        updateProgress,
        getMasteryLevel,
        resetProgress,
        getNextReviewCharacters
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => useContext(UserProgressContext);

export default UserProgressContext;
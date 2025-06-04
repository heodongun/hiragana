import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ScrollText, Star, BarChart } from 'lucide-react';
import { useUserProgress } from '../context/UserProgressContext';
import { allHiragana } from '../data/hiraganaData';
import ProgressBar from '../components/ui/ProgressBar';

const HomePage: React.FC = () => {
  const { progress, getMasteryLevel } = useUserProgress();
  
  // Calculate overall progress stats
  const calculateProgress = () => {
    if (Object.keys(progress).length === 0) return 0;
    
    const totalChars = allHiragana.length;
    const masteredCount = Object.values(progress).filter(p => p.mastered).length;
    
    return Math.round((masteredCount / totalChars) * 100);
  };
  
  const calculatePracticedCount = () => {
    return Object.values(progress).filter(p => p.lastPracticed !== null).length;
  };
  
  const getMasteryStats = () => {
    const levels = [0, 0, 0, 0, 0, 0]; // Levels 0-5
    
    Object.keys(progress).forEach(kana => {
      const level = getMasteryLevel(kana);
      levels[level]++;
    });
    
    return levels;
  };
  
  const masteryStats = getMasteryStats();
  const overallProgress = calculateProgress();
  const practicedCount = calculatePracticedCount();
  
  // Get due for review
  const dueCount = Object.values(progress).filter(p => {
    if (!p.nextReview) return false;
    return new Date(p.nextReview) <= new Date();
  }).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-indigo-600">ひらがな</span>マスター
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Master hiragana with interactive flashcards, quizzes, and spaced repetition.
        </p>
      </div>
      
      {/* Progress overview */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h2>
        <ProgressBar 
          percent={overallProgress} 
          label="Overall Mastery" 
          height={10}
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-indigo-700">{practicedCount}</p>
            <p className="text-sm text-gray-600">Characters Practiced</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-700">{masteryStats[5]}</p>
            <p className="text-sm text-gray-600">Characters Mastered</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-yellow-700">{dueCount}</p>
            <p className="text-sm text-gray-600">Due for Review</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-pink-700">{allHiragana.length - practicedCount}</p>
            <p className="text-sm text-gray-600">Not Started</p>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link to="/learn" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group">
          <div className="flex items-start">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <BookOpen className="text-indigo-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                Learn Hiragana
              </h3>
              <p className="text-gray-600 mt-1">
                Start with the basics and learn all hiragana characters.
              </p>
            </div>
          </div>
        </Link>
        
        <Link to="/flashcards" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ScrollText className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                Practice Flashcards
              </h3>
              <p className="text-gray-600 mt-1">
                Review hiragana using flashcards with spaced repetition.
              </p>
            </div>
          </div>
        </Link>
        
        <Link to="/quiz" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group">
          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-lg">
              <Star className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                Test Your Knowledge
              </h3>
              <p className="text-gray-600 mt-1">
                Take quizzes to test your hiragana recognition and recall.
              </p>
            </div>
          </div>
        </Link>
        
        <Link to="/progress" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group">
          <div className="flex items-start">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart className="text-purple-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                View Detailed Progress
              </h3>
              <p className="text-gray-600 mt-1">
                See your learning progress and mastery for each character.
              </p>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Quick tips */}
      <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
        <h2 className="text-xl font-semibold text-indigo-800 mb-3">Quick Tips</h2>
        <ul className="space-y-2 text-indigo-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Practice a few minutes each day for best results</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Focus on characters marked for review</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Try writing the characters by hand while practicing</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use both recognition (kana→romaji) and recall (romaji→kana) practice</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
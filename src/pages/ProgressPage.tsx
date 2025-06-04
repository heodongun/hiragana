import React, { useState } from 'react';
import { 
  basicHiragana, 
  dakutenHiragana, 
  combinationHiragana,
  allHiragana
} from '../data/hiraganaData';
import { useUserProgress } from '../context/UserProgressContext';
import ProgressBar from '../components/ui/ProgressBar';

const ProgressPage: React.FC = () => {
  const { progress, getMasteryLevel, resetProgress } = useUserProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'basic' | 'dakuten' | 'combination'>('overview');

  // Calculate overall stats
  const calculateStats = () => {
    const masteryLevels = [0, 0, 0, 0, 0, 0]; // Levels 0-5
    let totalPracticed = 0;
    
    allHiragana.forEach(char => {
      const level = getMasteryLevel(char.kana);
      masteryLevels[level]++;
      
      if (progress[char.kana]?.lastPracticed) {
        totalPracticed++;
      }
    });
    
    return {
      masteryLevels,
      totalPracticed,
      masteredPercent: Math.round((masteryLevels[5] / allHiragana.length) * 100),
      progressPercent: Math.round((totalPracticed / allHiragana.length) * 100)
    };
  };
  
  const stats = calculateStats();
  
  // Get characters for current tab
  const getTabCharacters = () => {
    switch (activeTab) {
      case 'basic': return basicHiragana;
      case 'dakuten': return dakutenHiragana;
      case 'combination': return combinationHiragana;
      default: return allHiragana;
    }
  };
  
  // Calculate mastery percentage for a character set
  const getMasteryPercentForSet = (characters: typeof allHiragana) => {
    let masteredCount = 0;
    characters.forEach(char => {
      if (getMasteryLevel(char.kana) === 5) {
        masteredCount++;
      }
    });
    return Math.round((masteredCount / characters.length) * 100);
  };
  
  // Handle reset progress
  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Progress</h1>
        <p className="text-gray-600">
          Track your hiragana learning journey and mastery level.
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'basic'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('basic')}
        >
          Basic ({getMasteryPercentForSet(basicHiragana)}% Mastered)
        </button>
        <button
          className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'dakuten'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('dakuten')}
        >
          Dakuten ({getMasteryPercentForSet(dakutenHiragana)}% Mastered)
        </button>
        <button
          className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'combination'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('combination')}
        >
          Combination ({getMasteryPercentForSet(combinationHiragana)}% Mastered)
        </button>
      </div>
      
      {/* Overview tab */}
      {activeTab === 'overview' && (
        <>
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Progress Summary</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Overall Mastery</span>
                  <span className="text-sm font-medium text-gray-500">{stats.masteredPercent}%</span>
                </div>
                <ProgressBar 
                  percent={stats.masteredPercent} 
                  height={10}
                  showPercent={false}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Characters Practiced</span>
                  <span className="text-sm font-medium text-gray-500">{stats.progressPercent}%</span>
                </div>
                <ProgressBar 
                  percent={stats.progressPercent} 
                  height={10}
                  color="blue"
                  showPercent={false}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Not Started</p>
                <p className="text-xl font-bold text-gray-700">{stats.masteryLevels[0]}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Beginner</p>
                <p className="text-xl font-bold text-blue-700">{stats.masteryLevels[1]}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Learning</p>
                <p className="text-xl font-bold text-green-700">{stats.masteryLevels[2] + stats.masteryLevels[3]}</p>
              </div>
              <div className="bg-green-100 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Advanced</p>
                <p className="text-xl font-bold text-green-700">{stats.masteryLevels[4]}</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Mastered</p>
                <p className="text-xl font-bold text-yellow-700">{stats.masteryLevels[5]}</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-indigo-700">{allHiragana.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Character Set Progress</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Basic Hiragana</span>
                  <span className="text-sm font-medium text-gray-500">
                    {getMasteryPercentForSet(basicHiragana)}%
                  </span>
                </div>
                <ProgressBar 
                  percent={getMasteryPercentForSet(basicHiragana)} 
                  height={8}
                  color="blue"
                  showPercent={false}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Dakuten Hiragana</span>
                  <span className="text-sm font-medium text-gray-500">
                    {getMasteryPercentForSet(dakutenHiragana)}%
                  </span>
                </div>
                <ProgressBar 
                  percent={getMasteryPercentForSet(dakutenHiragana)} 
                  height={8}
                  color="green"
                  showPercent={false}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Combination Hiragana</span>
                  <span className="text-sm font-medium text-gray-500">
                    {getMasteryPercentForSet(combinationHiragana)}%
                  </span>
                </div>
                <ProgressBar 
                  percent={getMasteryPercentForSet(combinationHiragana)} 
                  height={8}
                  color="indigo"
                  showPercent={false}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Progress Management</h2>
            
            {!showResetConfirm ? (
              <button
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
                onClick={() => setShowResetConfirm(true)}
              >
                Reset All Progress
              </button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 mb-4">
                  Are you sure you want to reset all progress? This action cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    onClick={handleResetProgress}
                  >
                    Yes, Reset Everything
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
                    onClick={() => setShowResetConfirm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Character detail tabs */}
      {activeTab !== 'overview' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Character Mastery Levels</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {getTabCharacters().map(char => {
              const masteryLevel = getMasteryLevel(char.kana);
              const charProgress = progress[char.kana];
              
              let bgColorClass = '';
              let textColorClass = '';
              
              switch (masteryLevel) {
                case 0: 
                  bgColorClass = 'bg-gray-50 border-gray-200';
                  textColorClass = 'text-gray-700';
                  break;
                case 1: 
                  bgColorClass = 'bg-blue-50 border-blue-200';
                  textColorClass = 'text-blue-700';
                  break;
                case 2: 
                  bgColorClass = 'bg-green-50 border-green-200';
                  textColorClass = 'text-green-700';
                  break;
                case 3: 
                  bgColorClass = 'bg-green-100 border-green-300';
                  textColorClass = 'text-green-700';
                  break;
                case 4: 
                  bgColorClass = 'bg-green-200 border-green-400';
                  textColorClass = 'text-green-800';
                  break;
                case 5: 
                  bgColorClass = 'bg-yellow-100 border-yellow-300';
                  textColorClass = 'text-yellow-800';
                  break;
              }
              
              return (
                <div 
                  key={char.kana}
                  className={`rounded-lg border-2 ${bgColorClass} p-4 text-center`}
                >
                  <div className="text-3xl font-japanese mb-2">{char.kana}</div>
                  <div className="text-sm mb-1">{char.romaji}</div>
                  <div className={`text-xs font-medium ${textColorClass}`}>
                    {masteryLevel === 0 && 'Not Started'}
                    {masteryLevel === 1 && 'Beginner'}
                    {masteryLevel === 2 && 'Learning'}
                    {masteryLevel === 3 && 'Practicing'}
                    {masteryLevel === 4 && 'Advanced'}
                    {masteryLevel === 5 && 'Mastered'}
                  </div>
                  {charProgress?.lastPracticed && (
                    <div className="text-xs text-gray-500 mt-1">
                      {`${charProgress.correctCount}/${charProgress.correctCount + charProgress.incorrectCount} correct`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
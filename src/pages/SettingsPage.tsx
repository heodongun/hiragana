import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserProgress } from '../context/UserProgressContext';

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { resetProgress } = useUserProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [fontPreference, setFontPreference] = useState('default');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };
  
  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
  };
  
  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontPreference(event.target.value);
    // This would normally update a global theme context
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('settings.title')}</h1>
        <p className="text-gray-600">{t('settings.description')}</p>
      </div>
      
      <div className="space-y-8">
        {/* Language settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t('settings.languageSettings')}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                {t('settings.selectLanguage')}
              </label>
              <select
                id="language"
                value={i18n.language}
                onChange={handleLanguageChange}
                className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Display Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="font-preference" className="block text-sm font-medium text-gray-700 mb-2">
                Font Preference
              </label>
              <select
                id="font-preference"
                value={fontPreference}
                onChange={handleFontChange}
                className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="default">Default</option>
                <option value="meiryo">Meiryo</option>
                <option value="hiragino">Hiragino</option>
                <option value="noto">Noto Sans JP</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Choose your preferred font for hiragana display.
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                id="animations"
                type="checkbox"
                checked={animationsEnabled}
                onChange={() => setAnimationsEnabled(!animationsEnabled)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="animations" className="ml-2 block text-sm text-gray-700">
                Enable animations
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="show-romaji"
                type="checkbox"
                checked={showRomaji}
                onChange={() => setShowRomaji(!showRomaji)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="show-romaji" className="ml-2 block text-sm text-gray-700">
                Show romaji in character grids
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="dark-mode"
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="dark-mode" className="ml-2 block text-sm text-gray-700">
                Dark mode (Coming soon)
              </label>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                Beta
              </span>
            </div>
          </div>
        </div>
        
        {/* Learning preferences */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Preferences</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="daily-goal" className="block text-sm font-medium text-gray-700 mb-2">
                Daily Practice Goal
              </label>
              <select
                id="daily-goal"
                className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="5">5 characters</option>
                <option value="10">10 characters</option>
                <option value="15">15 characters</option>
                <option value="20" selected>20 characters</option>
                <option value="30">30 characters</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="practice-mode" className="block text-sm font-medium text-gray-700 mb-2">
                Default Practice Mode
              </label>
              <select
                id="practice-mode"
                className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="recognition">Recognition (Kana → Romaji)</option>
                <option value="recall">Recall (Romaji → Kana)</option>
                <option value="mixed" selected>Mixed</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="auto-flip" className="block text-sm font-medium text-gray-700 mb-2">
                Auto-flip Delay (seconds)
              </label>
              <input
                type="range"
                id="auto-flip"
                min="0"
                max="10"
                step="1"
                defaultValue="3"
                className="w-full max-w-xs"
              />
              <div className="flex justify-between max-w-xs text-xs text-gray-500">
                <span>Off</span>
                <span>5s</span>
                <span>10s</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data management */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Management</h2>
          
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
          
          <div className="mt-6 flex space-x-4">
            <button className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md transition-colors">
              Export Progress
            </button>
            <button className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md transition-colors">
              Import Progress
            </button>
          </div>
        </div>
        
        {/* About */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
          <p className="text-gray-600 mb-4">
            ひらがなマスター (Hiragana Master) is designed to help you learn and memorize Japanese hiragana characters using proven memory techniques and spaced repetition.
          </p>
          <p className="text-gray-600">
            Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
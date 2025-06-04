import React, { useState } from 'react';
import { 
  basicHiragana, 
  dakutenHiragana, 
  combinationHiragana 
} from '../data/hiraganaData';
import HiraganaGrid from '../components/ui/HiraganaGrid';

const LearnPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'dakuten' | 'combination'>('basic');

  const tabs = [
    { id: 'basic', label: 'Basic', count: basicHiragana.length },
    { id: 'dakuten', label: 'Dakuten', count: dakutenHiragana.length },
    { id: 'combination', label: 'Combination', count: combinationHiragana.length },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Learn Hiragana</h1>
        <p className="text-gray-600">
          Start by learning the basic hiragana characters, then progress to dakuten and combination forms.
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-3 px-5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label} <span className="ml-1 text-gray-400">({tab.count})</span>
          </button>
        ))}
      </div>
      
      {/* Basic Hiragana */}
      {activeTab === 'basic' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Hiragana Characters</h2>
            <p className="text-gray-600 mb-6">
              These are the fundamental hiragana characters. Master these first before moving on.
            </p>
            <HiraganaGrid 
              characters={basicHiragana} 
              title="Basic Characters" 
            />
          </div>
          
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">Tips for Learning Basic Hiragana</h3>
            <ul className="space-y-2 text-indigo-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Learn the vowels first (あ a, い i, う u, え e, お o)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Focus on one row at a time (e.g., か ka, き ki, く ku, け ke, こ ko)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Practice writing each character multiple times</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Look for visual patterns to help with memorization</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Dakuten Hiragana */}
      {activeTab === 'dakuten' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dakuten & Handakuten Characters</h2>
            <p className="text-gray-600 mb-6">
              Dakuten (") and handakuten (°) modify the sound of basic hiragana characters.
            </p>
            <HiraganaGrid 
              characters={dakutenHiragana} 
              title="Dakuten & Handakuten Characters"
            />
          </div>
          
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">About Dakuten & Handakuten</h3>
            <p className="text-indigo-700 mb-3">
              Dakuten (") changes unvoiced consonants to voiced consonants:
            </p>
            <ul className="space-y-1 text-indigo-700 mb-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>k → g (か ka → が ga)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>s → z (さ sa → ざ za)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>t → d (た ta → だ da)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>h → b (は ha → ば ba)</span>
              </li>
            </ul>
            
            <p className="text-indigo-700 mb-3">
              Handakuten (°) changes h sounds to p sounds:
            </p>
            <ul className="space-y-1 text-indigo-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>h → p (は ha → ぱ pa)</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Combination Hiragana */}
      {activeTab === 'combination' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Combination Characters (Yōon)</h2>
            <p className="text-gray-600 mb-6">
              Combination characters are formed by combining a regular-sized hiragana with a small や (ya), ゆ (yu), or よ (yo).
            </p>
            <HiraganaGrid 
              characters={combinationHiragana} 
              title="Combination Characters"
            />
          </div>
          
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">About Combination Characters</h3>
            <p className="text-indigo-700 mb-3">
              Combination characters (Yōon) create new sounds by combining:
            </p>
            <ul className="space-y-1 text-indigo-700 mb-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>An i-column kana (き, し, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>A small や (ya), ゆ (yu), or よ (yo)</span>
              </li>
            </ul>
            
            <p className="text-indigo-700 mb-3">
              For example:
            </p>
            <ul className="space-y-1 text-indigo-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>き (ki) + や (small ya) = きゃ (kya)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>し (shi) + ゆ (small yu) = しゅ (shu)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>ち (chi) + よ (small yo) = ちょ (cho)</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
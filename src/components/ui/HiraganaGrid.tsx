import React from 'react';
import { HiraganaChar } from '../../data/hiraganaData';
import { useUserProgress } from '../../context/UserProgressContext';

interface HiraganaGridProps {
  characters: HiraganaChar[];
  title: string;
  onSelectChar?: (char: HiraganaChar) => void;
}

const HiraganaGrid: React.FC<HiraganaGridProps> = ({ characters, title, onSelectChar }) => {
  const { getMasteryLevel } = useUserProgress();

  // Group characters by row
  const groupedByRow: Record<string, HiraganaChar[]> = {};
  characters.forEach((char) => {
    if (!groupedByRow[char.row]) {
      groupedByRow[char.row] = [];
    }
    groupedByRow[char.row].push(char);
  });

  // Sort rows and characters
  const sortedRows = Object.keys(groupedByRow).sort();

  const getMasteryColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-50 border-gray-200';
      case 1: return 'bg-blue-50 border-blue-200';
      case 2: return 'bg-green-50 border-green-200';
      case 3: return 'bg-green-100 border-green-300';
      case 4: return 'bg-green-200 border-green-400';
      case 5: return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-6">
        {sortedRows.map((row) => (
          <div key={row} className="flex flex-wrap gap-2">
            {groupedByRow[row]
              .sort((a, b) => a.column.localeCompare(b.column))
              .map((char) => {
                const masteryLevel = getMasteryLevel(char.kana);
                return (
                  <button
                    key={char.kana}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 ${
                      getMasteryColorClass(masteryLevel)
                    } flex flex-col items-center justify-center transition-transform hover:scale-105 ${
                      onSelectChar ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    onClick={() => onSelectChar && onSelectChar(char)}
                  >
                    <span className="text-2xl md:text-3xl font-japanese">{char.kana}</span>
                    <span className="text-xs text-gray-600 mt-1">{char.romaji}</span>
                  </button>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiraganaGrid;
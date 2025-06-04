import React from 'react';

interface ProgressBarProps {
  percent: number;
  color?: string;
  height?: number;
  label?: string;
  showPercent?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  color = 'indigo',
  height = 8,
  label,
  showPercent = true,
}) => {
  const colors: Record<string, string> = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    pink: 'bg-pink-500',
  };

  const bgColor = colors[color] || 'bg-indigo-500';
  const safePercent = Math.max(0, Math.min(100, percent));

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercent && <span className="text-sm font-medium text-gray-500">{safePercent}%</span>}
        </div>
      )}
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div 
          className={`${bgColor} transition-all duration-500 ease-out`}
          style={{ width: `${safePercent}%`, height: '100%' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
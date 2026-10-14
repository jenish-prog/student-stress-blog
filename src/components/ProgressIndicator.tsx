import React from 'react';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  const percentage = Math.min(100, Math.round(((currentQuestion + 1) / totalQuestions) * 100));

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between text-xs text-[#64748B] mb-2 font-medium">
        <span>Question {currentQuestion + 1} of {totalQuestions}</span>
        <span>{percentage}% completed</span>
      </div>
      <div className="w-full h-1.5 bg-[#E8E6DF] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#779B7D] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

import React from 'react';
import { Check } from 'lucide-react';
import type { Question } from '../types';


interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onSelectOption: (questionId: string, optionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E6DF] shadow-xs animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-serif-editorial font-medium text-[#2D3748] tracking-tight mb-2">
        {question.prompt}
      </h2>
      {question.description && (
        <p className="text-sm text-[#64748B] mb-5 leading-relaxed">
          {question.description}
        </p>
      )}

      <div className="space-y-2.5">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              id={`option-${question.id}-${option.id}`}
              onClick={() => onSelectOption(question.id, option.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#E6EDE3] border-[#779B7D] ring-1 ring-[#779B7D]/40 text-[#2D3748]'
                  : 'bg-[#FAF9F5] border-[#E8E6DF] hover:border-[#C8DBC4] hover:bg-white text-[#2D3748]'
              }`}
            >
              <div className="flex-1 pr-3">
                <span className={`text-[15px] font-medium block leading-snug ${isSelected ? 'text-[#243323]' : 'text-[#2D3748]'}`}>
                  {option.label}
                </span>
                {option.sublabel && (
                  <span className="text-xs text-[#64748B] mt-0.5 block">
                    {option.sublabel}
                  </span>
                )}
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-[#779B7D] bg-[#779B7D] text-white'
                    : 'border-[#CBD5E1] bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

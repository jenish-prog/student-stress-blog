import React, { useEffect, useState } from 'react';
import { Sparkles, HeartHandshake, RefreshCw, ArrowLeft, TriangleAlert } from 'lucide-react';
import type { BlogGenerationError } from '../types';

interface BlogGenerationProps {
  categoryTitle: string;
  error?: BlogGenerationError | null;
  onRetry?: () => void;
  onBack?: () => void;
}

const STEPS = [
  "Reading your thoughts with care...",
  "Structuring personalized advice...",
  "Creating practical, low-stress exercises...",
  "Formatting your personal reading space...",
];

export const BlogGeneration: React.FC<BlogGenerationProps> = ({ categoryTitle, error, onRetry, onBack }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (error) return;
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, [error]);

  if (error) {
    return (

      <div className="w-full max-w-md mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center px-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-5">
          <TriangleAlert className="w-7 h-7 text-red-400" />
        </div>
        <span className="text-[11px] font-bold tracking-widest text-[#779B7D] uppercase mb-2">
          {categoryTitle}
        </span>
        <h2 className="text-2xl font-serif-editorial font-medium text-[#2D3748] mb-2">
          We couldn't generate your guide right now. Please try again.
        </h2>
        {error.message && error.message !== "We couldn't generate your guide right now. Please try again." && (
          <p className="text-sm text-[#64748B] leading-relaxed mb-1 max-w-sm">
            {error.message}
          </p>
        )}

        <p className="text-[11px] text-[#94A3B8] mb-6">Error code: {error.code}</p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:flex-1 h-[52px] rounded-2xl bg-[#779B7D] hover:bg-[#688A6E] text-white flex items-center justify-center gap-2 font-semibold text-sm transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try again</span>
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:flex-1 h-[52px] rounded-2xl bg-white border border-[#E8E6DF] text-[#2D3748] hover:bg-[#FAF9F5] flex items-center justify-center gap-2 font-semibold text-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to questions</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center px-6 animate-fade-in">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-[#E6EDE3] flex items-center justify-center animate-pulse-gentle">
          <Sparkles className="w-9 h-9 text-[#779B7D]" />
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#779B7D] text-white flex items-center justify-center shadow-xs">
          <HeartHandshake className="w-4 h-4" />
        </div>
      </div>

      <span className="text-[11px] font-bold tracking-widest text-[#779B7D] uppercase mb-2">
        {categoryTitle}
      </span>

      <h2 className="text-2xl font-serif-editorial font-medium text-[#2D3748] mb-3">
        Creating your personalized guide…
      </h2>


      <p className="text-sm text-[#64748B] min-h-[24px] transition-all">
        {STEPS[stepIndex]}
      </p>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5 mt-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i <= stepIndex ? 'w-6 bg-[#779B7D]' : 'w-2 bg-[#E8E6DF]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

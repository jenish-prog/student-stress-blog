import React from 'react';
import { ArrowLeft, ShieldAlert, Sparkles, BookMarked } from 'lucide-react';
import type { AppStep } from '../types';

interface AppHeaderProps {
  currentStep: AppStep;
  stepNumber: number; // 1, 2, or 3
  totalSteps?: number;
  readingProgress?: number;
  onBack?: () => void;
  onOpenSupport: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentStep,
  stepNumber,
  totalSteps = 3,
  readingProgress,
  onBack,
  onOpenSupport,
  onOpenSaved,
  savedCount,
}) => {
  const showBack = (currentStep === 'questions' || currentStep === 'reader') && !!onBack;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F6F0]/95 backdrop-blur-md border-b border-[#E8E6DF] px-3.5 sm:px-6 py-2.5 transition-all">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-2 shrink-0">
          {showBack ? (
            <button
              onClick={onBack}
              id="back-button"
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 border border-[#E8E6DF] text-[#2D3748] hover:bg-[#E6EDE3] hover:border-[#C8DBC4] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
              aria-label="Go back"
              title="Go back"
            >
              <ArrowLeft className="w-4 h-4 text-[#2D3748]" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#779B7D] flex items-center justify-center text-white shadow-xs shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#F7F6F0]" />
              </div>
              <span className="font-semibold text-[17px] sm:text-lg tracking-tight text-[#2D3748] font-serif-editorial">
                Calmly
              </span>
            </div>
          )}

          {/* Step indicator - guaranteed single line with whitespace-nowrap */}
          {currentStep !== 'reader' && (
            <span className="whitespace-nowrap shrink-0 text-[11px] font-semibold tracking-wide text-[#779B7D] uppercase bg-[#E6EDE3] px-2.5 py-0.5 rounded-full border border-[#C8DBC4]/80">
              Step {stepNumber} of {totalSteps}
            </span>
          )}
          {currentStep === 'reader' && (
            <span className="whitespace-nowrap shrink-0 text-[11px] font-semibold tracking-wide text-[#779B7D] uppercase bg-[#E6EDE3] px-2.5 py-0.5 rounded-full border border-[#C8DBC4]/80">
              Your Guide
            </span>
          )}
        </div>

        {/* Right Actions: Saved & Support */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Saved Articles Trigger */}
          <button
            onClick={onOpenSaved}
            id="saved-articles-btn"
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#2D3748] bg-white border border-[#E8E6DF] hover:bg-[#E6EDE3] transition-colors cursor-pointer shrink-0 shadow-2xs"
            title="Saved Guides"
          >
            <BookMarked className="w-3.5 h-3.5 text-[#779B7D]" />
            <span className="hidden xs:inline">Saved</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#779B7D] text-white text-[10px] flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Discreet Get Support Trigger */}
          <button
            onClick={onOpenSupport}
            id="get-support-btn"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#4A5568] hover:text-[#2D3748] hover:bg-white border border-transparent hover:border-[#E8E6DF] transition-colors cursor-pointer shrink-0"
            title="Need immediate help or confidential support?"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#779B7D]" />
            <span className="text-xs">Support</span>
          </button>
        </div>
      </div>

      {/* Built-in reading progress bar at the very bottom edge of header */}
      {typeof readingProgress === 'number' && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden">
          <div
            className="h-full bg-[#779B7D] transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}
    </header>
  );
};

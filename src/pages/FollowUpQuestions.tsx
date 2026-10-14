import React from 'react';
import type { StressCategory, CategoryQuestionConfig } from '../types';

import { CATEGORY_QUESTIONS } from '../data/stressCategories';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { QuestionCard } from '../components/QuestionCard';
import { BottomAction } from '../components/BottomAction';

interface FollowUpQuestionsProps {
  category: StressCategory;
  answers: Record<string, string>;
  freeTextAnswer: string;
  currentQuestionIndex: number;
  onQuestionIndexChange: (index: number) => void;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onChangeFreeText: (text: string) => void;
  onSubmit: () => void;
}

export const FollowUpQuestions: React.FC<FollowUpQuestionsProps> = ({
  category,
  answers,
  freeTextAnswer,
  currentQuestionIndex,
  onQuestionIndexChange,
  onSelectAnswer,
  onChangeFreeText,
  onSubmit,
}) => {
  const config: CategoryQuestionConfig = CATEGORY_QUESTIONS[category.id] || CATEGORY_QUESTIONS.other;
  const questions = config.questions;

  // Safe bounded index
  const safeIndex = Math.min(Math.max(0, currentQuestionIndex), questions.length - 1);
  const currentQ = questions[safeIndex];
  const isLastQuestion = safeIndex === questions.length - 1;
  const hasSelectedCurrent = currentQ ? !!answers[currentQ.id] : false;

  // Check if we are ready to advance or submit
  const handleNext = () => {
    if (!isLastQuestion) {
      onQuestionIndexChange(safeIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-4 pb-28 animate-fade-in">
      {/* Category context indicator */}
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#779B7D] uppercase tracking-wider">
        <span>{category.title}</span>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator
        currentQuestion={safeIndex}
        totalQuestions={questions.length}
      />

      {/* Dynamic Question Card */}
      {currentQ && (
        <QuestionCard
          question={currentQ}
          selectedOptionId={answers[currentQ.id]}
          onSelectOption={(qId, optId) => {
            onSelectAnswer(qId, optId);
          }}
        />
      )}

      {/* Optional Free-text for additional context (appears on final question) */}
      {isLastQuestion && config.optionalTextPrompt && (
        <div className="mt-5 p-5 bg-white rounded-2xl border border-[#E8E6DF] animate-fade-in shadow-xs">
          <label htmlFor="additional-thoughts" className="block text-sm font-medium text-[#2D3748] mb-1">
            {config.optionalTextPrompt}
          </label>
          <p className="text-xs text-[#64748B] mb-3">
            Completely private. We use this only to make your practical tips more specific.
          </p>
          <textarea
            id="additional-thoughts"
            rows={2}
            maxLength={250}
            value={freeTextAnswer}
            onChange={(e) => onChangeFreeText(e.target.value)}
            placeholder={config.optionalTextPlaceholder || "Write any details you'd like to share..."}
            className="w-full p-3.5 rounded-xl border border-[#E8E6DF] text-sm text-[#2D3748] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#779B7D] focus:ring-1 focus:ring-[#779B7D] bg-[#FAF9F5] resize-none"
          />
          <div className="text-right text-[11px] text-[#94A3B8] mt-1">
            {freeTextAnswer.length}/250
          </div>
        </div>
      )}

      {/* Fixed bottom action */}
      <BottomAction
        label={isLastQuestion ? "Generate my guide" : "Next question"}
        onClick={handleNext}
        disabled={!hasSelectedCurrent}
        footnote="Your answers help personalize the advice."
      />
    </div>
  );
};

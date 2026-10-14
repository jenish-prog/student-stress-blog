import React from 'react';
import type { StressCategory } from '../types';

import { STRESS_CATEGORIES } from '../data/stressCategories';
import { CategoryCard } from '../components/CategoryCard';
import { BottomAction } from '../components/BottomAction';

interface CategorySelectionProps {
  selectedCategory: StressCategory | null;
  customConcernText: string;
  onSelectCategory: (category: StressCategory) => void;
  onChangeCustomConcern: (text: string) => void;
  onContinue: () => void;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategory,
  customConcernText,
  onSelectCategory,
  onChangeCustomConcern,
  onContinue,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-6 pb-28 animate-fade-in">
      {/* Top Heading Area */}
      <div className="mb-5 sm:mb-6">
        <h1 className="text-2xl sm:text-[32px] font-serif-editorial font-medium text-[#2D3748] tracking-tight mb-1.5 leading-snug">
          What’s been on your mind?
        </h1>
        <p className="text-sm sm:text-[15px] text-[#64748B] leading-relaxed">
          Choose what feels closest to what you’re going through.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6">

        {STRESS_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory?.id === cat.id;
          return (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={isSelected}
              onSelect={onSelectCategory}
            />
          );
        })}
      </div>

      {/* Optional Free-text for "Something else" */}
      {selectedCategory?.id === 'other' && (
        <div className="mt-4 p-5 bg-white rounded-2xl border border-[#E8E6DF] animate-fade-in shadow-xs">
          <label htmlFor="custom-concern" className="block text-sm font-medium text-[#2D3748] mb-1.5">
            Describe what's bothering you (Optional)
          </label>
          <p className="text-xs text-[#64748B] mb-3">
            In a sentence or two, what is making things difficult today?
          </p>
          <textarea
            id="custom-concern"
            rows={3}
            maxLength={300}
            value={customConcernText}
            onChange={(e) => onChangeCustomConcern(e.target.value)}
            placeholder="e.g. I’ve been feeling really overwhelmed with everything going on and can't focus..."
            className="w-full p-3.5 rounded-xl border border-[#E8E6DF] text-sm text-[#2D3748] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#779B7D] focus:ring-1 focus:ring-[#779B7D] bg-[#FAF9F5] resize-none"
          />
          <div className="text-right text-[11px] text-[#94A3B8] mt-1">
            {customConcernText.length}/300 characters
          </div>
        </div>
      )}

      {/* Fixed Bottom Button: Continue */}
      {selectedCategory && (
        <BottomAction
          label="Continue"
          onClick={onContinue}
          footnote="Your answers help personalize the advice."
        />
      )}
    </div>
  );
};

import React from 'react';
import { 
  BookOpenCheck, 
  Clock3, 
  Users, 
  Home, 
  Sparkles, 
  HeartHandshake, 
  Check
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { StressCategory } from '../types';

interface CategoryCardProps {
  category: StressCategory;
  isSelected: boolean;
  onSelect: (category: StressCategory) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpenCheck,
  Clock3,
  Users,
  Home,
  Sparkles,
  HeartHandshake,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  const IconComponent = ICON_MAP[category.iconName] || Sparkles;

  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      id={`category-card-${category.id}`}
      className={`relative w-full text-left p-4 sm:p-4.5 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 border text-[#2D3748] ${
        isSelected
          ? 'bg-[#E6EDE3] border-[#779B7D] shadow-xs ring-1 ring-[#779B7D]/60'
          : 'bg-white border-[#E8E6DF] hover:border-[#C8DBC4] hover:bg-[#FAF9F5] shadow-xs'
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? 'bg-[#779B7D] text-white shadow-xs'
              : 'bg-[#F7F6F0] text-[#779B7D] border border-[#E8E6DF]'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[15px] sm:text-[16px] leading-tight text-[#2D3748] mb-0.5">
            {category.title}
          </h3>
          <p className="text-xs text-[#64748B] font-normal leading-relaxed">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Radio Selection Indicator */}
      <div className="shrink-0 pl-1">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
            isSelected
              ? 'border-[#779B7D] bg-[#779B7D] text-white'
              : 'border-[#CBD5E1] bg-white'
          }`}
        >
          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
    </button>
  );
};

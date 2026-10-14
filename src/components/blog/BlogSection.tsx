import React from 'react';
import type { BlogSection as BlogSectionType } from '../../types';

import { TipCard } from './TipCard';
import { ExerciseCard } from './ExerciseCard';

interface BlogSectionProps {
  section: BlogSectionType;
  index: number;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ section, index }) => {
  return (
    <article className="my-8 scroll-mt-20">
      {/* Section Heading */}
      <h2 className="text-xl sm:text-2xl font-serif-editorial font-medium text-[#2D3748] tracking-tight mb-3">
        {section.heading}
      </h2>

      {/* Body text with short readable styling */}
      <p className="text-[15px] sm:text-[16px] text-[#4A5568] leading-[1.75] font-normal mb-4">
        {section.body}
      </p>

      {/* Practical tip if present */}
      {section.practicalTip && (
        <TipCard
          type={index === 1 ? 'quote' : 'tip'}
          title={index === 1 ? 'A THOUGHT TO REMEMBER' : 'TRY THIS'}
          content={section.practicalTip}
        />
      )}

      {/* Embedded Exercise if present */}
      {section.exerciseDetails && (
        <ExerciseCard exercise={section.exerciseDetails} />
      )}
    </article>
  );
};

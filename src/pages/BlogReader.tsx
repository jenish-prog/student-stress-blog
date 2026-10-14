import React, { useEffect } from 'react';
import type { BlogArticle } from '../types';
import { BlogHero } from '../components/blog/BlogHero';
import { BlogSection } from '../components/blog/BlogSection';
import { ReflectionPrompt } from '../components/blog/ReflectionPrompt';

interface BlogReaderProps {
  article: BlogArticle;
  isSaved: boolean;
  onToggleSave: () => void;
  onRestart: () => void;
  onOpenSupport: () => void;
  onUpdateProgress?: (progress: number) => void;
}

export const BlogReader: React.FC<BlogReaderProps> = ({
  article,
  isSaved,
  onToggleSave,
  onRestart,
  onOpenSupport,
  onUpdateProgress,
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        const bounded = Math.min(100, Math.max(0, currentProgress));
        onUpdateProgress?.(bounded);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      onUpdateProgress?.(0);
    };
  }, [onUpdateProgress]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 pt-2 pb-28 animate-fade-in">
      {/* Editorial Magazine Hero */}
      <BlogHero
        article={article}
        isSaved={isSaved}
        onToggleSave={onToggleSave}
      />

      {/* Empathetic AI-written introduction tied to the student's answers */}
      {article.introduction && (
        <p className="text-[15px] sm:text-[16px] text-[#4A5568] leading-[1.8] font-normal mb-2 px-1 border-l-[3px] border-[#C8DBC4] pl-4">
          {article.introduction}
        </p>
      )}

      {/* Article Content Sections */}
      <div className="space-y-6">
        {article.sections.map((section, idx) => (
          <BlogSection
            key={idx}
            section={section}
            index={idx}
          />
        ))}
      </div>

      {/* Supportive AI-written conclusion */}
      {article.conclusion && (
        <div className="mt-8 bg-white rounded-2xl p-6 border border-[#E8E6DF] shadow-xs">
          <h3 className="text-[11px] font-bold tracking-widest text-[#779B7D] uppercase mb-2">
            Before you go
          </h3>
          <p className="text-[15px] text-[#4A5568] leading-[1.75]">
            {article.conclusion}
          </p>
        </div>
      )}

      {/* Reflection and Takeaway Footer */}
      <ReflectionPrompt
        keyTakeaway={article.keyTakeaway}
        actionSteps={article.actionSteps}
        reflectionQuestion={article.reflectionQuestion}
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onRestart={onRestart}
        onOpenSupport={onOpenSupport}
      />
    </div>
  );
};

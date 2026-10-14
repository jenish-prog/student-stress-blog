import React, { useState } from 'react';
import { Bookmark, Share2, Clock, Sparkles, Check } from 'lucide-react';
import type { BlogArticle } from '../../types';

interface BlogHeroProps {
  article: BlogArticle;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const BlogHero: React.FC<BlogHeroProps> = ({
  article,
  isSaved,
  onToggleSave,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }
    navigator.clipboard.writeText(`${article.title} — ${window.location.href}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full pb-6 pt-4 sm:pt-6 border-b border-[#E8E6DF] mb-8">
      {/* Category & Status Bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="whitespace-nowrap shrink-0 text-[11px] font-bold tracking-widest text-[#779B7D] uppercase bg-[#E6EDE3] px-3 py-1 rounded-full border border-[#C8DBC4]/80">
            MADE FOR YOUR SITUATION
          </span>
          <span className="text-xs text-[#718096] hidden sm:inline">
            • Your reading space
          </span>
        </div>

        {/* Action icons: Save & Share */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            id="bookmark-article-btn"
            onClick={onToggleSave}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isSaved
                ? 'bg-[#779B7D] text-white border-[#779B7D] shadow-xs'
                : 'bg-white text-[#64748B] border-[#E8E6DF] hover:bg-[#FAF9F5] hover:text-[#2D3748]'
            }`}
            title={isSaved ? "Saved in your list (and cookies)" : "Save guide for later"}
            aria-label="Bookmark article"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-full bg-white text-[#64748B] border border-[#E8E6DF] hover:bg-[#FAF9F5] hover:text-[#2D3748] transition-all cursor-pointer"
            title="Share guide"
            aria-label="Share guide"
          >
            {copied ? <Check className="w-4 h-4 text-[#779B7D]" /> : <Share2 className="w-4 h-4 text-[#64748B]" />}
          </button>
        </div>
      </div>

      {/* Main Title & Editorial Headline */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-medium tracking-tight text-[#2D3748] leading-[1.25] mb-3">
        {article.title}
      </h1>

      <p className="text-[15px] sm:text-base text-[#64748B] leading-relaxed mb-5 font-normal">
        {article.subtitle}
      </p>

      {/* Article Metadata Badges */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#64748B]">
        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E8E6DF] whitespace-nowrap">
          <Clock className="w-3.5 h-3.5 text-[#779B7D]" />
          <span>{article.estimatedMinutes} min read</span>
        </div>

        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E8E6DF] whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-[#779B7D]" />
          <span>{article.actionSteps.length + 2} practical ideas</span>
        </div>

        <span className="text-[11px] text-[#94A3B8] italic whitespace-nowrap">
          Stored in your saved guides
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { X, BookOpen, Trash2, Calendar, ArrowRight } from 'lucide-react';
import type { BlogArticle } from '../types';


interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: BlogArticle[];
  onSelectArticle: (article: BlogArticle) => void;
  onRemoveArticle: (articleId: string) => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveArticle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-md h-full bg-[#FAF9F5] border-l border-[#E8E6DF] shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-articles-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E6DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#779B7D]" />
            <h2 id="saved-articles-title" className="font-serif-editorial font-semibold text-lg text-[#2D3748]">
              Your Reading List
            </h2>
            <span className="text-xs bg-[#E6EDE3] text-[#779B7D] font-bold px-2 py-0.5 rounded-full">
              {savedArticles.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F7F6F0] hover:text-[#2D3748] transition-colors cursor-pointer"
            aria-label="Close saved guides"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-[#E6EDE3] text-[#779B7D] flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#2D3748] mb-1">
                No saved guides yet
              </h3>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto">
                Whenever you finish generating a personalized guide, tap the bookmark icon to save it here for later.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl p-4 border border-[#E8E6DF] hover:border-[#C8DBC4] transition-all shadow-xs group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold tracking-wider text-[#779B7D] uppercase bg-[#E6EDE3] px-2 py-0.5 rounded-md">
                    {article.categoryId}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveArticle(article.id);
                    }}
                    className="text-[#94A3B8] hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"
                    title="Remove from saved"
                    aria-label="Remove guide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="font-serif-editorial font-medium text-[16px] text-[#2D3748] leading-snug mb-1 group-hover:text-[#779B7D] transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-[#64748B] line-clamp-2 mb-3">
                  {article.subtitle}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#F1EFEA]">
                  <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-[#779B7D] hover:underline cursor-pointer"
                  >
                    <span>Read guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

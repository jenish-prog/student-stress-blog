import React from 'react';
import { Lightbulb, Quote } from 'lucide-react';

interface TipCardProps {
  type?: 'tip' | 'quote';
  title?: string;
  content: string;
}

export const TipCard: React.FC<TipCardProps> = ({
  type = 'tip',
  title = type === 'quote' ? 'A THOUGHT TO REMEMBER' : 'TRY THIS',
  content,
}) => {
  const isQuote = type === 'quote';

  return (
    <div
      className={`rounded-2xl p-5 my-5 border transition-all ${
        isQuote
          ? 'bg-linear-to-br from-[#E6EDE3] to-[#FAF9F5] border-[#C8DBC4] text-[#2D3748]'
          : 'bg-[#FAF9F5] border-[#E8E6DF] text-[#2D3748]'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {isQuote ? (
          <Quote className="w-4 h-4 text-[#779B7D]" />
        ) : (
          <Lightbulb className="w-4 h-4 text-[#779B7D]" />
        )}
        <span className="text-[11px] font-bold tracking-wider text-[#779B7D] uppercase">
          {title}
        </span>
      </div>

      <p className={`text-[15px] leading-relaxed ${isQuote ? 'font-serif-editorial italic text-lg text-[#1F2937]' : 'text-[#2D3748]'}`}>
        {content}
      </p>
    </div>
  );
};

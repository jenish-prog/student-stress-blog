import React, { useState } from 'react';
import { Heart, Sparkles, Smile, ShieldAlert, RotateCcw, Bookmark, Check } from 'lucide-react';

import confetti from 'canvas-confetti';

interface ReflectionPromptProps {
  keyTakeaway: string;
  actionSteps: string[];
  reflectionQuestion: string;
  isSaved: boolean;
  onToggleSave: () => void;
  onRestart: () => void;
  onOpenSupport: () => void;
}

type MoodFeedback = 'calmer' | 'ready' | 'struggling' | null;

export const ReflectionPrompt: React.FC<ReflectionPromptProps> = ({
  keyTakeaway,
  actionSteps,
  reflectionQuestion,
  isSaved,
  onToggleSave,
  onRestart,
  onOpenSupport,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodFeedback>(null);
  const [actionStepChecked, setActionStepChecked] = useState<number[]>([]);

  const handleSelectMood = (mood: MoodFeedback) => {
    setSelectedMood(mood);
    if (mood === 'calmer' || mood === 'ready') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#779B7D', '#E6EDE3', '#F7F6F0'],
      });
    }
  };

  const toggleAction = (idx: number) => {
    if (actionStepChecked.includes(idx)) {
      setActionStepChecked(actionStepChecked.filter((i) => i !== idx));
    } else {
      setActionStepChecked([...actionStepChecked, idx]);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-[#E8E6DF] space-y-8">
      {/* Key Takeaway Card */}
      <div className="bg-linear-to-br from-[#E6EDE3] via-[#FAF9F5] to-white rounded-3xl p-6 sm:p-7 border border-[#C8DBC4] shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#779B7D]" />
          <span className="text-[11px] font-bold tracking-widest text-[#779B7D] uppercase">
            A THOUGHT TO HOLD ONTO
          </span>
        </div>
        <p className="text-xl sm:text-2xl font-serif-editorial text-[#1F2937] leading-snug italic">
          "{keyTakeaway}"
        </p>
      </div>

      {/* Practical Action Steps Checklist */}
      {actionSteps && actionSteps.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-[#E8E6DF] shadow-xs">
          <h3 className="text-lg font-serif-editorial font-medium text-[#2D3748] mb-3">
            A small plan for today
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            Notice your progress. Focus on what you complete, not just what's left.
          </p>

          <div className="space-y-2.5">
            {actionSteps.map((step, idx) => {
              const isDone = actionStepChecked.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleAction(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isDone
                      ? 'bg-[#E6EDE3] border-[#C8DBC4] text-[#4A5568]'
                      : 'bg-[#FAF9F5] border-[#E8E6DF] hover:border-[#C8DBC4] text-[#2D3748]'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      isDone ? 'bg-[#779B7D] border-[#779B7D] text-white' : 'border-[#CBD5E1] bg-white'
                    }`}
                  >
                    {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-sm leading-relaxed ${isDone ? 'line-through text-[#64748B]' : 'font-medium'}`}>
                    {step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reflection Question */}
      {reflectionQuestion && (
        <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-[#E8E6DF]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#779B7D] mb-2">
            Gentle Reflection Prompt
          </h4>
          <p className="text-base font-serif-editorial text-[#2D3748] italic leading-relaxed">
            "{reflectionQuestion}"
          </p>
        </div>
      )}

      {/* Post-Reading Mood Check: "How are you feeling after reading?" */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8E6DF] shadow-xs text-center">
        <h3 className="text-base sm:text-lg font-serif-editorial font-medium text-[#2D3748] mb-1">
          How are you feeling after reading?
        </h3>
        <p className="text-xs text-[#64748B] mb-4">
          Check in with yourself. There is no right or wrong answer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
          <button
            type="button"
            onClick={() => handleSelectMood('calmer')}
            className={`p-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedMood === 'calmer'
                ? 'bg-[#E6EDE3] border-[#779B7D] text-[#243323] ring-1 ring-[#779B7D]'
                : 'bg-[#FAF9F5] border-[#E8E6DF] hover:border-[#C8DBC4] text-[#2D3748]'
            }`}
          >
            <Smile className="w-4 h-4 text-[#779B7D]" />
            <span>A little calmer</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMood('ready')}
            className={`p-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedMood === 'ready'
                ? 'bg-[#E6EDE3] border-[#779B7D] text-[#243323] ring-1 ring-[#779B7D]'
                : 'bg-[#FAF9F5] border-[#E8E6DF] hover:border-[#C8DBC4] text-[#2D3748]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#779B7D]" />
            <span>Ready to try</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMood('struggling')}
            className={`p-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedMood === 'struggling'
                ? 'bg-[#FEE2E2] border-red-300 text-red-900 ring-1 ring-red-400'
                : 'bg-[#FAF9F5] border-[#E8E6DF] hover:border-[#C8DBC4] text-[#2D3748]'
            }`}
          >
            <Heart className="w-4 h-4 text-red-400" />
            <span>Still struggling</span>
          </button>
        </div>

        {/* Dynamic feedback message */}
        {selectedMood === 'calmer' && (
          <div className="p-3.5 bg-[#E6EDE3] rounded-xl text-xs text-[#243323] animate-fade-in font-medium">
            🌿 We are so glad this brought a moment of calm. Carry this steady breath into the rest of your day.
          </div>
        )}
        {selectedMood === 'ready' && (
          <div className="p-3.5 bg-[#E6EDE3] rounded-xl text-xs text-[#243323] animate-fade-in font-medium">
            ✨ You have got this. Pick just step one, set a short 15-minute timer, and be proud of yourself.
          </div>
        )}
        {selectedMood === 'struggling' && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-fade-in text-left">
            <p className="font-semibold mb-1">That is completely okay and understandable.</p>
            <p className="mb-2 leading-relaxed">
              Stress doesn't always dissolve in 5 minutes. You don't have to carry this alone. Please consider talking to a school counsellor or checking our confidential support resources.
            </p>
            <button
              type="button"
              onClick={onOpenSupport}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 underline"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              <span>View free 24/7 student helplines</span>
            </button>
          </div>
        )}
      </div>

      {/* Persistent End of Guide Navigation */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onToggleSave}
          className={`w-full sm:w-1/2 h-[52px] rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm transition-all border cursor-pointer ${
            isSaved
              ? 'bg-[#E6EDE3] border-[#779B7D] text-[#243323]'
              : 'bg-white border-[#E8E6DF] text-[#2D3748] hover:bg-[#FAF9F5]'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#779B7D] text-[#779B7D]' : 'text-[#64748B]'}`} />
          <span>{isSaved ? 'Saved in Your List' : 'Save This Guide'}</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="w-full sm:w-1/2 h-[52px] rounded-2xl bg-[#779B7D] hover:bg-[#688A6E] text-white flex items-center justify-center gap-2 font-semibold text-sm transition-all shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ask Calmly Another Question</span>
        </button>
      </div>
    </div>
  );
};

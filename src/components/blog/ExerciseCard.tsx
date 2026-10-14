import React, { useState } from 'react';
import { CheckSquare, Square, Sparkles, CheckCircle2 } from 'lucide-react';
import { InteractiveBreathing } from './InteractiveBreathing';
import { InteractiveStudyTimer } from './InteractiveStudyTimer';
import confetti from 'canvas-confetti';

interface ExerciseDetails {
  kind: 'breathing' | 'checklist' | 'timer' | 'reflection';
  title: string;
  description: string;
  actionItems?: string[];
}

interface ExerciseCardProps {
  exercise: ExerciseDetails;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [checkedIndices, setCheckedIndices] = useState<number[]>([]);

  if (exercise.kind === 'breathing') {
    return <InteractiveBreathing />;
  }

  if (exercise.kind === 'timer') {
    return <InteractiveStudyTimer />;
  }

  const items = exercise.actionItems || [
    'Take a 30-second breath break',
    'Drink a glass of water',
    'Write down one achievable task for today',
  ];

  const toggleCheck = (idx: number) => {
    let next: number[];
    if (checkedIndices.includes(idx)) {
      next = checkedIndices.filter((i) => i !== idx);
    } else {
      next = [...checkedIndices, idx];
      if (next.length === items.length) {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#779B7D', '#E6EDE3', '#F7F6F0'],
        });
      }
    }
    setCheckedIndices(next);
  };

  const isAllDone = checkedIndices.length === items.length && items.length > 0;

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#C8DBC4] rounded-2xl p-5 sm:p-6 my-6 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-[#779B7D]" />
        <h4 className="text-xs font-bold tracking-wider text-[#779B7D] uppercase">
          {exercise.title || 'Practical Step-by-Step Exercise'}
        </h4>
      </div>

      <p className="text-sm text-[#64748B] mb-4 leading-relaxed">
        {exercise.description}
      </p>

      {/* Interactive checklist */}
      <div className="space-y-2.5">
        {items.map((item, idx) => {
          const isDone = checkedIndices.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleCheck(idx)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                isDone
                  ? 'bg-[#E6EDE3] border-[#C8DBC4] text-[#4A5568]'
                  : 'bg-white border-[#E8E6DF] hover:border-[#C8DBC4] text-[#2D3748]'
              }`}
            >
              <div className="shrink-0 text-[#779B7D]">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-[#779B7D]" />
                ) : (
                  <Square className="w-5 h-5 text-[#CBD5E1]" />
                )}
              </div>
              <span className={`text-sm leading-snug ${isDone ? 'line-through text-[#64748B]' : 'font-medium'}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>

      {isAllDone && (
        <div className="flex items-center gap-2 text-xs text-[#243323] font-semibold bg-[#E6EDE3] p-3 rounded-xl mt-4 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#779B7D] shrink-0" />
          <span>All steps checked off! Be proud of taking positive action today.</span>
        </div>
      )}
    </div>
  );
};

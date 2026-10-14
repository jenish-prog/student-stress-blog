import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';

export const InteractiveBreathing: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 1) return prev - 1;

          // Transition to next phase
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 4;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 6;
          } else {
            setPhase('Inhale');
            setCycleCount((c) => c + 1);
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setSecondsLeft(4);
    setCycleCount(0);
  };

  // Visual scale for breathing circle
  let scaleClass = 'scale-95';
  let phaseText = 'Breathe in slowly';
  if (isActive) {
    if (phase === 'Inhale') {
      scaleClass = 'scale-125 transition-transform duration-[4000ms] ease-out';
      phaseText = 'Breathe in gently...';
    } else if (phase === 'Hold') {
      scaleClass = 'scale-125 transition-none';
      phaseText = 'Hold softly...';
    } else {
      scaleClass = 'scale-90 transition-transform duration-[6000ms] ease-in';
      phaseText = 'Release completely...';
    }
  }

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#C8DBC4] rounded-2xl p-6 text-center my-4 shadow-xs">
      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#779B7D] mb-4">
        <Wind className="w-4 h-4" />
        <span>4-4-6 Calming Breath Pacer</span>
      </div>

      {/* Breathing Circle Visual */}
      <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-6">
        {/* Outer glowing ring */}
        <div
          className={`absolute inset-0 rounded-full bg-[#E6EDE3] opacity-60 transform ${scaleClass}`}
        />
        {/* Inner circle */}
        <div
          className={`w-28 h-28 rounded-full bg-linear-to-b from-[#779B7D] to-[#608366] text-white flex flex-col items-center justify-center shadow-md transform ${scaleClass}`}
        >
          <span className="text-xl font-bold tracking-tight">{secondsLeft}s</span>
          <span className="text-[11px] font-medium opacity-90">{phase}</span>
        </div>
      </div>

      <p className="text-sm font-serif-editorial text-[#2D3748] mb-4 italic">
        {isActive ? phaseText : "Tap Start and follow the circle's rhythm"}
      </p>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={toggleActive}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#779B7D] text-white text-xs font-semibold hover:bg-[#688A6E] transition-all cursor-pointer shadow-xs active:scale-95"
        >
          {isActive ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>{cycleCount > 0 ? 'Resume' : 'Start Pacer'}</span>
            </>
          )}
        </button>

        {(isActive || cycleCount > 0) && (
          <button
            type="button"
            onClick={reset}
            className="p-2.5 rounded-xl bg-white border border-[#E8E6DF] text-[#64748B] hover:text-[#2D3748] transition-colors cursor-pointer"
            title="Reset Pacer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {cycleCount > 0 && (
        <p className="text-[11px] text-[#779B7D] font-medium mt-3">
          Completed {cycleCount} mindful breath {cycleCount === 1 ? 'cycle' : 'cycles'}. Notice your shoulders relaxing.
        </p>
      )}
    </div>
  );
};

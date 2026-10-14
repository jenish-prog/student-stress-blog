import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveStudyTimer: React.FC = () => {
  const TOTAL_SECONDS = 15 * 60; // 15 minutes
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#779B7D', '#E6EDE3', '#F7F6F0', '#C8DBC4']
      });
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (isCompleted) {
      setIsCompleted(false);
      setSecondsRemaining(TOTAL_SECONDS);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsRemaining(TOTAL_SECONDS);
    setIsCompleted(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((TOTAL_SECONDS - secondsRemaining) / TOTAL_SECONDS) * 100;

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#C8DBC4] rounded-2xl p-6 text-center my-4 shadow-xs">
      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#779B7D] mb-3">
        <Clock className="w-4 h-4" />
        <span>15-Minute Study Sprint</span>
      </div>

      <p className="text-xs text-[#64748B] max-w-sm mx-auto mb-4">
        Focus on just one homework sheet or topic until the chime. No multitasking.
      </p>

      {/* Timer Display */}
      <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-3">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r="60"
            className="stroke-[#E8E6DF]"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r="60"
            className="stroke-[#779B7D] transition-all duration-500 ease-linear"
            strokeWidth="8"
            strokeDasharray={377}
            strokeDashoffset={377 - (377 * progressPercent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isCompleted ? (
            <CheckCircle className="w-10 h-10 text-[#779B7D] animate-bounce" />
          ) : (
            <span className="text-2xl font-bold font-mono text-[#2D3748]">
              {formatTime(secondsRemaining)}
            </span>
          )}
          <span className="text-[11px] text-[#64748B]">
            {isCompleted ? 'Sprint Done!' : '15 min sprint'}
          </span>
        </div>
      </div>

      {isCompleted ? (
        <div className="p-3 bg-[#E6EDE3] rounded-xl my-3 text-xs text-[#243323] font-medium">
          🎉 Incredible job! You finished 15 minutes of uninterrupted focus. Close the books and drink water!
        </div>
      ) : null}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          type="button"
          onClick={toggleTimer}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#779B7D] text-white text-xs font-semibold hover:bg-[#688A6E] transition-all cursor-pointer shadow-xs active:scale-95"
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Sprint</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>{secondsRemaining < TOTAL_SECONDS ? 'Resume' : 'Start 15m Sprint'}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={resetTimer}
          className="p-2.5 rounded-xl bg-white border border-[#E8E6DF] text-[#64748B] hover:text-[#2D3748] transition-colors cursor-pointer"
          title="Reset Timer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

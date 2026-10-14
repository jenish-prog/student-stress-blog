import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface BottomActionProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  footnote?: string;
  id?: string;
}

export const BottomAction: React.FC<BottomActionProps> = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  footnote,
  id = 'continue-btn',
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-linear-to-t from-[#F7F6F0] via-[#F7F6F0]/95 to-transparent pt-6 pb-6 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto flex flex-col items-center">
        <button
          type="button"
          id={id}
          disabled={disabled || loading}
          onClick={onClick}
          className={`w-full h-[52px] rounded-2xl flex items-center justify-center gap-2 font-semibold text-[15px] transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99] ${
            disabled
              ? 'bg-[#E2DFD7] text-[#94A3B8] cursor-not-allowed opacity-70'
              : 'bg-[#779B7D] hover:bg-[#688A6E] text-white hover:shadow-md'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Personalizing your guide...</span>
            </>
          ) : (
            <>
              <span>{label}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {footnote && (
          <p className="text-xs text-[#718096] text-center mt-2.5 font-normal">
            {footnote}
          </p>
        )}
      </div>
    </div>
  );
};

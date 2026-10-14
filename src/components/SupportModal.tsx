import React from 'react';
import { X, Phone, MessageSquare, Heart, Shield, School } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[#FAF9F5] rounded-3xl border border-[#E8E6DF] shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E6DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E6EDE3] flex items-center justify-center text-[#779B7D]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 id="support-modal-title" className="font-semibold text-base text-[#2D3748]">
                Confidential Support & Help
              </h2>
              <p className="text-xs text-[#64748B]">You are never alone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F7F6F0] hover:text-[#2D3748] transition-colors cursor-pointer"
            aria-label="Close support modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 bg-[#E6EDE3]/60 rounded-2xl border border-[#C8DBC4]">
            <p className="text-sm text-[#2D3748] leading-relaxed">
              If things feel too heavy to handle on your own, talking to someone is a sign of courage, not weakness. These free, confidential resources are available 24/7.
            </p>
          </div>

          {/* Quick Helplines */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Immediate 24/7 Helplines
            </h3>

            {/* 988 Lifeline */}
            <a
              href="tel:988"
              className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#E8E6DF] hover:border-[#779B7D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F6F0] flex items-center justify-center text-[#779B7D] group-hover:bg-[#E6EDE3]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2D3748]">988 Suicide & Crisis Lifeline</div>
                  <div className="text-xs text-[#64748B]">Call or text 988 (US & Canada, Free & 24/7)</div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#779B7D]">Call 988</span>
            </a>

            {/* Crisis Text Line */}
            <a
              href="sms:741741?body=HOME"
              className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#E8E6DF] hover:border-[#779B7D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F7F6F0] flex items-center justify-center text-[#779B7D] group-hover:bg-[#E6EDE3]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2D3748]">Crisis Text Line</div>
                  <div className="text-xs text-[#64748B]">Text HOME to 741741 (US & UK)</div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#779B7D]">Text Now</span>
            </a>

            {/* Childline / International */}
            <div className="p-3.5 bg-white rounded-xl border border-[#E8E6DF]">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-[#F7F6F0] flex items-center justify-center text-[#779B7D]">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="text-sm font-semibold text-[#2D3748]">International Support</div>
              </div>
              <p className="text-xs text-[#64748B] pl-11">
                UK: Childline at 0800 1111 | India: Tele-MANAS at 14416 | Global directory at <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="text-[#779B7D] underline">findahelpline.com</a>
              </p>
            </div>
          </div>

          {/* School Resources */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8E6DF]">
            <div className="flex items-center gap-2 mb-2">
              <School className="w-4 h-4 text-[#779B7D]" />
              <h4 className="text-sm font-semibold text-[#2D3748]">Talking with Your School Counsellor</h4>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Your school counsellor or a trusted teacher is specifically trained to help navigate exam panic, family pressure, and friendship difficulties without putting you on the spot. You can ask for a quick 10-minute check-in during a free period.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E6DF] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#779B7D] text-white text-sm font-semibold hover:bg-[#688A6E] transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

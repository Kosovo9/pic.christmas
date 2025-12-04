import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, ReferralState } from '../types';

interface ReferralBannerProps {
  language: Language;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ language }) => {
  const t = TRANSLATIONS[language].referral;
  // Stub state - in real app, fetch from DB
  const [state] = useState<ReferralState>({
    code: 'REF-NX25',
    referrals: 3,
    target: 5,
    hasReward: false
  });
  
  const progress = (state.referrals / state.target) * 100;

  const copyCode = () => {
    navigator.clipboard.writeText(state.code);
    alert("Code copied!");
  };

  return (
    <div className="bg-gradient-to-r from-[#3E0000]/80 to-[#1a0505]/80 backdrop-blur-sm border-y border-[#D4AF37]/30 py-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 opacity-10 text-[#D4AF37]">
         <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-left">
           <h3 className="text-2xl font-serif font-bold text-[#D4AF37] mb-2">{t.title}</h3>
           <p className="text-slate-300 max-w-md">{t.desc}</p>
        </div>

        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-[#000000]/50 p-2 rounded border border-[#D4AF37]/50">
                <span className="text-xs text-slate-400 uppercase tracking-wide">{t.codeLabel}</span>
                <span className="text-lg font-mono font-bold text-white tracking-widest">{state.code}</span>
                <button onClick={copyCode} className="ml-2 text-xs bg-[#D4AF37] text-black font-bold px-2 py-1 rounded hover:bg-[#F3E5AB]">
                    {t.copy}
                </button>
            </div>
            
            <div className="w-full md:w-64">
                <div className="flex justify-between text-xs text-[#D4AF37] mb-1">
                    <span>{t.progress} {state.referrals}/{state.target}</span>
                    {state.referrals >= state.target && <span>🎁</span>}
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div className="h-full bg-gradient-to-r from-[#B8860B] to-[#F3E5AB]" style={{ width: `${Math.min(100, progress)}%` }}></div>
                </div>
                {state.referrals >= state.target && (
                    <p className="text-xs text-green-400 mt-1 font-bold animate-pulse">{t.reward}</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
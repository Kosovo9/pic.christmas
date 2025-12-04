import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onStart }) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <div className="relative pt-32 pb-16 sm:pt-48 sm:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-transparent">
      
      {/* Content - z-10 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-2 rounded-full border border-[#D4AF37]/50 bg-[#3E0000]/60 backdrop-blur text-[#F3E5AB] text-xs font-bold uppercase tracking-[0.2em] mb-10 animate-fade-in shadow-[0_0_25px_rgba(212,175,55,0.2)]">
          <span className="mr-2 text-gold">✦</span>
          {t.poweredBy}
        </div>
        
        {/* Main Title - High Contrast Package 2 Style */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-white tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
          {t.title}
        </h1>
        
        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-[#E5E5E5] mb-12 font-light leading-relaxed">
          {t.subtitle}
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={onStart}
            className="px-12 py-5 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#1a0505] rounded-sm font-bold shadow-[0_0_40px_rgba(212,175,55,0.4)] transform transition hover:scale-105 hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] uppercase tracking-widest text-sm sm:text-base"
          >
            {t.ctaUpload}
          </button>
          <button className="px-12 py-5 bg-transparent text-white border border-white/30 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base hover:bg-white/10 transition backdrop-blur-sm">
            {t.ctaExamples}
          </button>
        </div>
      </div>
    </div>
  );
};
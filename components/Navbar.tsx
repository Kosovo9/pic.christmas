import React from 'react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1a0505]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="relative filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                {/* Premium Gold Logo */}
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8C10 5.79 11.79 4 14 4H16C17.1 4 18 4.9 18 6V23.5L25 12.5C26 11 27 11 28 12.5L29 14C30 15.5 29 17 28 18.5L26 21.5V34C26 36.21 24.21 38 22 38H20C18.9 38 18 37.1 18 36V18.5L11 29.5C10 31 9 31 8 29.5L7 28C6 26.5 7 25 8 23.5L10 20.5V8Z" fill="#3E0000" opacity="0.8" transform="translate(2, 2)"/>
                    <path d="M8 8C8 5.79 9.79 4 12 4H14C15.1 4 16 4.9 16 6V23.5L24.4 11.2C25.2 10.1 26.8 10.1 27.6 11.2L28.8 13.2C29.6 14.4 29.6 16.6 27.6 18.8L24 23V34C24 36.21 22.21 38 20 38H18C16.9 38 16 37.1 16 36V18.5L7.6 30.8C6.8 31.9 5.2 31.9 4.4 30.8L3.2 28.8C2.4 27.6 2.4 25.4 4.4 23.2L8 19V8Z" fill="url(#gold_gradient)" stroke="url(#gold_highlight)" strokeWidth="1"/>
                    <defs>
                        <linearGradient id="gold_gradient" x1="4" y1="4" x2="32" y2="38" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#F3E5AB" />
                            <stop offset="30%" stopColor="#D4AF37" />
                            <stop offset="70%" stopColor="#B8860B" />
                            <stop offset="100%" stopColor="#805A00" />
                        </linearGradient>
                        <linearGradient id="gold_highlight" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                             <stop offset="0%" stopColor="#FFFFFF" />
                             <stop offset="50%" stopColor="#D4AF37" />
                             <stop offset="100%" stopColor="#B8860B" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="flex flex-col leading-none justify-center">
                <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] drop-shadow-sm font-serif">
                NEXORA
                </span>
                <span className="text-[9px] font-bold text-[#D4AF37] tracking-[0.4em] uppercase ml-0.5 mt-1">
                STUDIO PREMIUM
                </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="relative group">
                <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="appearance-none bg-[#3E0000] text-[#D4AF37] text-xs font-bold px-4 py-2 pr-8 rounded-sm border border-[#D4AF37]/50 hover:border-[#F3E5AB] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer transition-all uppercase tracking-wider"
                >
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                    <option value="de">DE</option>
                    <option value="pt">PT</option>
                    <option value="zh">ZH</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#D4AF37]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
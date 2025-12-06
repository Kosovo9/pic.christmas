import React from 'react';
import { Language } from '../types';

interface NavbarProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
    onReferralsClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange, onReferralsClick }) => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-[#050811]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => window.location.reload()}
                    >
                        {/* Logo Nexora "N" */}
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">
                            N
                        </div>
                        <span className="text-xl font-bold tracking-wide text-white">
                            NEXORA
                        </span>
                    </div>

                    <div className="flex items-center space-x-6">
                        {/* Referral Link */}
                        {onReferralsClick && (
                            <button
                                onClick={onReferralsClick}
                                className="hidden md:block text-sm text-slate-300 hover:text-white transition-colors"
                            >
                                Referrals
                            </button>
                        )}

                        <div className="flex items-center bg-slate-800/50 rounded-full p-1 border border-slate-700/50">
                            <button
                                onClick={() => onLanguageChange('es')}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${language === 'es' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                ES
                            </button>
                            <button
                                onClick={() => onLanguageChange('en')}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                EN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

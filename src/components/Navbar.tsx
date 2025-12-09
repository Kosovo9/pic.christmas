import React from 'react';
import { Language } from '../types';

interface NavbarProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
    onReferralsClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange, onReferralsClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageSelect = (lang: Language) => {
        onLanguageChange(lang);
        setIsDropdownOpen(false);
    };

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

                        <div className="flex items-center gap-4">
                            {/* Language Switcher */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${isDropdownOpen ? 'bg-slate-700/50 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-white uppercase">{language}</span>
                                        <span className="h-3 w-px bg-slate-600"></span>
                                        {/* Dynamic Currency Display */}
                                        <span className="text-xs font-mono text-emerald-400">
                                            {language === 'es' ? 'MXN' : language === 'en' ? 'USD' : language === 'ja' ? 'JPY' : 'EUR'}
                                        </span>
                                    </div>
                                    <svg className={`w-3 h-3 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
                                        <div className="py-1 max-h-80 overflow-y-auto custom-scrollbar">
                                            {[
                                                { code: 'en', label: 'English', currency: 'USD ($)' },
                                                { code: 'es', label: 'Español', currency: 'MXN ($)' },
                                                { code: 'fr', label: 'Français', currency: 'EUR (€)' },
                                                { code: 'de', label: 'Deutsch', currency: 'EUR (€)' },
                                                { code: 'it', label: 'Italiano', currency: 'EUR (€)' },
                                                { code: 'pt', label: 'Português', currency: 'BRL (R$)' },
                                                { code: 'ru', label: 'Русский', currency: 'RUB (₽)' },
                                                { code: 'zh', label: '中文', currency: 'CNY (¥)' },
                                                { code: 'ja', label: '日本語', currency: 'JPY (¥)' },
                                                { code: 'ar', label: 'العربية', currency: 'AED (د.إ)' }
                                            ].map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => handleLanguageSelect(lang.code as any)}
                                                    className={`block w-full text-left px-4 py-3 text-sm hover:bg-slate-800 transition-colors border-b border-slate-800/50 last:border-0
                                                        ${language === lang.code ? 'text-blue-400 font-bold bg-slate-800/50' : 'text-slate-400'}
                                                    `}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span>{lang.label}</span>
                                                        <span className="text-xs opacity-50 font-mono bg-slate-950 px-1.5 py-0.5 rounded">{lang.currency}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

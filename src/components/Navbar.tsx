import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { useCurrency } from '@/contexts/CurrencyContext';
import { CurrencyCode } from '@/services/CurrencyService';

interface NavbarProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
    onReferralsClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange, onReferralsClick }) => {
    const { currency, setCurrency } = useCurrency();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false); // Helper state for mobile if needed, though group-hover handles verify

    useEffect(() => {
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* LEFT: Logo */}
                    <div
                        className="flex items-center gap-3 cursor-pointer flex-1"
                        onClick={() => window.location.reload()}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            PC
                        </div>
                        <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-red-500 via-green-500 to-red-500 bg-clip-text text-transparent">
                            PIC.CHRISTMAS
                        </span>
                    </div>

                    {/* CENTER: Affiliates */}
                    <div className="flex-1 flex justify-center">
                        {onReferralsClick && (
                            <button
                                onClick={onReferralsClick}
                                className="px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 rounded-full text-emerald-400 font-medium text-sm transition-all flex items-center gap-2"
                            >
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                Affiliates
                            </button>
                        )}
                    </div>

                    {/* RIGHT: User Avatar, Currency, Language */}
                    <div className="flex items-center gap-4 flex-1 justify-end">
                        {/* User Avatar */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 transition-all cursor-pointer">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                👤
                            </div>
                            <span className="text-sm text-slate-300">Guest</span>
                        </div>

                        {/* Currency Selector */}
                        <div className="relative hidden md:block group z-50">
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-700 hover:border-emerald-500/50 transition-all">
                                <span className="text-xs font-mono text-emerald-400 font-bold">${currency}</span>
                                <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-40 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                <div className="p-1 grid grid-cols-1 max-h-64 overflow-y-auto custom-scrollbar">
                                    {['USD', 'EUR', 'MXN', 'BRL', 'ARS', 'COP', 'CLP', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setCurrency(c as CurrencyCode)}
                                            className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-800 rounded-lg transition-colors flex justify-between
                                                ${currency === c ? 'text-emerald-400 bg-emerald-950/20 font-bold' : 'text-slate-300'}
                                             `}
                                        >
                                            <span>{c}</span>
                                            {currency === c && <span className="text-emerald-500">✓</span>}
                                        </button>
                                    ))}
                                </div>
                                <div className="px-3 py-2 bg-slate-950 text-[10px] text-slate-500 text-center border-t border-slate-800">
                                    Live Rates
                                </div>
                            </div>
                        </div>

                        {/* Language Switcher */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${isDropdownOpen ? 'bg-slate-700/50 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'}`}
                            >
                                <span className="text-sm font-bold text-white uppercase">{language}</span>
                                <svg className={`w-3 h-3 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
                                    <div className="py-1 max-h-80 overflow-y-auto custom-scrollbar">
                                        {[
                                            { code: 'en', label: 'English' },
                                            { code: 'es', label: 'Español' },
                                            { code: 'fr', label: 'Français' },
                                            { code: 'de', label: 'Deutsch' },
                                            { code: 'it', label: 'Italiano' },
                                            { code: 'pt', label: 'Português' },
                                            { code: 'ru', label: 'Русский' },
                                            { code: 'zh', label: '中文' },
                                            { code: 'ja', label: '日本語' },
                                            { code: 'ar', label: 'العربية' },
                                        ].map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageSelect(lang.code as Language)}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-800 transition-colors flex items-center justify-between
                                                    ${language === lang.code ? 'text-emerald-400 bg-emerald-950/20 font-bold' : 'text-slate-300'}
                                                `}
                                            >
                                                <span>{lang.label}</span>
                                                {language === lang.code && <span className="text-emerald-500">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

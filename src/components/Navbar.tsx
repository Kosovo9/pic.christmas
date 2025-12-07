import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
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
                            {/* Auth Buttons */}
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>

                            {/* Language Switcher */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${isDropdownOpen ? 'bg-slate-700/50 border-slate-500' : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'}`}
                                >
                                    <span className="text-xs font-medium text-white uppercase">{language}</span>
                                    <svg className={`w-3 h-3 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
                                        <div className="py-1 max-h-64 overflow-y-auto custom-scrollbar">
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
                                                { code: 'ar', label: 'العربية' }
                                            ].map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => handleLanguageSelect(lang.code as any)}
                                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-800 transition-colors
                                                        ${language === lang.code ? 'text-blue-400 font-medium bg-slate-800/50' : 'text-slate-400'}
                                                    `}
                                                >
                                                    {lang.label}
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

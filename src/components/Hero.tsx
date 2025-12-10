import React, { useEffect, useState } from 'react';
import { trackEvent } from '../services/analytics';
import { Language } from '../types';
import { useI18n } from '../hooks/useI18n';
import { Santa3DScene } from './Santa3DScene';

interface HeroProps {
    language: Language;
    onStart: () => void;
    freeMode?: any;
}

export const Hero: React.FC<HeroProps> = ({ onStart, freeMode }) => {
    const { t } = useI18n();

    const heroImages: string[] = [
        'https://images.unsplash.com/photo-1543258103-a62bdc069871?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?q=80&w=2080&auto=format&fit=crop',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        trackEvent('view_landing');
        const interval = setInterval(() => {
            setCurrentIndex((i) => (i + 1) % heroImages.length);
        }, 6000); // Slightly faster rotation
        return () => clearInterval(interval);
    }, []);

    return (
        <div suppressHydrationWarning className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                {heroImages.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={img}
                            alt="Christmas Magic"
                            className="w-full h-full object-cover transform scale-105 animate-subtle-zoom"
                        />
                        {/* Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90" />
                    </div>
                ))}
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Premium Badge */}
                {/* Premium Badge Removed as requested to avoid covering logo */}
                <div className="mb-8"></div>

                {/* Main Headline */}
                <h1 className="animate-slide-up text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight mb-8 leading-tight drop-shadow-2xl">
                    {t('hero.title')}
                </h1>

                {/* Subtitle */}
                <p className="animate-slide-up [animation-delay:200ms] mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-slate-200 mb-12 font-medium leading-relaxed drop-shadow-lg">
                    {t('hero.description')}
                </p>

                {/* CTA Buttons */}
                <div className="animate-slide-up [animation-delay:400ms] flex flex-col sm:flex-row justify-center gap-6">
                    <button
                        onClick={onStart}
                        className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl font-bold text-xl shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:shadow-[0_0_40px_rgba(37,99,235,0.8)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            <span className="text-2xl">📸</span>
                            <span>{t('hero.create_btn')}</span>
                            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </span>
                    </button>

                    <button className="px-10 py-5 bg-slate-800/40 hover:bg-slate-800/60 text-white border-2 border-slate-600 hover:border-slate-400 rounded-2xl font-bold text-xl backdrop-blur-md transition-all duration-300 flex items-center gap-3">
                        <span className="text-2xl">🖼️</span>
                        <span>{t('hero.gallery_btn')}</span>
                    </button>
                </div>

                {/* Santa 3D Animado - Paseándose por el UI */}
                <div className="animate-fade-in [animation-delay:600ms] mt-12 flex justify-center">
                    <div className="relative w-full max-w-4xl">
                        <Santa3DScene />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="animate-fade-in [animation-delay:800ms] mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl font-black text-emerald-400 mb-2">133</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wide">users creating now</div>
                    </div>
                    <div className="text-center border-x border-white/10">
                        <div className="text-4xl font-black text-blue-400 mb-2">32,454</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wide">photos generated today</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-yellow-400 mb-2">4.9/5</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wide">from happy customers</div>
                    </div>
                </div>

                {/* Social Proof / Trust Indicators */}
                <div className="animate-fade-in [animation-delay:1000ms] mt-16 pt-8 border-t border-white/10">
                    <p className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-widest">{t('hero.trusted')}</p>
                    <div className="flex justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Logos - Replace with SVGs or Images */}
                        <div className="h-8 w-24 bg-white/20 rounded animate-pulse"></div>
                        <div className="h-8 w-24 bg-white/20 rounded animate-pulse [animation-delay:200ms]"></div>
                        <div className="h-8 w-24 bg-white/20 rounded animate-pulse [animation-delay:400ms]"></div>
                    </div>
                </div>
            </div>

            {/* Free Mode Banner - Moved Below per User Request */}
            {freeMode?.active && (
                <div className="mt-8 mx-auto max-w-3xl">
                    <div
                        className="bg-yellow-400/60 backdrop-blur-md text-slate-900 py-3 px-6 rounded-xl font-black text-lg animate-pulse shadow-[0_0_30px_rgba(250,204,21,0.4)] border border-yellow-300/50"
                        role="alert"
                    >
                        🚀 VIRAL LAUNCH: FREE MODE ACTIVE — {freeMode.hoursRemaining}h {freeMode.minutesRemaining}m LEFT!
                    </div>
                </div>
            )}
        </div>
    );
};

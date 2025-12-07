import React, { useEffect, useState } from 'react';
import { trackEvent } from '../services/analytics';
import { Language } from '../types';

interface HeroProps {
    language: Language;
    onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onStart }) => {
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
                <div className="animate-fade-in inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-900/20 backdrop-blur-md text-blue-200 text-sm font-medium mb-8 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                    <span>Powered by Gemini 2.5 & Veo 3.1</span>
                </div>

                {/* Main Headline */}
                <h1 className="animate-slide-up text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight mb-8 leading-tight drop-shadow-2xl">
                    Make This Christmas <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 animate-shimmer bg-[length:200%_100%]">
                        Unforgettable
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="animate-slide-up [animation-delay:200ms] mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-slate-300 mb-12 font-light leading-relaxed">
                    Transform your photos into hyper-realistic holiday portraits using next-gen AI.
                    Perfect for families, couples, and pets.
                </p>

                {/* CTA Buttons */}
                <div className="animate-slide-up [animation-delay:400ms] flex flex-col sm:flex-row justify-center gap-6">
                    <button
                        onClick={onStart}
                        className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl font-bold text-xl shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:shadow-[0_0_40px_rgba(37,99,235,0.8)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            <span className="text-2xl">📸</span>
                            <span>Create My Magic Photo</span>
                            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </span>
                    </button>

                    <button className="px-10 py-5 bg-slate-800/40 hover:bg-slate-800/60 text-white border-2 border-slate-600 hover:border-slate-400 rounded-2xl font-bold text-xl backdrop-blur-md transition-all duration-300 flex items-center gap-3">
                        <span className="text-2xl">🖼️</span>
                        <span>View Gallery</span>
                    </button>
                </div>

                {/* Social Proof / Trust Indicators */}
                <div className="animate-fade-in [animation-delay:800ms] mt-16 pt-8 border-t border-white/10">
                    <p className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-widest">Trusted by 10,000+ Happy Elves</p>
                    <div className="flex justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Logos - Replace with SVGs or Images */}
                        <div className="h-8 w-24 bg-white/20 rounded animate-pulse"></div>
                        <div className="h-8 w-24 bg-white/20 rounded animate-pulse [animation-delay:200ms]"></div>
                        <div className="h-8 w-24 bg-white/20 rounded animate-pulse [animation-delay:400ms]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

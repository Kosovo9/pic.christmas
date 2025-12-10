
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useI18n } from '../hooks/useI18n';

export const BeforeAfter = () => {
    const { t } = useI18n();
    const router = useRouter();
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;

        let position = ((clientX - containerRect.left) / containerRect.width) * 100;
        position = Math.min(100, Math.max(0, position));

        setSliderPosition(position);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto my-8 px-4 animate-fade-in-up relative z-10">
            <h3 className="text-3xl md:text-5xl font-black text-center text-white mb-8 drop-shadow-lg">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {t('before_after.title')}
                </span>
            </h3>
            <div
                ref={containerRef}
                className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize border-2 border-slate-700 shadow-2xl select-none"
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                {/* Image After (Background) */}
                <div className="absolute inset-0 w-full h-full bg-slate-900 flex items-center justify-center">
                    <img src="/hero-cam-after.jpg" alt="After AI" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = 'https://placehold.co/800x400/101010/FFF?text=After+AI+Magic'} />
                    <div className="absolute top-4 right-4 bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-md">
                        {t('before_after.after')}
                    </div>
                </div>

                {/* Image Before (Clipped) */}
                <div
                    className="absolute inset-0 w-full h-full overflow-hidden bg-slate-800"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                    <img src="/hero-cam-before.jpg" alt="Before AI" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = 'https://placehold.co/800x400/303030/FFF?text=Before+Original'} />
                    <div className="absolute top-4 left-4 bg-slate-800/80 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-md">
                        {t('before_after.before')}
                    </div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20 flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-900 border-4 border-slate-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                    </div>
                </div>
            </div>
            {/* OVERLAY CTA - The Main Upload Trigger */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <div className="bg-slate-900/40 backdrop-blur-[2px] p-6 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto text-center transform hover:scale-105 transition-all duration-300 group">
                    <p className="text-white font-bold text-lg mb-4 drop-shadow-md">
                        ✨ Create Your Magic Photos Now
                    </p>
                    <button
                        onClick={() => router.push('/generate')}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 px-8 rounded-full text-xl shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center gap-3 mx-auto transition-all"
                    >
                        <span>📸</span>
                        <span>Start Uploading</span>
                    </button>
                    <p className="text-blue-200 text-xs mt-3 font-medium">
                        Instant Delivery • 100% Satisfaction
                    </p>
                </div>
            </div>

            <p className="text-center text-slate-400 text-sm mt-6 flex items-center justify-center gap-2">
                <span className="w-12 h-[1px] bg-slate-700"></span>
                <span>{t('before_after.drag')}</span>
                <span className="w-12 h-[1px] bg-slate-700"></span>
            </p>
        </div>
    );
};

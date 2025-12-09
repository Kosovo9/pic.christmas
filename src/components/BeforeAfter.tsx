
"use client";

import React, { useState, useRef, useEffect } from 'react';

import { useI18n } from '../hooks/useI18n';

export const BeforeAfter = () => {
    const { t } = useI18n();
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
        <div className="w-full max-w-4xl mx-auto my-12 px-4 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-center text-white mb-6">{t('before_after.title')}</h3>
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
            <p className="text-center text-slate-400 text-sm mt-4">{t('before_after.drag')}</p>
        </div>
    );
};

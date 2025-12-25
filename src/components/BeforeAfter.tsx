"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function BeforeAfter() {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: any) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPos(pos);
    };

    return (
        <section className="py-24 px-6 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h3 className="text-5xl font-serif mb-4 tracking-tighter">Instant Perfection</h3>
                <p className="text-gray-500 max-w-xl mx-auto italic">
                    Drag the slider to see how Nano Banana™ transforms your selfie into a holiday masterpiece within seconds.
                </p>
            </div>

            <div
                ref={containerRef}
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border-8 border-white/5 cursor-ew-resize shadow-[0_0_80px_rgba(255,255,255,0.05)] bg-[#0a0f1c]"
            >
                {/* After (Full) */}
                <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-red-900 to-black flex items-center justify-center text-8xl">🎅</div>
                    <div className="absolute top-6 right-6 bg-christmas-gold text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Quantum AI Result</div>
                </div>

                {/* Before (Clipped) */}
                <div
                    className="absolute inset-0 z-10 overflow-hidden bg-slate-800"
                    style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                >
                    <div className="w-full h-full opacity-30 bg-slate-900 flex items-center justify-center text-8xl grayscale">👤</div>
                    <div className="absolute top-6 left-6 bg-white/20 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">Your Original</div>
                </div>

                {/* Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-christmas-gold/50 z-20"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center text-black border-4 border-christmas-gold">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// components/FlyingSanta3D.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

export const FlyingSanta3D = () => {
    const santaRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef(Date.now());
    const [isWaving, setIsWaving] = useState(false);

    const [passCount, setPassCount] = useState(0);

    useEffect(() => {
        const startTime = startTimeRef.current;

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            // 3D Flight Path Logic
            const progress = (elapsed % 25000) / 25000;

            // Count passes
            if (Math.floor(elapsed / 25000) > passCount) {
                setPassCount(prev => prev + 1);
            }

            const x = 120 - (progress * 140); // Right to Left
            const y = 10 + Math.sin(progress * Math.PI * 4) * 8; // Wavy path
            const scale = 0.8 + Math.sin(progress * Math.PI * 2) * 0.3; // Depth perception
            const rotation = Math.sin(progress * Math.PI * 8) * 8; // Banking turns
            const gallop = Math.sin(elapsed / 100) * 3; // Fast reindeer gallop

            const finalY = y + gallop;

            // Waving Logic: Wave every 5 seconds for 1 second
            if (elapsed % 5000 < 1000) {
                setIsWaving(true);
            } else {
                setIsWaving(false);
            }

            if (santaRef.current) {
                santaRef.current.style.transform = `translate3d(${x}vw, ${finalY}vh, 0) scale(${scale}) rotate(${rotation}deg)`;
                santaRef.current.style.opacity = (x > -20 && x < 120) ? '1' : '0';
            }

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, []);

    return (
        <div
            ref={santaRef}
            className="fixed top-0 left-0 z-40 pointer-events-none filter drop-shadow-2xl"
            style={{
                willChange: 'transform',
                opacity: 0,
                transition: 'opacity 0.5s ease-out'
            }}
        >
            <div className="relative group">
                {/* 🎅 SANTA SPRITE */}
                <div className={`relative transition-transform duration-200 ${isWaving ? 'rotate-12 scale-110' : ''}`}>
                    <img
                        src="/assets/santa_3d_final.png"
                        alt="Santa Flying"
                        className="h-32 md:h-64 object-contain"
                        onError={(e) => {
                            e.currentTarget.src = "https://cdn.pixabay.com/photo/2016/12/15/21/50/santa-claus-1909875_1280.png";
                        }}
                    />
                    {/* Waving Hand Effect (CSS Hack since we don't have separate sprites yet) */}
                    {isWaving && (
                        <div className="absolute top-10 right-20 text-4xl animate-bounce">👋</div>
                    )}
                </div>

                {/* 🦌 REINDEER LEGS (Simulated via CSS) */}
                <div className="absolute bottom-2 left-10 w-full h-4 overflow-hidden opacity-50">
                    <div className="flex gap-4 animate-pulse">
                        <div className="w-2 h-4 bg-amber-900/50 rounded-full animate-ping"></div>
                        <div className="w-2 h-4 bg-amber-900/50 rounded-full animate-ping delay-75"></div>
                        <div className="w-2 h-4 bg-amber-900/50 rounded-full animate-ping delay-150"></div>
                    </div>
                </div>


                {/* ✨ PARTICLES / MAGIC TRAIL */}
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <span className="absolute animate-ping w-2 h-2 bg-yellow-400 rounded-full opacity-75 top-0 -right-4"></span>
                        <span className="absolute animate-ping w-3 h-3 bg-white rounded-full opacity-50 top-4 -right-8 delay-100"></span>
                        <span className="absolute animate-ping w-1 h-1 bg-yellow-200 rounded-full opacity-90 -top-4 -right-6 delay-200"></span>
                    </div>
                </div>

                {/* 🎁 FALLING PRESENTS (Dropping Logic) */}
                <div className="absolute bottom-0 left-10 animate-drop-gift-1 opacity-0 text-2xl">🎁</div>
                <div className="absolute bottom-0 left-24 animate-drop-gift-2 opacity-0 text-3xl">🧸</div>
                <div className="absolute bottom-0 left-32 animate-drop-gift-3 opacity-0 text-2xl">🍬</div>
                <div className="absolute bottom-0 left-48 animate-drop-gift-4 opacity-0 text-3xl">🎄</div>
            </div>

            <style jsx>{`
                @keyframes drop-gift-1 {
                    0% { transform: translateY(0) rotate(0); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(80vh) rotate(720deg); opacity: 0; }
                }
                .animate-drop-gift-1 { animation: drop-gift-1 3s linear infinite; animation-delay: 2s; }
                .animate-drop-gift-2 { animation: drop-gift-1 4s linear infinite; animation-delay: 6s; }
                .animate-drop-gift-3 { animation: drop-gift-1 3.5s linear infinite; animation-delay: 10s; }
                .animate-drop-gift-4 { animation: drop-gift-1 5s linear infinite; animation-delay: 15s; }
            `}</style>
        </div>
    );
};

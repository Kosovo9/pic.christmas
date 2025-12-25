"use client";

import React, { useState, useEffect } from 'react';

export function CountdownBanner() {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const end = new Date();
            end.setHours(23, 59, 59, 999);
            const diff = end.getTime() - now.getTime();

            if (diff > 0) {
                setTimeLeft({
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-christmas-red text-white py-2 px-4 shadow-2xl relative overflow-hidden z-[60] border-b border-white/10">
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase">
                <span className="flex items-center gap-2">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-christmas-gold">PROMO</span>
                    Quantum Launch: 50% Off Locked
                </span>
                <div className="flex gap-2 bg-black/40 px-3 py-1 rounded-full font-mono text-christmas-gold">
                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
                <span className="hidden md:inline text-white/60">Auto-Apply: GOLDEN24</span>
            </div>
        </div>
    );
}

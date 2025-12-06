
"use client";

import React, { useState, useEffect } from 'react';

export const CountdownBanner = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const diff = tomorrow.getTime() - now.getTime();

            if (diff > 0) {
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTimeLeft({ hours, minutes, seconds });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-2 px-4 shadow-lg sticky top-0 z-[60] text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-bold animate-pulse-slow">
                <span>🎅 EXTENDED: 50% OFF Ends Soon!</span>
                <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded">
                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
                <span className="hidden md:inline">Use code: SANTA25</span>
            </div>
        </div>
    );
};

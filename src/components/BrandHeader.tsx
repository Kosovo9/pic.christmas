// components/BrandHeader.tsx
'use client';

import React from 'react';

export const BrandHeader = () => {
    return (
        <div className="fixed top-6 left-6 z-[60] animate-fade-in flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => window.location.href = '/'}>
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative flex items-center gap-3">
                    {/* Christmas Tree Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        🎄
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl leading-none tracking-wide font-display shadow-black drop-shadow-md bg-gradient-to-r from-red-500 via-green-500 to-red-500 bg-clip-text text-transparent">PIC.CHRISTMAS</span>
                    </div>
                </div>
            </div>

            {/* Affiliates Link - Premium Pill */}
            <a
                href="/affiliates"
                className="hidden md:flex items-center gap-2 group/aff bg-white/5 hover:bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-slate-300 font-medium text-xs group-hover/aff:text-emerald-400 transition-colors">
                    Affiliates
                </span>
            </a>
        </div>
    );
};

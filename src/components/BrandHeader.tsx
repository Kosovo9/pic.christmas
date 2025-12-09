// components/BrandHeader.tsx
'use client';

import React from 'react';

export const BrandHeader = () => {
    return (
        <div className="fixed top-6 left-6 z-[60] animate-fade-in flex items-center gap-6">
            <div className="relative group cursor-pointer" onClick={() => window.location.href = '/'}>
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <img
                    src="/nexora_logo.png"
                    alt="Nexora Studio"
                    className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
                />

                {/* Tech Badge */}
                <div className="absolute -bottom-2 -right-2 bg-slate-950/80 backdrop-blur border border-slate-700 rounded-md px-1.5 py-0.5 pointer-events-none">
                    <span className="text-[8px] font-mono text-blue-400 uppercase tracking-widest">Powered By Nexora</span>
                </div>
            </div>

            {/* Affiliates Link - DESKTOP ONLY for now to save space on mobile, or just icon? */}
            <a
                href="/affiliates"
                className="hidden md:flex items-center gap-2 group/aff bg-slate-900/50 hover:bg-slate-800 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 hover:border-emerald-500/50 transition-all duration-300"
            >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-slate-200 font-bold text-sm group-hover/aff:text-emerald-400 transition-colors">
                    Affiliates (35%)
                </span>
            </a>
        </div>
    );
};

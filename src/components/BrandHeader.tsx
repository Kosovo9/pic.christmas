// components/BrandHeader.tsx
'use client';

import React from 'react';

export const BrandHeader = () => {
    return (
        <div className="fixed top-6 left-6 z-[60] animate-fade-in">
            <div className="relative group cursor-pointer">
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
        </div>
    );
};

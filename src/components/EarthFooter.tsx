// components/EarthFooter.tsx
'use client';

import React from 'react';

export const EarthFooter = () => {
    return (
        <div className="relative w-full overflow-hidden bg-slate-950 pt-32 pb-12 mt-24">
            {/* 🌍 EARTH IMAGE */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl pointer-events-none z-0">
                {/* Atmospheric Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full"></div>

                <img
                    src="/earth_footer.png"
                    alt="World Wide Magic"
                    className="w-full object-cover opacity-80 mask-image-b-0"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)'
                    }}
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center space-y-4">
                <p className="text-blue-200/50 text-sm font-mono tracking-[0.3em] uppercase">
                    From North Pole to World Wide
                </p>
                <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                    <span>© 2025 Nexora Studios</span>
                    <span>•</span>
                    <span>All Rights Reserved</span>
                </div>
            </div>
        </div>
    );
};

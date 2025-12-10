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

                {/* Multilingual Disclaimer */}
                <div className="max-w-2xl mx-auto px-4 mt-8">
                    <p className="text-[10px] text-slate-600 leading-relaxed text-justify opacity-60 hover:opacity-100 transition-opacity">
                        <strong>LEGAL DISCLAIMER:</strong> This service utilizes advanced Artificial Intelligence (AI) for image synthesis. While we strive for realistic results, generated images may vary. Users retain ownership of their original uploads.
                        <br /><br />
                        <strong>DATA RETENTION POLICY:</strong> To ensure user privacy and security, all uploaded and generated images are stored in an auto-expiring, encrypted temporary storage (S3-IA).
                        <strong> ALL IMAGES ARE PERMANENTLY DELETED FROM OUR SERVERS AFTER 24 HOURS.</strong>
                        We do not retain backups. Please download your images immediately. By using this service, you acknowledge and agree to these terms.
                        <br /><br />
                        <em>(Available in EN, ES, FR, DE, IT, PT, RU, ZH, JA, AR via Language Settings)</em>
                    </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-slate-500 text-xs mt-4">
                    <span>© 2025 PIC.CHRISTMAS</span>
                    <span>•</span>
                    <span>All Rights Reserved</span>
                    <span>•</span>
                    <a href="/terms" className="hover:text-blue-400">Terms</a>
                    <span>•</span>
                    <a href="/privacy" className="hover:text-blue-400">Privacy</a>
                </div>
            </div>
        </div>
    );
};

'use client';

import React from 'react';
import { useI18n } from '../hooks/useI18n';

export const DisclaimerFooter = () => {
    const { t } = useI18n();
    return (
        <div className="w-full bg-slate-950 border-t border-slate-800 py-8 px-4 mt-auto">
            <div className="max-w-7xl mx-auto text-center space-y-4">
                <p className="text-slate-500 text-xs leading-relaxed max-w-4xl mx-auto">
                    {t('footer.disclaimer')}
                </p>
                <div className="flex justify-center gap-6 text-xs text-slate-400">
                    <a href="/terms" className="hover:text-blue-400 transition">{t('footer.terms')}</a>
                    <a href="/privacy" className="hover:text-blue-400 transition">{t('footer.privacy')}</a>
                    <a href="/about" className="hover:text-blue-400 transition">About Us</a>
                </div>
                <div className="text-[10px] text-slate-700 font-mono mt-4">
                    Security: Images retained 24h via Encrypted TempStorage (S3-IA). Auto-Wipe Protocol Active.
                </div>
            </div>
        </div>
    );
};

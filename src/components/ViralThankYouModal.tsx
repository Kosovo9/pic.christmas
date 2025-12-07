import React, { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

interface ViralThankYouModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ViralThankYouModal: React.FC<ViralThankYouModalProps> = ({ isOpen, onClose }) => {
    const { t } = useI18n();
    const [step, setStep] = useState<'offer' | 'verifying' | 'reward'>('offer');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isOpen) {
            // Reset state when closed, but maybe we want to persist if they claimed?
            // User said "ya no lo regresa" (do not return it), so this works.
        }
    }, [isOpen]);

    const handleVerify = () => {
        setStep('verifying');
        // Simulate "AI Verification" scan
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 15;
            if (p > 100) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => setStep('reward'), 500);
            }
            setProgress(p);
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-emerald-500/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl select-none">🎁</div>

                {step === 'offer' && (
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                            <span className="text-4xl">🙏</span>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-2">{t('viral.thank_you_title')}</h2>
                        <p className="text-slate-400 mb-8">{t('viral.thank_you_desc')}</p>

                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-dashed border-emerald-500/30 mb-8">
                            <h3 className="text-xl font-bold text-emerald-400 mb-2">{t('viral.offer_title')}</h3>
                            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                {t('viral.offer_desc')}
                            </p>
                            <div className="flex gap-2 justify-center text-3xl mb-4">
                                <span>📱</span><span>💬</span><span>👥</span>
                            </div>
                        </div>

                        <button
                            onClick={handleVerify}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            {t('viral.verify_btn')}
                        </button>

                        <button
                            onClick={onClose}
                            className="mt-4 text-slate-500 text-sm hover:text-white transition-colors"
                        >
                            {t('viral.skip_btn')}
                        </button>
                    </div>
                )}

                {step === 'verifying' && (
                    <div className="text-center py-12">
                        <h3 className="text-2xl font-bold text-white mb-4">{t('viral.verifying_title')}</h3>
                        <p className="text-slate-400 mb-8">{t('viral.verifying_desc')}</p>

                        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden relative">
                            <div
                                className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="mt-4 text-emerald-400 font-mono text-sm">{Math.round(progress)}%</p>
                    </div>
                )}

                {step === 'reward' && (
                    <div className="text-center">
                        <div className="mb-6 scale-150">🎉</div>
                        <h2 className="text-3xl font-bold text-white mb-4">{t('viral.reward_title')}</h2>
                        <p className="text-slate-300 mb-6">
                            {t('viral.reward_desc')}
                        </p>

                        <div className="bg-emerald-900/30 border border-emerald-500/50 p-4 rounded-xl mb-6">
                            <code className="text-2xl font-mono text-emerald-300 tracking-widest font-bold select-all">
                                ELON-GIFT-2025
                            </code>
                            <p className="text-xs text-emerald-500 mt-2">{t('viral.code_hint')}</p>
                        </div>

                        <p className="text-slate-400 text-sm italic mb-8">
                            {t('viral.final_goodbye')}
                        </p>

                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all"
                        >
                            {t('viral.close_final')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

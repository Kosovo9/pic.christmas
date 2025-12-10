'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

interface ThankYouModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShare: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose, onShare }) => {
    const { language } = useI18n();
    const [isShared, setIsShared] = useState(false);

    if (!isOpen) return null;

    const handleShare = () => {
        setIsShared(true);
        onShare();
        // Auto close after 2 seconds
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    const content = {
        en: {
            title: "Thank You for Choosing Us!",
            subtitle: "We hope you love your magical Christmas photos. Before you go, we have a special gift for you.",
            offerTitle: "Want a Free Photo?",
            offerText: "Recommend us to 10 friends or share in 5 WhatsApp/Facebook groups. Help us spread the magic and get a premium photo without watermark for free!",
            shareButton: "I Shared It! Claim Reward",
            noThanks: "No thanks, I don't want free gifts",
            sharedMessage: "✨ Thank you! Check your email for your free photo code!"
        },
        es: {
            title: "¡Gracias por Elegirnos!",
            subtitle: "Esperamos que ames tus fotos navideñas mágicas. Antes de irte, tenemos un regalo especial para ti.",
            offerTitle: "¿Quieres una Foto Gratis?",
            offerText: "Recomiéndanos a 10 amigos o comparte en 5 grupos de WhatsApp/Facebook. ¡Ayúdanos a difundir la magia y obtén una foto premium sin marca de agua gratis!",
            shareButton: "¡Ya Compartí! Reclamar Recompensa",
            noThanks: "No gracias, no quiero regalos gratis",
            sharedMessage: "✨ ¡Gracias! Revisa tu email para tu código de foto gratis!"
        }
    };

    const t = content[language as keyof typeof content] || content.en;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
            <div className="relative max-w-md w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/20 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                {/* Content */}
                <div className="relative z-10 p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 animate-bounce-slow">
                            <span className="text-4xl">🙏</span>
                        </div>
                        <div className="absolute top-8 right-8 opacity-20">
                            <span className="text-6xl">🎁</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-white text-center mb-3">
                        {t.title}
                    </h2>
                    <p className="text-slate-300 text-center mb-8 text-sm leading-relaxed">
                        {t.subtitle}
                    </p>

                    {/* Offer Box */}
                    <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl p-6 mb-6 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-emerald-400 text-center mb-3">
                            {t.offerTitle}
                        </h3>
                        <p className="text-slate-300 text-center text-sm leading-relaxed mb-4">
                            {t.offerText}
                        </p>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                                <span className="text-2xl">📱</span>
                            </div>
                            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                                <span className="text-2xl">💬</span>
                            </div>
                            <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center border border-pink-500/30">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    {!isShared ? (
                        <>
                            <button
                                onClick={handleShare}
                                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30 mb-4"
                            >
                                {t.shareButton}
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full text-slate-400 hover:text-white text-sm transition-colors"
                            >
                                {t.noThanks}
                            </button>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className="text-2xl mb-2 animate-bounce">✨</div>
                            <p className="text-emerald-400 font-bold">{t.sharedMessage}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

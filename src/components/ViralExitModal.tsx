"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Gift, Sparkles } from 'lucide-react';

interface ViralExitModalProps {
    language: string;
}

export const ViralExitModal: React.FC<ViralExitModalProps> = ({ language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !shown) {
                setIsOpen(true);
                setShown(true);
            }
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [shown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="bg-[#0f172a] border-2 border-christmas-gold rounded-[3rem] max-w-lg w-full p-10 text-center relative overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)]">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-christmas-red/20 rounded-full blur-3xl opacity-50" />
                <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white/30 hover:text-white transition">
                    <X className="w-6 h-6" />
                </button>

                <div className="bg-christmas-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-christmas-gold/30">
                    <Gift className="w-10 h-10 text-christmas-gold" />
                </div>

                <h2 className="text-4xl font-serif mb-4 text-white uppercase tracking-tighter">Wait! One Last Gift... 🎁</h2>
                <p className="text-gray-400 mb-8 font-light italic">
                    "Don't leave without your holiday bonus! Share us with 5 friends and get a **Premium 8K Upgrade** absolutely free."
                </p>

                <div className="space-y-4 mb-10">
                    <button
                        onClick={() => {
                            window.open("https://wa.me/?text=Check%20out%20Pic.Christmas!%20Absolute%20AI%20Magic.%20https://pic.christmas", "_blank");
                            setIsOpen(false);
                        }}
                        className="w-full bg-christmas-gold text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition"
                    >
                        <Share2 className="w-6 h-6" /> Share on WhatsApp
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/30 text-xs uppercase tracking-widest hover:text-white transition"
                    >
                        No thanks, I'll pay full price later
                    </button>
                </div>

                <div className="text-[10px] text-christmas-gold/50 flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3" /> Offer expires in 5:00 minutes
                </div>
            </div>
        </div>
    );
};

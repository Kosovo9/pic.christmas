'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShareIncentive = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShared, setHasShared] = useState(false);

    useEffect(() => {
        // Check if user has already shared
        const shared = localStorage.getItem('pic_shared');
        if (shared) {
            setHasShared(true);
            return;
        }

        // Show after 30 seconds on page
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Pic.Christmas - AI Christmas Photos',
                    text: 'Check out this amazing AI Christmas photo generator! 🎄',
                    url: window.location.origin
                });

                localStorage.setItem('pic_shared', 'true');
                setHasShared(true);
                setIsVisible(false);

                // Show success message
                alert('🎁 Thanks for sharing! Check your email for a special discount code.');
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: copy link
            navigator.clipboard.writeText(window.location.origin);
            alert('🔗 Link copied! Share it with friends to unlock rewards.');
        }
    };

    if (hasShared || !isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-24 right-6 z-40 max-w-sm"
            >
                <div className="bg-gradient-to-r from-emerald-900/95 to-teal-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 shadow-2xl">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="text-4xl">🎁</div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-lg mb-2">
                                Love what you see?
                            </h3>
                            <p className="text-emerald-200 text-sm mb-4">
                                Share pic.christmas with friends and get <strong>25% OFF</strong> your next order!
                            </p>
                            <button
                                onClick={handleShare}
                                className="w-full bg-white hover:bg-emerald-50 text-emerald-900 font-bold py-3 px-4 rounded-xl transition-all shadow-lg"
                            >
                                📤 Share Now & Save
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};


'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExitBannerProps {
    onDismiss: () => void;
    sharePhoneNumber?: string;
    userId?: string;
}

export default function ExitBanner({ onDismiss, sharePhoneNumber, userId }: ExitBannerProps) {
    const [bannerCount, setBannerCount] = useState(0);
    const [currentTier, setCurrentTier] = useState<'whatsapp' | 'groups' | 'social'>('whatsapp');
    const [isVisible, setIsVisible] = useState(false);

    const MAX_BANNERS = 3;

    useEffect(() => {
        // Only arm the exit intent if we haven't shown max banners
        if (bannerCount >= MAX_BANNERS) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            // We can't actually show a custom UI *during* beforeunload, 
            // the browser shows a generic dialog. 
            // BUT we can trigger our modal if they cancel (stay) or detect mouse leave instructions.
            // For "Exit Intent" on web, usually mouseleave on top of viewport is used.
            // Let's use mouseleave for desktop + timer/interaction for mobile if needed.
            e.preventDefault();
            e.returnValue = ''; // Trigger browser warning
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && bannerCount < MAX_BANNERS && !isVisible) {
                showNextBanner();
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        // window.addEventListener('beforeunload', handleBeforeUnload); // Aggressive, maybe skip for now to avoid annoyance blocking.

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            // window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [bannerCount, isVisible]);

    const showNextBanner = () => {
        setIsVisible(true);
        setBannerCount(prev => prev + 1);

        if (bannerCount === 0) {
            setCurrentTier('whatsapp');
        } else if (bannerCount === 1) {
            setCurrentTier('groups');
        } else {
            setCurrentTier('social');
        }
    };

    const handleShareClick = async (platform: string) => {
        // Track share in backend
        try {
            await fetch('/api/viral/referral/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId || 'guest',
                    platform,
                    tier: currentTier
                })
            });
        } catch (e) {
            console.error("Tracking failed", e);
        }

        // Generate link
        const referralLink = `https://pic.christmas?ref=${userId || 'guest'}`;
        const message = encodeURIComponent(`🎄 Check out Pic.Christmas! Transform your photos into magical holiday pictures! ${referralLink} 📸✨`);

        if (platform === 'whatsapp' || platform === 'whatsapp-groups') {
            window.open(`https://wa.me/?text=${message}`, '_blank');
        } else if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`, '_blank');
        } else {
            // Copy
            navigator.clipboard.writeText(referralLink);
            alert('Link copied! Share it now to claim reward.');
        }

        // Checking verification after delay (simulated for immediate reward in viral mode)
        setTimeout(() => verifyShare(platform), 5000);
    };

    const verifyShare = async (platform: string) => {
        try {
            const res = await fetch('/api/viral/referral/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId || 'guest',
                    platform
                })
            });
            const data = await res.json();
            if (data.success) {
                alert(`✅ Share verified! You got ${data.freePhotos} FREE photo(s)!`);
                onDismiss();
                setIsVisible(false);
            }
        } catch (e) {
            console.error("Verify failed", e);
        }
    }

    const handleDismiss = () => {
        setIsVisible(false);
        if (bannerCount >= MAX_BANNERS) {
            onDismiss();
        }
    }

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className={`bg-white rounded-2xl p-8 max-w-sm mx-4 shadow-2xl border-4 ${currentTier === 'whatsapp' ? 'border-green-400' :
                            currentTier === 'groups' ? 'border-purple-400' : 'border-yellow-400'
                        }`}
                >
                    {/* TIER 1: WhatsApp */}
                    {currentTier === 'whatsapp' && (
                        <div className="text-center">
                            <span className="text-5xl">📱💚</span>
                            <h2 className="text-2xl font-bold mt-4 text-green-600">Share & Get FREE!</h2>
                            <p className="text-gray-700 mt-2 font-semibold">Share with 10 friends on WhatsApp</p>
                            <p className="text-sm text-gray-500 mt-1">Get 1 FREE photo instantly! 🎁</p>

                            <div className="mt-6 space-y-3">
                                <button onClick={() => handleShareClick('whatsapp')} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:scale-105 transition">
                                    📤 Share Now (Get 1 Free)
                                </button>
                                <button onClick={handleDismiss} className="w-full text-gray-500 font-medium py-2">
                                    Maybe Later →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* TIER 2: Groups */}
                    {currentTier === 'groups' && (
                        <div className="text-center">
                            <span className="text-5xl">👥💜</span>
                            <h2 className="text-2xl font-bold mt-4 text-purple-600">Ultra Reward!</h2>
                            <p className="text-gray-700 mt-2 font-semibold">Share in 5-10 WhatsApp Groups</p>
                            <p className="text-sm text-gray-500 mt-1">Get 2 PREMIUM photos (with pets)! 👑</p>

                            <div className="mt-6 space-y-3">
                                <button onClick={() => handleShareClick('whatsapp-groups')} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:scale-105 transition">
                                    📤 Share Groups (Get 2 VIP!)
                                </button>
                                <button onClick={handleDismiss} className="w-full text-gray-500 font-medium py-2">
                                    Skip to Last Offer →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* TIER 3: Social */}
                    {currentTier === 'social' && (
                        <div className="text-center">
                            <span className="text-6xl animate-bounce">🚀</span>
                            <h2 className="text-3xl font-black mt-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                                MEGA OFFER!
                            </h2>
                            <p className="text-gray-800 mt-2 font-bold text-lg">Share on FB, IG, or TikTok</p>
                            <p className="text-yellow-600 mt-2 font-bold text-sm bg-yellow-100 py-1 rounded-full">
                                🎉 UNLIMITED FREE GENERATION TODAY! 🎉
                            </p>

                            <div className="mt-6 space-y-2">
                                <button onClick={() => handleShareClick('facebook')} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition">
                                    f Share on Facebook
                                </button>
                                <button onClick={() => handleShareClick('instagram')} className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition">
                                    📷 Share on Instagram
                                </button>
                                <button onClick={() => handleShareClick('tiktok')} className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition">
                                    🎵 Share on TikTok
                                </button>

                                <button onClick={handleDismiss} className="w-full bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded-lg mt-4 hover:bg-gray-200">
                                    I'm Done - Exit ❌
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

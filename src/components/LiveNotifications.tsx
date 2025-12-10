import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PURCHASES = [
    { name: 'Sarah M.', location: 'London, UK', item: 'Family Pack' },
    { name: 'João P.', location: 'Lisbon, PT', item: 'Pet Pack' },
    { name: 'Michael K.', location: 'Berlin, DE', item: 'Couple Pack' },
    { name: 'Elena R.', location: 'Moscow, RU', item: 'Family Pack' },
    { name: 'Yuki T.', location: 'Tokyo, JP', item: 'Pet Pack' },
    { name: 'Maria G.', location: 'Madrid, ES', item: 'Family Pack' },
    { name: 'Ahmed S.', location: 'Dubai, UAE', item: 'Solo Pack' },
    { name: 'Emily W.', location: 'New York, USA', item: 'Couple Pack' },
];

export const LiveNotifications: React.FC = () => {
    const [notification, setNotification] = useState<typeof PURCHASES[0] | null>(null);
    const [count, setCount] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Detect user interaction
    useEffect(() => {
        const handleInteraction = () => {
            setHasInteracted(true);
        };

        window.addEventListener('scroll', handleInteraction, { once: true });
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    useEffect(() => {
        // Don't show notifications until user has interacted
        if (!hasInteracted) return;

        const triggerNotification = () => {
            // Limit to 3 notifications max per session
            if (count >= 3) return;

            const randomPurchase = PURCHASES[Math.floor(Math.random() * PURCHASES.length)];
            setNotification(randomPurchase);
            setCount(prev => prev + 1);

            // Hide after 5 seconds
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        };

        // Initial delay after interaction (10-20 seconds)
        const initialDelay = 10000 + Math.random() * 10000;
        const initialTimeout = setTimeout(triggerNotification, initialDelay);

        // Random intervals between 20-40 seconds
        const interval = setInterval(() => {
            if (document.visibilityState === 'visible' && count < 3) {
                triggerNotification();
            } else if (count >= 3) {
                clearInterval(interval);
            }
        }, 20000 + Math.random() * 20000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, [count, hasInteracted]);

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-24 left-4 z-40 max-w-sm bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 shadow-2xl flex items-center gap-4"
                >
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🛒</span>
                    </div>
                    <div>
                        <p className="text-white text-sm font-medium">
                            <span className="text-emerald-400 font-bold">{notification.name}</span> from {notification.location}
                        </p>
                        <p className="text-slate-400 text-xs">
                            just purchased <span className="text-white">{notification.item}</span>
                        </p>
                        <p className="text-slate-500 text-[10px] mt-1">Few seconds ago</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

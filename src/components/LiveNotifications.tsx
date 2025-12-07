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

    useEffect(() => {
        const triggerNotification = () => {
            const randomPurchase = PURCHASES[Math.floor(Math.random() * PURCHASES.length)];
            setNotification(randomPurchase);

            // Hide after 5 seconds
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        };

        // Initial delay
        const initialTimeout = setTimeout(triggerNotification, 5000); // Start after 5s

        // Loop every 20-40 seconds
        const interval = setInterval(() => {
            if (document.visibilityState === 'visible') {
                triggerNotification();
            }
        }, 12000 + Math.random() * 10000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

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

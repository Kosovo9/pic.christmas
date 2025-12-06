
"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_PURCHASES = [
    { name: "Maria S.", location: "Madrid", plan: "Couple Pack" },
    { name: "John D.", location: "New York", plan: "Family Pack" },
    { name: "Sarah W.", location: "London", plan: "Dog Portrait" },
    { name: "Carlos R.", location: "Mexico City", plan: "Family Pack" },
    { name: "Yuki T.", location: "Tokyo", plan: "Single Portrait" },
    { name: "Emma L.", location: "Paris", plan: "Cat Portrait" }
];

export const SocialProof = () => {
    const [notification, setNotification] = useState<{ name: string; location: string; plan: string } | null>(null);

    useEffect(() => {
        // Randomly show notifications
        const showNotification = () => {
            const random = MOCK_PURCHASES[Math.floor(Math.random() * MOCK_PURCHASES.length)];
            setNotification(random);

            // Hide after 4 seconds
            setTimeout(() => {
                setNotification(null);
            }, 4000);
        };

        const interval = setInterval(() => {
            // Trigger every 10-20 seconds
            if (Math.random() > 0.3) {
                showNotification();
            }
        }, 12000);

        // Initial delay
        setTimeout(showNotification, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    className="fixed bottom-24 left-4 z-40 bg-slate-900/90 border border-slate-700 backdrop-blur-md rounded-xl p-4 shadow-2xl flex items-center gap-4 max-w-xs pointer-events-none"
                >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                        🎄
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">New Order!</p>
                        <p className="text-xs text-slate-300">
                            <span className="text-blue-400 font-medium">{notification.name}</span> from {notification.location} just bought the <span className="text-yellow-400">{notification.plan}</span>
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">Just now</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

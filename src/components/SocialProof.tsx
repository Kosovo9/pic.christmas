"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Activity {
    id: string;
    type: 'generate' | 'purchase';
    user: string;
    message: string;
    time: string;
    image?: string;
}

const MOCK_NAMES = ["Sarah", "Mike", "Elena", "David", "Jessica", "Tom", "Anna", "Lucas", "Maria", "John"];
const MOCK_LOCATIONS = ["USA", "UK", "Germany", "France", "Spain", "Italy", "Canada", "Australia"];
const MOCK_ACTIONS = [
    { type: 'generate', text: 'generated 5 Christmas photos' },
    { type: 'generate', text: 'created a family portrait' },
    { type: 'purchase', text: 'bought the 50-pack' },
    { type: 'purchase', text: 'just unlocked Premium' },
    { type: 'generate', text: 'is transforming their dog into an elf' }
];

export const SocialProof: React.FC = () => {
    const [stats, setStats] = useState({
        activeUsers: 142,
        photosCreated: 12450,
        rating: 4.9
    });

    const [recentActivity, setRecentActivity] = useState<Activity | null>(null);

    // Simulate Live Stats
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
                photosCreated: prev.photosCreated + Math.floor(Math.random() * 3)
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const [displayedCount, setDisplayedCount] = useState(0);

    // Simulate "Recent Sales/Generations" Popups
    useEffect(() => {
        if (displayedCount >= 3) return; // Stop after 3

        const scheduleNextPopup = () => {
            const delay = Math.random() * 8000 + 5000; // 5-13 seconds (slower)
            const timeoutId = setTimeout(() => {
                const name = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
                const location = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
                const action = MOCK_ACTIONS[Math.floor(Math.random() * MOCK_ACTIONS.length)];

                const activity: Activity = {
                    id: Math.random().toString(),
                    type: action.type as any,
                    user: `${name} from ${location}`,
                    message: action.text,
                    time: 'Just now'
                };

                setRecentActivity(activity);
                setDisplayedCount(prev => prev + 1);

                // Hide after 5 seconds
                setTimeout(() => setRecentActivity(null), 5000);
            }, delay);
            return timeoutId;
        };

        const timer = scheduleNextPopup();
        return () => clearTimeout(timer); // Cleanup on unmount or re-render
    }, [displayedCount]); // Re-run when count changes until 3

    return (
        <>
            {/* Sticky Bottom Stats Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-40 py-2 hidden md:flex justify-center gap-8 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white font-bold">{stats.activeUsers}</span> users creating now
                </div>
                <div className="flex items-center gap-2">
                    <span>📸</span>
                    <span className="text-white font-bold" suppressHydrationWarning>{stats.photosCreated.toLocaleString()}</span> photos generated today
                </div>
                <div className="flex items-center gap-2">
                    <span>⭐</span>
                    <span className="text-yellow-400 font-bold">{stats.rating}/5</span> from happy customers
                </div>
            </div>

            {/* Notification Toast */}
            <AnimatePresence>
                {
                    recentActivity && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, x: -50 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed bottom-20 left-4 md:bottom-24 md:left-8 z-50 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm"
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${recentActivity.type === 'purchase' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                                {recentActivity.type === 'purchase' ? '💰' : '✨'}
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">
                                    {recentActivity.user}
                                </p>
                                <p className="text-slate-300 text-xs">
                                    {recentActivity.message}
                                </p>
                                <p className="text-slate-500 text-[10px] uppercase mt-1">
                                    {recentActivity.time}
                                </p>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
};

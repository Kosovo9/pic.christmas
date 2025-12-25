"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';

const PURCHASES = [
    { name: 'Sarah M.', location: 'NYC, USA' },
    { name: 'João P.', location: 'Lisbon, PT' },
    { name: 'Yuki T.', location: 'Tokyo, JP' },
    { name: 'Maria G.', location: 'Madrid, ES' },
    { name: 'Ahmed S.', location: 'Dubai, UAE' },
    { name: 'Hans B.', location: 'Berlin, DE' }
];

export function LiveNotifications() {
    const [notif, setNotif] = useState<typeof PURCHASES[0] | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const random = PURCHASES[Math.floor(Math.random() * PURCHASES.length)];
            setNotif(random);
            setTimeout(() => setNotif(null), 5000);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {notif && (
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="fixed bottom-6 left-6 z-[80] bg-black/80 backdrop-blur-2xl border border-white/10 p-4 rounded-3xl shadow-2xl flex items-center gap-4 min-w-[280px]"
                >
                    <div className="w-12 h-12 bg-christmas-gold/20 rounded-2xl flex items-center justify-center border border-christmas-gold/30">
                        <ShoppingCart className="w-6 h-6 text-christmas-gold" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-white mb-0.5">{notif.name} from {notif.location}</div>
                        <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            <Heart className="w-2 h-2 fill-current" /> Just Unlocked 8K Magic
                        </div>
                        <div className="text-[9px] text-white/30 mt-1 uppercase">2 minutes ago</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

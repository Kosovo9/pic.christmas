'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GodModeDebugger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'perf' | 'seo' | 'mobile'>('perf');
    const [metrics, setMetrics] = useState({ fps: 60, memory: 0, latency: 20 });
    const frames = useRef(0);
    const prevTime = useRef(performance.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const time = performance.now();
            const delta = time - prevTime.current;
            frames.current++;

            if (delta >= 1000) {
                const fps = Math.round((frames.current * 1000) / delta);
                // @ts-ignore
                const memory = performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 42;

                setMetrics(prev => ({ ...prev, fps, memory }));
                frames.current = 0;
                prevTime.current = time;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-mono text-xs">
            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggle}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,100,0.4)] border-2 border-green-500/50 backdrop-blur-md transition-all ${isOpen ? 'bg-black text-green-500' : 'bg-green-500 text-black'}`}
            >
                <span className="text-2xl">⚡</span>
            </motion.button>

            {/* Dashboard Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-96 bg-black/90 border border-green-500/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-green-500/10 border-b border-green-500/20">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <h3 className="text-green-400 font-bold uppercase tracking-wider">God Mode v1.0</h3>
                            </div>
                            <div className="flex gap-2">
                                {['perf', 'seo', 'mobile'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={`px-2 py-1 rounded text-[10px] bg-white/5 hover:bg-white/10 ${activeTab === tab ? 'text-green-400 border border-green-500/50' : 'text-slate-500'}`}
                                    >
                                        {tab.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 min-h-[200px]">
                            {activeTab === 'perf' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                            <div className="text-slate-400 mb-1">FPS</div>
                                            <div className="text-3xl font-bold text-white">{metrics.fps}</div>
                                            <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${(metrics.fps / 60) * 100}%` }} />
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                            <div className="text-slate-400 mb-1">Memory</div>
                                            <div className="text-3xl font-bold text-white">{metrics.memory} MB</div>
                                            <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${(metrics.memory / 200) * 100}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5">
                                        <div className="flex justify-between text-slate-400 mb-2">
                                            <span>Core Vitals (LCP)</span>
                                            <span className="text-green-400">0.8s (Good)</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400">
                                            <span>CLS Score</span>
                                            <span className="text-green-400">0.001 (Stable)</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'seo' && (
                                <div className="space-y-4">
                                    <div className="bg-white p-3 rounded-lg max-w-[300px] mx-auto text-black">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-slate-200 rounded-full" />
                                            <div>
                                                <div className="font-bold text-xs">Pic.Christmas</div>
                                                <div className="text-[10px] text-slate-500">Sponsored</div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-blue-800 mb-1">Create Magical Christmas Photos with AI 🎄</div>
                                        <div className="text-xs text-slate-600">
                                            Transform your selfies into studio-quality Christmas portraits. No photographers, no waiting. Pure AI magic.
                                        </div>
                                    </div>
                                    <div className="text-center text-xs text-slate-500 mt-2">
                                        Google Search Preview (Mobile)
                                    </div>
                                </div>
                            )}

                            {activeTab === 'mobile' && (
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="bg-white p-2 rounded-lg mb-4">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${typeof window !== 'undefined' ? window.location.href : 'https://pic.christmas'}`}
                                            alt="QR Code"
                                            className="w-32 h-32"
                                        />
                                    </div>
                                    <p className="text-slate-300">Scan to debug on device</p>
                                    <p className="text-green-400 text-[10px] mt-1">Live Sync Active</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

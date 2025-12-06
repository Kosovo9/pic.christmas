'use client';

import { motion } from 'framer-motion';
import { Sparkles, Camera } from 'lucide-react';

export const Hero = ({ onStart }: { onStart?: () => void }) => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-paw-orange-50">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-paw-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-orange-100 mb-6"
                >
                    <Sparkles className="w-4 h-4 text-paw-orange-500" />
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">Waitlist Open - 50% Off</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight"
                >
                    Turn Your <span className="text-paw-orange-500 relative inline-block">
                        Pet
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-paw-orange-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span> <br />
                    into a Masterpiece 🎨
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
                >
                    Upload one photo of your dog or cat, and our AI will transform them into royalty, astronauts, or superheroes in seconds.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={onStart}
                        className="group relative px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-paw-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative flex items-center gap-2">
                            <Camera className="w-5 h-5" />
                            Create Pet Portrait
                        </span>
                    </button>

                    <button className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:border-paw-orange-200 hover:bg-orange-50 transition-all">
                        View Gallery
                    </button>
                </motion.div>

                {/* Floating Emojis */}
                <div className="absolute top-1/2 left-10 text-6xl animate-float">🐶</div>
                <div className="absolute top-1/3 right-10 text-6xl animate-float animation-delay-2000">🐱</div>
            </div>
        </section>
    );
};

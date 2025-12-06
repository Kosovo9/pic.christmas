'use client';

import React, { useState } from 'react';
import { Upload, Dog, Cat, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UploadWizard = ({ onComplete }: { onComplete: (data: any) => void }) => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const [petType, setPetType] = useState<'dog' | 'cat' | 'other'>('dog');
    const [theme, setTheme] = useState('royal');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStep(2);
        }
    };

    const handleSubmit = () => {
        onComplete({
            file,
            config: {
                type: petType,
                theme,
                breed: 'mixed' // TODO: Add input for breed
            }
        });
    };

    const themes = [
        { id: 'santa', name: 'Santa Claus 🎅', color: 'bg-red-100 border-red-300' },
        { id: 'elf', name: 'Christmas Elf 🧝', color: 'bg-green-100 border-green-300' },
        { id: 'reindeer', name: 'Rudolph 🦌', color: 'bg-amber-100 border-amber-300' },
        { id: 'grinch', name: 'The Grinch 💚', color: 'bg-lime-100 border-lime-300' },
        { id: 'frozen', name: 'Frozen Kingdom ❄️', color: 'bg-cyan-100 border-cyan-300' },
        { id: 'cozy', name: 'Cozy Sweater 🧶', color: 'bg-orange-100 border-orange-300' },
        { id: 'angel', name: 'Christmas Angel 👼', color: 'bg-yellow-100 border-yellow-300' },
        { id: 'royal', name: 'Royal Majesty 👑', color: 'bg-purple-100 border-purple-300' },
        { id: 'fantasy', name: 'Fantasy Magic ✨', color: 'bg-blue-100 border-blue-300' },
        { id: 'studio', name: 'Classic Studio 📸', color: 'bg-gray-100 border-gray-300' },
    ];

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-700 ml-2">Magic Generator 🪄</h3>
                <div className="flex gap-2 mr-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full ${step >= i ? 'bg-paw-orange-500' : 'bg-slate-200'}`} />
                    ))}
                </div>
            </div>

            <div className="p-8 min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">

                    {/* Step 1: Upload */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-center"
                        >
                            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-paw-orange-500 animate-pulse">
                                <Upload size={40} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-slate-800">Upload Pet Photo</h2>
                            <p className="text-slate-500 mb-8">Choose a clear photo where the face is visible.</p>

                            <label className="inline-block cursor-pointer bg-slate-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                Select Photo
                            </label>
                        </motion.div>
                    )}

                    {/* Step 2: Pet Type */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Who is this?</h2>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button
                                    onClick={() => setPetType('dog')}
                                    className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all ${petType === 'dog' ? 'border-paw-orange-500 bg-orange-50' : 'border-slate-200 hover:border-orange-200'}`}
                                >
                                    <Dog size={40} className="text-slate-700" />
                                    <span className="font-bold text-slate-700">Dog 🐶</span>
                                </button>
                                <button
                                    onClick={() => setPetType('cat')}
                                    className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all ${petType === 'cat' ? 'border-paw-orange-500 bg-orange-50' : 'border-slate-200 hover:border-orange-200'}`}
                                >
                                    <Cat size={40} className="text-slate-700" />
                                    <span className="font-bold text-slate-700">Cat 🐱</span>
                                </button>
                            </div>
                            <button onClick={() => setStep(3)} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">
                                Next Step
                            </button>
                        </motion.div>
                    )}

                    {/* Step 3: Theme */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Pick a Vibe 🎭</h2>
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {themes.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTheme(t.id)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${theme === t.id ? 'border-paw-orange-500 ring-2 ring-orange-200' : 'border-slate-100 hover:border-slate-200'} ${t.color}`}
                                    >
                                        <span className="font-bold text-slate-800 block mb-1">{t.name}</span>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-paw-orange-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                            >
                                Generate Magic ✨
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

import React from 'react';
import { useI18n } from '../hooks/useI18n';

export const CharitySection = () => {
    const { t } = useI18n();

    // 🚀 ELON 2030 VISION: Transparent Blockchain Philanthropy
    // In the future, this component will pull live partial TX hashes of donations.

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="text-emerald-400 font-bold tracking-widest uppercase mb-4">
                            Global Initiative · Fund A
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Pic.Heart <span className="text-emerald-500">Program</span>
                        </h2>
                        <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                            We believe technology should serve life. That's why
                            <strong className="text-white"> 3% of every pixel generated</strong> goes directly to feeding and housing stray animals in your region.
                            We don't just send money; we send food, blankets, and love.
                        </p>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
                            <h3 className="text-white font-bold mb-4">Transparency Ledger (Live)</h3>
                            <div className="space-y-3 text-sm text-slate-400 font-mono">
                                <div className="flex justify-between">
                                    <span>TX_88a...9x1</span>
                                    <span className="text-emerald-400">+$1,420.00 (Shelter MX)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>TX_b21...4k2</span>
                                    <span className="text-emerald-400">+$850.00 (Dogs Trust UK)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>TX_c99...p00</span>
                                    <span className="text-emerald-400">+$3,200.00 (ASPCA USA)</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-500/20">
                                Apply for Grant ➜
                            </button>
                            <button className="px-8 py-3 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-white rounded-full font-bold transition-all">
                                View Impact Report
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-3xl opacity-20 blur-xl" />
                        <img
                            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000"
                            alt="Happy Dog"
                            className="relative rounded-3xl shadow-2xl border border-slate-700/50"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl">
                            <div className="text-2xl font-bold text-white">45,201</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">Meals Provided</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

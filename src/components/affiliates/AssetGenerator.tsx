import React, { useState } from 'react';
import { api } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

export const AssetGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [generatedAssets, setGeneratedAssets] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        productName: 'PIC.CHRISTMAS',
        ctaText: 'Get 30% OFF',
        style: 'Modern, Festive, High-Converting'
    });

    const handleGenerate = async () => {
        setLoading(true);
        try {
            // Visualize "thinking"
            await new Promise(r => setTimeout(r, 800));

            // Call the real API
            const response = await api.generateAssetVariations({
                productName: formData.productName,
                ctaText: formData.ctaText,
                style: formData.style
            });

            if (response.success && response.variations) {
                setGeneratedAssets(response.variations);
            } else if (response.optimizedPrompt) {
                // Fallback if variations endpoint not ready, wrap single result in array
                setGeneratedAssets([{ prompt: response.optimizedPrompt }]);
            }

        } catch (error) {
            console.error("AI Generation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            ✨ AI Asset Studio <span className="bg-purple-500 text-xs px-2 py-1 rounded-full text-white font-mono">BETA</span>
                        </h3>
                        <p className="text-slate-400 mt-1">Generate high-converting marketing materials tailored to your audience.</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs">🤖</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Campaign Focus / Product</label>
                                <input
                                    type="text"
                                    value={formData.productName}
                                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Call to Action (CTA)</label>
                                <input
                                    type="text"
                                    value={formData.ctaText}
                                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Visual Style</label>
                                <select
                                    value={formData.style}
                                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
                                >
                                    <option>Modern, Festive, High-Converting</option>
                                    <option>Luxury, Gold, Elegant</option>
                                    <option>Fun, Cartoon, Family Oriented</option>
                                    <option>Minimalist, Clean, Tech</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                                ${loading
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/20 active:scale-95'
                                }
                            `}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Dreaming...
                                </>
                            ) : (
                                <>
                                    Generate Assets 🎨
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results Area */}
                    <div className="lg:col-span-2 bg-slate-950/50 rounded-2xl border border-slate-800 p-6 min-h-[400px] relative">
                        <AnimatePresence mode='wait'>
                            {generatedAssets.length > 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid gap-6"
                                >
                                    {generatedAssets.map((asset, idx) => (
                                        <div key={idx} className="bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-purple-500/50 transition-colors">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <span className="text-xs font-mono text-purple-400 mb-2 block">VARIANT {idx + 1}</span>
                                                    <p className="text-sm text-slate-300 leading-relaxed font-mono bg-slate-950 p-3 rounded-lg border border-slate-800/50">
                                                        {asset.prompt || asset.optimizedPrompt}
                                                    </p>
                                                    <div className="mt-4 flex gap-2">
                                                        <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">High Quality</span>
                                                        <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Facebook Ready</span>
                                                    </div>
                                                </div>
                                                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="Copy Prompt">
                                                    📋
                                                </button>
                                            </div>
                                            {/* Simulate Image Preview if we had text-to-image on frontend, for now showing the 'Blueprint' */}
                                            <div className="mt-4 h-32 bg-slate-950 rounded-lg flex items-center justify-center border border-dashed border-slate-800">
                                                <p className="text-xs text-slate-500">Image Generation Blueprint Ready</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-slate-600"
                                >
                                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
                                        🎨
                                    </div>
                                    <p>Select settings and click Generate</p>
                                    <p className="text-sm opacity-50">Powered by Google Gemini 2.0</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

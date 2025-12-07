import React, { useState } from 'react';

interface PromptEnhancerProps {
    userPrompt: string;
    config: {
        adults: number;
        children: number;
        pets: number;
    };
    onEnhanced: (enhancedPrompt: string) => void;
}

export const PromptEnhancer: React.FC<PromptEnhancerProps> = ({
    userPrompt,
    config,
    onEnhanced
}) => {
    const [enhancedPrompt, setEnhancedPrompt] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [showComparison, setShowComparison] = useState(false);

    const enhance = async () => {
        if (!userPrompt.trim()) return;

        setLoading(true);
        setShowComparison(true);

        try {
            const res = await fetch('/api/ai/enhance-prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userPrompt,
                    config
                })
            });

            const data = await res.json();
            setEnhancedPrompt(data.enhanced);
        } catch (error) {
            console.error('Error enhancing prompt:', error);
            setEnhancedPrompt('Error enhancing prompt. Please try again.');
        }

        setLoading(false);
    };

    const useEnhanced = () => {
        onEnhanced(enhancedPrompt);
        setShowComparison(false);
    };

    const keepOriginal = () => {
        setShowComparison(false);
    };

    if (!showComparison) {
        return (
            <button
                onClick={enhance}
                disabled={!userPrompt.trim() || loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-purple-600/20"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {loading ? 'Enhancing with AI...' : 'Enhance with AI ✨'}
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-3xl w-full p-8 border border-slate-800 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-3xl">🪄</span>
                    AI Enhanced Your Prompt!
                </h3>

                <div className="space-y-6 mb-8">
                    {/* Original */}
                    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-slate-400 font-medium">Original:</span>
                            <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">You wrote</span>
                        </div>
                        <p className="text-slate-300">{userPrompt}</p>
                    </div>

                    {/* Enhanced */}
                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-purple-400 font-medium">Enhanced:</span>
                            <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">AI Improved</span>
                        </div>
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
                                <span className="text-slate-300">AI is working its magic...</span>
                            </div>
                        ) : (
                            <p className="text-white font-medium">{enhancedPrompt}</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={keepOriginal}
                        className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all"
                    >
                        Keep Original
                    </button>
                    <button
                        onClick={useEnhanced}
                        disabled={loading}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all disabled:opacity-50 shadow-lg shadow-purple-600/20"
                    >
                        Use Enhanced ✨
                    </button>
                </div>
            </div>
        </div>
    );
};

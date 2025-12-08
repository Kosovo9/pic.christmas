
import React, { useEffect, useState } from 'react';

interface GenerationProgressProps {
    jobId?: string;
    onComplete?: () => void;
}

type Step = 'analyzing' | 'generating' | 'enhancing' | 'styling' | 'finalizing';

const STEPS: { id: Step; label: string; progress: number }[] = [
    { id: 'analyzing', label: 'Detecting facial features...', progress: 15 },
    { id: 'generating', label: 'Generating base with Flux Pro...', progress: 45 },
    { id: 'enhancing', label: 'Enhancing facial details...', progress: 70 },
    { id: 'styling', label: 'Applying Christmas magic...', progress: 90 },
    { id: 'finalizing', label: 'Finalizing your masterpiece...', progress: 100 },
];

export const GenerationProgress: React.FC<GenerationProgressProps> = ({ jobId, onComplete }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Simulated progress for now (Connect to WebSocket later)
    useEffect(() => {
        if (!jobId) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    if (onComplete) onComplete();
                    return 100;
                }

                // Randomized increments to look natural
                const jump = Math.random() * 5;
                const newProgress = Math.min(prev + jump, 100);

                // Update text based on progress thresholds
                const step = STEPS.findIndex(s => newProgress <= s.progress);
                if (step !== -1 && step !== currentStepIndex) {
                    setCurrentStepIndex(step);
                }

                return newProgress;
            });
        }, 800); // 800ms updates

        return () => clearInterval(interval);
    }, [jobId]);

    const currentStep = STEPS[currentStepIndex] || STEPS[STEPS.length - 1];

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-900/90 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-bounce">🎅</div>
                <h3 className="text-2xl font-bold text-white mb-2">Creating Christmas Magic</h3>
                <p className="text-blue-400 font-mono text-sm">{jobId ? `Job ID: ${jobId}` : 'Initializing...'}</p>
            </div>

            {/* Progress Bar Container */}
            <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden mb-4">
                {/* Animated Gradient Bar */}
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite] w-full" />
                </div>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-white animate-pulse">
                    {currentStep.label}
                </span>
                <span className="text-blue-400">{Math.round(progress)}%</span>
            </div>

            {/* Tiny Log Console */}
            <div className="mt-8 bg-black/50 rounded-lg p-4 font-mono text-xs text-slate-500 h-32 overflow-y-auto custom-scrollbar border border-slate-800">
                <div className="text-green-500">> Connected to Gift Factory v2.0</div>
                <div className="text-slate-400">> Allocation: Flux.1 Pro (Turbo)</div>
                {progress > 10 && <div>> Analyzing subject photos... OK</div>}
                {progress > 20 && <div>> Extracting facial embeddings... OK</div>}
                {progress > 40 && <div>> Generating base composition... OK</div>}
                {progress > 60 && <div>> Applying InsightFace swap... OK</div>}
                {progress > 80 && <div>> Upscaling and color grading...</div>}
                {progress >= 100 && <div className="text-green-400">> DONE! Image ready.</div>}
                <div className="animate-pulse">_</div>
            </div>
        </div>
    );
};

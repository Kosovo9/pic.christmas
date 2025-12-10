import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, MediaType } from '../types';

interface ResultsSectionProps {
    language: Language;
    resultUrl: string;
    mediaType: MediaType;
    onReset: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ language, resultUrl, mediaType, onReset }) => {
    const t = TRANSLATIONS[language].results;

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in">

            <div className="relative inline-block rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900">
                {mediaType === 'video' ? (
                    <video
                        src={resultUrl}
                        controls
                        className="max-w-full max-h-[70vh] rounded-lg"
                        autoPlay
                        loop
                    />
                ) : (
                    <img
                        src={resultUrl}
                        alt="Generated Christmas Portrait"
                        className="max-w-full max-h-[70vh] rounded-lg object-contain"
                    />
                )}
            </div>

            <div className="mt-6 space-y-4">
                <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                    8K Image generated with Gemini 2.5
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <a
                        href={resultUrl}
                        download={`pic-christmas-${Date.now()}.${mediaType === 'video' ? 'mp4' : 'png'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg flex items-center transition transform hover:scale-105"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Download Original (HD)
                    </a>

                    <button
                        onClick={onReset}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition"
                    >
                        Start Over
                    </button>
                </div>
            </div>
        </div>
    );
};

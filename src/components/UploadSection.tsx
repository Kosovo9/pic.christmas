import React, { useState, useRef } from 'react';
import { INTERNAL_PROMPTS, TRANSLATIONS } from '../constants';
import { Language, PromptItem, AspectRatio } from '../types';
import { trackEvent } from '../services/analytics';

interface UploadSectionProps {
    language: Language;
    onGenerate: (file: File, prompt: PromptItem, customInstruction: string | undefined, aspectRatio: AspectRatio) => void;
    isGenerating: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ language, onGenerate, isGenerating }) => {
    const t = TRANSLATIONS[language].upload;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // Default to the first prompt or a specific one if needed
    const [selectedPromptId, setSelectedPromptId] = useState<string>(INTERNAL_PROMPTS[0]?.id || '');
    const [customInstruction, setCustomInstruction] = useState('');
    const [acceptedPolicy, setAcceptedPolicy] = useState(false);
    const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            trackEvent('upload_photo', { fileName: e.target.files[0].name });
        }
    };

    const selectedPrompt = INTERNAL_PROMPTS.find(p => p.id === selectedPromptId);

    const handleGenerateClick = () => {
        // For now, we use a default prompt if none selected, or the first one
        const promptToUse = selectedPrompt || INTERNAL_PROMPTS[0];
        if (selectedFile && promptToUse && acceptedPolicy) {
            onGenerate(selectedFile, promptToUse, customInstruction, '1:1');
        }
    };

    return (
        <div id="upload" className="max-w-3xl mx-auto px-4 py-16">

            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
                <button
                    onClick={() => setActiveTab('image')}
                    className={`flex-1 py-4 px-6 rounded-xl text-left transition-all border ${activeTab === 'image' ? 'bg-slate-800 border-slate-600 ring-1 ring-slate-500' : 'bg-transparent border-transparent hover:bg-slate-800/50'}`}
                >
                    <div className="text-xs font-bold text-slate-400 mb-1">IMG</div>
                    <div className="text-white font-semibold text-lg">Tu idea (Nano Banana)</div>
                    <div className="text-slate-500 text-sm">Escribe tu propio prompt para editar.</div>
                </button>

                <button
                    onClick={() => setActiveTab('video')}
                    className={`flex-1 py-4 px-6 rounded-xl text-left transition-all border ${activeTab === 'video' ? 'bg-slate-800 border-slate-600 ring-1 ring-slate-500' : 'bg-transparent border-transparent hover:bg-slate-800/50'}`}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-purple-400">VIDEO (VEO)</span>
                        <span className="bg-purple-900/50 text-purple-300 text-[10px] px-1.5 py-0.5 rounded border border-purple-700/50">VEO 3.1</span>
                    </div>
                    <div className="text-white font-semibold text-lg">Video Anuncio Navideño</div>
                    <div className="text-slate-500 text-sm">Genera un video mágico con Veo.</div>
                </button>
            </div>

            {/* Main Input Area */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-1 overflow-hidden">
                <textarea
                    value={customInstruction}
                    onChange={(e) => setCustomInstruction(e.target.value)}
                    placeholder="O escribe tu propia instrucción (ej: 'Añadir un filtro retro')"
                    className="w-full bg-transparent text-white placeholder-slate-600 p-6 min-h-[120px] focus:outline-none resize-none text-lg"
                />

                {/* File Upload Trigger inside input area */}
                <div className="px-4 pb-4 flex justify-between items-center">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-800"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span className="text-sm font-medium">{selectedFile ? selectedFile.name : "Subir imagen"}</span>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png, image/jpeg"
                    />
                </div>
            </div>

            {/* Policy & Action */}
            <div className="mt-6">
                <div className="flex items-start mb-6">
                    <input
                        type="checkbox"
                        id="policy"
                        checked={acceptedPolicy}
                        onChange={(e) => setAcceptedPolicy(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="policy" className="ml-3 text-xs text-slate-500 cursor-pointer leading-relaxed">
                        Al continuar, aceptas que eres dueño de las fotos. No se permite contenido ofensivo, sexual o violento. <span className="text-blue-500 underline">Acepto las políticas de uso</span>
                    </label>
                </div>

                <button
                    onClick={handleGenerateClick}
                    disabled={!selectedFile || !acceptedPolicy || isGenerating}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${!selectedFile || !acceptedPolicy || isGenerating
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20'
                        }`}
                >
                    {isGenerating ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generando...
                        </span>
                    ) : (
                        "Generar Retratos"
                    )}
                </button>
            </div>
        </div>
    );
};

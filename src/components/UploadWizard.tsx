import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useI18n } from '../hooks/useI18n';
import { ContentSafetyService } from '../services/safety';

interface UploadWizardProps {
    onComplete: (data: any) => void;
}

const VIBES = [
    { id: 'classic', label: 'Classic Christmas', emoji: '🎄', desc: 'Timeless and traditional.' },
    { id: 'snowy', label: 'Winter Wonderland', emoji: '❄️', desc: 'Magical snow scenes.' },
    { id: 'cozy', label: 'Cozy Fireplace', emoji: '🔥', desc: 'Warm indoor vibes.' },
    { id: 'glam', label: 'Holiday Glam', emoji: '✨', desc: 'Sparkle and shine.' },
];

export const UploadWizard: React.FC<UploadWizardProps> = ({ onComplete }) => {
    const { t } = useI18n();
    const [step, setStep] = useState(1);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [agreedToLegal, setAgreedToLegal] = useState(false);

    // Config State
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [pets, setPets] = useState(0);
    const [selectedVibe, setSelectedVibe] = useState('classic');
    const [email, setEmail] = useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Limit to 10 files max for now
        const newFiles = [...files, ...acceptedFiles].slice(0, 10);
        setFiles(newFiles);

        // Create previews
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => {
            prev.forEach(url => URL.revokeObjectURL(url)); // Cleanup old
            return newPreviews;
        });
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.heic']
        },
        maxSize: 10 * 1024 * 1024 // 10MB
    });

    const handleRemoveFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleContinueFromUpload = async () => {
        if (!agreedToLegal) return;
        setIsScanning(true);

        try {
            // Simulated Safety Scan
            const result = await ContentSafetyService.scanFiles(files);

            if (!result.safe) {
                alert(result.reason || "Safety check failed.");
                setFiles([]);
                setPreviews([]);
                setIsScanning(false);
                return;
            }

            // Success
            setTimeout(() => {
                setIsScanning(false);
                setStep(2);
            }, 1500); // Fake delay for UX "Scanning..." effect

        } catch (error) {
            console.error("Scan error", error);
            setIsScanning(false);
            alert("Error scanning files. Please try again.");
        }
    };

    const handleFinalSubmit = () => {
        const data = {
            files,
            fileUrls: previews, // In a real app we'd upload first, but here we pass files
            config: {
                adults,
                children,
                pets,
                vibe: selectedVibe,
                email
            }
        };
        onComplete(data);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 md:p-12 shadow-2xl">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 rounded-full" />
                <div className="absolute top-1/2 left-0 h-1 bg-blue-500 -z-10 rounded-full transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }} />

                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>1</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>2</div>
            </div>

            {/* Step 1: Upload */}
            {step === 1 && (
                <div className="animate-fade-in">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">{t('upload.title')}</h2>
                        <p className="text-slate-400">{t('upload.subtitle')}</p>
                    </div>

                    {/* Dropzone */}
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-3xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all
                            ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-blue-400 hover:bg-slate-800/50'}
                        `}
                    >
                        <input {...getInputProps()} />
                        <div className="text-5xl mb-4">☁️</div>
                        <p className="text-lg text-white font-medium">Click to upload or drag & drop</p>
                        <p className="text-sm text-slate-500 mt-2">JPG, PNG, HEIC (Max 10MB)</p>
                    </div>

                    {/* File Previews */}
                    {files.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-white font-semibold mb-4">Selected Photos ({files.length})</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {previews.map((src, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                                        <img src={src} alt="preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRemoveFile(idx); }}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Legal & Safety */}
                    <div className="mt-8 bg-red-900/10 border border-red-500/20 p-6 rounded-2xl">
                        <div className="flex items-start gap-4">
                            <div className="text-2xl">🛡️</div>
                            <div className="flex-1">
                                <h4 className="text-red-400 font-bold mb-1">{t('legal.upload_title')}</h4>
                                <p className="text-sm text-slate-400 mb-4">{t('legal.upload_text')}</p>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={agreedToLegal}
                                        onChange={e => setAgreedToLegal(e.target.checked)}
                                        className="w-5 h-5 rounded border-slate-600 text-blue-600 focus:ring-blue-500 bg-slate-800"
                                    />
                                    <span className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                        {t('legal.checkbox')}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleContinueFromUpload}
                            disabled={files.length === 0 || !agreedToLegal || isScanning}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center gap-3"
                        >
                            {isScanning ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                    Scanning...
                                </>
                            ) : (
                                "Continue to Magic ➜"
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Configuration */}
            {step === 2 && (
                <div className="animate-fade-in">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-2">{t('config.title')}</h2>
                        <p className="text-slate-400">Tell us who is in the photo</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* People Counters */}
                        <div className="space-y-6">
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                <label className="block text-slate-400 mb-2">{t('config.adults')}</label>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-white">-</button>
                                    <span className="text-2xl font-bold text-white w-8 text-center">{adults}</span>
                                    <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-white">+</button>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                <label className="block text-slate-400 mb-2">{t('config.children')}</label>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-white">-</button>
                                    <span className="text-2xl font-bold text-white w-8 text-center">{children}</span>
                                    <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-white">+</button>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                <label className="block text-slate-400 mb-2">{t('config.pets')}</label>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setPets(Math.max(0, pets - 1))} className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-white">-</button>
                                    <span className="text-2xl font-bold text-white w-8 text-center">{pets}</span>
                                    <button onClick={() => setPets(pets + 1)} className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-white">+</button>
                                </div>
                            </div>
                        </div>

                        {/* Vibe Selection */}
                        <div className="space-y-4">
                            <label className="block text-slate-400">Select Vibe</label>
                            {VIBES.map(vibe => (
                                <button
                                    key={vibe.id}
                                    onClick={() => setSelectedVibe(vibe.id)}
                                    className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all text-left
                                        ${selectedVibe === vibe.id ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'}
                                    `}
                                >
                                    <span className="text-3xl">{vibe.emoji}</span>
                                    <div>
                                        <div className="text-white font-bold">{vibe.label}</div>
                                        <div className="text-xs text-slate-400">{vibe.desc}</div>
                                    </div>
                                    {selectedVibe === vibe.id && <div className="ml-auto text-blue-400">✓</div>}
                                </button>
                            ))}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

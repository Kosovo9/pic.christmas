// ... (imports remain at top)
import { ContentSafetyService } from '../services/safety';
import { useI18n } from '../hooks/useI18n';

interface UploadWizardProps {
    onComplete: (data: any) => void;
}

export const UploadWizard: React.FC<UploadWizardProps> = ({ onComplete }) => {
    const { t } = useI18n(); // Moved hook here
    const [step, setStep] = useState(1);
    const [files, setFiles] = useState<File[]>([]);
    const [isScanning, setIsScanning] = useState(false); // Merged state
    const [agreedToLegal, setAgreedToLegal] = useState(false); // Merged state
    const [config, setConfig] = useState({
        email: '',
        adults: 1,
        children: 0,
        pets: 0,
        vibe: 'cozy'
    });

    // ... (onDrop callback)

    // ... (useDropzone)

    // New handleContinue function
    const handleContinue = async () => {
        setIsScanning(true);
        try {
            const result = await ContentSafetyService.scanFiles(files);
            if (!result.safe) {
                alert(result.reason || "Unsafe content detected.");
                setFiles([]); // Clear unsafe files
                setIsScanning(false);
                return;
            }
            setIsScanning(false);
            setStep(s => s + 1);
        } catch (e) {
            console.error(e);
            setIsScanning(false);
        }
    };

    const prevStep = () => setStep(s => s - 1);
    // Remove old nextStep since we use handleContinue for step 1
    const nextStep = () => setStep(s => s + 1); // We still need this for other steps

    // ... (vibes definition)

    return (
        // ... (render)
        {/* Step 1: Upload */ }
                        {
        step === 1 && (
            <div className="animate-fade-in flex-1 flex flex-col">
    // ... (rest of Step 1 UI up to file grid)
                {files.length > 0 && (
                    <>
                        <div className="mt-6 grid grid-cols-3 gap-4">
                            {/* ... file grid ... */}
                        </div>

                        <div className="mt-8 bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
                            <h4 className="text-red-400 font-bold text-sm mb-2 transform uppercase tracking-wider">
                                ⚠️ {t('legal.upload_title')}
                            </h4>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                {t('legal.upload_text')}
                            </p>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={agreedToLegal}
                                        onChange={(e) => setAgreedToLegal(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-6 h-6 border-2 border-slate-600 rounded transition duration-200 peer-checked:bg-blue-500 peer-checked:border-blue-500"></div>
                                    <svg className="absolute w-4 h-4 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="text-sm text-white group-hover:text-blue-400 transition-colors">
                                    {t('legal.checkbox')}
                                </span>
                            </label>
                        </div>
                    </>
                )}

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleContinue}
                        disabled={files.length === 0 || !agreedToLegal || isScanning}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all flex items-center gap-2"
                    >
                        {isScanning ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Scanning...
                            </>
                        ) : (
                            'Continue'
                        )}
                    </button>
                </div>
            </div>
        )
    }
    // ... (rest of file)

    {/* Step 2: Email Capture (Retention) */ }
    {
        step === 2 && (
            <div className="animate-fade-in flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Where should we send your photos?</h2>
                    <p className="text-slate-400">Enter your email to save your progress and receive your results.</p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={config.email}
                        onChange={(e) => setConfig(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="santa@northpole.com"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        autoFocus
                    />
                    <p className="text-xs text-slate-500 mt-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        We'll never share your email. 100% Secure.
                    </p>
                </div>

                <div className="mt-8 flex justify-between">
                    <button onClick={prevStep} className="px-6 py-3 text-slate-400 hover:text-white transition">Back</button>
                    <button
                        onClick={nextStep}
                        disabled={!config.email || !config.email.includes('@')}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all"
                    >
                        Continue
                    </button>
                </div>
            </div>
        )
    }

    {/* Step 3: Configuration */ }
    {
        step === 3 && (
            <div className="animate-fade-in flex-1 flex flex-col">
                <h2 className="text-3xl font-bold text-white mb-2">Customize Your Magic</h2>
                <p className="text-slate-400 mb-8">Tell us who is in the photo and choose a style.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Counters */}
                    <div className="space-y-6">
                        {[
                            { key: 'adults', label: 'Adults', icon: '👤' },
                            { key: 'children', label: 'Children', icon: '👶' },
                            { key: 'pets', label: 'Pets', icon: '🐾' }
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="font-medium text-slate-200">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setConfig(prev => ({ ...prev, [item.key]: Math.max(0, prev[item.key as keyof typeof config] as number - 1) }))}
                                        className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition"
                                    >
                                        -
                                    </button>
                                    <span className="w-4 text-center font-bold text-white">{config[item.key as keyof typeof config]}</span>
                                    <button
                                        onClick={() => setConfig(prev => ({ ...prev, [item.key]: (prev[item.key as keyof typeof config] as number) + 1 }))}
                                        className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Vibe Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        {vibes.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => setConfig(prev => ({ ...prev, vibe: v.id }))}
                                className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group
                                            ${config.vibe === v.id
                                        ? 'border-blue-500 bg-blue-900/20 ring-2 ring-blue-500/20'
                                        : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'
                                    }
                                        `}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                <span className="text-3xl mb-2 block">{v.emoji}</span>
                                <span className="font-medium text-white block">{v.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-auto flex justify-between">
                    <button onClick={prevStep} className="px-6 py-3 text-slate-400 hover:text-white transition">Back</button>
                    <button onClick={nextStep} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all">Continue</button>
                </div>
            </div>
        )
    }

    {/* Step 4: Review */ }
    {
        step === 4 && (
            <div className="animate-fade-in flex-1 flex flex-col">
                <h2 className="text-3xl font-bold text-white mb-2">Ready to Create?</h2>
                <p className="text-slate-400 mb-8">Review your choices before we work our magic.</p>

                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-8">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700">
                        <div className="flex -space-x-4">
                            {files.map((f, i) => (
                                <div key={i} className="w-16 h-16 rounded-full border-2 border-slate-800 overflow-hidden relative z-10">
                                    <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt="" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-white font-medium">{files.length} Photos Uploaded</p>
                            <p className="text-sm text-slate-400">Ready for processing</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-400 text-sm">Subjects</p>
                            <p className="text-white font-medium">
                                {[
                                    config.adults > 0 && `${config.adults} Adults`,
                                    config.children > 0 && `${config.children} Kids`,
                                    config.pets > 0 && `${config.pets} Pets`
                                ].filter(Boolean).join(', ')}
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Style</p>
                            <p className="text-white font-medium capitalize">{vibes.find(v => v.id === config.vibe)?.label}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex justify-between items-center">
                    <button onClick={prevStep} className="px-6 py-3 text-slate-400 hover:text-white transition">Back</button>
                    <button
                        onClick={async () => {
                            try {
                                // We pass the raw files and config to the parent, 
                                // but typically we might want to upload here or in the parent.
                                // Given the current architecture, let's assume the parent handles the API call 
                                // or we do it here. The prompt implies "no fake data", so let's do it right.
                                // However, the prop `onComplete` expects `data: any`. 
                                // Let's pass the files and let the parent (page.tsx) handle the upload to keep this component UI-focused,
                                // OR better yet, let's upload here to show progress.

                                // For this step, we will pass the data to the parent which orchestrates the flow.
                                onComplete({ files, config });
                            } catch (error) {
                                console.error("Error in wizard:", error);
                            }
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transform transition hover:scale-105 flex items-center gap-2"
                    >
                        <span className="text-xl">✨</span> Generate Magic
                    </button>
                </div>
            </div>
        )
    }
            </div >
        </div >
    );
};

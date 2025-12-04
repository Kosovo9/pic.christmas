import React, { useState, useRef, useEffect } from 'react';
import { CATALOG_IDEAS, TRANSLATIONS } from '../constants';
import { Language, PromptItem, AspectRatio, SubjectCounts } from '../types';
import { trackEvent } from '../services/analytics';

interface UploadSectionProps {
  language: Language;
  onGenerate: (file: File, prompt: PromptItem, customInstruction?: string, aspectRatio?: AspectRatio, counts?: SubjectCounts) => void;
  isGenerating: boolean;
  selectedCatalogId?: string | null; // Passed from external catalog click if any
}

export const UploadSection: React.FC<UploadSectionProps> = ({ language, onGenerate, isGenerating, selectedCatalogId }) => {
  const t = TRANSLATIONS[language].upload;
  
  // State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [customInstruction, setCustomInstruction] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [counts, setCounts] = useState<SubjectCounts>({ adults: 1, kids: 0, dogs: 0, cats: 0, others: 0 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with prop if changed
  useEffect(() => {
    if (selectedCatalogId) {
        setSelectedIdeaId(selectedCatalogId);
        // Pre-fill prompt text based on catalog item
        const idea = CATALOG_IDEAS.find(i => i.id === selectedCatalogId);
        if (idea) setCustomInstruction(idea.fullPrompt[language]);
    }
  }, [selectedCatalogId, language]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      trackEvent('upload_photo', { size: file.size });
    }
  };

  const handleCountChange = (field: keyof SubjectCounts, delta: number) => {
    setCounts(prev => ({
        ...prev,
        [field]: Math.max(0, prev[field] + delta)
    }));
  };

  const handleGenerateClick = () => {
    if (selectedFile && acceptedPolicy) {
      // If no specific ID selected, use a generic one or the first one
      const promptItem = CATALOG_IDEAS.find(p => p.id === selectedIdeaId) || CATALOG_IDEAS[0];
      onGenerate(selectedFile, promptItem, customInstruction, aspectRatio, counts);
    }
  };

  return (
    <div id="upload" className="max-w-5xl mx-auto px-4 py-16 relative">
      
      {/* 1. Subjects Configuration (New) */}
      <div className="mb-12 bg-[#2a0a0a]/90 backdrop-blur-md border border-[#4a0404] p-8 rounded-sm shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]"></div>
        <h2 className="text-2xl font-serif text-[#F3E5AB] mb-8 flex items-center">
          <span className="text-[#D4AF37] mr-3 font-mono">01.</span> {t.subjectsTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* People */}
            <div>
                <h3 className="text-[#D4AF37] text-sm uppercase tracking-widest mb-4 border-b border-[#D4AF37]/30 pb-2">{t.people}</h3>
                <div className="space-y-4">
                    <Counter label={t.adults} value={counts.adults} onChange={(d) => handleCountChange('adults', d)} />
                    <Counter label={t.kids} value={counts.kids} onChange={(d) => handleCountChange('kids', d)} />
                </div>
            </div>
            {/* Pets */}
            <div>
                <h3 className="text-[#D4AF37] text-sm uppercase tracking-widest mb-4 border-b border-[#D4AF37]/30 pb-2">{t.pets}</h3>
                <div className="space-y-4">
                    <Counter label={t.dogs} value={counts.dogs} onChange={(d) => handleCountChange('dogs', d)} />
                    <Counter label={t.cats} value={counts.cats} onChange={(d) => handleCountChange('cats', d)} />
                    <Counter label={t.others} value={counts.others} onChange={(d) => handleCountChange('others', d)} />
                </div>
            </div>
        </div>
      </div>

      {/* 2. File Upload */}
      <div className="mb-12">
        <h2 className="text-2xl font-serif text-[#F3E5AB] mb-6 flex items-center">
          <span className="text-[#D4AF37] mr-3 font-mono">02.</span> {t.title}
        </h2>
        
        <div 
          className={`border-2 border-dashed rounded-sm p-12 text-center transition-all cursor-pointer backdrop-blur-sm ${
            selectedFile ? 'border-[#D4AF37] bg-[#3E0000]/60' : 'border-[#4a0404] hover:border-[#D4AF37] bg-[#1a0505]/60'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg" />
          
          {selectedFile ? (
            <div className="flex flex-col items-center">
              <div className="text-[#D4AF37] mb-2 text-4xl">📸</div>
              <p className="text-[#F3E5AB] font-bold">{selectedFile.name}</p>
            </div>
          ) : (
            <>
              <div className="text-[#4a0404] text-5xl mb-4">+</div>
              <p className="text-[#D4AF37] font-medium tracking-wide uppercase text-sm">{t.dragDrop}</p>
              <p className="text-[#888] text-xs mt-2 font-light">{t.limit}</p>
            </>
          )}
        </div>
      </div>

      {/* 3. Scenario & AI Help */}
      <div className="mb-12">
        <h2 className="text-2xl font-serif text-[#F3E5AB] mb-6 flex items-center">
          <span className="text-[#D4AF37] mr-3 font-mono">03.</span> {t.selectScenario}
        </h2>
        
        <div className="bg-[#1a0505]/80 backdrop-blur-sm p-6 border border-[#3E0000] rounded-sm">
            <textarea
                value={customInstruction}
                onChange={(e) => setCustomInstruction(e.target.value)}
                placeholder={t.customPromptPlaceholder}
                className="w-full bg-[#0a0202] border border-[#3E0000] rounded-sm px-4 py-4 text-[#F3E5AB] placeholder-[#4a0404] focus:outline-none focus:border-[#D4AF37] h-32"
            />
            {/* AI Optimization Notice */}
            <div className="flex items-center mt-3 text-xs text-[#D4AF37]/80">
                <span className="animate-pulse mr-2">✨</span>
                {t.aiHelp}
            </div>
        </div>
      </div>

      {/* 4. Generate */}
      <div className="border-t border-[#3E0000] pt-8">
        <div className="flex items-center mb-6">
            <input type="checkbox" checked={acceptedPolicy} onChange={(e) => setAcceptedPolicy(e.target.checked)} className="accent-[#D4AF37]" />
            <span className="ml-3 text-sm text-[#888]">{t.disclaimer}</span>
        </div>

        <button
          onClick={handleGenerateClick}
          disabled={!selectedFile || !acceptedPolicy || isGenerating}
          className={`w-full py-5 rounded-sm font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all uppercase tracking-widest ${
            !selectedFile || !acceptedPolicy || isGenerating
              ? 'bg-[#1a0505] border border-[#3E0000] text-[#3E0000] cursor-not-allowed'
              : 'bg-gradient-to-r from-[#B8860B] to-[#F3E5AB] hover:from-[#D4AF37] hover:to-[#FFF] text-[#1a0505]'
          }`}
        >
          {isGenerating ? t.generating : t.generateBtn}
        </button>
      </div>
    </div>
  );
};

const Counter: React.FC<{ label: string; value: number; onChange: (d: number) => void }> = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between bg-[#1a0505] p-3 border border-[#3E0000]">
        <span className="text-[#E5E5E5] text-sm font-light">{label}</span>
        <div className="flex items-center gap-3">
            <button onClick={() => onChange(-1)} className="w-6 h-6 flex items-center justify-center text-[#D4AF37] border border-[#3E0000] hover:bg-[#3E0000]">-</button>
            <span className="w-4 text-center text-[#F3E5AB] font-mono">{value}</span>
            <button onClick={() => onChange(1)} className="w-6 h-6 flex items-center justify-center text-[#D4AF37] border border-[#3E0000] hover:bg-[#3E0000]">+</button>
        </div>
    </div>
);
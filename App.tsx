import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { ResultsSection } from './components/ResultsSection';
import { ChatWidget } from './components/ChatWidget';
import { Footer } from './components/Footer';
import { PricingSection } from './components/PricingSection';
import { SantaOverlay } from './components/SantaOverlay';
import { CatalogSection } from './components/CatalogSection';
import { ReferralBanner } from './components/ReferralBanner';
import { MusicToggle } from './components/MusicToggle';
import { GlobalBackground } from './components/GlobalBackground';
import { Language, PromptItem, AspectRatio, SubjectCounts } from './types';
import { generateChristmasContent } from './services/geminiService';
import { trackEvent } from './services/analytics';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('es');
  const [step, setStep] = useState<'landing' | 'upload' | 'result'>('landing');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string>('');
  const [resultType, setResultType] = useState<'image' | 'video'>('image');
  
  // State for subject counts to share with Pricing
  const [counts, setCounts] = useState<SubjectCounts>({ adults: 1, kids: 0, dogs: 0, cats: 0, others: 0 });
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('view_landing', { language });
  }, []);

  const handleStart = () => {
    setStep('upload');
    setTimeout(() => {
      document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCatalogSelect = (id: string) => {
    setSelectedCatalogId(id);
    handleStart(); // Auto scroll to upload
  };

  const handleGenerate = async (file: File, prompt: PromptItem, customInstruction?: string, aspectRatio?: AspectRatio, currentCounts?: SubjectCounts) => {
    setIsGenerating(true);
    // Update global counts if passed
    if (currentCounts) setCounts(currentCounts);

    trackEvent('generate_portrait_start', {
      category: prompt.category,
      type: prompt.type,
      promptId: prompt.id,
      aspectRatio: aspectRatio,
      counts: currentCounts
    });

    try {
      const url = await generateChristmasContent(prompt, customInstruction, file, aspectRatio, currentCounts);
      setResultUrl(url);
      setResultType(prompt.type);
      setStep('result');
      trackEvent('generate_portrait_success', { type: prompt.type, promptId: prompt.id });
    } catch (error) {
      trackEvent('generate_portrait_error', { type: prompt.type, error: error instanceof Error ? error.message : 'Unknown error' });
      alert("Error generating content. Please check your API key (in code) or try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setStep('upload');
    setResultUrl('');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black relative">
      <GlobalBackground />
      <Navbar language={language} setLanguage={setLanguage} />
      
      <main className="relative z-10">
        {step === 'landing' && (
          <>
            <Hero language={language} onStart={handleStart} />
            <ReferralBanner language={language} />
            <PricingSection language={language} counts={counts} />
            <CatalogSection language={language} onSelect={handleCatalogSelect} />
          </>
        )}

        {step === 'upload' && (
          <>
             <UploadSection
                language={language}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                selectedCatalogId={selectedCatalogId}
             />
             {/* Show Pricing Context again near upload for clarity */}
             <div className="opacity-80 scale-90 origin-top">
                <PricingSection language={language} counts={counts} />
             </div>
          </>
        )}

        {step === 'result' && (
          <ResultsSection
            language={language}
            resultUrl={resultUrl}
            mediaType={resultType}
            onReset={handleReset}
          />
        )}
      </main>

      <ChatWidget language={language} />
      <MusicToggle />
      <Footer language={language} />
      <SantaOverlay />
    </div>
  );
};

export default App;
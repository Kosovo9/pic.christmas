"use client";

import React, { useState, useRef } from 'react';
import { Hero } from '../components/Hero';
import { UploadWizard } from '../components/UploadWizard';
import { PricingSection } from '../components/PricingSection';
import { ResultsGallery } from '../components/ResultsGallery';
import { Language } from '../types';
import { api } from '../services/api';

export default function Home() {
  const [language, setLanguage] = useState<Language>('es');
  const [currentView, setCurrentView] = useState<'landing' | 'upload' | 'pricing' | 'results'>('landing');

  const uploadRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setCurrentView('upload');
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleUploadComplete = async (data: any) => {
    console.log('Upload data:', data);
    try {
      // Upload photos to backend
      const uploadResult = await api.uploadPhotos(data.files);
      console.log('Uploaded:', uploadResult);

      // Store file IDs for the order creation step
      // In a real app, we'd pass this to the next step or store in context/state
      // setUploadedFiles(uploadResult.fileIds); 

      setCurrentView('pricing');
      setTimeout(() => {
        pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    }
  };

  const handlePackageSelect = (pkgId: string) => {
    console.log('Selected package:', pkgId);
    // Simulate processing
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">

      {/* Hero Section */}
      <Hero language={language} onStart={handleStart} />

      {/* Upload Wizard Section */}
      <div ref={uploadRef} className={`transition-all duration-1000 ${currentView === 'landing' ? 'opacity-50 blur-sm pointer-events-none' : 'opacity-100'}`}>
        {currentView !== 'landing' && (
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-slate-900/50 skew-y-3 transform origin-top-left -z-10" />
            <UploadWizard onComplete={handleUploadComplete} />
          </section>
        )}
      </div>

      {/* Pricing Section */}
      <div ref={pricingRef}>
        {(currentView === 'pricing' || currentView === 'results') && (
          <PricingSection onSelect={handlePackageSelect} />
        )}
      </div>

      {/* Results Section (Simulated) */}
      {currentView === 'results' && (
        <section className="animate-fade-in">
          <ResultsGallery />
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          <p>© 2024 Nexora Christmas Studio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

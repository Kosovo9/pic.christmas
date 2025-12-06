"use client";

import React, { useState, useRef } from 'react';
import { Hero } from '../components/Hero';
import { UploadWizard } from '../components/UploadWizard';
import { PricingSection } from '../components/PricingSection';
import { ResultsGallery } from '../components/ResultsGallery';
import { ReferralSection } from '../components/ReferralSection';
import { MusicToggle } from '../components/MusicToggle';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { ExamplesGallery } from '../components/ExamplesGallery';
import { useReferral } from '../hooks/useReferral';
import { useI18n } from '../hooks/useI18n';
import { api } from '../services/api';
import guidelinesData from '../data/guidelines.json';
import { BeforeAfter } from '../components/BeforeAfter';
import { FAQ } from '../components/FAQ';
import { PageTransition } from '../components/PageTransition';
import { StickyCTA } from '../components/StickyCTA';
import { MissionSection } from '../components/MissionSection';

export default function Home() {
  // ...
  const { language, switchLanguage } = useI18n();
  const { referralCode } = useReferral();
  const [currentView, setCurrentView] = useState<'landing' | 'upload' | 'pricing' | 'results'>('landing');
  const [uploadData, setUploadData] = useState<any>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const uploadRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const referralRef = useRef<HTMLDivElement>(null);

  const realStart = () => {
    setShowGuidelines(false);
    setCurrentView('upload');
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleStart = () => {
    setShowGuidelines(true);
  };

  const scrollToReferrals = () => {
    setCurrentView('landing');
    setTimeout(() => {
      referralRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleUploadComplete = async (data: any) => {
    console.log('Upload data:', data);
    setUploadData(data);

    try {
      // Upload photos to backend
      const uploadResult = await api.uploadPhotos(data.files);
      console.log('Uploaded:', uploadResult);

      // Store for order creation
      setCurrentView('pricing');
      setTimeout(() => {
        pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    }
  };

  const handlePackageSelect = async (pkgId: string) => {
    console.log('Selected package:', pkgId);

    try {
      // 1. Create order with referral code if available
      const orderData = {
        packageId: pkgId,
        config: uploadData?.config || { adults: 1, children: 0, pets: 0 },
        originalImages: uploadData?.fileUrls || [],
        referralCode: referralCode || undefined,
        useCredit: false // TODO: Add UI to toggle credit usage
      };

      console.log('Creating order...', orderData);
      const order = await api.createOrder(orderData);
      console.log('Order created:', order);

      if (order.totalAmount === 0) {
        // Free order (credits)
        // Redirect directly to results/processing
        setCurrentView('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 2. Initiate Payment (Stripe by default for now)
      // You can add a UI selector for payment method here later
      console.log('Initiating payment...');
      const payment = await api.createPaymentIntent(order._id);

      if (payment.url) {
        // Redirect to Stripe Checkout
        window.location.href = payment.url;
      } else {
        throw new Error('No payment URL returned');
      }

    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const GuidelinesModal = () => {
    const currentGuidelines = guidelinesData[language as keyof typeof guidelinesData] || guidelinesData['en'];

    if (!showGuidelines) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowGuidelines(false)}>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 relative shadow-2xl shadow-purple-500/20" onClick={e => e.stopPropagation()}>
          <button onClick={() => setShowGuidelines(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">✕</button>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📸</span>
            </div>
            <h3 className="text-xl font-bold text-white">{currentGuidelines.title}</h3>
          </div>
          <ul className="space-y-4 mb-8">
            {currentGuidelines.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={realStart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
          >
            I understand, let's go! 🚀
          </button>
        </div>
      </div>
    );
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
        {/* Navbar */}
        <Navbar language={language} onLanguageChange={switchLanguage} onReferralsClick={scrollToReferrals} />

        {/* Music Toggle */}
        <MusicToggle />

        {/* Hero Section */}
        <Hero language={language} onStart={handleStart} />

        {/* Before/After Magic Mirror */}
        <BeforeAfter />

        {/* Guidelines Modal */}
        <GuidelinesModal />

        {/* Examples Gallery */}
        <ExamplesGallery />

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
            <PricingSection onSelect={handlePackageSelect} config={uploadData?.config} />
          )}
        </div>

        {/* Results Section */}
        {currentView === 'results' && (
          <section className="animate-fade-in">
            <ResultsGallery />
          </section>
        )}

        {/* Mission & Philanthropy */}
        <MissionSection />

        {/* Referral Section */}
        <div ref={referralRef}>
          <ReferralSection />
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <Footer language={language} />

        {/* Mobile Sticky CTA */}
        <StickyCTA onClick={realStart} />
      </main>
    </PageTransition>
  );
}

"use client";

import React, { useState, useRef, useEffect } from 'react';
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
import { SecurityShield } from '../components/SecurityShield';
import { CharitySection } from '../components/CharitySection';
import { LiveNotifications } from '../components/LiveNotifications';
import { ExitIntentModal } from '../components/ExitIntentModal';
import { SocialProof } from '../components/SocialProof';
import { PaymentMethodSelector } from '../components/PaymentMethodSelector';
import { OxxoPaymentUI } from '../components/OxxoPaymentUI';
import { BankTransferUI } from '../components/BankTransferUI';
import ExitBanner from '../components/ExitBanner'; // Task 9
import { SystemStatus } from '../components/SystemStatus';


export default function Home() {
  const { language, switchLanguage } = useI18n();
  const { referralCode } = useReferral();
  const [currentView, setCurrentView] = useState<'landing' | 'upload' | 'pricing' | 'payment' | 'results'>('landing');
  const [uploadData, setUploadData] = useState<any>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{ id: string; amount: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null); // For OXXO/Bank details
  const [freeMode, setFreeMode] = useState<any>(null); // Task 8
  const [showExitBanner, setShowExitBanner] = useState(false); // Task 9

  const uploadRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const referralRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check Free Mode Status - Task 8
    fetch('/api/viral/free-mode/status')
      .then(res => res.json())
      .then(data => {
        if (data.active) setFreeMode(data);
      })
      .catch(err => console.error(err));
  }, []);

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

      // Free Mode Logic Override (Task 8)
      if (order.totalAmount === 0 || freeMode?.active) {
        // Free order (credits)
        setCurrentView('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setOrderDetails({ id: order._id, amount: order.totalAmount });
      setCurrentView('payment');
      setTimeout(() => {
        paymentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handlePaymentMethodSelected = async (methodId: string) => {
    setPaymentMethod(methodId);
    if (!orderDetails) return;

    // Logic to initiate payment based on method
    // For simplified integration, we will assume backend call here if needed
    // but for UI, we just show the relevant component or redirect
    if (methodId === 'credit_debit' || methodId === 'paypal' || methodId === 'lemon_squeezy') {
      // Redirect flow
      const payment = await api.createPaymentIntent(orderDetails.id);
      // Note: Backend needs updates to support method selection in createPaymentIntent or new endpoint
      // For now, redirect strictly for stripe/legacy
      if (payment.url) window.location.href = payment.url;
    } else if (methodId === 'oxxo') {
      // Create OXXO payment
      // Call API to get OXXO details
      const response = await fetch('/api/payments/oxxo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderDetails.id, amount: orderDetails.amount, email: 'user@example.com' })
      });
      const data = await response.json();
      setPaymentDetails(data);
    } else if (methodId === 'bank_transfer') {
      // Create Bank Transfer
      const response = await fetch('/api/payments/bank-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderDetails.id, amount: orderDetails.amount, country: 'MX', email: 'user@example.com' })
      });
      const data = await response.json();
      setPaymentDetails(data);
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
      <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">

        {/* FREE MODE BANNER - ELON STYLE (Task 8) */}
        {freeMode?.active && (
          <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-black text-center py-2 font-black z-[200] animate-pulse cursor-pointer shadow-lg" onClick={realStart}>
            🚀 VIRAL LAUNCH: FREE MODE ACTIVE — {freeMode.hoursRemaining}h {freeMode.minutesRemaining}m LEFT! GENERA AHORA (GRATIS) ⚡
          </div>
        )}

        <SecurityShield />
        <SocialProof />
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
          {(currentView === 'pricing' || currentView === 'payment' || currentView === 'results') && (
            <PricingSection onSelect={handlePackageSelect} config={uploadData?.config} />
          )}
        </div>

        {/* Payment Section */}
        <div ref={paymentRef} className="max-w-4xl mx-auto px-4 py-8">
          {currentView === 'payment' && orderDetails && (
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">
              {!paymentMethod ? (
                <PaymentMethodSelector
                  orderId={orderDetails.id}
                  amount={orderDetails.amount}
                  onPaymentMethodSelected={handlePaymentMethodSelected}
                />
              ) : (
                <div>
                  {paymentMethod === 'oxxo' && paymentDetails && (
                    <OxxoPaymentUI
                      orderId={orderDetails.id}
                      amount={orderDetails.amount}
                      reference={paymentDetails.reference}
                      expiresAt={paymentDetails.expiresAt}
                    />
                  )}
                  {paymentMethod === 'bank_transfer' && paymentDetails && (
                    <BankTransferUI
                      orderId={orderDetails.id}
                      amount={orderDetails.amount}
                      bankDetails={paymentDetails.bankDetails}
                      conceptOfPayment={paymentDetails.conceptOfPayment}
                      expiresAt={paymentDetails.expiresAt}
                      country="MX"
                    />
                  )}
                  {(paymentMethod === 'credit_debit' || paymentMethod === 'paypal' || paymentMethod === 'lemon_squeezy') && (
                    <div className="text-center py-12">
                      <div className="animate-spin text-4xl mb-4">🌀</div>
                      <p>Redirecting to secure checkout...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
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
        <CharitySection />

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

        {/* 🚀 ELON GROWTH HACKS */}
        <LiveNotifications />
        <ExitIntentModal />
        <ExitBanner onDismiss={() => setShowExitBanner(false)} /> {/* Task 9 */}

        {/* 🛡️ SECURITY HUD */}
        <SystemStatus />
      </main>
    </PageTransition>
  );
}

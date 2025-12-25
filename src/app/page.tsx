"use client";

import React, { useState, useRef, useEffect } from 'react';
import { NetflixHero } from '../components/NetflixHero';
import { CarouselRow } from '../components/CarouselRow';
import dynamic from 'next/dynamic';
const UploadWizard = dynamic(() => import('../components/UploadWizard').then(mod => mod.UploadWizard), {
  loading: () => <div className="animate-pulse bg-gray-800 h-96 rounded-lg w-full"></div>
});
const PricingSection = dynamic(() => import('../components/PricingSection').then(mod => mod.PricingSection));
const ResultsGallery = dynamic(() => import('../components/ResultsGallery').then(mod => mod.ResultsGallery));
import { EarthFooter } from '../components/EarthFooter';
import { Navbar } from '../components/Navbar';
import { useReferral } from '../hooks/useReferral';
import { useI18n } from '@/i18n/I18nProvider';
import { api } from '../services/api';
import guidelinesData from '../data/guidelines.json';
import { PageTransition } from '../components/PageTransition';
import { PaymentMethodSelector } from '../components/PaymentMethodSelector';
import { OxxoPaymentUI } from '../components/OxxoPaymentUI';
import { BankTransferUI } from '../components/BankTransferUI';
import { SecurityShield } from '../components/SecurityShield';
import { ExamplesGallery } from '../components/ExamplesGallery';
import { DisclaimerModal } from '../components/DisclaimerModal';
import { ViralExitModal } from '../components/ViralExitModal';
import { TrendingRow } from '../components/TrendingRow';

// 🎬 MOCK DATA FOR CAROUSELS
const TRENDING_SCENES = [
  { title: "Royal Winter Gala", thumb: "https://images.unsplash.com/photo-1544275608-d22731ee0ae6?q=80&w=600&auto=format&fit=crop" },
  { title: "Cozy Log Cabin", thumb: "https://images.unsplash.com/photo-1575383566580-2bd337666323?q=80&w=600&auto=format&fit=crop" },
  { title: "Snowy Central Park", thumb: "https://images.unsplash.com/photo-1482355322998-2e70c5aa8578?q=80&w=600&auto=format&fit=crop" },
  { title: "Vintage Santa Portrait", thumb: "https://images.unsplash.com/photo-1606757303112-9844c3c3a4f6?q=80&w=600&auto=format&fit=crop" },
  { title: "Magical Reindeer Ride", thumb: "https://images.unsplash.com/photo-1482635914560-690226c61f22?q=80&w=600&auto=format&fit=crop" },
];

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 5 + 2}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 5}s`,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="snow-container">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const { t, locale } = useI18n();
  const { referralCode } = useReferral();
  const [currentView, setCurrentView] = useState<'landing' | 'upload' | 'pricing' | 'payment' | 'results'>('landing');
  const [uploadData, setUploadData] = useState<any>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{ id: string; amount: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [freeMode, setFreeMode] = useState<any>(null);

  const [showWizard, setShowWizard] = useState(false);
  const wizardRef = useRef<HTMLDivElement>(null);

  const handleStartCreation = () => {
    setShowWizard(true);
    setTimeout(() => {
      wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const uploadRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const referralRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const handleUploadComplete = async (data: any) => {
    setUploadData(data);
    try {
      const uploadResult = await api.uploadPhotos(data.files);
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
    try {
      const orderData = {
        packageId: pkgId,
        config: uploadData?.config || { adults: 1, children: 0, pets: 0 },
        originalImages: uploadData?.fileUrls || [],
        referralCode: referralCode || undefined,
        useCredit: false
      };
      const order = await api.createOrder(orderData);
      setOrderDetails({ id: order._id, amount: order.totalAmount });
      setCurrentView('payment');
      setTimeout(() => {
        paymentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  const handlePaymentMethodSelected = async (methodId: string) => {
    setPaymentMethod(methodId);
    if (!orderDetails) return;
    if (methodId === 'credit_debit' || methodId === 'paypal') {
      const payment = await api.createPaymentIntent(orderDetails.id);
      if (payment.url) window.location.href = payment.url;
    }
  };

  const scrollToReferrals = () => {
    referralRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#141414] text-slate-50 selection:bg-red-600/30 font-sans pb-24 relative overflow-hidden">
        <SnowEffect />
        <div className="fixed top-24 left-6 z-[60] animate-bounce">
          <div className="stitch-badge px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xl">
            <span className="text-xl">👽</span>
            <span>STITCH EDITION LIVE!</span>
          </div>
        </div>

        <SecurityShield />
        <Navbar onReferralsClick={scrollToReferrals} />

        <NetflixHero onStart={handleStartCreation} />

        <TrendingRow items={TRENDING_SCENES} id="trending-gallery" />

        <div ref={wizardRef} className="relative z-10 px-4">
          {showWizard && (
            <div className="mt-8 mb-20 animate-fade-in-up">
              <UploadWizard onComplete={handleUploadComplete} />
            </div>
          )}
        </div>

        <div ref={pricingRef}>
          {(currentView === 'pricing' || currentView === 'payment' || currentView === 'results') && (
            <PricingSection onSelect={handlePackageSelect} config={uploadData?.config} />
          )}
        </div>

        <div ref={paymentRef} className="max-w-4xl mx-auto px-4 py-8">
          {currentView === 'payment' && orderDetails && (
            <div className="bg-[#181818] border border-gray-700 rounded-lg p-8 shadow-2xl">
              <PaymentMethodSelector
                orderId={orderDetails.id}
                amount={orderDetails.amount}
                onPaymentMethodSelected={handlePaymentMethodSelected}
              />
            </div>
          )}
        </div>

        <div className="mt-24 border-t border-gray-800">
          <EarthFooter />
        </div>

        <ViralExitModal language={locale} />
      </main>
    </PageTransition>
  );
}

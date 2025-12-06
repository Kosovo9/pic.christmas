"use client";

import { useState, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { UploadWizard } from '@/components/UploadWizard';
import { api } from '@/services/api';

export default function Home() {
  const uploadRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUploadComplete = async (data: any) => {
    setLoading(true);
    try {
      console.log("Processing...", data);

      // 1. Upload Photo (Base64 for MVP Speed)
      const photoUrl = await api.uploadPhoto(data.file);

      // 2. Create Order
      const order = await api.createOrder({
        amount: 9.99, // Fixed price for now
        petDetails: {
          type: data.config.type,
          theme: data.config.theme,
          breed: 'mixed',
          name: 'My Pet'
        },
        originalPhoto: photoUrl
      });

      console.log("Order Created:", order);

      // 3. Checkout
      const session = await api.createPaymentSession(order._id);

      // 4. Redirect
      if (session.url) {
        window.location.href = session.url;
      }

    } catch (error) {
      console.error("Error flow:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero onStart={handleStart} />

      <div ref={uploadRef} className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Create Your Masterpiece</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Three simple steps to specific magic. Upload, Customize, and Collect.
            </p>
          </div>

          {loading ? (
            <div className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-xl text-center">
              <div className="w-16 h-16 border-4 border-paw-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <h3 className="text-xl font-bold text-slate-800">Creating Order...</h3>
              <p className="text-slate-500">Preparing your magic canvas ✨</p>
            </div>
          ) : (
            <UploadWizard onComplete={handleUploadComplete} />
          )}
        </div>
      </div>
    </main>
  );
}

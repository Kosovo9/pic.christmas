"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/Navbar'; // Adjust import path
import { Footer } from '../../components/Footer';
import { useI18n } from '../../hooks/useI18n';
import Link from 'next/link';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Payment Successful!
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mb-8">
                Thank you for your order! Our AI elves are now hard at work painting your masterpieces{dots}
            </p>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 max-w-md w-full mb-8 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-2">Order ID</h3>
                <p className="font-mono text-blue-400 break-all">{orderId}</p>
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <p className="text-sm text-slate-400">
                        You will receive an email with your photos in approximately <strong>10-15 minutes</strong>.
                    </p>
                </div>
            </div>

            <Link
                href="/"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20"
            >
                Return Home
            </Link>
        </div>
    );
}

export default function SuccessPage() {
    const { language, switchLanguage } = useI18n();

    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
            <Navbar language={language} onLanguageChange={switchLanguage} />

            <div className="pt-24 pb-12">
                <Suspense fallback={<div className="text-center p-20">Loading...</div>}>
                    <SuccessContent />
                </Suspense>
            </div>

            <Footer language={language} />
        </main>
    );
}

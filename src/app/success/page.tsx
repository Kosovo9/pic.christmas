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

            {/* Viral Social Sharing Loop */}
            <div className="flex gap-4 mb-8 animate-fade-in delay-200">
                <a
                    href={`https://twitter.com/intent/tweet?text=Just%20ordered%20my%20AI%20Christmas%20photos!%20%F0%9F%8E%84%20Can%27t%20wait%20to%20see%20them.%20Create%20yours%20at%20pic.christmas&url=https://pic.christmas`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] rounded-full transition-colors"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                </a>
                <a
                    href={`https://wa.me/?text=Check%20out%20this%20AI%20Christmas%20photo%20generator!%20I%20just%20used%20it%20%F0%9F%8E%85%20https://pic.christmas`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-full transition-colors"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
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

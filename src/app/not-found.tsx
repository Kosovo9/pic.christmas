'use client';

import React from 'react';
import Link from 'next/link';
import { BrandHeader } from '@/components/BrandHeader';
import { EarthFooter } from '@/components/EarthFooter';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
            <BrandHeader />

            <main className="flex-1 flex items-center justify-center px-4 py-24">
                <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
                    {/* 404 Visual */}
                    <div className="relative">
                        <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 leading-none">
                            404
                        </h1>
                        <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    </div>

                    {/* Message */}
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            🎄 Oops! Santa Lost This Page
                        </h2>
                        <p className="text-xl text-slate-400 max-w-md mx-auto">
                            Looks like this page flew away with the reindeer. Let's get you back to the magic!
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                        <Link
                            href="/"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-900/70 transform hover:-translate-y-1"
                        >
                            🏠 Back to Home
                        </Link>
                        <Link
                            href="/affiliates"
                            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all"
                        >
                            💰 Affiliates
                        </Link>
                    </div>

                    {/* Helpful Links */}
                    <div className="pt-12 border-t border-slate-800">
                        <p className="text-sm text-slate-500 mb-4">Popular Pages:</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm underline">
                                Create Photos
                            </Link>
                            <span className="text-slate-700">•</span>
                            <Link href="/affiliates" className="text-blue-400 hover:text-blue-300 text-sm underline">
                                Earn 35% Commission
                            </Link>
                            <span className="text-slate-700">•</span>
                            <a href="mailto:support@pic.christmas" className="text-blue-400 hover:text-blue-300 text-sm underline">
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <EarthFooter />
        </div>
    );
}

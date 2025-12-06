
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
    {
        q: "How long does it take?",
        a: "Typically 15-30 minutes! During high demand (like Christmas Eve), it might take up to an hour. You'll get an email as soon as they're ready."
    },
    {
        q: "What kind of photos should I upload?",
        a: "Clear, well-lit photos work best. Avoid heavy filters, sunglasses, or blurry shots. Selfies are great! For pets, close-ups of the face are perfect."
    },
    {
        q: "Is my data safe?",
        a: "100% yes. We use top-tier encryption and delete your original photos from our AI servers after processing. We never sell your data."
    },
    {
        q: "Can I print these?",
        a: "Absolutely! We deliver high-resolution (8K) images perfect for Christmas cards, mugs, or framing."
    },
    {
        q: "What if I don't like the results?",
        a: "We want you to love your photos. If there's a technical glitch, contact our support and we'll regenerate them for free."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 max-w-3xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {FAQS.map((faq, i) => (
                    <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <span className="font-medium text-lg text-white">{faq.q}</span>
                            <span className={`transform transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

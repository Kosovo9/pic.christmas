// app/generate/page.tsx (o pages/generate.tsx)
'use client';

import React, { useState } from 'react';
import { FormatSelector } from '@/components/FormatSelector';
import { useFormatSelector } from '@/hooks/useFormatSelector';
import { PaymentMethods } from '@/components/PaymentMethods';
import { CurrencyBreakdown } from '@/components/CurrencyBreakdown';



export default function GeneratePage() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const {
        selectedFormatId,
        selectedFormat,
        quantity,
        pricing,
        handleFormatSelect,
        getPromptForFormat
    } = useFormatSelector();

    const handleGenerate = async () => {
        if (!prompt.trim() || !selectedFormat) return;

        setIsGenerating(true);
        try {
            const enhancedPrompt = getPromptForFormat(prompt);

            // If price > 0, redirect to Stripe Logic
            // We use the useFormatSelector's pricing state
            if (pricing && pricing.finalPrice > 0) {
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        price: pricing.finalPrice,
                        formatId: selectedFormat.id,
                        formatName: selectedFormat.name,
                        quantity: quantity,
                        prompt: enhancedPrompt
                    })
                });
                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url;
                    return; // Stop here, redirecting
                }
            }

            // Free generation
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: enhancedPrompt,
                    width: selectedFormat.width,
                    height: selectedFormat.height,
                    quantity: quantity
                })
            });

            const data = await response.json();
            if (data.success) {
                setGeneratedImage(data.imageUrl);
            }
        } catch (error) {
            console.error('Generation failed:', error);
            alert("Error: " + (error as any).message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center pt-8">
                    <h1 className="text-5xl font-bold text-white mb-2">
                        🎄 Genera tu foto navideña
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Elige el formato y crea imágenes perfectas para cualquier plataforma
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-4">
                        <div>
                            <label className="block text-white font-bold mb-2">
                                Describe tu foto
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Ej: Mujer joven con gorro navideño, foto profesional, estudio..."
                                className="w-full h-40 p-4 rounded-lg bg-white text-slate-900 placeholder-gray-500 border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        {selectedFormat && (
                            <div className="bg-teal-900 bg-opacity-50 border border-teal-500 rounded-lg p-4 space-y-2">
                                <h3 className="font-bold text-white">Formato seleccionado:</h3>
                                <p className="text-teal-100">{selectedFormat.name}</p>
                                <p className="text-sm text-gray-300">
                                    {selectedFormat.width}x{selectedFormat.height} ({selectedFormat.ratio})
                                </p>
                                {pricing && (
                                    <div className="pt-2 border-t border-teal-500">
                                        <p className="text-2xl font-bold text-teal-300">
                                            ${pricing.finalPrice.toFixed(2)}
                                        </p>
                                        {pricing.discount > 0 && (
                                            <p className="text-sm text-green-400">{pricing.savingsText}</p>
                                        )}
                                        <CurrencyBreakdown basePriceUSD={pricing.finalPrice} />
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={handleGenerate}
                            disabled={!prompt.trim() || !selectedFormat || isGenerating}
                            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            {isGenerating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Generando...
                                </span>
                            ) : (
                                `Generar imagen → $${pricing?.finalPrice.toFixed(2) || '0.00'}`
                            )}
                        </button>

                        <PaymentMethods />
                    </div>

                    <div className="lg:col-span-2">
                        <FormatSelector
                            selectedFormatId={selectedFormatId}
                            onFormatSelect={(formatId, price) => handleFormatSelect(formatId)}
                        />
                    </div>
                </div>

                {generatedImage && (
                    <div className="mt-8 space-y-4">
                        <h2 className="text-2xl font-bold text-white">Tu imagen generada:</h2>
                        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src={generatedImage}
                                alt="Generated"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="flex gap-4 flex-wrap justify-center">
                            <a
                                href={generatedImage}
                                download
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
                            >
                                ⬇️ Descargar
                            </a>
                            <button
                                onClick={() => navigator.share({ url: generatedImage })}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
                            >
                                📤 Compartir
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

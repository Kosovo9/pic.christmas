// components/FormatSelector.tsx
'use client';

import React, { useState } from 'react';
import { IMAGE_FORMATS, calculatePrice, getFormatsByCategory } from '@/lib/imageFormats';

interface FormatSelectorProps {
    onFormatSelect: (formatId: string, price: number) => void;
    selectedFormatId?: string;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
    onFormatSelect,
    selectedFormatId = 'tiktok'
}) => {
    const [activeTab, setActiveTab] = useState<'social' | 'print' | '4k'>('social');
    const [selectedFormat, setSelectedFormat] = useState(selectedFormatId);
    const [quantity, setQuantity] = useState(1);

    const formats = getFormatsByCategory(activeTab);
    const currentFormat = IMAGE_FORMATS.find(f => f.id === selectedFormat);
    const pricing = currentFormat ? calculatePrice(selectedFormat, quantity) : null;

    const handleFormatSelect = (formatId: string) => {
        setSelectedFormat(formatId);
        const format = IMAGE_FORMATS.find(f => f.id === formatId);
        if (format) {
            const price = calculatePrice(formatId, quantity);
            onFormatSelect(formatId, price.finalPrice);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
            {/* HEADER */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Elige tu formato
                </h2>
                <p className="text-slate-600">
                    Selecciona la resolución que necesitas según tu plataforma
                </p>
            </div>

            {/* TABS */}
            <div className="flex gap-2 justify-center flex-wrap">
                {(['social', 'print', '4k'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === tab
                                ? 'bg-teal-500 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {tab === 'social' && '📱 Social Media'}
                        {tab === 'print' && '🖥️ Impresión'}
                        {tab === '4k' && '✨ 4K Premium'}
                    </button>
                ))}
            </div>

            {/* FORMAT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formats.map(format => (
                    <div
                        key={format.id}
                        onClick={() => handleFormatSelect(format.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${selectedFormat === format.id
                                ? 'border-teal-500 bg-teal-50 shadow-lg'
                                : 'border-gray-300 bg-white hover:border-teal-300'
                            }`}
                    >
                        {/* Icon + Name */}
                        <div className="flex items-start gap-3 mb-2">
                            <span className="text-3xl">{format.icon}</span>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{format.name}</h3>
                                <p className="text-sm text-gray-600">{format.label}</p>
                            </div>
                        </div>

                        {/* Dimensions */}
                        <div className="bg-gray-50 rounded p-2 mb-2 text-sm font-mono text-gray-700">
                            {format.width}x{format.height} ({format.ratio})
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-600 mb-3">{format.description}</p>

                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-teal-600">
                                ${format.basePriceUSD.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500">USD</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* QUANTITY & PRICING */}
            {currentFormat && pricing && (
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cantidad de imágenes
                            </label>
                            <div className="flex items-center gap-2 bg-white rounded-lg p-2 border border-gray-300">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="flex-1 text-center font-bold text-lg outline-none"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Format Info */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-1">Formato seleccionado</p>
                            <p className="text-lg font-bold text-slate-900">{currentFormat.name}</p>
                            <p className="text-xs text-gray-600">{currentFormat.width}x{currentFormat.height}</p>
                        </div>

                        {/* Pricing Summary */}
                        <div className="space-y-2">
                            {pricing.discount > 0 && (
                                <div className="text-center">
                                    <span className="text-sm font-medium text-green-600">
                                        {pricing.savingsText}
                                    </span>
                                </div>
                            )}
                            <div className="bg-white rounded-lg p-3 text-center border border-teal-300">
                                {pricing.basePrice !== pricing.finalPrice && (
                                    <p className="text-sm text-gray-600 line-through mb-1">
                                        ${pricing.basePrice.toFixed(2)}
                                    </p>
                                )}
                                <p className="text-3xl font-bold text-teal-600">
                                    ${pricing.finalPrice.toFixed(2)}
                                </p>
                                <p className="text-xs text-gray-600">Total</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={() => onFormatSelect(selectedFormat, pricing.finalPrice)}
                        className="w-full mt-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
                    >
                        Generar imagen → ${pricing.finalPrice.toFixed(2)}
                    </button>
                </div>
            )}

            {/* PRICE LEGEND */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">💰 Precios por Resolución</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                        <span className="font-medium">Social (HD)</span>
                        <p className="text-gray-600">$1.99 - $2.49</p>
                    </div>
                    <div>
                        <span className="font-medium">2K</span>
                        <p className="text-gray-600">$4.99</p>
                    </div>
                    <div>
                        <span className="font-medium">4K</span>
                        <p className="text-gray-600">$7.99 - $8.99</p>
                    </div>
                    <div>
                        <span className="font-medium">Descuentos</span>
                        <p className="text-gray-600">2+ imágenes</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormatSelector;

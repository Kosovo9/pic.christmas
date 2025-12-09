// hooks/useFormatSelector.ts
'use client';

import { useState, useCallback } from 'react';
import { IMAGE_FORMATS, calculatePrice } from '@/lib/imageFormats';

export interface SelectedFormat {
    id: string;
    width: number;
    height: number;
    ratio: string;
    name: string;
    basePriceUSD: number;
}

export interface PricingInfo {
    basePrice: number;
    finalPrice: number;
    discount: number;
    savingsText: string;
}

export const useFormatSelector = () => {
    const [selectedFormatId, setSelectedFormatId] = useState<string>('tiktok');
    const [quantity, setQuantity] = useState<number>(1);
    const [pricing, setPricing] = useState<PricingInfo | null>(null);

    const selectedFormat = IMAGE_FORMATS.find(f => f.id === selectedFormatId);

    const handleFormatSelect = useCallback((formatId: string) => {
        setSelectedFormatId(formatId);
        const newPricing = calculatePrice(formatId, quantity);
        setPricing(newPricing);
    }, [quantity]);

    const handleQuantityChange = useCallback((newQuantity: number) => {
        const validQuantity = Math.max(1, newQuantity);
        setQuantity(validQuantity);
        const newPricing = calculatePrice(selectedFormatId, validQuantity);
        setPricing(newPricing);
    }, [selectedFormatId]);

    const getPromptForFormat = useCallback((userPrompt: string): string => {
        if (!selectedFormat) return userPrompt;
        return `${userPrompt} | Aspect ratio ${selectedFormat.ratio} | ${selectedFormat.width}x${selectedFormat.height}px`;
    }, [selectedFormat]);

    return {
        selectedFormatId,
        selectedFormat: selectedFormat ? {
            id: selectedFormat.id,
            width: selectedFormat.width,
            height: selectedFormat.height,
            ratio: selectedFormat.ratio,
            name: selectedFormat.name,
            basePriceUSD: selectedFormat.basePriceUSD
        } : null,
        quantity,
        pricing,
        handleFormatSelect,
        handleQuantityChange,
        getPromptForFormat
    };
};

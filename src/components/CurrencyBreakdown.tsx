// components/CurrencyBreakdown.tsx
'use client';

import React from 'react';
import { useCurrency, CurrencyCode } from '../hooks/useCurrency';

interface Props {
    basePriceUSD: number;
}

export const CurrencyBreakdown: React.FC<Props> = ({ basePriceUSD }) => {
    const { breakdown, currency, setCurrency, availableCurrencies } = useCurrency(basePriceUSD);

    if (basePriceUSD === 0) return null; // Free/Viral mode

    return (
        <div className="mt-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700 animate-fade-in">
            {/* Currency Selector */}
            <div className="flex justify-end mb-4">
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                    className="bg-slate-800 text-white text-xs py-1 px-2 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
                >
                    {availableCurrencies.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Breakdown Table */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>{breakdown.displaySubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                    <span className="flex items-center gap-1">
                        Processing Fee
                        <span className="text-slate-500" title="Covers secure banking transaction costs">(?)</span>
                    </span>
                    <span>{breakdown.displayFee}</span>
                </div>
                <div className="h-px bg-slate-700 my-2"></div>
                <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-emerald-400">{breakdown.displayTotal}</span>
                </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-slate-500 mt-3 text-center leading-tight">
                * Exchange rates are estimated live. Processing fees cover secure transaction costs via verified partners.
            </p>
        </div>
    );
};

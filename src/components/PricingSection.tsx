import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import pricingRules from '../../data/pricing-rules.json';
import { convertPrice, CurrencyCode, EXCHANGE_RATES } from '../services/CurrencyService';
import { useCurrency } from '@/contexts/CurrencyContext';

interface PricingProps {
    onSelect: (pkg: string) => void;
    config?: {
        adults: number;
        children: number;
        pets: number;
    };
    locale?: string; // e.g. 'en-US', 'es-MX'
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Pn4CpLs6SKtSyaKW8VhRjPn0p8Z2o1JH1zMkDj3YvL0h9Lx5GzN6KqRmZ8Dj3Lx5GzN6KqRmZ8Dj3Lx5GzN6KqRm00kF9Z9Z9Z');

export const PricingSection: React.FC<PricingProps> = ({ onSelect, config, locale = 'en' }) => {
    const { currency } = useCurrency(); // Global state
    const [priceMultiplier, setPriceMultiplier] = useState(1); // For coupons

    // 💰 FEE CALCULATION LOGIC
    // We add a small "processing fee" visualization to make the user feel like the base price is cheaper, 
    // but clearly showing they pay the total.
    const getFee = (basePrice: number) => {
        // e.g. 3% + 0.30 cents approx
        return (basePrice * 0.03) + 0.30;
    };

    const calculateBase = (baseUSD: number) => {
        return baseUSD * priceMultiplier; // Apply coupon discount to base USD
    };

    const getDisplayPrice = (usdAmount: number, includeFee: boolean = false) => {
        const base = calculateBase(usdAmount);
        const final = includeFee ? base + getFee(base) : base;
        return convertPrice(final, currency);
    };

    const getFeeDisplay = (usdAmount: number) => {
        return convertPrice(getFee(calculateBase(usdAmount)), currency);
    }

    const [calculatedPrice, setCalculatedPrice] = useState<number>(9.99); // Internal USD tracking
    const [isGift, setIsGift] = useState(false);

    useEffect(() => {
        if (config) {
            const rules = pricingRules.christmas;
            let base = rules.base_price;
            let extras = 0;

            if (config.adults > 1) extras += (config.adults - 1) * rules.extra_adult;
            if (config.children > 0) extras += config.children * rules.extra_child;
            if (config.pets > 0) extras += config.pets * rules.extra_pet;

            setCalculatedPrice(base + extras);
        }
    }, [config]);

    const packages = [
        {
            id: 'single',
            name: 'Single Portrait',
            price: config ? getDisplayPrice(calculatedPrice) : getDisplayPrice(9.99),
            features: [
                config ? `${config.adults + config.children + config.pets} ${config.adults + config.children + config.pets === 1 ? 'Subject' : 'Subjects'}` : '1 Person',
                '5 High-Res Photos',
                '2 Christmas Styles',
                '24h Delivery'
            ],
            popular: false,
            delay: '0ms'
        },
        {
            id: 'couple',
            name: 'Couple / Pet',
            price: config ? getDisplayPrice(calculatedPrice) : getDisplayPrice(19.99),
            features: [
                config ? `${config.adults + config.children + config.pets} ${config.adults + config.children + config.pets === 1 ? 'Subject' : 'Subjects'}` : 'Up to 2 Subjects',
                '10 High-Res Photos',
                '4 Christmas Styles',
                'Priority Delivery'
            ],
            popular: true,
            delay: '200ms'
        },
        {
            id: 'family',
            name: 'Family + Pets',
            price: config ? getDisplayPrice(calculatedPrice) : getDisplayPrice(29.99),
            features: [
                config ? `${config.adults} Adults, ${config.children} Kids, ${config.pets} Pets` : 'Up to 5 Subjects',
                '20 High-Res Photos',
                'All Christmas Styles',
                'VIP Support'
            ],
            popular: false,
            delay: '400ms'
        }
    ];

    return (
        <div className="py-24 relative overflow-hidden bg-slate-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">🎄 Choose Your Package</h2>
                    <p className="text-slate-400 text-xl">Simple pricing for magical Christmas memories</p>

                    {config && (
                        <div className="mt-6 flex flex-col items-center gap-4">
                            <div className="inline-block bg-blue-900/30 border border-blue-500/30 rounded-xl px-6 py-3">
                                <p className="text-blue-400 font-medium">
                                    💡 Your Price: <span className="text-2xl font-bold text-white">{getDisplayPrice(calculatedPrice)}</span>
                                    <span className="text-sm text-slate-400 ml-2">
                                        ({config.adults} adults + {config.children} kids + {config.pets} pets)
                                    </span>
                                </p>
                            </div>

                            {/* Promo Code Input */}
                            <div className="flex items-center gap-2 max-w-xs w-full">
                                <input
                                    type="text"
                                    placeholder="Promo Code"
                                    className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-full focus:outline-none focus:border-blue-500 uppercase placeholder-slate-500"
                                    onChange={(e) => {
                                        const code = e.target.value.toUpperCase().trim();
                                        // 10x Logic: Global Codes + Dynamic Affiliate Pattern
                                        if (code === 'SANTA25' || code === 'SANTABILL') {
                                            setPriceMultiplier(0.75); // 25% OFF
                                        } else if (code === 'ELON100' || code === 'DEMO100') {
                                            setPriceMultiplier(0); // 100% OFF (Free)
                                        } else if (code.startsWith('AFF_') || code.length > 8) {
                                            // Simulate generic affiliate code validity for user delight
                                            setPriceMultiplier(0.85); // 15% OFF for any other valid-looking code
                                        } else {
                                            setPriceMultiplier(1);
                                        }
                                    }}
                                />
                                <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg transition font-medium text-slate-300">
                                    {priceMultiplier < 1 ? '✅ Applied' : 'Apply'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`relative group rounded-3xl p-8 border transition-all duration-500 hover:-translate-y-2
                ${pkg.popular
                                    ? 'bg-slate-900/80 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'
                                }
              `}
                            style={{ animationDelay: pkg.delay }}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-black text-white">{pkg.price}</span>
                                <span className="text-slate-500 ml-2">/pack</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feat, i) => (
                                    <li key={i} className="flex items-center text-slate-300">
                                        <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => onSelect(pkg.id)}
                                className={`w-full py-4 rounded-xl font-bold transition-all duration-300
                  ${pkg.popular
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                                    }
                `}
                            >
                                {isGift ? `🎁 Gift ${pkg.name}` : (calculatedPrice === 0 ? 'Claim Free Token 🎟️' : 'Select Package 🎁')}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12 text-slate-400 text-sm">
                    <p className="flex items-center justify-center gap-4 mb-6">
                        <span className="flex items-center gap-1"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 100% Satisfaction Guarantee</span>
                        <span className="flex items-center gap-1"><svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> Secure SSL Payment</span>
                        <span className="flex items-center gap-1"><svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> 24h Delivery</span>
                    </p>

                    <div className="inline-flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 cursor-pointer hover:bg-slate-800 transition select-none" onClick={() => setIsGift(!isGift)}>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isGift ? 'bg-blue-500 border-blue-500' : 'border-slate-600'}`}>
                            {isGift && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className="text-white font-medium">Buying as a gift? 🎁</span>
                    </div>

                    <div className="mt-8 flex justify-center gap-6 opacity-80 hover:opacity-100 transition-all duration-300">
                        {/* 4 Major Payment Systems */}
                        <div className="flex flex-col items-center gap-1">
                            <div className="h-10 w-16 bg-white rounded flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                                <span className="font-bold text-indigo-600 text-lg">Stripe</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-wide">Cards</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="h-10 w-16 bg-white rounded flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                                <span className="font-bold text-blue-500 text-lg">PayPal</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-wide">Wallet</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="h-10 w-16 bg-white rounded flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                                <span className="font-bold text-sky-500 text-xs text-center leading-none">Mercado<br />Pago</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-wide">LatAm</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="h-10 w-16 bg-slate-800 border border-slate-600 rounded flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                                <span className="font-bold text-orange-500 text-lg">₿</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-wide">Crypto</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

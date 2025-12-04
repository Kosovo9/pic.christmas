import React, { useState, useEffect } from 'react';
import { PRICING_PACKAGES, TRANSLATIONS } from '../constants';
import { Language, SubjectCounts } from '../types';
import { getPaymentUrl } from '../services/paymentConfig';
import { trackEvent } from '../services/analytics';

interface PricingSectionProps {
  language: Language;
  counts: SubjectCounts; // Received from App state
}

export const PricingSection: React.FC<PricingSectionProps> = ({ language, counts }) => {
  const t = TRANSLATIONS[language].pricing;
  
  // Track selected package to show payment options
  const [selectedPkgId, setSelectedPkgId] = useState<string | null>(null);

  const calculatePrice = (pkgId: string) => {
    const pkg = PRICING_PACKAGES.find(p => p.id === pkgId);
    if (!pkg) return 0;
    
    const { basePrice, includedPeople, includedPets, pricePerExtraPerson, pricePerExtraPet } = pkg.rule;
    
    // Logic: Base + Extras
    const extraPeopleCount = Math.max(0, (counts.adults + counts.kids) - includedPeople);
    const extraPetsCount = Math.max(0, (counts.dogs + counts.cats + counts.others) - includedPets);
    
    return basePrice + (extraPeopleCount * pricePerExtraPerson) + (extraPetsCount * pricePerExtraPet);
  };

  const handleBuyClick = (pkgId: string) => {
      if (selectedPkgId === pkgId) setSelectedPkgId(null); // toggle
      else setSelectedPkgId(pkgId);
      trackEvent('purchase_package_click', { packageId: pkgId });
  };

  return (
    <div id="pricing" className="py-24 bg-[#1a0505]/80 backdrop-blur-sm border-t border-[#3E0000]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#F3E5AB] mb-4">{t.title}</h2>
          <p className="text-[#888] max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PACKAGES.map((pkg) => {
                const finalPrice = calculatePrice(pkg.id);
                const isSelected = selectedPkgId === pkg.id;
                
                return (
                    <div 
                        key={pkg.id} 
                        className={`relative p-8 rounded-sm border flex flex-col transition-all ${
                            pkg.recommended 
                            ? 'bg-[#2a0a0a]/90 border-[#D4AF37] shadow-[0_0_30px_rgba(74,4,4,0.5)] transform scale-105 z-10' 
                            : 'bg-[#0a0202]/90 border-[#3E0000] hover:border-[#D4AF37]/50'
                        }`}
                    >
                        {pkg.recommended && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-[#1a0505] text-[10px] font-bold px-4 py-1 uppercase tracking-widest shadow-lg">
                                Premium Selection
                            </div>
                        )}
                        
                        <h3 className="text-xl font-serif font-bold text-[#F3E5AB] mb-2">{pkg.title[language]}</h3>
                        <p className="text-[#888] text-sm italic mb-6">{pkg.description[language]}</p>

                        <div className="flex items-baseline mb-2">
                            <span className="text-4xl font-serif text-[#D4AF37]">${finalPrice}</span>
                            <span className="text-[#888] text-xs ml-1">USD</span>
                        </div>
                        
                        <div className="text-[10px] text-[#666] mb-6 space-y-1">
                             <p>Base: ${pkg.rule.basePrice}</p>
                             {(counts.adults + counts.kids) > pkg.rule.includedPeople && <p>{t.extraPerson}: +${pkg.rule.pricePerExtraPerson}</p>}
                             {(counts.dogs + counts.cats + counts.others) > pkg.rule.includedPets && <p>{t.extraPet}: +${pkg.rule.pricePerExtraPet}</p>}
                        </div>
                        
                        <ul className="mb-8 space-y-3 flex-1">
                            {pkg.features[language].map((feature, idx) => (
                                <li key={idx} className="flex items-center text-[#E5E5E5] text-sm font-light">
                                    <span className="text-[#D4AF37] mr-2">✦</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        
                        {/* Primary Button */}
                        {!isSelected ? (
                            <button 
                                onClick={() => handleBuyClick(pkg.id)}
                                className={`w-full py-4 uppercase tracking-widest font-bold text-xs transition-colors ${
                                pkg.recommended ? 'bg-[#D4AF37] text-[#1a0505] hover:bg-[#F3E5AB]' : 'bg-[#3E0000] text-[#D4AF37] hover:bg-[#4a0404]'
                                }`}
                            >
                                {t.buy}
                            </button>
                        ) : (
                            // Payment Options Grid
                            <div className="grid grid-cols-1 gap-2 animate-fade-in-up">
                                <a href={getPaymentUrl(pkg.id, 'mercadopago')} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-[#009EE3] hover:bg-[#0081B9] text-white py-2 px-4 rounded text-xs font-bold transition">
                                    Mercado Pago
                                </a>
                                <a href={getPaymentUrl(pkg.id, 'lemonsqueezy')} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-[#7047EB] hover:bg-[#5C37C9] text-white py-2 px-4 rounded text-xs font-bold transition">
                                    Lemon Squeezy
                                </a>
                                <a href={getPaymentUrl(pkg.id, 'stripe')} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-[#635BFF] hover:bg-[#4B44D8] text-white py-2 px-4 rounded text-xs font-bold transition">
                                    Stripe
                                </a>
                                <a href={getPaymentUrl(pkg.id, 'paypal')} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-[#003087] hover:bg-[#002466] text-white py-2 px-4 rounded text-xs font-bold transition">
                                    PayPal
                                </a>
                                <button onClick={() => setSelectedPkgId(null)} className="text-[#666] text-[10px] mt-1 underline">Cancel</button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        {/* Secured By Footer */}
        <div className="mt-16 flex flex-col items-center opacity-60">
             <span className="text-[#888] text-[10px] uppercase tracking-[0.2em] mb-4">Secured Payment Processing</span>
             <div className="flex gap-4 items-center grayscale hover:grayscale-0 transition-all duration-500">
                {/* Simulated Badges */}
                <div className="bg-[#E5E5E5] text-black px-2 py-1 rounded text-[10px] font-bold">Stripe</div>
                <div className="bg-[#E5E5E5] text-black px-2 py-1 rounded text-[10px] font-bold">PayPal</div>
                <div className="bg-[#E5E5E5] text-black px-2 py-1 rounded text-[10px] font-bold">MercadoPago</div>
                <div className="bg-[#E5E5E5] text-black px-2 py-1 rounded text-[10px] font-bold">LemonSqueezy</div>
             </div>
        </div>
      </div>
    </div>
  );
};
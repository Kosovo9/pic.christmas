import React from 'react';

interface PricingProps {
    onSelect: (pkg: string) => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onSelect }) => {
    const packages = [
        {
            id: 'single',
            name: 'Single Portrait',
            price: '$9.99',
            features: ['1 Person', '5 High-Res Photos', '2 Styles', '24h Delivery'],
            popular: false,
            delay: '0ms'
        },
        {
            id: 'couple',
            name: 'Couple / Pet',
            price: '$19.99',
            features: ['Up to 2 Subjects', '10 High-Res Photos', '4 Styles', 'Priority Delivery'],
            popular: true,
            delay: '200ms'
        },
        {
            id: 'family',
            name: 'Family Pack',
            price: '$29.99',
            features: ['Up to 5 Subjects', '20 High-Res Photos', 'All Styles', 'VIP Support'],
            popular: false,
            delay: '400ms'
        }
    ];

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Package</h2>
                    <p className="text-slate-400 text-xl">Simple pricing for magical memories.</p>
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
                                        <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
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
                                Select Package
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

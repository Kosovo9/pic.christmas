import React from 'react';
import { INTERNAL_PROMPTS, TRANSLATIONS } from '../constants';
import { Language, PromptItem } from '../types';

interface CatalogSectionProps {
    language: Language;
}

/**
 * Catálogo visual de estilos. Muestra solo títulos de prompts,
 * los prompts gigantes quedan ocultos en INTERNAL_PROMPTS.
 */
export const CatalogSection: React.FC<CatalogSectionProps> = ({ language }) => {
    const t = TRANSLATIONS[language].catalog;

    const categoriesOrder: PromptItem['category'][] = [
        'couple',
        'family',
        'pet',
        'professional',
        'video',
        'custom',
    ];

    const grouped: Record<string, PromptItem[]> = {};
    INTERNAL_PROMPTS.forEach((item) => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
    });

    return (
        <section id="catalog" className="py-20 bg-[#050811] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                        {t.title}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categoriesOrder.map((cat) => {
                        const items = grouped[cat];
                        if (!items || items.length === 0) return null;

                        return (
                            <div
                                key={cat}
                                className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-900/40 transition"
                            >
                                <h3 className="text-xl font-semibold mb-3 text-blue-400">
                                    {TRANSLATIONS[language].categories[cat]}
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                                    {items.map((prompt) => (
                                        <li key={prompt.id}>{prompt.title[language]}</li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

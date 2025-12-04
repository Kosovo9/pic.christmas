import React from 'react';
import { CATALOG_IDEAS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface CatalogSectionProps {
  language: Language;
  onSelect: (id: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ language, onSelect }) => {
  const t = TRANSLATIONS[language].catalog;
  const categories = TRANSLATIONS[language].categories;

  // Group by category
  const grouped = CATALOG_IDEAS.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof CATALOG_IDEAS>);

  return (
    <div className="py-24 bg-[#0a0202]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#F3E5AB] mb-4">{t.title}</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-[#888] font-light italic">{t.subtitle}</p>
        </div>

        {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="mb-12">
                <h3 className="text-[#D4AF37] uppercase tracking-widest text-sm mb-6 border-l-4 border-[#D4AF37] pl-4">
                    {categories[cat as keyof typeof categories] || cat}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className="group cursor-pointer bg-[#1a0505]/90 border border-[#3E0000] p-6 hover:border-[#D4AF37] transition-all hover:translate-y-[-5px]"
                        >
                            <h4 className="text-[#F3E5AB] font-serif font-bold text-lg mb-2 group-hover:text-[#D4AF37] transition-colors">{item.title[language]}</h4>
                            <p className="text-[#888] text-xs line-clamp-3">{item.fullPrompt[language]}</p>
                            <div className="mt-4 text-[#D4AF37] text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                                Select Idea →
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';

interface Prompt {
    id: string;
    title: string;
    description: string;
    tags: string[];
}

interface Category {
    id: string;
    name: string;
    icon: string;
    count: number;
}

interface ChristmasCatalogProps {
    onSelect: (prompt: Prompt) => void;
    onClose?: () => void;
}

export const ChristmasCatalog: React.FC<ChristmasCatalogProps> = ({ onSelect, onClose }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPrompts();
    }, [selectedCategory]);

    const fetchPrompts = async () => {
        setLoading(true);
        try {
            const url = selectedCategory === 'all'
                ? '/api/prompts'
                : `/api/prompts/category/${selectedCategory}`;

            const res = await fetch(url);
            const data = await res.json();

            if (selectedCategory === 'all') {
                setCategories(data.categories);
                setPrompts(data.prompts);
            } else {
                setPrompts(data.prompts);
            }
        } catch (error) {
            console.error('Error fetching prompts:', error);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-slate-800 shadow-2xl">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Christmas Prompts Catalog</h3>
                        <p className="text-slate-400">Choose from 75+ professional Christmas scene ideas</p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Categories */}
                <div className="px-6 py-4 border-b border-slate-800 overflow-x-auto">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${selectedCategory === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            ✨ All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${selectedCategory === cat.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                {cat.icon} {cat.name} ({cat.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Prompts Grid */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-slate-400">Loading prompts...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {prompts.map((prompt) => (
                                <button
                                    key={prompt.id}
                                    onClick={() => {
                                        onSelect(prompt);
                                        onClose?.();
                                    }}
                                    className="bg-slate-800/50 hover:bg-slate-800 rounded-xl p-6 text-left transition-all duration-300 border border-slate-700 hover:border-blue-500 group"
                                >
                                    <h4 className="text-white font-bold mb-2 group-hover:text-blue-400 transition">
                                        {prompt.title}
                                    </h4>
                                    <p className="text-slate-400 text-sm mb-3 line-clamp-3">
                                        {prompt.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {prompt.tags.slice(0, 3).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

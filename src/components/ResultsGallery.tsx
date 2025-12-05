import React from 'react';

interface ResultsGalleryProps {
    images?: string[]; // Optional for now
}

export const ResultsGallery: React.FC<ResultsGalleryProps> = ({ images = [] }) => {
    // Mock images if none provided
    const displayImages = images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1543258103-a62bdc069871?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?q=80&w=2080&auto=format&fit=crop',
    ];

    return (
        <div className="py-24 bg-slate-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Your Magical Gallery</h2>
                    <p className="text-slate-400 text-xl">Download and share your masterpieces.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayImages.map((img, index) => (
                        <div key={index} className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800">
                            <img
                                src={img}
                                alt={`Result ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                                <button className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-50 transition transform hover:scale-105">
                                    Download
                                </button>
                                <button className="px-6 py-2 bg-slate-800/50 text-white border border-white/20 rounded-full font-bold backdrop-blur-md hover:bg-slate-800 transition">
                                    Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

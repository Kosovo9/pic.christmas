import React from 'react';
import Image from 'next/image';

export const ExamplesGallery: React.FC = () => {
    const examples = [
        {
            id: 1,
            title: 'Festive Ornaments',
            category: 'Decorations',
            image: '/examples/ornament-bokeh.jpg',
            alt: 'Red Christmas ornament with bokeh lights'
        },
        {
            id: 2,
            title: 'Santa Visit',
            category: 'Family',
            image: '/examples/santa-kids.jpg',
            alt: 'Children visiting Santa Claus'
        },
        {
            id: 3,
            title: 'Cozy Christmas',
            category: 'Mood',
            image: '/examples/gift-candycane.jpg',
            alt: 'Gift wrapping with candy cane'
        },
        {
            id: 4,
            title: 'Tree Decorating',
            category: 'Traditional',
            image: '/examples/tree-ornaments.jpg',
            alt: 'Decorated Christmas tree with star ornament'
        },
        {
            id: 5,
            title: 'Warm Bokeh',
            category: 'Atmosphere',
            image: '/examples/bokeh-lights.jpg',
            alt: 'Warm Christmas bokeh lights'
        },
        {
            id: 6,
            title: 'Golden Elegance',
            category: 'Decorations',
            image: '/examples/golden-ornaments.jpg',
            alt: 'Golden Christmas ornaments on tree'
        }
    ];

    return (
        <section className="py-24 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        ✨ Christmas Magic Examples
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        See the kind of professional, festive photos you can create with AI
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {examples.map((example, index) => (
                        <div
                            key={example.id}
                            className="group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-all duration-500 hover:-translate-y-2"
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Image Container */}
                            <div className="aspect-square relative overflow-hidden">
                                {/* Placeholder gradient until real images are added */}
                                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-green-900/20 to-blue-900/20 animate-pulse" />

                                {/* Future: Real image */}
                                {/* <Image
                  src={example.image}
                  alt={example.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                /> */}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Category Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-red-600/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                                    {example.category}
                                </div>

                                {/* Title on Hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-bold text-xl mb-2">{example.title}</h3>
                                    <p className="text-slate-300 text-sm">AI-enhanced Christmas photo</p>
                                </div>
                            </div>

                            {/* Shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-slate-400 mb-6">
                        🎄 Transform your photos into magical Christmas memories like these
                    </p>
                    <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-500 hover:to-green-500 text-white rounded-xl font-bold shadow-lg shadow-red-600/20 transition-all transform hover:scale-105">
                        Start Creating Your Magic
                    </button>
                </div>
            </div>
        </section>
    );
};

import React from 'react';
import Image from 'next/image';

export const ExamplesGallery: React.FC = () => {
    const examples = [
        // NEW PROFESSIONAL EXAMPLES WITH PROMPTS
        {
            id: 1,
            title: 'Christmas Tree Farm',
            category: 'Outdoor',
            image: '/examples/tree-farm-truck.jpg',
            alt: 'Man with vintage truck at Christmas tree farm',
            prompt: 'Cinematic Christmas scene: mature man next to burgundy Ford F-150 loaded with fresh Christmas tree, golden hour lighting, snow-covered tree farm, warm tones, professional color grading'
        },
        {
            id: 2,
            title: 'Elegant Branding',
            category: 'Design',
            image: '/examples/elegant-moments-brand.jpg',
            alt: 'Luxury Christmas brand identity',
            prompt: 'Premium Christmas brand mockup: MacBook displaying elegant website, burgundy and gold palette, velvet textures, pine branches, warm bokeh lights, editorial magazine style'
        },
        {
            id: 3,
            title: 'Cozy Couple',
            category: 'Romance',
            image: '/examples/couple-christmas-embrace.jpg',
            alt: 'Couple embracing by Christmas tree',
            prompt: 'Intimate couple portrait: tender embrace by decorated tree, fireplace glow, warm lighting, f/1.2 bokeh, orange and teal grading, engagement ring visible, cozy home atmosphere'
        },
        {
            id: 4,
            title: 'Baby Wonderland',
            category: 'Children',
            image: '/examples/baby-christmas-toys.jpg',
            alt: 'Baby in Christmas wonderland with toys',
            prompt: 'Whimsical baby portrait: 8-month-old in teddy bear onesie, surrounded by Christmas toys and poodle, vintage props, rich jewel tones, studio lighting, heirloom quality'
        },
        {
            id: 5,
            title: 'Proposal Moment',
            category: 'Details',
            image: '/examples/engagement-ring-bokeh.jpg',
            alt: 'Engagement ring with Christmas bokeh',
            prompt: 'Macro engagement shot: diamond ring being placed on finger, ultra-shallow DOF (f/1.4), Christmas tree bokeh background, warm golden tones, romantic intimate moment'
        },
        // ORIGINAL EXAMPLES
        { id: 6, title: 'Festive Ornaments', category: 'Decorations', image: '/examples/ornament-bokeh.jpg', alt: 'Red Christmas ornament' },
        { id: 7, title: 'Santa Visit', category: 'Family', image: '/examples/santa-kids.jpg', alt: 'Children visiting Santa' },
        { id: 8, title: 'Cozy Christmas', category: 'Mood', image: '/examples/gift-candycane.jpg', alt: 'Gift wrapping' },
        { id: 9, title: 'Tree Decorating', category: 'Traditional', image: '/examples/tree-ornaments.jpg', alt: 'Decorated tree' },
        { id: 10, title: 'Warm Bokeh', category: 'Atmosphere', image: '/examples/bokeh-lights.jpg', alt: 'Warm lights' },
        { id: 11, title: 'Golden Elegance', category: 'Decorations', image: '/examples/golden-ornaments.jpg', alt: 'Golden ornaments' },
        { id: 12, title: 'Snowy Morning', category: 'Outdoor', image: '/examples/snow-window.jpg', alt: 'Snowy window view' },
        { id: 13, title: 'Reindeer Love', category: 'Pets', image: '/examples/dog-reindeer.jpg', alt: 'Dog with reindeer antlers' },
        { id: 14, title: 'Hot Cocoa', category: 'Cozy', image: '/examples/hot-cocoa.jpg', alt: 'Hot chocolate mug' },
        { id: 15, title: 'Winter Walk', category: 'Outdoor', image: '/examples/winter-walk.jpg', alt: 'Walking in snow' },
        { id: 16, title: 'Elf Helper', category: 'Kids', image: '/examples/baby-elf.jpg', alt: 'Baby in elf costume' },
        { id: 17, title: 'Mistletoe Kiss', category: 'Couples', image: '/examples/couple-kiss.jpg', alt: 'Couple kissing' },
        { id: 18, title: 'Gingerbread Fun', category: 'Activity', image: '/examples/gingerbread.jpg', alt: 'Decorating gingerbread' },
        { id: 19, title: 'Silent Night', category: 'Atmosphere', image: '/examples/night-lights.jpg', alt: 'Christmas lights at night' },
        { id: 20, title: 'Stocking Surprise', category: 'Family', image: '/examples/stockings.jpg', alt: 'Hanging stockings' },
        { id: 21, title: 'Rustic Cabin', category: 'Travel', image: '/examples/cabin.jpg', alt: 'Log cabin in snow' },
        { id: 22, title: 'Sparkler Joy', category: 'Party', image: '/examples/sparklers.jpg', alt: 'Holding sparklers' },
        { id: 23, title: 'Ugly Sweater', category: 'Fun', image: '/examples/sweaters.jpg', alt: 'Ugly Christmas sweaters' },
        { id: 24, title: 'Sleigh Ride', category: 'Adventure', image: '/examples/sleigh.jpg', alt: 'Horse drawn sleigh' },
        { id: 25, title: 'Midnight Mass', category: 'Traditional', image: '/examples/candle-service.jpg', alt: 'Candlelight service' },
    ];

    return (
        <section className="py-12 bg-slate-900/50">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        ✨ Christmas Magic Gallery
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Infinite possibilities for your festive photos
                    </p>
                </div>

                {/* Gallery Grid - Expanded to 5 cols */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {examples.map((example, index) => (
                        <div
                            key={example.id}
                            className="group relative aspect-square overflow-hidden rounded-xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-xl"
                            style={{
                                animationDelay: `${index * 50}ms`
                            }}
                        >
                            {/* Image Container */}
                            <div className="w-full h-full relative">
                                {/* Placeholder gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-green-900/20 to-blue-900/20" />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Category Badge - Smaller */}
                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wide rounded-full opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    {example.category}
                                </div>

                                {/* Title on Hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-bold text-sm leading-tight">{example.title}</h3>
                                </div>
                            </div>
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

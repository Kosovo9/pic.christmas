// lib/imageFormats.ts
// Sistema de formatos y precios dinámicos para pic.christmas

export interface AspectFormat {
    id: string;
    name: string;
    label: string;
    ratio: string;
    width: number;
    height: number;
    platform: string;
    category: 'social' | 'print' | '4k';
    basePriceUSD: number; // Precio base en USD
    description: string;
    icon: string;
}

export const IMAGE_FORMATS: AspectFormat[] = [
    // SOCIAL MEDIA FORMATS
    {
        id: 'tiktok',
        name: 'TikTok/Reels',
        label: 'TikTok | Instagram Reels',
        ratio: '9:16',
        width: 1080,
        height: 1920,
        platform: 'tiktok',
        category: 'social',
        basePriceUSD: 1.99,
        description: 'Vertical | HD | Optimizado para móvil',
        icon: '📱'
    },
    {
        id: 'instagram_square',
        name: 'Instagram Feed',
        label: 'Instagram | Facebook',
        ratio: '1:1',
        width: 1080,
        height: 1080,
        platform: 'instagram',
        category: 'social',
        basePriceUSD: 1.99,
        description: 'Cuadrado | HD | Feed posts',
        icon: '📸'
    },
    {
        id: 'facebook',
        name: 'Facebook Post',
        label: 'Facebook | LinkedIn',
        ratio: '16:9',
        width: 1920,
        height: 1080,
        platform: 'facebook',
        category: 'social',
        basePriceUSD: 2.49,
        description: 'Horizontal | HD | Desktop + móvil',
        icon: '💼'
    },
    {
        id: 'twitter',
        name: 'X (Twitter) Post',
        label: 'X | Twitter',
        ratio: '16:9',
        width: 1600,
        height: 900,
        platform: 'twitter',
        category: 'social',
        basePriceUSD: 2.49,
        description: 'Horizontal | HD | Optimizado X/Twitter',
        icon: '𝕏'
    },
    {
        id: '2k',
        name: '2K Ultra HD',
        label: '2K Resolution',
        ratio: '16:9',
        width: 2560,
        height: 1440,
        platform: 'print',
        category: 'print',
        basePriceUSD: 4.99,
        description: '2560x1440 | Ultra HD | Desktop/Print',
        icon: '🖥️'
    },
    {
        id: '4k',
        name: '4K Ultra HD',
        label: '4K Resolution',
        ratio: '16:9',
        width: 3840,
        height: 2160,
        platform: 'print',
        category: '4k',
        basePriceUSD: 7.99,
        description: '3840x2160 | Premium | Impresión profesional',
        icon: '✨'
    },
    {
        id: '4k_portrait',
        name: '4K Portrait',
        label: '4K Vertical',
        ratio: '9:16',
        width: 2160,
        height: 3840,
        platform: 'print',
        category: '4k',
        basePriceUSD: 7.99,
        description: '2160x3840 | Premium vertical | Print/Canvas',
        icon: '🎨'
    },
    {
        id: '4k_square',
        name: '4K Square',
        label: '4K Square',
        ratio: '1:1',
        width: 3840,
        height: 3840,
        platform: 'print',
        category: '4k',
        basePriceUSD: 8.99,
        description: '3840x3840 | Premium | Cuadros/Canvas',
        icon: '🖼️'
    },
];

export const calculatePrice = (
    formatId: string,
    quantity: number = 1,
    applyDiscount: boolean = true
): { basePrice: number; discount: number; finalPrice: number; savingsText: string } => {
    const format = IMAGE_FORMATS.find(f => f.id === formatId);
    if (!format) {
        return { basePrice: 0, discount: 0, finalPrice: 0, savingsText: '' };
    }

    let basePrice = format.basePriceUSD * quantity;
    let discount = 0;
    let savingsText = '';

    // Descuentos por volumen
    if (applyDiscount && quantity > 1) {
        if (quantity >= 5) {
            discount = basePrice * 0.25; // 25% off
            savingsText = `¡Ahorras $${discount.toFixed(2)}!`;
        } else if (quantity >= 3) {
            discount = basePrice * 0.15; // 15% off
            savingsText = `¡Ahorras $${discount.toFixed(2)}!`;
        } else if (quantity === 2) {
            discount = basePrice * 0.10; // 10% off
            savingsText = `¡Ahorras $${discount.toFixed(2)}!`;
        }
    }

    const finalPrice = basePrice - discount;

    return {
        basePrice: parseFloat(basePrice.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        finalPrice: parseFloat(finalPrice.toFixed(2)),
        savingsText
    };
};

export const getFormatsByCategory = (category: 'social' | 'print' | '4k') => {
    return IMAGE_FORMATS.filter(f => f.category === category);
};

export const getRecommendedFormat = (deviceType: 'mobile' | 'desktop' | 'print'): AspectFormat | null => {
    const recommendations: Record<string, string> = {
        mobile: 'tiktok',
        desktop: 'facebook',
        print: '4k'
    };
    const formatId = recommendations[deviceType];
    return IMAGE_FORMATS.find(f => f.id === formatId) || null;
};

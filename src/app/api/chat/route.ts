import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { message, language, history } = await req.json();

        // Simple FAQ-based responses (no external API needed)
        const responses: Record<string, Record<string, string>> = {
            en: {
                price: "Our prices start at $9.99 for a single photo pack. We offer family packs, couple packs, and pet packs. Check our pricing page for details!",
                how: "Simply upload your photo, choose your Christmas style, and our AI will transform it into a magical Christmas portrait in seconds!",
                payment: "We accept all major credit cards, PayPal, and local payment methods like Mercado Pago for Latin America.",
                delivery: "Your photos are delivered instantly after payment! You'll receive high-resolution downloads immediately.",
                refund: "We offer a 100% satisfaction guarantee. If you're not happy with your photos, contact us within 24 hours for a full refund.",
                watermark: "All paid photos are delivered without watermarks in high resolution. Free previews include a small watermark.",
                quality: "We use state-of-the-art AI to generate ultra-realistic 4K quality Christmas photos that preserve your facial features perfectly.",
                default: "I'm here to help! You can ask me about pricing, how it works, payment methods, delivery time, or anything else about our Christmas photo service. 🎄"
            },
            es: {
                price: "Nuestros precios comienzan en $9.99 para un paquete de foto individual. Ofrecemos paquetes familiares, de parejas y de mascotas. ¡Consulta nuestra página de precios para más detalles!",
                how: "Simplemente sube tu foto, elige tu estilo navideño, y nuestra IA la transformará en un retrato navideño mágico en segundos!",
                payment: "Aceptamos todas las tarjetas de crédito principales, PayPal y métodos de pago locales como Mercado Pago para América Latina.",
                delivery: "¡Tus fotos se entregan instantáneamente después del pago! Recibirás descargas en alta resolución de inmediato.",
                refund: "Ofrecemos una garantía de satisfacción del 100%. Si no estás contento con tus fotos, contáctanos dentro de las 24 horas para un reembolso completo.",
                watermark: "Todas las fotos pagadas se entregan sin marca de agua en alta resolución. Las vistas previas gratuitas incluyen una pequeña marca de agua.",
                quality: "Usamos IA de última generación para generar fotos navideñas de calidad 4K ultra realistas que preservan perfectamente tus rasgos faciales.",
                default: "¡Estoy aquí para ayudarte! Puedes preguntarme sobre precios, cómo funciona, métodos de pago, tiempo de entrega o cualquier otra cosa sobre nuestro servicio de fotos navideñas. 🎄"
            }
        };

        const lang = language || 'en';
        const msg = message.toLowerCase();

        // Determine response based on keywords
        let responseKey = 'default';
        if (msg.includes('price') || msg.includes('cost') || msg.includes('precio') || msg.includes('costo')) {
            responseKey = 'price';
        } else if (msg.includes('how') || msg.includes('work') || msg.includes('cómo') || msg.includes('funciona')) {
            responseKey = 'how';
        } else if (msg.includes('pay') || msg.includes('payment') || msg.includes('pago') || msg.includes('tarjeta')) {
            responseKey = 'payment';
        } else if (msg.includes('delivery') || msg.includes('receive') || msg.includes('entrega') || msg.includes('recibir')) {
            responseKey = 'delivery';
        } else if (msg.includes('refund') || msg.includes('money back') || msg.includes('reembolso') || msg.includes('devolución')) {
            responseKey = 'refund';
        } else if (msg.includes('watermark') || msg.includes('marca de agua')) {
            responseKey = 'watermark';
        } else if (msg.includes('quality') || msg.includes('resolution') || msg.includes('calidad') || msg.includes('resolución')) {
            responseKey = 'quality';
        }

        const reply = responses[lang]?.[responseKey] || responses[lang]?.default || responses.en.default;

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Failed to process chat message' },
            { status: 500 }
        );
    }
}

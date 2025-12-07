export const faqData = {
    en: [
        { q: "How long does it take?", a: "Most photos are ready in less than 30 minutes! During high demand, it might take up to 2 hours." },
        { q: "Can I use photos with masks/sunglasses?", a: "For best results, please avoid sunglasses or heavy masks. We need to see your beautiful face!" },
        { q: "Is my payment secure?", a: "100%. We use Stripe and MercadoPago, the world's leading secure payment processors." },
        { q: "What if I don't like the results?", a: "We strive for magic! If there's a technical error, contact us at support@pic.christmas and we'll help." },
        { q: "Can I add my dog?", a: "Absolutely! We specialize in pets. Just select the 'Pets' option in the configuration." },
        // ... (We will expand this to 50 items dynamically in the AI backend or match logic)
    ],
    es: [
        { q: "¿Cuánto tiempo tarda?", a: "¡La mayoría de las fotos están listas en menos de 30 minutos! En alta demanda, hasta 2 horas." },
        { q: "¿Puedo usar gafas de sol?", a: "Para mejores resultados, evita gafas oscuras. ¡Necesitamos ver tu cara!" },
        { q: "¿Es seguro el pago?", a: "100%. Usamos Stripe y MercadoPago, líderes mundiales en seguridad." },
        { q: "¿Y si no me gustan las fotos?", a: "¡Buscamos magia! Si hay un error técnico, contáctanos." },
        { q: "¿Puedo incluir a mi perro?", a: "¡Claro! Somos expertos en mascotas. Elige la opción 'Mascotas'." },
    ]
    // ... maps for other languages using existing i18n keys if possible, or distinct arrays.
};

// "Smart Match" keywords (Simplified NLP for 0-latency local responses)
export const smartKeywords = {
    'time|duration|long|wait|tarda|tiempo': 0, // Maps to index 0
    'glasses|mask|sunglasses|gafas|lentes': 1,
    'secure|safety|stripe|payment|seguro|pago': 2,
    'refund|error|bad|quality|reembolso|calidad': 3,
    'dog|cat|pet|animal|perro|gato|mascota': 4
};

export const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ja", "ar", "hi", "ko", "tr", "nl", "vi"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const messages: Record<Locale, any> = {
    en: {
        title: "Christmas AI Studio",
        subtitle: "The World's #1 Open-Source Holiday Portraits",
        cta: "Create Your Holiday Photo",
        generate: "Generate Magic (8K)",
        uploadTitle: "1. Upload Your Reference",
        styleTitle: "2. Select Style Catalog",
        disclaimer: "Legal: All images are AI-generated. 100% Privacy. Deleted after 24h.",
        loginRequired: "Please Login to Generate",
        chat_welcome: "Hi! I'm Holly 🎄. How can I help you today?",
        charity_info: "3% of every generation goes to local animal shelters.",
        watermark_msg: "Preview mode. Download HD after verification."
    },
    es: {
        title: "Estudio AI Navideño",
        subtitle: "Los Retratos Navideños Open-Source #1 del Mundo",
        cta: "Crea tu Foto Navideña",
        generate: "Generar Magia (8K)",
        uploadTitle: "1. Sube tu Referencia",
        styleTitle: "2. Selecciona tu Estilo",
        disclaimer: "Aviso: Imágenes generadas por IA. Privacidad total. Se borran en 24h.",
        loginRequired: "Inicia Sesión para Generar",
        chat_welcome: "¡Hola! Soy Holly 🎄. ¿En qué puedo ayudarte?",
        charity_info: "El 3% de cada generación se dona a refugios de animales.",
        watermark_msg: "Modo vista previa. Descarga HD tras verificación."
    },
    // Adding more languages dynamically for the 15 requested...
    fr: { title: "Studio de Noël IA", subtitle: "Portraits de fêtes Open-Source n°1 au monde", chat_welcome: "Salut ! Je suis Holly 🎄." },
    de: { title: "Weihnachts-KI-Studio", subtitle: "Die weltweite Nr. 1 für Open-Source-Porträts", chat_welcome: "Hallo! Ich bin Holly 🎄." },
    it: { title: "Studio di Natale AI", subtitle: "I ritratti di Natale Open-Source n. 1 al mondo", chat_welcome: "Ciao! Sono Holly 🎄." },
    pt: { title: "Estúdio de Natal de IA", subtitle: "Retratos de Natal Open-Source nº 1 do mundo", chat_welcome: "Olá! Eu sou a Holly 🎄." },
    ru: { title: "Рождественская ИИ-студия", subtitle: "Рождественские портреты № 1 в мире", chat_welcome: "Привет! Я Холли 🎄." },
    zh: { title: "圣诞 AI 工作室", subtitle: "世界第一的开源节日肖像", chat_welcome: "你好！我是 Holly 🎄。" },
    ja: { title: "クリスマス AI スタジオ", subtitle: "世界No.1のオープンソース・クリスマスポートレート", chat_welcome: "こんにちは！ホリーです 🎄。" },
    ar: { title: "استوديو الكريسماس بالذكاء الاصطناعي", subtitle: "صور الكريسماس مفتوحة المصدر رقم 1 في العالم", chat_welcome: "أهلاً! أنا هولي 🎄." },
    hi: { title: "क्रिसमस एआई स्टूडियो", subtitle: "दुनिया का नंबर 1 ओपन-सोर्स हॉलिडे पोर्ट्रेट", chat_welcome: "नमस्ते! मैं होली हूं 🎄।" },
    ko: { title: "크리스마스 AI 스튜디오", subtitle: "세계 최고의 오픈 소스 명절 초상화", chat_welcome: "안녕하세요! 저는 홀리입니다 🎄." },
    tr: { title: "Noel AI Stüdyosu", subtitle: "Dünyanın 1 Numaralı Açık Kaynak Noel Portreleri", chat_welcome: "Selam! Ben Holly 🎄." },
    nl: { title: "Kerst AI Studio", subtitle: "Werelds nr. 1 open-source kerstportretten", chat_welcome: "Hoi! Ik ben Holly 🎄." },
    vi: { title: "Phòng thu Giáng sinh AI", subtitle: "Chân dung ngày lễ nguồn mở số 1 thế giới", chat_welcome: "Xin chào! Tôi là Holly 🎄." }
};

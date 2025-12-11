"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ViralExitModalProps {
    language: string;
}

const VIRAL_OFFERS = {
    en: {
        title: "🎁 Wait! Get a FREE Photo!",
        subtitle: "Before you go...",
        offer: "Share us with 10 friends OR post in 10 groups on Instagram/TikTok/Facebook and get 1 FREE EXTRA PHOTO!",
        instructions: [
            "📱 Share our link with 10 friends on WhatsApp/Telegram",
            "📢 OR post in 10 Facebook/Instagram groups",
            "📸 OR make 10 TikTok/Instagram stories mentioning us",
            "✅ Send us proof (screenshots) to verify"
        ],
        limit: "⚠️ This offer can only be claimed 2 times per user",
        cta: "🚀 I Want My Free Photo!",
        close: "No thanks, I'll pass",
        verifyText: "After sharing, contact us with proof to claim your free photo!"
    },
    es: {
        title: "🎁 ¡Espera! ¡Obtén una Foto GRATIS!",
        subtitle: "Antes de irte...",
        offer: "¡Compártenos con 10 amigos O publica en 10 grupos de Instagram/TikTok/Facebook y obtén 1 FOTO EXTRA GRATIS!",
        instructions: [
            "📱 Comparte nuestro link con 10 amigos en WhatsApp/Telegram",
            "📢 O publica en 10 grupos de Facebook/Instagram",
            "📸 O haz 10 historias de TikTok/Instagram mencionándonos",
            "✅ Envíanos pruebas (capturas) para verificar"
        ],
        limit: "⚠️ Esta oferta solo se puede reclamar 2 veces por usuario",
        cta: "🚀 ¡Quiero Mi Foto Gratis!",
        close: "No gracias, paso",
        verifyText: "¡Después de compartir, contáctanos con pruebas para reclamar tu foto gratis!"
    },
    fr: {
        title: "🎁 Attendez! Obtenez une Photo GRATUITE!",
        subtitle: "Avant de partir...",
        offer: "Partagez-nous avec 10 amis OU publiez dans 10 groupes Instagram/TikTok/Facebook et obtenez 1 PHOTO EXTRA GRATUITE!",
        instructions: [
            "📱 Partagez notre lien avec 10 amis sur WhatsApp/Telegram",
            "📢 OU publiez dans 10 groupes Facebook/Instagram",
            "📸 OU faites 10 stories TikTok/Instagram en nous mentionnant",
            "✅ Envoyez-nous des preuves (captures d'écran) pour vérifier"
        ],
        limit: "⚠️ Cette offre ne peut être réclamée que 2 fois par utilisateur",
        cta: "🚀 Je Veux Ma Photo Gratuite!",
        close: "Non merci, je passe",
        verifyText: "Après le partage, contactez-nous avec des preuves pour réclamer votre photo gratuite!"
    },
    de: {
        title: "🎁 Warten Sie! Holen Sie sich ein KOSTENLOSES Foto!",
        subtitle: "Bevor Sie gehen...",
        offer: "Teilen Sie uns mit 10 Freunden ODER posten Sie in 10 Instagram/TikTok/Facebook-Gruppen und erhalten Sie 1 EXTRA FOTO KOSTENLOS!",
        instructions: [
            "📱 Teilen Sie unseren Link mit 10 Freunden auf WhatsApp/Telegram",
            "📢 ODER posten Sie in 10 Facebook/Instagram-Gruppen",
            "📸 ODER machen Sie 10 TikTok/Instagram-Stories und erwähnen Sie uns",
            "✅ Senden Sie uns Beweise (Screenshots) zur Überprüfung"
        ],
        limit: "⚠️ Dieses Angebot kann nur 2 Mal pro Benutzer eingelöst werden",
        cta: "🚀 Ich Will Mein Gratis-Foto!",
        close: "Nein danke, ich verzichte",
        verifyText: "Kontaktieren Sie uns nach dem Teilen mit Beweisen, um Ihr kostenloses Foto zu beanspruchen!"
    },
    it: {
        title: "🎁 Aspetta! Ottieni una Foto GRATIS!",
        subtitle: "Prima di andare...",
        offer: "Condividici con 10 amici O posta in 10 gruppi Instagram/TikTok/Facebook e ottieni 1 FOTO EXTRA GRATIS!",
        instructions: [
            "📱 Condividi il nostro link con 10 amici su WhatsApp/Telegram",
            "📢 O posta in 10 gruppi Facebook/Instagram",
            "📸 O fai 10 storie TikTok/Instagram menzionandoci",
            "✅ Inviaci prove (screenshot) per verificare"
        ],
        limit: "⚠️ Questa offerta può essere richiesta solo 2 volte per utente",
        cta: "🚀 Voglio La Mia Foto Gratis!",
        close: "No grazie, passo",
        verifyText: "Dopo aver condiviso, contattaci con le prove per richiedere la tua foto gratuita!"
    },
    pt: {
        title: "🎁 Espere! Ganhe uma Foto GRÁTIS!",
        subtitle: "Antes de ir...",
        offer: "Compartilhe-nos com 10 amigos OU poste em 10 grupos do Instagram/TikTok/Facebook e ganhe 1 FOTO EXTRA GRÁTIS!",
        instructions: [
            "📱 Compartilhe nosso link com 10 amigos no WhatsApp/Telegram",
            "📢 OU poste em 10 grupos do Facebook/Instagram",
            "📸 OU faça 10 stories no TikTok/Instagram nos mencionando",
            "✅ Envie-nos provas (capturas de tela) para verificar"
        ],
        limit: "⚠️ Esta oferta só pode ser reivindicada 2 vezes por usuário",
        cta: "🚀 Quero Minha Foto Grátis!",
        close: "Não obrigado, vou passar",
        verifyText: "Após compartilhar, entre em contato conosco com provas para reivindicar sua foto grátis!"
    },
    ru: {
        title: "🎁 Подождите! Получите БЕСПЛАТНОЕ Фото!",
        subtitle: "Перед уходом...",
        offer: "Поделитесь нами с 10 друзьями ИЛИ опубликуйте в 10 группах Instagram/TikTok/Facebook и получите 1 ДОПОЛНИТЕЛЬНОЕ ФОТО БЕСПЛАТНО!",
        instructions: [
            "📱 Поделитесь нашей ссылкой с 10 друзьями в WhatsApp/Telegram",
            "📢 ИЛИ опубликуйте в 10 группах Facebook/Instagram",
            "📸 ИЛИ сделайте 10 историй TikTok/Instagram, упомянув нас",
            "✅ Отправьте нам доказательства (скриншоты) для проверки"
        ],
        limit: "⚠️ Это предложение можно использовать только 2 раза на пользователя",
        cta: "🚀 Хочу Бесплатное Фото!",
        close: "Нет спасибо, пропущу",
        verifyText: "После публикации свяжитесь с нами с доказательствами, чтобы получить бесплатное фото!"
    },
    zh: {
        title: "🎁 等等！获取免费照片！",
        subtitle: "在您离开之前...",
        offer: "与10位朋友分享我们，或在Instagram/TikTok/Facebook的10个群组中发布，即可获得1张额外免费照片！",
        instructions: [
            "📱 在WhatsApp/Telegram上与10位朋友分享我们的链接",
            "📢 或在10个Facebook/Instagram群组中发布",
            "📸 或制作10个TikTok/Instagram故事提及我们",
            "✅ 向我们发送证明（截图）以验证"
        ],
        limit: "⚠️ 此优惠每位用户只能领取2次",
        cta: "🚀 我要免费照片！",
        close: "不用了，谢谢",
        verifyText: "分享后，请联系我们并提供证明以领取免费照片！"
    },
    ja: {
        title: "🎁 待って！無料写真をゲット！",
        subtitle: "行く前に...",
        offer: "10人の友達とシェアするか、Instagram/TikTok/Facebookの10グループに投稿して、1枚の追加無料写真をゲット！",
        instructions: [
            "📱 WhatsApp/Telegramで10人の友達とリンクをシェア",
            "📢 またはFacebook/Instagramの10グループに投稿",
            "📸 またはTikTok/Instagramで私たちに言及する10のストーリーを作成",
            "✅ 確認のため証明（スクリーンショット）を送信"
        ],
        limit: "⚠️ このオファーはユーザーごとに2回のみ請求できます",
        cta: "🚀 無料写真が欲しい！",
        close: "いいえ、結構です",
        verifyText: "シェア後、証明を添えてご連絡いただき、無料写真を請求してください！"
    },
    ar: {
        title: "🎁 انتظر! احصل على صورة مجانية!",
        subtitle: "قبل أن تذهب...",
        offer: "شاركنا مع 10 أصدقاء أو انشر في 10 مجموعات على Instagram/TikTok/Facebook واحصل على صورة إضافية مجانية!",
        instructions: [
            "📱 شارك رابطنا مع 10 أصدقاء على WhatsApp/Telegram",
            "📢 أو انشر في 10 مجموعات Facebook/Instagram",
            "📸 أو اصنع 10 قصص TikTok/Instagram تذكرنا",
            "✅ أرسل لنا إثباتات (لقطات شاشة) للتحقق"
        ],
        limit: "⚠️ يمكن المطالبة بهذا العرض مرتين فقط لكل مستخدم",
        cta: "🚀 أريد صورتي المجانية!",
        close: "لا شكراً، سأمرر",
        verifyText: "بعد المشاركة، اتصل بنا مع الإثباتات للمطالبة بصورتك المجانية!"
    }
};

export const ViralExitModal: React.FC<ViralExitModalProps> = ({ language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [timesShown, setTimesShown] = useState(0);
    const [hasAccepted, setHasAccepted] = useState(false);

    const content = VIRAL_OFFERS[language as keyof typeof VIRAL_OFFERS] || VIRAL_OFFERS.en;

    useEffect(() => {
        // Load times shown from localStorage
        const stored = localStorage.getItem('viralExitShown');
        const count = stored ? parseInt(stored) : 0;
        setTimesShown(count);

        // Only show if less than 2 times
        if (count >= 2) return;

        const handleMouseLeave = (e: MouseEvent) => {
            // Detect mouse leaving from top of page
            if (e.clientY <= 0 && !hasAccepted) {
                setIsOpen(true);
            }
        };

        // Add event listener after 5 seconds (to avoid immediate trigger)
        const timer = setTimeout(() => {
            document.addEventListener('mouseleave', handleMouseLeave);
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hasAccepted]);

    const handleAccept = () => {
        setHasAccepted(true);
        const newCount = timesShown + 1;
        setTimesShown(newCount);
        localStorage.setItem('viralExitShown', newCount.toString());

        // Open WhatsApp/social sharing
        const shareText = encodeURIComponent(`🎄 Check out pic.christmas - Amazing AI Christmas photos! ${window.location.origin}`);
        window.open(`https://wa.me/?text=${shareText}`, '_blank');

        setIsOpen(false);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    // Don't show if already shown 2 times
    if (timesShown >= 2) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 50, opacity: 0 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="relative max-w-lg w-full bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 rounded-3xl shadow-2xl border-2 border-yellow-400 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-pink-400/10 to-purple-400/10 animate-pulse"></div>

                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-all"
                        >
                            ✕
                        </button>

                        {/* Content */}
                        <div className="relative p-8 text-center">
                            {/* Title */}
                            <motion.h2
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-2"
                            >
                                {content.title}
                            </motion.h2>

                            <p className="text-pink-200 text-sm mb-6">{content.subtitle}</p>

                            {/* Offer */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-yellow-400/30">
                                <p className="text-white text-lg font-bold mb-4">
                                    {content.offer}
                                </p>

                                {/* Instructions */}
                                <div className="space-y-2 text-left">
                                    {content.instructions.map((instruction, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <span className="text-yellow-400 text-sm">
                                                {instruction}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Limit warning */}
                            <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-3 mb-6">
                                <p className="text-yellow-200 text-xs font-semibold">
                                    {content.limit}
                                </p>
                                <p className="text-yellow-300 text-xs mt-1">
                                    {timesShown === 0 ? "First time" : "Last chance!"} ({2 - timesShown} remaining)
                                </p>
                            </div>

                            {/* Verify text */}
                            <p className="text-pink-200 text-xs mb-6">
                                {content.verifyText}
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAccept}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500 text-white font-black text-lg rounded-xl shadow-lg shadow-pink-500/50 transition-all"
                                >
                                    {content.cta}
                                </motion.button>

                                <button
                                    onClick={handleClose}
                                    className="text-white/60 hover:text-white text-sm transition-all"
                                >
                                    {content.close}
                                </button>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl"></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

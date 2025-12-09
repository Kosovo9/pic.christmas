// components/ExitBanner.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

export default function ExitBanner() {
    const { language } = useI18n();
    const [visible, setVisible] = useState(false);

    // Show when mouse leaves window (exit intent)
    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0) {
                setVisible(true);
            }
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, []);

    if (!visible) return null;

    const messages = {
        es: { title: '⚠️ ¿Descargaste tus fotos?', body: 'Tus fotos se borrarán PERMANENTEMENTE en 24 horas por seguridad. No guardamos copias. ¿Seguro que las tienes?' },
        en: { title: '⚠️ Did you download your photos?', body: 'Your photos will be PERMANENTLY deleted in 24 hours for security. We keep no copies. Are you sure you have them?' },
        fr: { title: '⚠️ Avez-vous téléchargé vos photos ?', body: 'Vos photos seront SUPPRIMÉES définitivement dans 24 heures. Nous ne gardons aucune copie.' },
        de: { title: '⚠️ Haben Sie Ihre Fotos heruntergeladen?', body: 'Ihre Fotos werden aus Sicherheitsgründen in 24 Stunden dauerhaft gelöscht.' },
        it: { title: '⚠️ Hai scaricato le tue foto?', body: 'Le tue foto verranno eliminate DEFINITIVAMENTE tra 24 ore per sicurezza.' },
        pt: { title: '⚠️ Você baixou suas fotos?', body: 'Suas fotos serão EXCLUÍDAS permanentemente em 24 horas por segurança.' },
        ru: { title: '⚠️ Вы скачали фото?', body: 'Ваши фото будут удалены через 24 часа в целях безопасности.' },
        zh: { title: '⚠️ 您下载照片了吗？', body: '为了安全起见，您的照片将在24小时后永久删除。' },
        ja: { title: '⚠️ 写真をダウンロードしましたか？', body: 'セキュリティのため、写真は24時間後に完全に削除されます。' },
        ar: { title: '⚠️ هل قمت بتنزيل صورك؟', body: 'سيتم حذف صورك نهائيًا خلال 24 ساعة للأمان.' },
    };

    const text = messages[language as keyof typeof messages] || messages.en;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-lg w-full p-8 text-center shadow-2xl shadow-red-900/20 relative">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                    🛡️
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{text.title}</h2>
                <p className="text-slate-300 mb-8 leading-relaxed">
                    {text.body}
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => setVisible(false)}
                        className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all"
                    >
                        Ok, Volver a Descargar
                    </button>
                    <button
                        onClick={() => setVisible(false)}
                        className="px-6 py-3 border border-slate-600 text-slate-400 hover:text-white rounded-xl transition-all"
                    >
                        Ya las tengo
                    </button>
                </div>
            </div>
        </div>
    );
}

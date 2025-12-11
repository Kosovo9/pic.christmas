"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DisclaimerModalProps {
    isOpen: boolean;
    onAccept: () => void;
    onReject: () => void;
    language: string;
}

const DISCLAIMERS = {
    en: {
        title: "Important Legal Notice",
        subtitle: "Please read carefully before uploading",
        points: [
            "Prohibited Content: Pornography, nudity, racism, hate speech, violence, or any illegal content is strictly forbidden.",
            "Photo Ownership: You certify that you own all rights to the photos you upload or have explicit permission from the subjects.",
            "No Liability: We are NOT responsible for the photos you upload or the generated images. You assume full responsibility for their use.",
            "Legal Compliance: Any violation will result in immediate service denial without refund.",
            "Age Requirement: You must be 18+ or have parental consent to use this service."
        ],
        warning: "By clicking 'I Accept', you agree to these terms and confirm you will not upload inappropriate content.",
        accept: "I Accept - Continue",
        reject: "I Do Not Accept - Go Back",
        footer: "Violation of these terms may result in legal action."
    },
    es: {
        title: "Aviso Legal Importante",
        subtitle: "Por favor lee cuidadosamente antes de subir",
        points: [
            "Contenido Prohibido: Pornografia, desnudos, racismo, discurso de odio, violencia o cualquier contenido ilegal esta estrictamente prohibido.",
            "Propiedad de Fotos: Certificas que eres dueno de todos los derechos de las fotos que subes o tienes permiso explicito de los sujetos.",
            "Sin Responsabilidad: NO somos responsables de las fotos que subes ni de las imagenes generadas. Asumes toda la responsabilidad de su uso.",
            "Cumplimiento Legal: Cualquier violacion resultara en negacion inmediata del servicio sin reembolso.",
            "Requisito de Edad: Debes tener 18+ anos o consentimiento parental para usar este servicio."
        ],
        warning: "Al hacer clic en 'Acepto', aceptas estos terminos y confirmas que no subiras contenido inapropiado.",
        accept: "Acepto - Continuar",
        reject: "No Acepto - Regresar",
        footer: "La violacion de estos terminos puede resultar en acciones legales."
    },
    fr: {
        title: "Avis Legal Important",
        subtitle: "Veuillez lire attentivement avant de telecharger",
        points: [
            "Contenu Interdit: Pornographie, nudite, racisme, discours haineux, violence ou tout contenu illegal est strictement interdit.",
            "Propriete des Photos: Vous certifiez que vous possedez tous les droits sur les photos que vous telechargez ou avez la permission explicite des sujets.",
            "Aucune Responsabilite: Nous ne sommes PAS responsables des photos que vous telechargez ni des images generees. Vous assumez l'entiere responsabilite de leur utilisation.",
            "Conformite Legale: Toute violation entrainera un refus immediat du service sans remboursement.",
            "Exigence d'Age: Vous devez avoir 18 ans ou plus ou le consentement parental pour utiliser ce service."
        ],
        warning: "En cliquant sur 'J'accepte', vous acceptez ces conditions et confirmez que vous ne telechargerez pas de contenu inapproprie.",
        accept: "J'accepte - Continuer",
        reject: "Je n'accepte pas - Retour",
        footer: "La violation de ces conditions peut entrainer des poursuites judiciaires."
    },
    de: {
        title: "Wichtiger Rechtlicher Hinweis",
        subtitle: "Bitte sorgfaltig lesen vor dem Hochladen",
        points: [
            "Verbotene Inhalte: Pornografie, Nacktheit, Rassismus, Hassrede, Gewalt oder illegale Inhalte sind streng verboten.",
            "Foto-Eigentum: Sie bestatigen, dass Sie alle Rechte an den hochgeladenen Fotos besitzen oder ausdruckliche Erlaubnis haben.",
            "Keine Haftung: Wir sind NICHT verantwortlich fur Ihre hochgeladenen Fotos oder generierten Bilder. Sie ubernehmen die volle Verantwortung.",
            "Rechtliche Einhaltung: Jeder Verstoss fuhrt zur sofortigen Dienstverweigerung ohne Ruckerstattung.",
            "Altersanforderung: Sie mussen 18+ sein oder elterliche Zustimmung haben."
        ],
        warning: "Durch Klicken auf 'Ich akzeptiere' stimmen Sie diesen Bedingungen zu und bestatigen, dass Sie keine unangemessenen Inhalte hochladen werden.",
        accept: "Ich akzeptiere - Weiter",
        reject: "Ich akzeptiere nicht - Zuruck",
        footer: "Verstosse gegen diese Bedingungen konnen rechtliche Schritte nach sich ziehen."
    },
    it: {
        title: "Avviso Legale Importante",
        subtitle: "Si prega di leggere attentamente prima di caricare",
        points: [
            "Contenuto Vietato: Pornografia, nudita, razzismo, incitamento all'odio, violenza o contenuti illegali sono severamente vietati.",
            "Proprieta delle Foto: Certifichi di possedere tutti i diritti sulle foto caricate o di avere il permesso esplicito dei soggetti.",
            "Nessuna Responsabilita: NON siamo responsabili delle foto caricate o delle immagini generate. Ti assumi la piena responsabilita del loro uso.",
            "Conformita Legale: Qualsiasi violazione comportera il rifiuto immediato del servizio senza rimborso.",
            "Requisito di Eta: Devi avere 18+ anni o il consenso dei genitori per utilizzare questo servizio."
        ],
        warning: "Cliccando su 'Accetto', accetti questi termini e confermi che non caricherai contenuti inappropriati.",
        accept: "Accetto - Continua",
        reject: "Non Accetto - Indietro",
        footer: "La violazione di questi termini puo comportare azioni legali."
    },
    pt: {
        title: "Aviso Legal Importante",
        subtitle: "Por favor, leia cuidadosamente antes de enviar",
        points: [
            "Conteudo Proibido: Pornografia, nudez, racismo, discurso de odio, violencia ou qualquer conteudo ilegal e estritamente proibido.",
            "Propriedade das Fotos: Voce certifica que possui todos os direitos sobre as fotos enviadas ou tem permissao explicita dos sujeitos.",
            "Sem Responsabilidade: NAO somos responsaveis pelas fotos que voce envia ou pelas imagens geradas. Voce assume total responsabilidade pelo uso delas.",
            "Conformidade Legal: Qualquer violacao resultara em negacao imediata do servico sem reembolso.",
            "Requisito de Idade: Voce deve ter 18+ anos ou consentimento dos pais para usar este servico."
        ],
        warning: "Ao clicar em 'Aceito', voce concorda com estes termos e confirma que nao enviara conteudo inapropriado.",
        accept: "Aceito - Continuar",
        reject: "Nao Aceito - Voltar",
        footer: "A violacao destes termos pode resultar em acao legal."
    },
    ru: {
        title: "Important Legal Notice",
        subtitle: "Please read carefully",
        points: [
            "Prohibited Content: No illegal content allowed.",
            "Photo Ownership: You own the photos or have permission.",
            "No Liability: We are not responsible for your content.",
            "Legal Compliance: Violations result in service denial.",
            "Age Requirement: Must be 18+ or have parental consent."
        ],
        warning: "By clicking 'I Accept', you agree to these terms.",
        accept: "I Accept",
        reject: "I Do Not Accept",
        footer: "Violation may result in legal action."
    },
    zh: {
        title: "Important Legal Notice",
        subtitle: "Please read carefully",
        points: [
            "Prohibited Content: No illegal content allowed.",
            "Photo Ownership: You own the photos or have permission.",
            "No Liability: We are not responsible for your content.",
            "Legal Compliance: Violations result in service denial.",
            "Age Requirement: Must be 18+ or have parental consent."
        ],
        warning: "By clicking 'I Accept', you agree to these terms.",
        accept: "I Accept",
        reject: "I Do Not Accept",
        footer: "Violation may result in legal action."
    },
    ja: {
        title: "Important Legal Notice",
        subtitle: "Please read carefully",
        points: [
            "Prohibited Content: No illegal content allowed.",
            "Photo Ownership: You own the photos or have permission.",
            "No Liability: We are not responsible for your content.",
            "Legal Compliance: Violations result in service denial.",
            "Age Requirement: Must be 18+ or have parental consent."
        ],
        warning: "By clicking 'I Accept', you agree to these terms.",
        accept: "I Accept",
        reject: "I Do Not Accept",
        footer: "Violation may result in legal action."
    },
    ar: {
        title: "Important Legal Notice",
        subtitle: "Please read carefully",
        points: [
            "Prohibited Content: No illegal content allowed.",
            "Photo Ownership: You own the photos or have permission.",
            "No Liability: We are not responsible for your content.",
            "Legal Compliance: Violations result in service denial.",
            "Age Requirement: Must be 18+ or have parental consent."
        ],
        warning: "By clicking 'I Accept', you agree to these terms.",
        accept: "I Accept",
        reject: "I Do Not Accept",
        footer: "Violation may result in legal action."
    }
};

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
    isOpen,
    onAccept,
    onReject,
    language
}) => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const content = DISCLAIMERS[language as keyof typeof DISCLAIMERS] || DISCLAIMERS.en;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const isScrolledToBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
        if (isScrolledToBottom && !hasScrolled) {
            setHasScrolled(true);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onReject();
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative max-w-2xl w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-red-500/50 overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-center">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {content.title}
                            </h2>
                            <p className="text-red-100 text-sm">
                                {content.subtitle}
                            </p>
                        </div>

                        <div
                            className="p-6 max-h-[60vh] overflow-y-auto space-y-4"
                            onScroll={handleScroll}
                        >
                            {content.points.map((point, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
                                >
                                    <p className="text-white text-sm leading-relaxed">
                                        {point}
                                    </p>
                                </div>
                            ))}

                            <div className="bg-yellow-900/30 border-2 border-yellow-500 rounded-lg p-4 mt-6">
                                <p className="text-yellow-200 text-sm font-semibold">
                                    {content.warning}
                                </p>
                            </div>

                            <div className="text-center text-xs text-red-300 mt-4">
                                {content.footer}
                            </div>
                        </div>

                        <div className="p-6 bg-slate-900/50 flex gap-4">
                            <button
                                onClick={onReject}
                                className="flex-1 px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all"
                            >
                                {content.reject}
                            </button>
                            <button
                                onClick={onAccept}
                                disabled={!hasScrolled}
                                className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${hasScrolled
                                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/50'
                                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                {content.accept}
                            </button>
                        </div>

                        {!hasScrolled && (
                            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-yellow-400 text-sm animate-bounce">
                                Scroll to continue
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

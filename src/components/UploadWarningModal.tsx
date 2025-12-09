'use client';

import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';

interface UploadWarningModalProps {
    onAccept: () => void;
    onCancel: () => void;
}

export function UploadWarningModal({ onAccept, onCancel }: UploadWarningModalProps) {
    const [agreed, setAgreed] = useState(false);
    const { t, language } = useI18n();

    const warnings = {
        es: {
            title: '⚠️ Responsabilidad de Contenido',
            intro: 'Antes de continuar, lee y acepta nuestras políticas de contenido:',
            rules: [
                '❌ NO se permite pornografía o contenido sexual explícito',
                '❌ NO se permite racismo, discriminación o discurso de odio',
                '❌ NO se permite violencia gráfica o contenido perturbador',
                '❌ NO se permite contenido que involucre menores de manera inapropiada',
                '❌ NO se permite contenido que viole derechos de autor',
            ],
            consequences: 'La violación de estas políticas resultará en:',
            consequenceList: [
                '🚫 Bloqueo inmediato y permanente de tu cuenta',
                '💸 Sin reembolso de pagos realizados',
                '⚖️ Posible acción legal según las leyes aplicables',
            ],
            checkbox: 'Certifico que soy dueño de las fotos, acepto los términos y asumo total responsabilidad por el contenido que subo y genero.',
            cancel: 'Cancelar',
            accept: 'Acepto y Continúo',
        },
        en: {
            title: '⚠️ Content Responsibility',
            intro: 'Before continuing, read and accept our content policies:',
            rules: [
                '❌ NO pornography or sexually explicit content',
                '❌ NO racism, discrimination or hate speech',
                '❌ NO graphic violence or disturbing content',
                '❌ NO content involving minors inappropriately',
                '❌ NO copyright-infringing content',
            ],
            consequences: 'Violation of these policies will result in:',
            consequenceList: [
                '🚫 Immediate and permanent account ban',
                '💸 No refund of payments made',
                '⚖️ Possible legal action under applicable laws',
            ],
            checkbox: 'I certify I own the rights to these photos, accept the terms, and assume full responsibility for the content I upload and generate.',
            cancel: 'Cancel',
            accept: 'I Accept & Continue',
        },
    };

    const content = warnings[language as keyof typeof warnings] || warnings.en;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div
                className="bg-slate-900 border-2 border-red-500/50 rounded-2xl w-full max-w-lg p-6 shadow-2xl shadow-red-500/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🛡️</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{content.title}</h2>
                </div>

                {/* Intro */}
                <p className="text-slate-300 mb-4">{content.intro}</p>

                {/* Rules */}
                <div className="bg-red-950/50 border border-red-500/30 rounded-xl p-4 mb-4">
                    <ul className="space-y-2">
                        {content.rules.map((rule, idx) => (
                            <li key={idx} className="text-red-200 text-sm flex items-start gap-2">
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Consequences */}
                <p className="text-slate-400 text-sm mb-2 font-semibold">{content.consequences}</p>
                <ul className="mb-6 space-y-1">
                    {content.consequenceList.map((item, idx) => (
                        <li key={idx} className="text-slate-400 text-sm">{item}</li>
                    ))}
                </ul>

                {/* Checkbox */}
                <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                        {content.checkbox}
                    </span>
                </label>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-medium"
                    >
                        {content.cancel}
                    </button>
                    <button
                        onClick={onAccept}
                        disabled={!agreed}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        {content.accept} ✓
                    </button>
                </div>
            </div>
        </div>
    );
}

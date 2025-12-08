
"use client";

import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface OxxoPaymentUIProps {
    orderId: string;
    amount: number;
    reference: string;
    expiresAt: string;
}

export const OxxoPaymentUI: React.FC<OxxoPaymentUIProps> = ({
    orderId,
    amount,
    reference,
    expiresAt,
}) => {
    const [timeRemaining, setTimeRemaining] = useState<string>('');

    useEffect(() => {
        // Calculate time remaining
        const interval = setInterval(() => {
            const now = new Date();
            const expires = new Date(expiresAt);
            const diff = expires.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeRemaining('Expirado');
                clearInterval(interval);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);

    return (
        <div className="oxxo-payment-ui max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <span className="text-4xl">🏪</span>
                    <div>
                        <h2 className="text-2xl font-bold">Pago en OXXO</h2>
                        <p className="text-slate-500">Válido hasta: {timeRemaining}</p>
                    </div>
                </div>
            </div>

            {/* Amount */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-slate-500 text-sm mb-1">Monto a pagar</p>
                <p className="text-4xl font-bold text-blue-600">${amount.toFixed(2)} MXN</p>
            </div>

            {/* Reference Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-slate-500 text-sm mb-2">Número de Referencia</p>
                    <div className="flex items-center gap-2">
                        <code className="text-2xl font-mono font-bold text-slate-900 break-all">
                            {reference}
                        </code>
                        <button
                            onClick={() => navigator.clipboard.writeText(reference)}
                            className="p-2 hover:bg-slate-200 rounded transition"
                            title="Copiar"
                        >
                            📋
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Copia este número para el pago</p>
                </div>

                {/* QR Code */}
                <div className="bg-slate-50 rounded-lg p-6 flex flex-col items-center justify-center">
                    <p className="text-slate-500 text-sm mb-3">Código QR (opcional)</p>
                    <div className="bg-white p-2 rounded shadow-sm">
                        <QRCodeCanvas value={reference} size={150} />
                    </div>
                </div>
            </div>

            {/* Step-by-step Instructions */}
            <div className="space-y-4 mb-6">
                <h3 className="text-lg font-bold">Pasos para pagar en OXXO</h3>
                <ul className="space-y-3">
                    <li className="flex gap-3">
                        <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                        <span>Ve a cualquier OXXO y pide pagar un servicio.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                        <span>Dicta el número de referencia: <strong>{reference}</strong></span>
                    </li>
                    <li className="flex gap-3">
                        <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                        <span>Realiza el pago en efectivo. ¡Listo!</span>
                    </li>
                </ul>
            </div>

            {/* Support */}
            <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
                <p>¿Necesitas ayuda? 📧 support@pic.christmas</p>
            </div>
        </div>
    );
};


"use client";

import React, { useEffect, useState } from 'react';

interface BankTransferUIProps {
    orderId: string;
    amount: number;
    bankDetails: any;
    conceptOfPayment: string;
    expiresAt: string;
    country: 'MX' | 'AR' | 'CO';
}

export const BankTransferUI: React.FC<BankTransferUIProps> = ({
    orderId,
    amount,
    bankDetails,
    conceptOfPayment,
    expiresAt,
    country,
}) => {
    const [timeRemaining, setTimeRemaining] = useState<string>('');

    useEffect(() => {
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

    const getCurrencySymbol = () => '$'; // Simplified

    return (
        <div className="bank-transfer-ui max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg text-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <span className="text-4xl">🏦</span>
                    <div>
                        <h2 className="text-2xl font-bold">Transferencia Bancaria</h2>
                        <p className="text-slate-500">Válida hasta: {timeRemaining}</p>
                    </div>
                </div>
            </div>

            {/* Amount */}
            <div className="bg-green-50 rounded-lg p-6 mb-6">
                <p className="text-slate-500 text-sm mb-1">Monto a transferir</p>
                <p className="text-4xl font-bold text-green-600">
                    {getCurrencySymbol()}{amount.toFixed(2)}
                </p>
            </div>

            {/* Bank Details Card */}
            <div className="bg-slate-50 rounded-lg p-6 mb-6 border-l-4 border-green-500">
                <h3 className="font-bold text-lg mb-4">Datos bancarios</h3>

                <div className="space-y-4">
                    <div>
                        <p className="text-slate-500 text-sm">Banco</p>
                        <p className="text-lg font-semibold">{bankDetails.bankName}</p>
                    </div>

                    <div>
                        <p className="text-slate-500 text-sm">Titular</p>
                        <p className="text-lg font-semibold">{bankDetails.accountHolder}</p>
                    </div>

                    <div>
                        <p className="text-slate-500 text-sm">Número de Cuenta / CLABE / CBU</p>
                        <div className="flex items-center gap-2 mt-1">
                            <code className="text-lg font-mono font-bold bg-white p-2 rounded border flex-1">
                                {bankDetails.accountNumber || bankDetails.clabe || bankDetails.cbu}
                            </code>
                            <button
                                onClick={() => navigator.clipboard.writeText(bankDetails.accountNumber || bankDetails.clabe || bankDetails.cbu)}
                                className="p-2 hover:bg-slate-200 rounded"
                            >
                                📋
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-slate-500 text-sm">Concepto de pago (Requerido)</p>
                        <div className="flex items-center gap-2 mt-1">
                            <code className="text-lg font-mono font-bold bg-white p-2 rounded border flex-1">
                                {conceptOfPayment}
                            </code>
                            <button
                                onClick={() => navigator.clipboard.writeText(conceptOfPayment)}
                                className="p-2 hover:bg-slate-200 rounded"
                                title="Copiar"
                            >
                                📋
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support */}
            <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
                <p>¿Necesitas ayuda? 📧 support@pic.christmas</p>
            </div>
        </div>
    );
};

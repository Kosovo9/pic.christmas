
"use client";

import React, { useState } from "react";

interface PaymentMethodSelectorProps {
    orderId: string;
    amount: number;
    onPaymentMethodSelected: (method: string) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
    orderId,
    amount,
    onPaymentMethodSelected,
}) => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const paymentMethods = [
        {
            id: "credit_debit",
            name: "Credit/Debit Card",
            icon: "💳",
            description: "Visa, Mastercard, Amex via Stripe/MercadoPago",
        },
        {
            id: "paypal",
            name: "PayPal",
            icon: "🅿️",
            description: "Pay securely with your PayPal account",
        },
        {
            id: "oxxo",
            name: "OXXO (México)",
            icon: "🏪",
            description: "Paga en efectivo en cualquier OXXO",
        },
        {
            id: "bank_transfer",
            name: "Transferencia Bancaria",
            icon: "🏦",
            description: "SPEI (Mexico), CBU (Argentina), PSE (Colombia)",
        },
        {
            id: "lemon_squeezy",
            name: "Lemon Squeezy",
            icon: "🍋",
            description: "Global payments (Tax compliant)",
        }
    ];

    const handleSelect = (id: string) => {
        setSelectedMethod(id);
        onPaymentMethodSelected(id);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => handleSelect(method.id)}
                        className={`flex items-start p-4 rounded-xl border transition-all text-left ${selectedMethod === method.id
                                ? "bg-blue-600/20 border-blue-500 ring-1 ring-blue-500"
                                : "bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800"
                            }`}
                    >
                        <span className="text-3xl mr-4">{method.icon}</span>
                        <div>
                            <p className="font-bold text-white">{method.name}</p>
                            <p className="text-sm text-slate-400">{method.description}</p>
                        </div>
                        {selectedMethod === method.id && (
                            <div className="ml-auto text-blue-400 font-bold">✓</div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

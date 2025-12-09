// components/PaymentMethods.tsx
'use client';

import React from 'react';

export const PaymentMethods = () => {
    return (
        <div className="flex flex-col gap-4 mt-6">
            <p className="text-slate-400 text-sm font-medium text-center uppercase tracking-widest">
                Pagos Seguros Vía
            </p>
            <div className="flex justify-center items-center gap-4">
                {/* Stripe */}
                <button
                    onClick={() => alert("Stripe payment integration active via Checkout")}
                    className="bg-white hover:bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-12 flex items-center justify-center w-24 grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
                    title="Pagar con Stripe"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                        alt="Stripe"
                        className="h-6 w-auto"
                    />
                </button>

                {/* PayPal */}
                <button
                    onClick={() => alert("PayPal integration coming soon")}
                    className="bg-white hover:bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-12 flex items-center justify-center w-24 grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
                    title="Pagar con PayPal"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                        alt="PayPal"
                        className="h-5 w-auto"
                    />
                </button>

                {/* Mercado Pago */}
                <button
                    onClick={() => alert("MercadoPago integration active")}
                    className="bg-white hover:bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-12 flex items-center justify-center w-24 grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
                    title="Pagar con MercadoPago"
                >
                    <img
                        src="/payment_mercadopago.png"
                        alt="MercadoPago"
                        className="h-8 w-auto object-contain"
                    />
                </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <span>🔒 SSL Encrypted</span>
                <span>•</span>
                <span>PCI DSS Compliant</span>
            </div>
        </div>
    );
};

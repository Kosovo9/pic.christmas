// components/SystemStatus.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface SystemStatusData {
    killSwitchActive: boolean;
    timeRemaining: string;
    currentSpend: number;
    spendLimit: number;
    spendPercentage: number;
    rateLimitInfo: string;
}

export const SystemStatus: React.FC = () => {
    const [status, setStatus] = useState<SystemStatusData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch('/api/generate', { method: 'GET' });
                const data = await response.json();
                // Since the GET /api/generate might return the entire status object or an error
                if (data.killSwitchActive !== undefined) {
                    setStatus(data);
                }
            } catch (error) {
                console.error('Error fetching status:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 30000);

        return () => clearInterval(interval);
    }, []);

    if (loading || !status) {
        return null;
    }

    const isActive = status.killSwitchActive;
    const spendPercentage = status.spendPercentage;
    const isDangerous = spendPercentage > 70;

    return (
        <div
            className={`fixed bottom-4 right-4 z-[9999] rounded-lg p-4 max-w-xs shadow-lg border-2 transition-all duration-300 ${isActive
                    ? isDangerous
                        ? 'bg-orange-50 border-orange-300'
                        : 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}
        >
            <div className="flex items-center gap-2 mb-2">
                <div
                    className={`w-3 h-3 rounded-full ${isActive
                            ? isDangerous
                                ? 'bg-orange-500 animate-pulse'
                                : 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                />
                <h3 className="font-bold text-sm text-slate-800">
                    {isActive ? (isDangerous ? '⚠️ Precaución' : '🎄 Oferta Activa') : '❌ Oferta Terminada'}
                </h3>
            </div>

            {isActive && (
                <div className="text-xs text-slate-600 mb-2">
                    <p className="font-medium">{status.timeRemaining}</p>
                </div>
            )}

            <div className="space-y-1 mb-3">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Gastos:</span>
                    <span>
                        ${status.currentSpend.toFixed(2)} / ${status.spendLimit}
                    </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                        className={`h-full transition-all ${spendPercentage > 90
                                ? 'bg-red-500'
                                : spendPercentage > 70
                                    ? 'bg-orange-500'
                                    : 'bg-green-500'
                            }`}
                        style={{ width: `${Math.min(spendPercentage, 100)}%` }}
                    />
                </div>
            </div>

            <p className="text-xs text-slate-500">{status.rateLimitInfo}</p>

            {isDangerous && isActive && (
                <div className="mt-2 p-2 bg-orange-100 rounded text-xs text-orange-800">
                    Alerta: Acercándose al límite de seguridad. El sistema se detendrá automáticamente a ${status.spendLimit}.
                </div>
            )}

            {!isActive && (
                <div className="mt-2 p-2 bg-red-100 rounded text-xs text-red-800">
                    La oferta de lanzamiento ha terminado. Precios normales ahora en efecto.
                </div>
            )}
        </div>
    );
};

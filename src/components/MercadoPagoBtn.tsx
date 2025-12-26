import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react'

// Initialize only on client side or inside useEffect to be safe, though init is usually safe.
// We are checking for window to be extra safe with SSR.
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MP_PUBLIC_KEY) {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!)
}

export default function MPBtn({ amount, orderId }: { amount: number; orderId: string }) {
    const [pref, setPref] = useState<string | null>(null)

    useEffect(() => {
        // Ensure initialized inside effect just in case
        if (process.env.NEXT_PUBLIC_MP_PUBLIC_KEY) {
            initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!)
        }

        fetch('/api/mp/create', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, orderId }) 
        })
            .then(r => r.json())
            .then(d => setPref(d.id))
            .catch(e => console.error("MP Error", e))
    }, [amount, orderId])

    return pref ? (
        <div className="animate-in fade-in duration-500">
            <Wallet initialization={{ preferenceId: pref }} />
        </div>
    ) : (
        <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-widest animate-pulse p-4 border border-white/5 rounded-2xl bg-white/5">
            <div className="w-2 h-2 rounded-full bg-christmas-gold"></div>
            Initializing Mercado Pago...
        </div>
    )
}

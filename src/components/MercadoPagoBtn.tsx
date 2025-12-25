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

        fetch('/api/mp/create', { method: 'POST', body: JSON.stringify({ amount, orderId }) })
            .then(r => r.json())
            .then(d => setPref(d.id))
            .catch(e => console.error("MP Error", e))
    }, [amount, orderId])

    return pref ? <Wallet initialization={{ preferenceId: pref }} /> : <span className="text-white/50 text-xs">Loading MercadoPago...</span>
}

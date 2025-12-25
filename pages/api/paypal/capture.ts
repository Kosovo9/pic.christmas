import { supabaseAdmin } from '@/lib/supabase';

async function unlockImages(orderId: string) {
    const { data: sale } = await supabaseAdmin
        .from('sales')
        .select('id,user_id')
        .eq('external_id', orderId)
        .single()

    if (!sale) return

    await supabaseAdmin.from('images').update({ is_unlocked: true, unlocked_at: new Date() }).eq('user_id', sale.user_id)
    await supabaseAdmin.from('sales').update({ status: 'paid' }).eq('id', sale.id)
}

export default async function handler(req: any, res: any) {
    const { orderID, orderId } = req.body
    const base = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const secret = process.env.PAYPAL_SECRET
    const basic = Buffer.from(`${base}:${secret}`).toString('base64')

    const r = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`, {
        method: 'POST',
        headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/json' }
    })
    const paypalData = await r.json()
    if (paypalData.status !== 'COMPLETED') return res.status(400).json({ error: 'failed' })

    await supabaseAdmin.from('sales').insert({
        gateway: 'paypal',
        external_id: orderId,
        amount_usd: paypalData.purchase_units[0].payments.captures[0].amount.value,
        status: 'paid'
    })

    await unlockImages(orderId)
    res.json({ ok: true })
}

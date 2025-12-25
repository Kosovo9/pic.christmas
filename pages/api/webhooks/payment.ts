import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') return res.status(405).end()

    const { gateway, event, orderId } = req.body // enviado por tu backend de pago

    if (gateway === 'paypal' && event === 'PAYMENT.CAPTURE.COMPLETED') {
        await unlockImages(orderId)
    }
    if (gateway === 'mercadopago' && event === 'payment.updated') {
        const { status } = req.body.data || {}
        if (status === 'approved') await unlockImages(req.body.data.external_reference)
    }

    res.status(200).send('OK')
}

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

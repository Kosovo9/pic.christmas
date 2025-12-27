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
    const { orderID, orderId, clerkId } = req.body // orderId is our Hash, orderID is PayPal's
    const base = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const secret = process.env.PAYPAL_SECRET
    const basic = Buffer.from(`${base}:${secret}`).toString('base64')

    if (!orderID || !clerkId) {
        return res.status(400).json({ error: "Missing required params" });
    }

    try {
        // 1. Verify Payment with PayPal
        const r = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`, {
            method: 'POST',
            headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/json' }
        })
        const paypalData = await r.json()

        if (paypalData.status !== 'COMPLETED') {
            console.error("PayPal Capture Failed:", paypalData);
            return res.status(400).json({ error: 'PayPal capture failed', details: paypalData });
        }

        // 2. Resolve User (Clerk ID -> DB UUID)
        const { data: userRec } = await supabaseAdmin.from('users').select('id').eq('clerk_id', clerkId).single();
        if (!userRec) {
            return res.status(404).json({ error: "User not found" });
        }

        // 3. Record Sale
        const { data: sale, error: saleErr } = await supabaseAdmin.from('sales').insert({
            user_id: userRec.id,
            gateway: 'paypal',
            external_id: orderId || orderID, // Use Hash if available, else PayPal ID
            amount_usd: paypalData.purchase_units[0].payments.captures[0].amount.value,
            status: 'paid'
        }).select().single();

        if (saleErr) throw saleErr;

        // 4. Unlock Images
        await supabaseAdmin.from('images')
            .update({ is_unlocked: true, unlocked_at: new Date() })
            .eq('user_id', userRec.id);

        res.json({ ok: true });
    } catch (e: any) {
        console.error("Capture Error:", e);
        res.status(500).json({ error: e.message });
    }
}

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') return res.status(405).end()

    try {
        const { amount, orderId, clerkId } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

        if (!clerkId) return res.status(400).json({ error: "Missing User ID" });

        // 1. Resolve User
        const { data: userRec } = await supabaseAdmin.from('users').select('id').eq('clerk_id', clerkId).single();
        if (!userRec) return res.status(404).json({ error: "User not found" });

        const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! });
        const preferenceInstance = new Preference(client);

        const preferenceData = {
            body: {
                external_reference: String(orderId), // Our Hash
                items: [{
                    id: String(orderId),
                    title: 'Pic.Christmas HD',
                    quantity: 1,
                    unit_price: Number(amount),
                    currency_id: 'MXN'
                }],
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success`,
                    failure: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/?error=payment_failed`
                },
                auto_return: 'approved' as const
            }
        }

        const response = await preferenceInstance.create(preferenceData);

        // 2. Insert Pending Sale
        await supabaseAdmin.from('sales').insert({
            user_id: userRec.id,
            gateway: 'mercadopago',
            external_id: String(orderId),
            amount_usd: Number(amount) / 20, // Approx conversion or just store MXN amount if column supports it. Assuming schema expects USD.
            status: 'pending'
        });

        res.json({ id: response.id });
    } catch (e: any) {
        console.error("MP Preference Error:", e);
        res.status(500).json({ error: e.message })
    }
}

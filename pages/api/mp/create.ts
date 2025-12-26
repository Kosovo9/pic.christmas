import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') return res.status(405).end()

    try {
        const { amount, orderId } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

        const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! });
        const preferenceInstance = new Preference(client);

        const preferenceData = {
            body: {
                external_reference: String(orderId),
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
                auto_return: 'approved'
            }
        }

        const response = await preferenceInstance.create(preferenceData);
        res.json({ id: response.id });
    } catch (e: any) {
        console.error("MP Preference Error:", e);
        res.status(500).json({ error: e.message })
    }
}

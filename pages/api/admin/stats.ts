import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: any, res: any) {
    // Add authentication check here if needed in future (e.g. session check)
    const [{ data: u }, { data: s }, { data: d }] = await Promise.all([
        supabaseAdmin.from('users').select('*'),
        supabaseAdmin.from('sales').select('*'),
        supabaseAdmin.from('donations').select('amount_usd')
    ])
    res.json({
        users: u?.length || 0,
        sales: s?.length || 0,
        totalUSD: (s || []).reduce((a: number, b: any) => a + parseFloat(b.amount_usd), 0),
        donatedUSD: (d || []).reduce((a: number, b: any) => a + parseFloat(b.amount_usd), 0)
    })
}

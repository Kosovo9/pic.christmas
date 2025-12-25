import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') return res.status(405).end()

    const { affiliate_code } = req.query
    if (!affiliate_code) return res.status(400).json({ error: 'missing code' })

    const { data, error } = await supabaseAdmin
        .from('affiliates')
        .select('clicks,conversions,commission_usd')
        .eq('code', affiliate_code)
        .single()

    if (error) return res.status(404).json({ error: 'not found' })
    res.json(data)
}

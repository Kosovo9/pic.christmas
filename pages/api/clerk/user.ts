import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: any, res: any) {
    const { type, data } = req.body
    if (type === 'user.created') {
        await supabaseAdmin.from('users').insert({
            clerk_id: data.id,
            email: data.email_addresses[0].email_address,
            full_name: `${data.first_name || ''} ${data.last_name || ''}`.trim()
        })
    }
    res.status(200).send('OK')
}

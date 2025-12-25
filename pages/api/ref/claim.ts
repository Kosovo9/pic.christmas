import { createClient } from '@supabase/supabase-js'
import { getAuth } from '@clerk/nextjs/server'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function handler(req: any, res: any) {
    const { userId } = getAuth(req)
    if (!userId) return res.status(401).end()

    const { code } = req.body
    if (!code) return res.status(400).json({ error: 'Código requerido' })

    const { data: ref, error } = await supabase.from('refs').select('*').eq('code', code).single()
    if (error || !ref || ref.used) return res.status(400).json({ error: 'Código inválido' })

    // Increment free credits for both users atomically
    const { data: fromUser } = await supabase.from('users').select('free_credits').eq('id', ref.from_user).single()
    const { data: toUser } = await supabase.from('users').select('free_credits').eq('id', ref.to_user).single()

    await Promise.all([
        supabase.from('users').update({ free_credits: (fromUser?.free_credits || 0) + 1 }).eq('id', ref.from_user),
        supabase.from('users').update({ free_credits: (toUser?.free_credits || 0) + 1 }).eq('id', ref.to_user),
        supabase.from('refs').update({ used: true }).eq('id', ref.id)
    ])

    res.json({ ok: true })
}

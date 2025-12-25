import { createClient } from '@supabase/supabase-js'
import { getAuth } from '@clerk/nextjs/server'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function handler(req: any, res: any) {
    const { userId } = getAuth(req)
    if (!userId) return res.status(401).end()

    const { data } = await supabase
        .from('images')
        .select('id,storage_path,created_at')
        .eq('user_id', userId)
        .gt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })

    res.json(data)
}

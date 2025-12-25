import { createClient } from '@supabase/supabase-js'
import { sendCartRecovery } from '@/lib/resend'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

/**
 * Recover abandoned carts after 15 minutes.
 * This function is intended to be scheduled (e.g., Supabase Cron or Inngest) every 15 minutes.
 */
export async function recoverCart() {
    const { data, error } = await supabase
        .from('images')
        .select('id,user_id,created_at')
        .eq('is_unlocked', false)
        .lt('created_at', new Date(Date.now() - 15 * 60 * 1000).toISOString())
        .gt('created_at', new Date(Date.now() - 16 * 60 * 1000).toISOString())

    if (error) {
        console.error('Error fetching abandoned carts', error)
        return
    }

    for (const row of data || []) {
        const { data: user, error: uErr } = await supabase
            .from('users')
            .select('email')
            .eq('id', row.user_id)
            .single()
        if (uErr) {
            console.error('User not found for cart', row.id, uErr)
            continue
        }
        const url = `${process.env.NEXT_PUBLIC_HOST}/unlock/${row.id}`
        await sendCartRecovery(user.email, url)
    }
}

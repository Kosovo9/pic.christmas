import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy-load Supabase to avoid build-time errors
let supabaseAdmin: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
    if (!supabaseAdmin) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error('Supabase environment variables not configured');
        }

        supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    }
    return supabaseAdmin;
}

// Types
export interface Affiliate {
    id: string;
    user_id: string;
    affiliate_code: string;
    total_earned: number;
    balance: number;
    status: 'active' | 'inactive' | 'suspended';
    created_at: string;
    payout_email?: string;
    payout_method?: 'paypal' | 'stripe' | 'bank_transfer';
}

export interface AffiliateLedgerEntry {
    id: string;
    affiliate_id: string;
    amount: number;
    transaction_id: string;
    status: 'pending' | 'confirmed' | 'paid';
    created_at: string;
}

export interface AffiliateTransfer {
    id: string;
    affiliate_id: string;
    amount: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    requested_at: string;
    processed_at?: string;
}

// ============ AFFILIATE PAYMENT FUNCTIONS ============

/**
 * Process affiliate commission when a sale is made
 */
export async function processAffiliatePayment(
    affiliateCode: string,
    saleAmount: number,
    transactionId: string,
    commissionRate: number = 0.15 // 15% default commission
): Promise<AffiliateLedgerEntry | null> {
    try {
        // 1. Find affiliate by code
        const { data: affiliate, error: affiliateError } = await getSupabase()
            .from('affiliates')
            .select('*')
            .eq('affiliate_code', affiliateCode)
            .eq('status', 'active')
            .single();

        if (affiliateError || !affiliate) {
            console.warn('Affiliate not found or inactive:', affiliateCode);
            return null;
        }

        const commissionAmount = saleAmount * commissionRate;

        // 2. Create ledger entry
        const { data: ledger, error: ledgerError } = await getSupabase()
            .from('affiliate_ledger')
            .insert({
                affiliate_id: affiliate.id,
                amount: commissionAmount,
                transaction_id: transactionId,
                status: 'pending',
            })
            .select()
            .single();

        if (ledgerError) throw ledgerError;

        // 3. Update affiliate balance
        const { error: updateError } = await getSupabase()
            .from('affiliates')
            .update({
                total_earned: affiliate.total_earned + commissionAmount,
                balance: affiliate.balance + commissionAmount,
            })
            .eq('id', affiliate.id);

        if (updateError) throw updateError;

        // 4. Auto-trigger payout if balance >= $100
        const newBalance = affiliate.balance + commissionAmount;
        if (newBalance >= 100) {
            await createTransferRequest(affiliate.id, newBalance);
        }

        return ledger;
    } catch (error) {
        console.error('Error processing affiliate payment:', error);
        throw error;
    }
}

/**
 * Create a payout transfer request
 */
export async function createTransferRequest(
    affiliateId: string,
    amount: number
): Promise<AffiliateTransfer> {
    const { data, error } = await getSupabase()
        .from('affiliate_transfers')
        .insert({
            affiliate_id: affiliateId,
            amount,
            status: 'pending',
        })
        .select()
        .single();

    if (error) throw error;

    // Reset affiliate balance to 0 (funds locked for transfer)
    await getSupabase()
        .from('affiliates')
        .update({ balance: 0 })
        .eq('id', affiliateId);

    return data;
}

/**
 * Get affiliate dashboard data
 */
export async function getAffiliateDashboard(userId: string) {
    const { data: affiliate } = await getSupabase()
        .from('affiliates')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (!affiliate) return null;

    const { data: transactions } = await getSupabase()
        .from('affiliate_ledger')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .order('created_at', { ascending: false })
        .limit(50);

    const { data: transfers } = await getSupabase()
        .from('affiliate_transfers')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .order('requested_at', { ascending: false })
        .limit(10);

    return {
        affiliate,
        transactions: transactions || [],
        transfers: transfers || [],
        stats: {
            totalEarned: affiliate.total_earned,
            pendingBalance: affiliate.balance,
            totalTransactions: transactions?.length || 0,
        },
    };
}

/**
 * Register a new affiliate
 */
export async function registerAffiliate(
    userId: string,
    email: string,
    payoutMethod: 'paypal' | 'stripe' | 'bank_transfer' = 'paypal'
): Promise<Affiliate> {
    // Generate unique affiliate code
    const code = `PIC${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const { data, error } = await getSupabase()
        .from('affiliates')
        .insert({
            user_id: userId,
            affiliate_code: code,
            total_earned: 0,
            balance: 0,
            status: 'active',
            payout_email: email,
            payout_method: payoutMethod,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

// ============ FREE TIER FUNCTIONS ============

const FREE_TIER_HOURS = 4; // 4 hours free trial

export async function startFreeTier(userId: string): Promise<{ expiresAt: Date }> {
    const expiresAt = new Date(Date.now() + FREE_TIER_HOURS * 3600 * 1000);

    await getSupabase()
        .from('free_tier_usage')
        .upsert({
            user_id: userId,
            started_at: new Date().toISOString(),
            expires_at: expiresAt.toISOString(),
            status: 'active',
        });

    return { expiresAt };
}

export async function checkFreeTierStatus(userId: string): Promise<{
    active: boolean;
    hoursRemaining: number;
    minutesRemaining: number;
    secondsRemaining: number;
}> {
    const { data } = await getSupabase()
        .from('free_tier_usage')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

    if (!data) {
        return { active: false, hoursRemaining: 0, minutesRemaining: 0, secondsRemaining: 0 };
    }

    const expiresAt = new Date(data.expires_at).getTime();
    const now = Date.now();
    const remaining = Math.max(0, expiresAt - now);

    if (remaining <= 0) {
        await getSupabase()
            .from('free_tier_usage')
            .update({ status: 'expired' })
            .eq('id', data.id);
        return { active: false, hoursRemaining: 0, minutesRemaining: 0, secondsRemaining: 0 };
    }

    return {
        active: true,
        hoursRemaining: Math.floor(remaining / 3600000),
        minutesRemaining: Math.floor((remaining % 3600000) / 60000),
        secondsRemaining: Math.floor((remaining % 60000) / 1000),
    };
}

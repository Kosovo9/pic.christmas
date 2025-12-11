// lib/rateLimiter.ts
// Sistema de rate limiting + kill switch para pic.christmas

import { createClient } from '@supabase/supabase-js';

// Lazy-load Supabase to avoid build-time errors
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabase() {
    if (!supabaseInstance) {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            // Return a mock or throw depending on if we are in build mode, but better to just throw safely or return null? 
            // Actually, usually throwing inside the function when called is better than top level.
            // But if we are strict:
            if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
                console.error("Supabase Utils: Missing env vars");
            }
        }
        supabaseInstance = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
    }
    return supabaseInstance;
}

export interface RateLimitConfig {
    maxRequestsPerHour: number;
    maxRequestsPerDay: number;
    killSwitchEnabled: boolean;
    killSwitchDurationMinutes: number;
    maxSpendUSD: number;
    alertThresholdUSD: number;
}

// CONFIGURACIÓN DE SEGURIDAD
export const RATE_LIMIT_CONFIG: RateLimitConfig = {
    maxRequestsPerHour: 10,
    maxRequestsPerDay: 50,
    killSwitchEnabled: true,
    killSwitchDurationMinutes: 12 * 60,
    maxSpendUSD: 50,
    alertThresholdUSD: 30
};

export const getKillSwitchStartTime = async (): Promise<Date> => {
    try {
        const { data, error } = await getSupabase()
            .from('system_config')
            .select('kill_switch_start_time')
            .single();

        if (data?.kill_switch_start_time) {
            return new Date(data.kill_switch_start_time);
        }
    } catch (e) {
        console.log('Kill switch time not in DB, using env or now');
    }

    const envTime = process.env.KILL_SWITCH_START_TIME;
    return envTime ? new Date(envTime) : new Date();
};

export const isKillSwitchActive = async (): Promise<boolean> => {
    if (!RATE_LIMIT_CONFIG.killSwitchEnabled) return false;

    try {
        const startTime = await getKillSwitchStartTime();
        const now = new Date();
        const elapsedMinutes = (now.getTime() - startTime.getTime()) / (1000 * 60);

        const isActive = elapsedMinutes < RATE_LIMIT_CONFIG.killSwitchDurationMinutes;

        return isActive;
    } catch (e) {
        console.error('Error checking kill switch:', e);
        return false;
    }
};

export const getKillSwitchTimeRemaining = async (): Promise<number> => {
    try {
        const startTime = await getKillSwitchStartTime();
        const now = new Date();
        const elapsedMinutes = (now.getTime() - startTime.getTime()) / (1000 * 60);
        const remainingMinutes = Math.max(
            0,
            RATE_LIMIT_CONFIG.killSwitchDurationMinutes - elapsedMinutes
        );

        return Math.round(remainingMinutes);
    } catch (e) {
        return RATE_LIMIT_CONFIG.killSwitchDurationMinutes;
    }
};

export const checkRateLimit = async (
    userId: string
): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> => {
    try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        const { data, error } = await getSupabase()
            .from('generation_requests')
            .select('id')
            .eq('user_id', userId)
            .gte('created_at', oneHourAgo.toISOString());

        if (error) throw error;

        const requestCount = data?.length || 0;
        const allowed = requestCount < RATE_LIMIT_CONFIG.maxRequestsPerHour;
        const remaining = Math.max(
            0,
            RATE_LIMIT_CONFIG.maxRequestsPerHour - requestCount
        );
        const resetTime = new Date(oneHourAgo.getTime() + 60 * 60 * 1000);

        return { allowed, remaining, resetTime };
    } catch (e) {
        console.error('Rate limit check failed:', e);
        return {
            allowed: true,
            remaining: RATE_LIMIT_CONFIG.maxRequestsPerHour,
            resetTime: new Date()
        };
    }
};

export const getTotalSpendLast12Hours = async (): Promise<number> => {
    try {
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

        const { data, error } = await getSupabase()
            .from('generation_requests')
            .select('price_usd')
            .gte('created_at', twelveHoursAgo.toISOString());

        if (error) throw error;

        const totalSpend = (data || []).reduce(
            (sum, row) => sum + (row.price_usd || 0),
            0
        );

        return parseFloat(totalSpend.toFixed(2));
    } catch (e) {
        console.error('Spend calculation failed:', e);
        return 0;
    }
};

export const checkSpendLimit = async (): Promise<{
    allowed: boolean;
    currentSpend: number;
    limit: number;
    percentage: number;
}> => {
    try {
        const currentSpend = await getTotalSpendLast12Hours();
        const limit = RATE_LIMIT_CONFIG.maxSpendUSD;
        const allowed = currentSpend < limit;
        const percentage = Math.round((currentSpend / limit) * 100);

        if (
            currentSpend >= RATE_LIMIT_CONFIG.alertThresholdUSD &&
            currentSpend < limit
        ) {
            console.warn(
                `⚠️ SPEND ALERT: $${currentSpend} de $${limit} gastados (${percentage}%)`
            );
        }

        return { allowed, currentSpend, limit, percentage };
    } catch (e) {
        console.error('Spend limit check failed:', e);
        return {
            allowed: true,
            currentSpend: 0,
            limit: RATE_LIMIT_CONFIG.maxSpendUSD,
            percentage: 0
        };
    }
};

export const logGenerationRequest = async (
    userId: string,
    formatId: string,
    priceUSD: number,
    promptLength: number,
    imageUrl?: string
): Promise<void> => {
    try {
        const { error } = await getSupabase().from('generation_requests').insert({
            user_id: userId,
            format_id: formatId,
            price_usd: priceUSD,
            prompt_length: promptLength,
            image_url: imageUrl,
            created_at: new Date().toISOString()
        });

        if (error) throw error;
    } catch (e) {
        console.error('Failed to log generation request:', e);
    }
};

export const validateGenerationRequest = async (
    userId: string
): Promise<{
    allowed: boolean;
    reason?: string;
    details: {
        rateLimitOk: boolean;
        spendLimitOk: boolean;
        killSwitchActive: boolean;
    };
}> => {
    try {
        // DEV MODE: Always allow if Supabase not configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.log('⚠️ Supabase not configured - allowing all requests (DEV MODE)');
            return {
                allowed: true,
                reason: 'Dev mode - no limits',
                details: {
                    rateLimitOk: true,
                    spendLimitOk: true,
                    killSwitchActive: false
                }
            };
        }

        const killSwitchActive = await isKillSwitchActive();
        const rateLimit = await checkRateLimit(userId);
        const spendLimit = await checkSpendLimit();

        if (!killSwitchActive) {
            return {
                allowed: false,
                reason: 'Sistema en mantenimiento. Intenta en unos minutos.',
                details: {
                    rateLimitOk: rateLimit.allowed,
                    spendLimitOk: spendLimit.allowed,
                    killSwitchActive
                }
            };
        }

        if (!rateLimit.allowed) {
            return {
                allowed: false,
                reason: `Límite de ${RATE_LIMIT_CONFIG.maxRequestsPerHour} generaciones por hora alcanzado. Espera ${Math.ceil((rateLimit.resetTime.getTime() - Date.now()) / 60000)} minutos.`,
                details: {
                    rateLimitOk: false,
                    spendLimitOk: spendLimit.allowed,
                    killSwitchActive
                }
            };
        }

        if (!spendLimit.allowed) {
            return {
                allowed: false,
                reason: `Límite de gasto diario alcanzado ($${spendLimit.currentSpend}/$${spendLimit.limit}). Sistema pausado por seguridad.`,
                details: {
                    rateLimitOk: rateLimit.allowed,
                    spendLimitOk: false,
                    killSwitchActive
                }
            };
        }

        return {
            allowed: true,
            details: {
                rateLimitOk: true,
                spendLimitOk: true,
                killSwitchActive
            }
        };
    } catch (e) {
        console.error('Validation error:', e);
        // FAIL-OPEN: Allow request if validation fails
        return {
            allowed: true,
            reason: 'Validation bypassed (error)',
            details: {
                rateLimitOk: true,
                spendLimitOk: true,
                killSwitchActive: true
            }
        };
    }
};

export const getSystemStatus = async (): Promise<{
    killSwitchActive: boolean;
    timeRemaining: string;
    currentSpend: number;
    spendLimit: number;
    spendPercentage: number;
    rateLimitInfo: string;
}> => {
    try {
        const killSwitchActive = await isKillSwitchActive();
        const timeRemaining = await getKillSwitchTimeRemaining();
        const spendInfo = await checkSpendLimit();

        const hours = Math.floor(timeRemaining / 60);
        const minutes = timeRemaining % 60;

        return {
            killSwitchActive,
            timeRemaining:
                killSwitchActive && timeRemaining > 0
                    ? `${hours}h ${minutes}m restante`
                    : 'Oferta terminada',
            currentSpend: spendInfo.currentSpend,
            spendLimit: spendInfo.limit,
            spendPercentage: spendInfo.percentage,
            rateLimitInfo: `Máximo ${RATE_LIMIT_CONFIG.maxRequestsPerHour} generaciones/hora`
        };
    } catch (e) {
        console.error('Status check failed:', e);
        return {
            killSwitchActive: false,
            timeRemaining: 'Error',
            currentSpend: 0,
            spendLimit: RATE_LIMIT_CONFIG.maxSpendUSD,
            spendPercentage: 0,
            rateLimitInfo: 'Error en validación'
        };
    }
};

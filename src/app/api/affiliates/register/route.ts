import { NextRequest, NextResponse } from 'next/server';
import { registerAffiliate } from '@/lib/supabase-payments';

// POST /api/affiliates/register - Register new affiliate
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, email, payoutMethod } = body;

        if (!userId || !email) {
            return NextResponse.json(
                { error: 'Missing required fields: userId, email' },
                { status: 400 }
            );
        }

        const affiliate = await registerAffiliate(userId, email, payoutMethod || 'paypal');

        return NextResponse.json({
            success: true,
            data: affiliate,
            message: 'Affiliate registered successfully',
        });
    } catch (error: any) {
        console.error('Register affiliate error:', error);

        // Handle duplicate
        if (error.message?.includes('duplicate')) {
            return NextResponse.json(
                { error: 'User is already registered as an affiliate' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

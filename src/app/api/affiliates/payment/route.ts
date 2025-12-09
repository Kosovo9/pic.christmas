import { NextRequest, NextResponse } from 'next/server';
import {
    processAffiliatePayment,
    getAffiliateDashboard,
    registerAffiliate,
    createTransferRequest
} from '@/lib/supabase-payments';

// POST /api/affiliates/payment - Process affiliate commission
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { affiliateCode, saleAmount, transactionId, commissionRate } = body;

        if (!affiliateCode || !saleAmount || !transactionId) {
            return NextResponse.json(
                { error: 'Missing required fields: affiliateCode, saleAmount, transactionId' },
                { status: 400 }
            );
        }

        const result = await processAffiliatePayment(
            affiliateCode,
            saleAmount,
            transactionId,
            commissionRate || 0.15
        );

        if (!result) {
            return NextResponse.json(
                { success: false, message: 'Affiliate not found or inactive' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: result,
            message: 'Commission processed successfully',
        });
    } catch (error: any) {
        console.error('Affiliate payment error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET /api/affiliates/payment?userId=xxx - Get affiliate dashboard
export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'Missing userId parameter' },
                { status: 400 }
            );
        }

        const dashboard = await getAffiliateDashboard(userId);

        if (!dashboard) {
            return NextResponse.json(
                { error: 'Affiliate not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: dashboard,
        });
    } catch (error: any) {
        console.error('Get affiliate dashboard error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

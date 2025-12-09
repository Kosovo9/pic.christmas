
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Logic: "Viral" Free Mode is active to drive urgency
    // We return a mock time remaining to create FOMO (Fear Of Missing Out)

    return NextResponse.json({
        active: true,
        hoursRemaining: 3,
        minutesRemaining: 42, // Randomize slightly or keep static
        promoCode: "ELON_SPEED",
        message: "VIRAL_MODE_ACTIVE"
    });
}

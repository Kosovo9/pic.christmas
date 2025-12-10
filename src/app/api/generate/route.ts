import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/ai/generateChristmasPortrait";
import { uploadImageFromUrl } from "@/lib/storage";
import {
    validateGenerationRequest,
    logGenerationRequest,
    getSystemStatus
} from '@/lib/rateLimiter';

// Using Node.js runtime for Redis/Upstash compatibility
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // Extract userId if available (e.g. from cookies/auth), or use IP if not.
        // For now trusting client-sent userId (needs authentication for real security but good for MVP)
        // Or generate one if missing for guest users.
        const userId = body.userId || 'guest_' + (req.headers.get('x-forwarded-for') || 'unknown');

        const { refPhotos, presetId, language, prompt, width, height, quantity, formatId } = body;

        // 1. VALIDAR KILL SWITCH + RATE LIMIT
        const validation = await validateGenerationRequest(userId);

        if (!validation.allowed) {
            return NextResponse.json(
                {
                    success: false,
                    error: validation.reason || 'Solicitud rechazada',
                    details: validation.details
                },
                { status: 429 }
            );
        }

        // Basic validation: Either presetId OR prompt must be present
        if (!presetId && !prompt) {
            return NextResponse.json({ error: "Missing presetId or prompt" }, { status: 400 });
        }

        // Determine aspect ratio logic from original file...
        let aspectRatio = "4:5";
        if (width && height) {
            const ratio = width / height;
            if (width === 1080 && height === 1920) aspectRatio = "9:16";
            else if (width === 1080 && height === 1080) aspectRatio = "1:1";
            else if (width > height) aspectRatio = "16:9";
            else if (height > width) aspectRatio = "9:16";
            else aspectRatio = "1:1";
        }

        // Call AI Service (Your existing logic)
        const result = await generateImage(refPhotos || [], {
            presetId,
            prompt,
            language: language || "en",
            aspectRatio,
        });

        // 3. PERSIST IMAGE TO STORAGE (The "Cloud Folder")
        let finalImageUrl = result.url;
        try {
            // Upload to Supabase Storage 'generated-images' bucket
            // This ensures the photo is kept "forever" in the user's cloud folder
            const storageUrl = await uploadImageFromUrl(result.url, userId);
            if (storageUrl) {
                finalImageUrl = storageUrl;
                console.log("Image persisted to storage:", finalImageUrl);
            }
        } catch (storageError) {
            console.error("Failed to persist image, using temporary URL:", storageError);
        }

        // 4. REGISTRAR LA SOLICITUD (Log successful generation)
        // Estimated price for Flux Schnell ~0.003, let's log 0.05 to be conservative/safe for the spend limit
        const ESTIMATED_PRICE = 0.05;
        await logGenerationRequest(userId, formatId || 'custom', ESTIMATED_PRICE, (prompt || '').length, finalImageUrl);

        return NextResponse.json({
            success: true,
            imageUrl: finalImageUrl,
            images: [
                {
                    id: crypto.randomUUID(),
                    url: result.url,
                    presetId: result.presetId,
                    variant: "A",
                },
            ],
            details: {
                width,
                height,
                quantity,
                formatId
            }
        });
    } catch (error: any) {
        console.error("Generate API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate image" },
            { status: 500 }
        );
    }
}

// Endpoint para obtener el status del sistema
export async function GET(req: NextRequest) {
    try {
        const status = await getSystemStatus();
        return NextResponse.json(status);
    } catch (error) {
        console.error('Status error:', error);
        return NextResponse.json(
            { error: 'Error obteniendo status' },
            { status: 500 }
        );
    }
}

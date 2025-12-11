import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/ai/generateChristmasPortrait";
import { uploadImageFromUrl } from "@/lib/storage";
import { addWatermarkToBase64 } from "@/lib/watermark";
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

        // 🔒 ADD WATERMARK FOR PREVIEW (Studio Nexora, 50% opacity, avoiding head)
        console.log("Adding watermark to preview...");
        const watermarkedPreview = await addWatermarkToBase64(
            result.url,
            "Studio Nexora",
            0.5
        );

        // 3. PERSIST BOTH VERSIONS TO STORAGE
        let previewUrl = result.url; // Watermarked preview
        let originalUrl = result.url; // Original without watermark

        try {
            // Upload WATERMARKED version to 'previews' folder (for user to see)
            const previewStorageUrl = await uploadImageFromUrl(watermarkedPreview, userId, 'previews');
            if (previewStorageUrl) {
                previewUrl = previewStorageUrl;
                console.log("✅ Watermarked preview saved:", previewUrl);
            }

            // Upload ORIGINAL version to 'originals' folder (for after payment)
            const originalStorageUrl = await uploadImageFromUrl(result.url, userId, 'originals');
            if (originalStorageUrl) {
                originalUrl = originalStorageUrl;
                console.log("✅ Original (no watermark) saved:", originalUrl);
            }
        } catch (storageError) {
            console.error("Failed to persist images:", storageError);
            // Fallback: use watermarked version as preview
            previewUrl = watermarkedPreview;
        }

        // 4. REGISTRAR LA SOLICITUD (Log successful generation)
        const ESTIMATED_PRICE = 0.05;
        await logGenerationRequest(userId, formatId || 'custom', ESTIMATED_PRICE, (prompt || '').length, originalUrl);

        return NextResponse.json({
            success: true,
            imageUrl: previewUrl, // Return WATERMARKED preview to user
            originalUrl: originalUrl, // Keep original URL (will be delivered after payment)
            images: [
                {
                    id: crypto.randomUUID(),
                    url: previewUrl, // Watermarked preview
                    originalUrl: originalUrl, // Original without watermark
                    presetId: result.presetId,
                    variant: "A",
                },
            ],
            details: {
                width,
                height,
                quantity,
                formatId,
                hasWatermark: true,
                watermarkText: "Studio Nexora"
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

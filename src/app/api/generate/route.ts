import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/ai/generateChristmasPortrait";

export const runtime = "edge"; // fast execution

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { refPhotos, presetId, language, prompt, width, height, quantity } = body;

        // Basic validation: Either presetId OR prompt must be present
        if (!presetId && !prompt) {
            return NextResponse.json({ error: "Missing presetId or prompt" }, { status: 400 });
        }

        // Determine aspect ratio from width/height if provided, or default
        let aspectRatio = "4:5";
        if (width && height) {
            const ratio = width / height;
            // Map common ratios to Flux-friendly strings
            if (ratio === 1) aspectRatio = "1:1";
            else if (ratio > 1.7 && ratio < 1.8) aspectRatio = "16:9";
            else if (ratio > 0.5 && ratio < 0.6) aspectRatio = "9:16";
            // Add more heuristics if needed, or rely on what front-end sends if we added it there.
            // But front-end sends exact pixels.

            // NOTE: Flux Schnell accepts specific enums. We should try to match closest.
            // For 2K/4K landscape -> 16:9
            // For Social Vertical -> 9:16
            // For Square -> 1:1
        }

        // If 'ratio' string was passed in prompt or separately, we might parse it, 
        // but looking at useFormatSelector, it appends "Aspect ratio 9:16" to the prompt text.
        // We can also infer it if the frontend sent 'width' and 'height' which match specific formats.
        // Since we have specific formats in imageFormats.ts, we can map them.

        // Simple mapping based on the known formats in imageFormats.ts:
        // 1080x1920 -> 9:16
        // 1080x1080 -> 1:1
        // 1920x1080 -> 16:9
        // 1600x900 -> 16:9
        // 2560x1440 -> 16:9
        // 3840x2160 -> 16:9
        // 2160x3840 -> 9:16
        // 3840x3840 -> 1:1

        if (width === 1080 && height === 1920) aspectRatio = "9:16";
        else if (width === 1080 && height === 1080) aspectRatio = "1:1";
        else if (width > height) aspectRatio = "16:9"; // Default landscape
        else if (height > width) aspectRatio = "9:16"; // Default portrait
        else aspectRatio = "1:1"; // Default square

        // Call AI Service
        const result = await generateImage(refPhotos || [], {
            presetId,
            prompt,
            language: language || "en",
            aspectRatio,
        });

        return NextResponse.json({
            success: true,
            imageUrl: result.url, // Simple return for the new frontend
            images: [
                {
                    id: crypto.randomUUID(),
                    url: result.url,
                    presetId: result.presetId,
                    variant: "A",
                },
            ],
        });
    } catch (error: any) {
        console.error("Generate API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate image" },
            { status: 500 }
        );
    }
}

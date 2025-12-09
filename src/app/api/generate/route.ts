import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/ai/generateChristmasPortrait";

export const runtime = "edge"; // fast execution

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { refPhotos, presetId, language } = body;

        // Basic validation
        if (!refPhotos || !Array.isArray(refPhotos) || refPhotos.length === 0) {
            // For now, allow empty refs if just testing prompt gen, but warned.
            // return NextResponse.json({ error: "Missing reference photos" }, { status: 400 });
        }

        if (!presetId) {
            return NextResponse.json({ error: "Missing presetId" }, { status: 400 });
        }

        // Call AI Service
        // We generate 1 image for now (MVP), but could loop for variants.
        const result = await generateImage(refPhotos || [], {
            presetId,
            language: language || "en",
        });

        return NextResponse.json({
            success: true,
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

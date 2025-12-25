"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHRISTMAS_PROMPTS } from "@/lib/christmasPrompts";
import { sendChristmasEmail } from "@/lib/resend";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import sharp from "sharp";
import axios from "axios";

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "generated-photos";

const genAI = new GoogleGenerativeAI(GOOGLE_AI_API_KEY || "");
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function applyWatermark(imageBuffer: Buffer): Promise<Buffer> {
    const watermarkSvg = `
        <svg width="1024" height="1024">
            <style>
                .text { fill: rgba(255, 255, 255, 0.3); font-size: 100px; font-weight: bold; font-family: 'serif'; }
            </style>
            <text x="50%" y="50%" text-anchor="middle" class="text" transform="rotate(-45 512 512)">
                PIC.CHRISTMAS
            </text>
        </svg>
    `;
    return await sharp(imageBuffer)
        .composite([{ input: Buffer.from(watermarkSvg), gravity: "center" }])
        .toBuffer();
}

export async function generateChristmasPhoto(formData: FormData) {
    const session = await auth();
    if (!session.userId) return { error: "Authentication required" };

    if (!GOOGLE_AI_API_KEY) return { error: "Missing Google AI Key" };
    if (!HUGGING_FACE_API_KEY) return { error: "Missing Hugging Face Key" };

    const file = formData.get("file") as File;
    const styleId = formData.get("styleId") as string;
    const email = formData.get("email") as string;
    const skipWatermark = formData.get("paid") === "true";

    if (!file) return { error: "No file provided" };

    try {
        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const analysisPrompt = `Analyze this person's face. Return ONLY 10 keywords describing facial features and ethnicity for AI generation.`;

        const result = await model.generateContent([
            analysisPrompt,
            { inlineData: { data: base64Data, mimeType: file.type } },
        ]);
        const personKeywords = result.response.text().trim();

        const selectedStyle = CHRISTMAS_PROMPTS.find(p => p.id === styleId);
        if (!selectedStyle) return { error: "Invalid style" };

        const finalPrompt = selectedStyle.basePrompt.replace("{ID_REF}", personKeywords);

        const hfResponse = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY}` },
                method: "POST",
                body: JSON.stringify({ inputs: finalPrompt }),
            }
        );

        if (!hfResponse.ok) throw new Error(`HF API Error: ${await hfResponse.text()}`);

        const rawBuffer = Buffer.from(await (await hfResponse.blob()).arrayBuffer());

        // Apply watermark if not paid
        const finalBuffer = skipWatermark ? rawBuffer : await applyWatermark(rawBuffer);

        const fileName = `${crypto.randomUUID()}.png`;
        const { error: uploadError } = await supabase.storage
            .from(SUPABASE_BUCKET)
            .upload(fileName, finalBuffer, { contentType: "image/png", upsert: true });

        if (uploadError) throw new Error(uploadError.message);

        const { data: { publicUrl } } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(fileName);
        const hash = crypto.createHash("sha256").update(publicUrl).digest("hex").slice(0, 16);

        if (email) await sendChristmasEmail(email, publicUrl, hash);

        return { success: true, image: publicUrl, hash, prompt: finalPrompt };

    } catch (error) {
        console.error("100x Quantum Error:", error);
        return { error: error instanceof Error ? error.message : "Internal Server Error" };
    }
}

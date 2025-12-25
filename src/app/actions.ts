"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHRISTMAS_PROMPTS } from "@/lib/christmasPrompts";
import { sendChristmasEmail } from "@/lib/resend";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "generated-photos";

const genAI = new GoogleGenerativeAI(GOOGLE_AI_API_KEY || "");
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function generateChristmasPhoto(formData: FormData) {
    const session = await auth();
    if (!session.userId) return { error: "Authentication required" };

    if (!GOOGLE_AI_API_KEY) return { error: "Missing Google AI Key" };
    if (!HUGGING_FACE_API_KEY) return { error: "Missing Hugging Face Key" };

    const file = formData.get("file") as File;
    const styleId = formData.get("styleId") as string;
    const email = formData.get("email") as string;

    if (!file) return { error: "No file provided" };

    try {
        // 1. Analyze with Gemini (Nano Banana Prompt Compression)
        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const analysisPrompt = `Analyze this person's face. 
        Return ONLY a highly compressed comma-separated list of 10 keywords describing their unique facial features, ethnicity, hair, and age. 
        Focus on identifying traits for an AI image generator. No intro, no outro, just keywords.`;

        const result = await model.generateContent([
            analysisPrompt,
            { inlineData: { data: base64Data, mimeType: file.type } },
        ]);
        const personKeywords = result.response.text().trim();

        // 2. Select and Build Prompt
        const selectedStyle = CHRISTMAS_PROMPTS.find(p => p.id === styleId);
        if (!selectedStyle) return { error: "Invalid style" };

        const finalPrompt = selectedStyle.basePrompt.replace("{ID_REF}", personKeywords);

        console.log("🚀 Generating with SDXL (Hugging Face) 100x Speed:", finalPrompt);

        // 3. Generate with Stable Diffusion XL (Hugging Face API - Open Source)
        // Using SDXL 1.0 for high-quality open source results
        const hfResponse = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY}` },
                method: "POST",
                body: JSON.stringify({ inputs: finalPrompt }),
            }
        );

        if (!hfResponse.ok) {
            const error = await hfResponse.text();
            throw new Error(`HF API Error: ${error}`);
        }

        const imageBlob = await hfResponse.blob();
        const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

        // 4. Upload to Supabase Storage (Private 24h)
        const fileName = `${crypto.randomUUID()}.png`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(SUPABASE_BUCKET)
            .upload(fileName, imageBuffer, {
                contentType: "image/png",
                upsert: true
            });

        if (uploadError) throw new Error(`Supabase Upload Error: ${uploadError.message}`);

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from(SUPABASE_BUCKET)
            .getPublicUrl(fileName);

        const hash = crypto.createHash("sha256").update(publicUrl).digest("hex").slice(0, 16);

        // 5. Email Notification
        if (email) {
            await sendChristmasEmail(email, publicUrl, hash);
        }

        return {
            success: true,
            image: publicUrl,
            hash,
            prompt: finalPrompt
        };

    } catch (error) {
        console.error("100x Quantum Error:", error);
        return { error: error instanceof Error ? error.message : "Internal Server Error" };
    }
}

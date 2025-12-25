"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHRISTMAS_PROMPTS } from "@/lib/christmasPrompts";
import { sendChristmasEmail } from "@/lib/resend";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// Prevent Node from hitting the default listener limit under heavy load
process.setMaxListeners(0);

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "generated-photos";

const genAI = new GoogleGenerativeAI(GOOGLE_AI_API_KEY || "");
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Simple concurrency guard to avoid overlapping generation requests
let generationInProgress = false;

export async function generateChristmasPhoto(formData: FormData) {
    // If another generation is already running, return a friendly busy response
    if (generationInProgress) {
        return { error: "Engine busy – please try again in a few seconds." };
    }
    generationInProgress = true;

    const session = await auth();
    if (!session.userId) {
        generationInProgress = false;
        return { error: "Authentication required" };
    }

    if (!GOOGLE_AI_API_KEY) {
        generationInProgress = false;
        return { error: "Missing Google AI Key" };
    }
    if (!HUGGING_FACE_API_KEY) {
        generationInProgress = false;
        return { error: "Missing Hugging Face Key" };
    }

    const file = formData.get("file") as File;
    const styleId = formData.get("styleId") as string;
    const email = formData.get("email") as string;
    const skipWatermark = formData.get("paid") === "true";

    if (!file) {
        generationInProgress = false;
        return { error: "No file provided" };
    }
    if (file.size > 10 * 1024 * 1024) {
        generationInProgress = false;
        return { error: "File too large (Max 10MB)" };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");

        // Phase 1: AI Analysis (Critical Path)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const analysisPrompt = `Analyze this person's face. Return ONLY 10 keywords describing facial features and ethnicity for AI generation.`;

        const result = await model.generateContent([
            analysisPrompt,
            { inlineData: { data: base64Data, mimeType: file.type } },
        ]);
        const personKeywords = result.response.text().trim() || "person, realistic, high quality";

        const selectedStyle = CHRISTMAS_PROMPTS.find(p => p.id === styleId);
        if (!selectedStyle) {
            generationInProgress = false;
            return { error: "Invalid style" };
        }

        const finalPrompt = selectedStyle.basePrompt.replace("{ID_REF}", personKeywords);

        // Phase 2: Generation (Critical Path) – robust fetch with retries
        let rawBuffer: Buffer | null = null;
        let retryCount = 0;
        const maxRetries = 2;

        while (retryCount <= maxRetries && !rawBuffer) {
            try {
                const hfResponse = await fetch(
                    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
                    {
                        headers: {
                            "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify({
                            inputs: finalPrompt,
                            options: { wait_for_model: true, use_cache: false },
                        }),
                    }
                );

                if (hfResponse.ok) {
                    rawBuffer = Buffer.from(await hfResponse.arrayBuffer());
                } else {
                    const errorText = await hfResponse.text();
                    console.warn(`HF Attempt ${retryCount + 1} failed: ${errorText}`);
                    if (errorText.includes("currently loading")) {
                        await new Promise(r => setTimeout(r, 2000));
                    }
                }
            } catch (e) {
                console.error(`HF Attempt ${retryCount + 1} Error:`, e);
            }
            retryCount++;
        }

        if (!rawBuffer) throw new Error("AI Engine is busy. Please try again in 5 seconds.");

        // Phase 3: Storage & Delivery (Optimized)
        const fileName = `${crypto.randomUUID()}.png`;
        const { error: uploadError } = await supabase.storage
            .from(SUPABASE_BUCKET)
            .upload(fileName, rawBuffer, { contentType: "image/png", upsert: true });

        if (uploadError) throw new Error(uploadError.message);

        const { data: { publicUrl } } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(fileName);
        const hash = crypto.createHash("sha256").update(publicUrl).digest("hex").slice(0, 16);

        // NON-BLOCKING Phase 4: Verification & SEO Email
        if (email) {
            sendChristmasEmail(email, publicUrl, hash).catch(e => console.error("Email Delay Error:", e));
        }

        return {
            success: true,
            image: publicUrl,
            hash,
            prompt: finalPrompt,
            isWatermarked: !skipWatermark,
        };
    } catch (error) {
        console.error("100x Quantum Error:", error);
        return { error: error instanceof Error ? error.message : "Internal Server Error" };
    } finally {
        // Reset guard regardless of outcome
        generationInProgress = false;
    }
}


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
    const skipWatermark = formData.get("paid") === "true";

    if (!file) return { error: "No file provided" };
    if (file.size > 10 * 1024 * 1024) return { error: "File too large (Max 10MB)" };

    try {
        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");

        // Phase 1: AI Analysis (Critical Path)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const analysisPrompt = `Analyze this person's face. Return ONLY 10 keywords describing facial features and ethnicity for AI generation.`;

        const result = await model.generateContent([
            analysisPrompt,
            { inlineData: { data: base64Data, mimeType: file.type } },
        ]);
        const personKeywords = result.response.text().trim() || "person, realistic, high quality";

        const selectedStyle = CHRISTMAS_PROMPTS.find(p => p.id === styleId);
        if (!selectedStyle) return { error: "Invalid style" };

        const finalPrompt = selectedStyle.basePrompt.replace("{ID_REF}", personKeywords);

        // Phase 2: Generation (Critical Path)
        // Using a more robust fetch approach with retries for HF
        let rawBuffer: Buffer | null = null;
        let retryCount = 0;
        const maxRetries = 2;

        while (retryCount <= maxRetries && !rawBuffer) {
            try {
                const hfResponse = await fetch(
                    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
                    {
                        headers: {
                            "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({
                            inputs: finalPrompt,
                            options: { wait_for_model: true, use_cache: false }
                        }),
                    }
                );

                if (hfResponse.ok) {
                    rawBuffer = Buffer.from(await hfResponse.arrayBuffer());
                } else {
                    const errorText = await hfResponse.text();
                    console.warn(`HF Attempt ${retryCount + 1} failed: ${errorText}`);
                    if (errorText.includes("currently loading")) {
                        // Wait 2 seconds if model is loading
                        await new Promise(r => setTimeout(r, 2000));
                    }
                }
            } catch (e) {
                console.error(`HF Attempt ${retryCount + 1} Error:`, e);
            }
            retryCount++;
        }

        if (!rawBuffer) throw new Error("AI Engine is busy. Please try again in 5 seconds.");

        // Phase 3: Storage & Delivery (Optimized)
        const fileName = `${crypto.randomUUID()}.png`;
        const { error: uploadError } = await supabase.storage
            .from(SUPABASE_BUCKET)
            .upload(fileName, rawBuffer, { contentType: "image/png", upsert: true });

        if (uploadError) throw new Error(uploadError.message);

        const { data: { publicUrl } } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(fileName);
        const hash = crypto.createHash("sha256").update(publicUrl).digest("hex").slice(0, 16);

        // NON-BLOCKING Phase 4: Verification & SEO Email
        if (email) {
            sendChristmasEmail(email, publicUrl, hash).catch(e => console.error("Email Delay Error:", e));
        }

        return {
            success: true,
            image: publicUrl,
            hash,
            prompt: finalPrompt,
            isWatermarked: !skipWatermark
        };

    } catch (error) {
        console.error("100x Quantum Error:", error);
        return { error: error instanceof Error ? error.message : "Internal Server Error" };
    }
}



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

// Concurrency is now handled per-user via Clerk/Supabase or simply by Next.js Serverless scaling.
// Removed global generationInProgress to allow 10x concurrent users.

export async function generateChristmasPhoto(formData: FormData) {

    const session = await auth();
    if (!session.userId) {
        return { error: "Authentication required" };
    }
    const clerkId = session.userId; // Capture for DB usage

    if (!GOOGLE_AI_API_KEY) {
        return { error: "Missing Google AI Key" };
    }
    if (!HUGGING_FACE_API_KEY) {
        return { error: "Missing Hugging Face Key" };
    }

    const file = formData.get("file") as File;
    const styleId = formData.get("styleId") as string;
    const email = formData.get("email") as string;
    const skipWatermark = formData.get("paid") === "true";

    if (!file) {
        return { error: "No file provided" };
    }
    if (file.size > 10 * 1024 * 1024) {
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
            return { error: "Invalid style" };
        }

        // 10x Realism Optimization: Injecting high-fidelity tokens and negative prompt structure
        const enhancedPrompt = `${selectedStyle.basePrompt.replace("{ID_REF}", personKeywords)}, medical-grade realism, 8k uhd, highly detailed face, cinematic lighting, masterpiece, sharp focus`;
        const negativePrompt = "blurry, distorted, low quality, bad anatomy, double face, deformed, watermark, text";

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
                            inputs: enhancedPrompt,
                            parameters: {
                                negative_prompt: negativePrompt,
                                guidance_scale: 7.5,
                                num_inference_steps: 50
                            },
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

        // Phase 3.5: DB Persistence (Unlock Logic Support)
        try {
            // A. Sync User
            let { data: userRec } = await supabase.from('users').select('id').eq('clerk_id', clerkId).single();
            if (!userRec) {
                const { data: newUser, error: userErr } = await supabase.from('users').insert({
                    clerk_id: clerkId,
                    email: email || "unknown@pic.christmas"
                }).select('id').single();
                if (userErr) throw userErr;
                userRec = newUser;
            }

            // B. Register Image
            if (userRec) {
                await supabase.from('images').insert({
                    user_id: userRec.id,
                    storage_path: fileName,
                    is_unlocked: skipWatermark,
                    upscaled_path: publicUrl // Temporary storing full URL here for simplified retrieval
                });
            }
        } catch (dbErr) {
            console.error("DB Sync Error (Non-fatal for generation):", dbErr);
        }

        // NON-BLOCKING Phase 4: Verification & SEO Email
        if (email) {
            sendChristmasEmail(email, publicUrl, hash).catch(e => console.error("Email Delay Error:", e));
        }

        // 10x Feature: Magic Video Greeting (Placeholder for SVD/Kling Integration)
        const videoUrl = publicUrl.replace(".png", ".mp4"); // In a real 10x scenario, this would trigger an async video gen job

        return {
            success: true,
            image: publicUrl,
            video: videoUrl,
            hash,
            prompt: enhancedPrompt,
            isWatermarked: !skipWatermark,
            creditsUsed: 1
        };
    } catch (error) {
        console.error("100x Quantum Error:", error);
        return { error: error instanceof Error ? error.message : "Internal Server Error" };
    } finally {
        // Cleanup if needed
    }
}

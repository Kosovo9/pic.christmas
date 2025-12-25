"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHRISTMAS_PROMPTS } from "@/lib/christmasPrompts";
import Replicate from "replicate";
import { sendChristmasEmail } from "@/lib/resend";
import crypto from "crypto";

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

const genAI = new GoogleGenerativeAI(GOOGLE_AI_API_KEY || "");
const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
});

export async function generateChristmasPhoto(formData: FormData) {
    if (!GOOGLE_AI_API_KEY) return { error: "Missing Google AI Key" };
    if (!REPLICATE_API_TOKEN) return { error: "Missing Replicate Token" };

    const file = formData.get("file") as File;
    const styleId = formData.get("styleId") as string;
    const email = formData.get("email") as string;

    if (!file) return { error: "No file provided" };

    try {
        // 1. Convert File to Base64
        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");

        // 2. Analyze with Gemini (Identity/Portrait Locking)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const analysisPrompt = `Analyze this person's face in detail for a 100% accurate AI portrait. Describe:
        - Gender, age, ethnicity
        - Exact hair color/texture, eye shape/color
        - Facial features (beard, glasses, freckles, jawline)
        Output a comma-separated list of precise physical traits for a Stable Diffusion prompt.`;

        const result = await model.generateContent([
            analysisPrompt,
            { inlineData: { data: base64Data, mimeType: file.type } },
        ]);
        const personDescription = result.response.text();

        // 3. Construct the 10x Optimized Prompt
        const selectedStyle = CHRISTMAS_PROMPTS.find(p => p.id === styleId);
        if (!selectedStyle) return { error: "Invalid style selected" };

        let finalPrompt = selectedStyle.basePrompt.replace("[Subject]", personDescription);
        finalPrompt = finalPrompt.replace(/\[Subject Family\]/g, "family").replace(/\[Subject Pet\]/g, "pet");

        console.log("🚀 Generating with Flux.1-pro:", finalPrompt);

        // 4. Generate with Replicate
        const output = await replicate.run(
            "black-forest-labs/flux-schnell",
            {
                input: {
                    prompt: finalPrompt,
                    aspect_ratio: selectedStyle.aspectRatio === "4:5" ? "4:5" : (selectedStyle.aspectRatio === "16:9" ? "16:9" : "1:1"),
                    output_format: "webp",
                    output_quality: 90,
                    num_inference_steps: 4
                }
            }
        );

        const imageUrl = (output as string[])[0];
        const hash = crypto.createHash("sha256").update(imageUrl).digest("hex").slice(0, 16);

        // 5. Email Automation
        if (email) {
            await sendChristmasEmail(email, imageUrl, hash);
        }

        return {
            success: true,
            image: imageUrl,
            hash,
            prompt: finalPrompt,
            analysis: personDescription
        };

    } catch (error) {
        console.error("100x Generation Error:", error);
        return { error: error instanceof Error ? error.message : "Internal Server Error" };
    }
}

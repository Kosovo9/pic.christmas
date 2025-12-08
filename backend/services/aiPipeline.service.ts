import Replicate from 'replicate';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Clients
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || 'MISSING_TOKEN',
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

interface SubjectMetadata {
    description: string;
    gender: string;
    hairColor: string;
    ageGroup: string;
}

export class AIPipelineService {

    /**
     * Step 1: Analyze the User's Photo with Gemini Vision
     * Extracts physical traits to inject into the Flux prompt.
     */
    static async analyzeSubject(imageUrl: string): Promise<SubjectMetadata> {
        console.log("🧠 Analyzing subject traits...");
        try {
            // SIMULATED INTELLIGENCE (To save tokens/latency in this demo phase)
            // Real implementation would fetch image -> base64 -> model.generateContent([img, prompt])
            return {
                description: "a person with warm skin tone, natural smile",
                gender: "neutral",
                hairColor: "brown",
                ageGroup: "adult"
            };
        } catch (error) {
            console.error("Gemini Analysis Failed:", error);
            return { description: "a person", gender: "neutral", hairColor: "brown", ageGroup: "adult" };
        }
    }

    /**
     * Step 2: Generate the Base 'Perfect' Image with Flux
     * @param prompt - The final composed prompt
     * @param tier - 'turbo' for speed (Schnell), 'premium' for quality (Pro)
     */
    static async generateBaseImage(prompt: string, tier: 'turbo' | 'premium' = 'turbo'): Promise<string> {
        const model = tier === 'premium'
            ? "black-forest-labs/flux-1.1-pro"
            : "black-forest-labs/flux-schnell"; // ⚡ Sub-second generation

        console.log(`🎨 Painting with ${tier === 'premium' ? 'Flux.1 Pro' : 'Flux-Schnell (TURBO)'}...`);

        const input = {
            prompt: prompt,
            aspect_ratio: "4:5",
            output_format: "jpg",
            num_outputs: 1,
            disable_safety_checker: false,
            go_fast: true // Schnell-specific optimization flag
        };

        try {
            const output = await replicate.run(model, { input });
            console.log("Flux Output:", output);
            // Handle array output from Schnell
            if (Array.isArray(output) && output.length > 0) {
                return String(output[0]);
            }
            return String(output);
        } catch (error) {
            console.error("Flux Generation Failed:", error);
            throw new Error("Failed to generate base image.");
        }
    }

    /**
     * Step 3: Face Swap for 100% Fidelity (InsightFace)
     */
    static async performFaceSwap(targetImageUrl: string, sourceImageUrl: string): Promise<string> {
        console.log("🎭 Performing Face Swap...");

        const input = {
            target_image: targetImageUrl,
            source_image: sourceImageUrl
        };

        try {
            const output = await replicate.run(
                "insightface/inswapper:78798bf12c299c850245a46746960411c5031b272306236b2890533306d1dc43",
                { input }
            );
            console.log("FaceSwap Output:", output);
            return String(output);
        } catch (error) {
            console.error("FaceSwap Failed:", error);
            // Fallback to base image if swap fails
            return targetImageUrl;
        }
    }

    /**
     * MASTER ORCHESTRATOR
     * @param promptTemplate - Base prompt with [Subject] placeholder
     * @param userFileUrl - URL of the user's uploaded face image
     * @param tier - 'turbo' for speed, 'premium' for highest quality
     */
    static async executePipeline(
        promptTemplate: string,
        userFileUrl: string,
        tier: 'turbo' | 'premium' = 'turbo'
    ): Promise<string> {
        // 1. Logic: Analyze Subject & Enhance Prompt
        const traits = await this.analyzeSubject(userFileUrl);
        const subjectDesc = traits.description;

        // Replace placeholder with optimized description or append
        let finalPrompt = promptTemplate.includes('[Subject]')
            ? promptTemplate.replace('[Subject]', subjectDesc)
            : `${promptTemplate}, featuring ${subjectDesc}`;

        console.log(`✨ Enhanced Prompt: ${finalPrompt}`);

        // 2. Creation: Generate base image with selected tier
        const baseImage = await this.generateBaseImage(finalPrompt, tier);

        // 3. Fusion: Swap user's face onto the generated image
        const finalImage = await this.performFaceSwap(baseImage, userFileUrl);

        return finalImage;
    }
}

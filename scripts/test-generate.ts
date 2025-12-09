import dotenv from 'dotenv';
import { generateImage } from '../src/lib/ai/generateChristmasPortrait';

// Manually set the token from the user's prompt for this test session if not in .env
// In a real scenario, we rely on .env, but here I want to ensure it works with the provided key.
process.env.REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || "";

async function testGeneration() {
    console.log("Testing AI Generation...");
    try {
        const result = await generateImage([], {
            presetId: "studio_couple_tree", // Testing the first preset
            language: "es"
        });
        console.log("Generation Success!");
        console.log("Image URL:", result.url);
        console.log("Preset used:", result.presetId);
    } catch (error) {
        console.error("Generation Failed:", error);
    }
}

testGeneration();

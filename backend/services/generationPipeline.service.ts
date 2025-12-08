import { FaceEmbeddingService } from './faceEmbedding.service';
import { PetEmbeddingService } from './petEmbedding.service';
import { FaceLockVerificationService } from './faceLockVerification.service';
import { FluxPromptService } from './fluxPrompt.service';
import { replicate } from '../config/clients';

export class GenerationPipeline {
    /**
     * Main pipeline to generate realistic photos
     * with LOCKED identity
     */
    static async generateRealisticPhoto(
        seedImageUrl: string,
        style: string,
        context: string,
        retryCount = 0
    ): Promise<any> {
        try {
            console.log('🎯 STEP 1: Extracting face identity...');
            const faceProfile = await FaceEmbeddingService.extractFaceProfile(seedImageUrl);

            console.log('🐕 STEP 2: Detecting pets...');
            // In a real scenario we'd detect if there ARE pets first, or just run valid extraction
            const petProfile = await PetEmbeddingService.extractPetProfile(seedImageUrl);
            const hasPet = petProfile.type !== 'other'; // Basic check

            console.log('📝 STEP 3: Generating face-locked prompt...');
            let finalPrompt = FluxPromptService.generatePrompt(
                faceProfile,
                style,
                context
            );

            if (hasPet) {
                finalPrompt += `\n\nPET PRESERVATION: ${petProfile.colors.join(', ')} ${petProfile.type}, detailed fur/feathers, exact markings.`;
            }

            console.log('🎨 STEP 4: Generating with Flux.1 (Replicate)...');
            const generatedImageUrl = await this.callFlux(finalPrompt, seedImageUrl);

            console.log('✅ Image generated:', generatedImageUrl);

            console.log('🔍 STEP 5: Verifying facial identity...');
            const verificationScore = await FaceLockVerificationService.verifyFaceLock(seedImageUrl, generatedImageUrl);

            // Auto-Retry Logic (Max 2 retries)
            if (verificationScore < 85 && retryCount < 2) {
                console.warn(`⚠️ Verification Score ${verificationScore}% too low. Retrying (Attempt ${retryCount + 2}/3)...`);
                return this.generateRealisticPhoto(seedImageUrl, style, context + " ensure exact face match, high fidelity", retryCount + 1);
            }

            return {
                success: true,
                imageUrl: generatedImageUrl,
                verificationScore,
                faceProfile,
                petProfile: hasPet ? petProfile : null,
                message: `Generated with ${verificationScore}% identity lock`
            };

        } catch (error) {
            console.error('❌ Generation pipeline failed:', error);
            throw error;
        }
    }

    private static async callFlux(prompt: string, seedImage: string): Promise<string> {
        if (!process.env.REPLICATE_API_TOKEN) {
            console.warn("Using Mock Flux Generation (No Token)");
            return "https://pic.christmas/mock-result.jpg"; // Fallback for dev without keys
        }

        const output = await replicate.run(
            "black-forest-labs/flux-schnell",
            {
                input: {
                    prompt: prompt,
                    aspect_ratio: "1:1",
                    safety_tolerance: 2,
                    output_quality: 100
                }
            }
        );

        if (Array.isArray(output)) return output[0];
        return output as unknown as string;
    }
}

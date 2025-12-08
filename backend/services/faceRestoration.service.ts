
import { replicate } from '../config/clients';

export class FaceRestorationService {
    /**
     * Enhance a face using CodeFormer via Replicate
     * @param imageUrl URL of the image to enhance
     * @returns Enhanced image URL
     */
    static async restoreFace(imageUrl: string): Promise<string> {
        if (!process.env.REPLICATE_API_TOKEN) {
            console.warn('⚠️ REPLICATE_API_TOKEN missing. Returning original image.');
            return imageUrl;
        }

        try {
            console.log('✨ Starting Face Restoration for:', imageUrl);

            // Model: sczhou/codeformer
            const output = await replicate.run(
                "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
                {
                    input: {
                        image: imageUrl,
                        codeformer_fidelity: 0.7, // Balance between quality and fidelity (0-1)
                        background_enhance: true,
                        face_upsample: true,
                        upscale: 2 // 2x Upscale
                    }
                }
            );

            console.log('✅ Face Restoration Complete:', output);
            return output as unknown as string;

        } catch (error) {
            console.error('❌ Face Restoration Failed:', error);
            // Fallback: Return original image so user flow doesn't break
            return imageUrl;
        }
    }
}


import { replicate } from '../config/clients';

export class UpscalingService {
    /**
     * Upscale an image to 4K using Real-ESRGAN
     * @param imageUrl URL of the image to upscale
     * @returns Upscaled image URL
     */
    static async upscaleImage(imageUrl: string): Promise<string> {
        if (!process.env.REPLICATE_API_TOKEN) {
            console.warn('⚠️ REPLICATE_API_TOKEN missing. Skipping upscale.');
            return imageUrl;
        }

        try {
            console.log('✨ Starting 4K Upscale for:', imageUrl);

            // Model: nightmareai/real-esrgan
            const output = await replicate.run(
                "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73ab415c725625e1bf4f3",
                {
                    input: {
                        image: imageUrl,
                        scale: 4, // 4x Upscale
                        face_enhance: true
                    }
                }
            );

            console.log('✅ 4K Upscale Complete:', output);
            return output as unknown as string;

        } catch (error) {
            console.error('❌ Upscale Failed:', error);
            // Fallback: Return original
            return imageUrl;
        }
    }
}

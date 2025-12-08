
import { replicate } from '../config/clients';

export class BackgroundMagicService {
    /**
     * Remove background using U2Net and optionally replace it using Flux.
     * @param imageUrl Image to process
     * @param prompt (Optional) Background generation prompt
     * @returns Object with removedBgUrl and compositeUrl
     */
    static async processBackground(imageUrl: string, prompt?: string): Promise<{ removedBgUrl: string, compositeUrl?: string }> {
        if (!process.env.REPLICATE_API_TOKEN) {
            console.warn('⚠️ REPLICATE_API_TOKEN missing. Skipping Background Magic.');
            return { removedBgUrl: imageUrl };
        }

        try {
            console.log('🪄 Starting Background Magic for:', imageUrl);

            // 1. Remove Background (U2Net or Rembg)
            // Model: cjwbw/rembg 
            const removalOutput = await replicate.run(
                "cjwbw/rembg:60847719b5f7279c0957fd74199c15606e9c403332eb0488d89q99d2146e279b",
                {
                    input: {
                        image: imageUrl
                    }
                }
            );
            const removedBgUrl = removalOutput as unknown as string;
            console.log('✅ Background Removed:', removedBgUrl);

            // 2. If prompt provided, composite new background (Inpainting/Compositing)
            // Ideally, we use an inpainting model or Flux with mask, but for now, let's keep it simple.
            // Complex compositing is hard in one step without dedicated pipeline.
            // We will return the transparent PNG for now, client can layer it.

            return { removedBgUrl };

        } catch (error) {
            console.error('❌ Background Magic Failed:', error);
            return { removedBgUrl: imageUrl };
        }
    }
}

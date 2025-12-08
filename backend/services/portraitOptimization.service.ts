
import { FaceRestorationService } from './faceRestoration.service';

export class PortraitOptimizationService {
    /**
     * optimize portrait with specific beautification parameters
     * @param imageUrl Image to optimize
     * @param intensity 0-100 intensity of smoothing/enhancement
     */
    static async optimizePortrait(imageUrl: string, intensity: number = 50): Promise<string> {
        // Elon Level: Reusing the Nuclear Engine (CodeFormer) but tuning parameters based on intensity.
        // In the future, we swap this for a dedicated "Beauty" model if needed.
        // For now, Face Restoration IS the optimization.

        console.log(`✨ Optimizing Portrait | Intensity: ${intensity}%`);

        // Map 0-100 to fidelity (0 = max smoothing, 1 = max fidelity/realism)
        // CodeFormer: lower fidelity = more restoration/smoothing.
        // Intensity 100 => Super smooth => Fidelity 0.1
        // Intensity 0 => Raw => Fidelity 1.0

        const fidelity = Math.max(0.1, 1 - (intensity / 100)); // Simple linear mapping

        // We actually need to modify FaceRestorationService to accept config, 
        // OR we just use Replicate directly here to avoid changing the other service signature too much.
        // Let's call Replicate directly for speed.

        const { replicate } = require('../config/clients');

        if (!process.env.REPLICATE_API_TOKEN) return imageUrl;

        try {
            const output = await replicate.run(
                "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
                {
                    input: {
                        image: imageUrl,
                        codeformer_fidelity: fidelity,
                        background_enhance: true,
                        face_upsample: true,
                        upscale: 1 // No upscale, just optimize
                    }
                }
            );
            return output as unknown as string;
        } catch (err) {
            console.error('Portrait Optimization Failed:', err);
            return imageUrl;
        }
    }
}

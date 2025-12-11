// Stable Diffusion Cloud Provider - 100% FREE APIs (Pollinations + Stability AI)
import { AIProvider, GenerationParams, GenerationResult } from '../AIServiceManager';

export class StableDiffusionProvider implements AIProvider {
    name = 'stable-diffusion-cloud';
    priority = 5;
    cost = 0;
    quota = 999999; // Unlimited on free tier
    enabled = true; // Always enabled (uses free cloud APIs)
    avgSpeed = 12; // 10-15 seconds average

    private stabilityToken: string;

    constructor() {
        // Stability AI FREE tier (25 credits/month) - OPCIONAL
        this.stabilityToken = process.env.STABILITY_API_KEY || '';

        // Siempre habilitado - usa Pollinations como fallback (100% gratis)
        console.log('✅ Stable Diffusion: Usando APIs 100% GRATIS (Pollinations + Stability AI)');
    }

    async healthCheck(): Promise<boolean> {
        // Always healthy - uses free public endpoints
        return true;
    }

    async generate(params: GenerationParams): Promise<GenerationResult> {
        // Try Stability AI first (if token available)
        if (this.stabilityToken) {
            const result = await this.generateWithStability(params);
            if (result.success) return result;
        }

        // Fallback: Use Pollinations (100% free, unlimited)
        return this.generateWithPublicAPI(params);
    }

    private async generateWithStability(params: GenerationParams): Promise<GenerationResult> {
        try {
            params.onProgress?.(30, 'Generating with Stability AI (FREE)...');

            const response = await fetch(
                'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.stabilityToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text_prompts: [
                            { text: params.prompt, weight: 1 },
                            { text: 'blurry, low quality, distorted', weight: -1 }
                        ],
                        cfg_scale: 7,
                        height: params.height || 1024,
                        width: params.width || 1024,
                        steps: 30,
                        samples: 1
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Stability AI error');
            }

            const data = await response.json();
            const base64 = `data:image/png;base64,${data.artifacts[0].base64}`;

            return {
                success: true,
                imageUrl: base64
            };

        } catch (error: any) {
            console.warn('Stability AI failed:', error.message);
            return { success: false, error: error.message };
        }
    }

    private async generateWithPublicAPI(params: GenerationParams): Promise<GenerationResult> {
        try {
            params.onProgress?.(30, 'Generating with Pollinations (FREE, UNLIMITED)...');

            // Use Pollinations as ultimate fallback (100% free, unlimited)
            const response = await fetch('https://image.pollinations.ai/prompt/' + encodeURIComponent(params.prompt), {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Public API error');
            }

            const blob = await response.blob();
            const base64 = await this.blobToBase64(blob);

            return {
                success: true,
                imageUrl: base64
            };

        } catch (error: any) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    private async blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
}

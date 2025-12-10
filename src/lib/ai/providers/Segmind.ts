// Segmind Provider - Free tier with monthly credits
import { AIProvider, GenerationParams, GenerationResult } from '../AIServiceManager';

export class SegmindProvider implements AIProvider {
    name = 'segmind';
    priority = 4;
    cost = 0;
    quota = 100; // 100 credits per month free
    enabled = true;

    private apiKey: string;
    private baseUrl = 'https://api.segmind.com/v1';

    // Available models
    private models = [
        'sdxl1.0-txt2img',
        'flux-schnell',
        'sd1.5-txt2img'
    ];

    constructor() {
        this.apiKey = process.env.SEGMIND_API_KEY || '';
        if (!this.apiKey) {
            console.warn('Segmind API key not found');
            this.enabled = false;
        }
    }

    async healthCheck(): Promise<boolean> {
        if (!this.enabled || !this.apiKey) return false;

        try {
            // Check if API key is valid
            const response = await fetch(
                `${this.baseUrl}/credits`,
                {
                    method: 'GET',
                    headers: {
                        'x-api-key': this.apiKey
                    }
                }
            );
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    async generate(params: GenerationParams): Promise<GenerationResult> {
        try {
            const model = this.models[0]; // Use SDXL by default

            const response = await fetch(
                `${this.baseUrl}/${model}`,
                {
                    method: 'POST',
                    headers: {
                        'x-api-key': this.apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: params.prompt,
                        negative_prompt: 'blurry, low quality, distorted face, bad anatomy',
                        samples: 1,
                        scheduler: 'DDIM',
                        num_inference_steps: 25,
                        guidance_scale: 7.5,
                        seed: Math.floor(Math.random() * 1000000),
                        img_width: params.width || 1024,
                        img_height: params.height || 1280,
                        base64: true
                    })
                }
            );

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Segmind error: ${error}`);
            }

            const data = await response.json();

            // Response contains base64 image
            const base64Image = `data:image/png;base64,${data.image}`;

            return {
                success: true,
                imageUrl: base64Image
            };

        } catch (error: any) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

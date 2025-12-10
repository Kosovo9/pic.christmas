// Hugging Face Provider - Using Stable Diffusion XL and Flux
import { AIProvider, GenerationParams, GenerationResult } from '../AIServiceManager';

export class HuggingFaceProvider implements AIProvider {
    name = 'huggingface';
    priority = 2;
    cost = 0;
    quota = 100; // 100 requests per day on free tier
    enabled = true;
    avgSpeed = 7; // 5-10 seconds average

    private apiKey: string;
    private baseUrl = 'https://api-inference.huggingface.co/models';

    // Multiple models for fallback
    private models = [
        'stabilityai/stable-diffusion-xl-base-1.0',
        'black-forest-labs/FLUX.1-dev',
        'runwayml/stable-diffusion-v1-5'
    ];

    constructor() {
        this.apiKey = process.env.HUGGING_FACE_API_KEY || '';
        if (!this.apiKey) {
            console.warn('Hugging Face API key not found');
            this.enabled = false;
        }
    }

    async healthCheck(): Promise<boolean> {
        if (!this.enabled || !this.apiKey) return false;

        try {
            const response = await fetch(
                `${this.baseUrl}/${this.models[0]}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ inputs: 'test' })
                }
            );
            return response.status !== 401 && response.status !== 403;
        } catch (error) {
            return false;
        }
    }

    async generate(params: GenerationParams): Promise<GenerationResult> {
        // Try each model until one succeeds
        for (const model of this.models) {
            try {
                const result = await this.generateWithModel(model, params);
                if (result.success) {
                    return result;
                }
            } catch (error) {
                console.warn(`Model ${model} failed, trying next...`);
                continue;
            }
        }

        return {
            success: false,
            error: 'All Hugging Face models failed'
        };
    }

    private async generateWithModel(model: string, params: GenerationParams): Promise<GenerationResult> {
        try {
            const response = await fetch(
                `${this.baseUrl}/${model}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        inputs: params.prompt,
                        parameters: {
                            width: params.width || 1024,
                            height: params.height || 1280,
                            num_inference_steps: 30,
                            guidance_scale: 7.5
                        }
                    })
                }
            );

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Hugging Face error: ${error}`);
            }

            // Response is a blob (image)
            const blob = await response.blob();

            // Convert blob to base64
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

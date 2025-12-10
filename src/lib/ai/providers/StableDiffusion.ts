// Stable Diffusion Local Provider - Self-hosted WebUI
import { AIProvider, GenerationParams, GenerationResult } from '../AIServiceManager';

export class StableDiffusionProvider implements AIProvider {
    name = 'stable-diffusion-local';
    priority = 5;
    cost = 0;
    quota = 999999; // Unlimited (self-hosted)
    enabled = false; // Disabled by default, enable if WebUI is running

    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.SD_WEBUI_URL || 'http://localhost:7860';

        // Auto-detect if WebUI is running
        this.checkWebUI();
    }

    private async checkWebUI() {
        try {
            const response = await fetch(`${this.baseUrl}/sdapi/v1/sd-models`, {
                method: 'GET'
            });
            this.enabled = response.ok;
        } catch (error) {
            this.enabled = false;
        }
    }

    async healthCheck(): Promise<boolean> {
        if (!this.enabled) return false;

        try {
            const response = await fetch(`${this.baseUrl}/sdapi/v1/sd-models`, {
                method: 'GET'
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    async generate(params: GenerationParams): Promise<GenerationResult> {
        try {
            const response = await fetch(
                `${this.baseUrl}/sdapi/v1/txt2img`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: params.prompt,
                        negative_prompt: 'blurry, low quality, distorted face, bad anatomy, ugly, deformed',
                        steps: 30,
                        cfg_scale: 7.5,
                        width: params.width || 1024,
                        height: params.height || 1280,
                        sampler_name: 'DPM++ 2M Karras',
                        seed: -1,
                        // ControlNet for face preservation
                        alwayson_scripts: {
                            controlnet: {
                                args: [{
                                    enabled: true,
                                    module: 'canny',
                                    model: 'control_v11p_sd15_canny',
                                    weight: 0.5,
                                    input_image: params.refPhoto
                                }]
                            }
                        }
                    })
                }
            );

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`SD WebUI error: ${error}`);
            }

            const data = await response.json();

            // Response contains base64 images array
            const base64Image = `data:image/png;base64,${data.images[0]}`;

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

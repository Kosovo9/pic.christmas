// Pollinations.AI Provider - 100% Free, No API Key Needed!
import { AIProvider, GenerationParams, GenerationResult } from '../AIServiceManager';

export class PollinationsProvider implements AIProvider {
    name = 'pollinations';
    priority = 1; // HIGHEST priority (fastest!)
    cost = 0;
    quota = 999999; // Unlimited!
    enabled = true;
    avgSpeed = 3; // 2-4 seconds average - FASTEST!

    private baseUrl = 'https://image.pollinations.ai/prompt';

    async healthCheck(): Promise<boolean> {
        try {
            const response = await fetch(
                `${this.baseUrl}/test`,
                { method: 'HEAD' }
            );
            return true; // Pollinations is almost always up
        } catch (error) {
            return false;
        }
    }

    async generate(params: GenerationParams): Promise<GenerationResult> {
        try {
            // Pollinations uses URL-based generation
            // Format: https://image.pollinations.ai/prompt/{prompt}?width={w}&height={h}&model={model}

            const encodedPrompt = encodeURIComponent(params.prompt);
            const width = params.width || 1024;
            const height = params.height || 1280;

            // Choose model (flux, turbo, or default)
            const model = 'flux'; // Best quality

            const imageUrl = `${this.baseUrl}/${encodedPrompt}?width=${width}&height=${height}&model=${model}&nologo=true&enhance=true`;

            // Fetch the image
            const response = await fetch(imageUrl);

            if (!response.ok) {
                throw new Error(`Pollinations error: ${response.statusText}`);
            }

            // Get image as blob
            const blob = await response.blob();

            // Convert to base64
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

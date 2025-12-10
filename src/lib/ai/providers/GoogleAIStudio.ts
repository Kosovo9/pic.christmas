// Google AI Studio Provider - Using Gemini for image generation
import { AIProvider, GenerationParams, GenerationResult } from '../AIServiceManager';

export class GoogleAIStudioProvider implements AIProvider {
    name = 'google-ai-studio';
    priority = 1;
    cost = 0;
    quota = 60; // 60 requests per minute
    enabled = true;

    private apiKey: string;
    private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

    constructor() {
        this.apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY || '';
        if (!this.apiKey) {
            console.warn('Google AI Studio API key not found');
            this.enabled = false;
        }
    }

    async healthCheck(): Promise<boolean> {
        if (!this.enabled || !this.apiKey) return false;

        try {
            const response = await fetch(
                `${this.baseUrl}/models?key=${this.apiKey}`,
                { method: 'GET' }
            );
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    async generate(params: GenerationParams): Promise<GenerationResult> {
        try {
            // Use Gemini Pro Vision to enhance the prompt first
            const enhancedPrompt = await this.enhancePrompt(params.prompt, params.refPhoto);

            // Generate image using Imagen (via Gemini API)
            const response = await fetch(
                `${this.baseUrl}/models/gemini-pro-vision:generateContent?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                {
                                    text: `Generate a Christmas portrait based on this description: ${enhancedPrompt}. Preserve the person's facial features exactly as shown in the reference image.`
                                },
                                {
                                    inline_data: {
                                        mime_type: 'image/jpeg',
                                        data: params.refPhoto.split(',')[1] // Remove data:image/jpeg;base64,
                                    }
                                }
                            ]
                        }],
                        generationConfig: {
                            temperature: 0.4,
                            topK: 32,
                            topP: 1,
                            maxOutputTokens: 4096,
                        }
                    })
                }
            );

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Google AI Studio error: ${error}`);
            }

            const data = await response.json();

            // Extract generated image URL from response
            // Note: Gemini returns text, we'll use Pollinations as fallback for actual image
            // This is a limitation - Google AI Studio doesn't directly generate images yet
            // We'll use it for prompt enhancement and fall back to other providers

            return {
                success: false,
                error: 'Google AI Studio used for prompt enhancement only, falling back to image generation provider'
            };

        } catch (error: any) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    private async enhancePrompt(originalPrompt: string, refPhoto: string): Promise<string> {
        try {
            const response = await fetch(
                `${this.baseUrl}/models/gemini-pro-vision:generateContent?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                {
                                    text: `Analyze this person's facial features in detail (eye color, face shape, skin tone, hair style, age, ethnicity) and enhance this Christmas portrait prompt to preserve their identity: "${originalPrompt}". Return only the enhanced prompt, nothing else.`
                                },
                                {
                                    inline_data: {
                                        mime_type: 'image/jpeg',
                                        data: refPhoto.split(',')[1]
                                    }
                                }
                            ]
                        }]
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                const enhancedPrompt = data.candidates?.[0]?.content?.parts?.[0]?.text || originalPrompt;
                return enhancedPrompt.trim();
            }

            return originalPrompt;
        } catch (error) {
            console.error('Prompt enhancement failed:', error);
            return originalPrompt;
        }
    }
}

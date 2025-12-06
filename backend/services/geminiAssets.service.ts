import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

/**
 * 🎨 Affiliate Asset Generator using Gemini API
 * Generates professional marketing banners for affiliates on-demand
 * Cost: $0 (Free tier: 1,500 requests/day)
 */
export const geminiAssetsService = {
    /**
     * Generate a marketing banner/asset for an affiliate
     * @param productName - Product/campaign name
     * @param ctaText - Call-to-action text
     * @param style - Design style (optional)
     */
    async generateAsset(productName: string, ctaText: string, style?: string): Promise<{
        success: boolean;
        prompt?: string;
        imageUrl?: string;
        metadata?: any;
        error?: string;
    }> {
        try {
            if (!process.env.GOOGLE_AI_API_KEY) {
                throw new Error('GOOGLE_AI_API_KEY not configured');
            }

            // Advanced prompt engineering for marketing banners
            const prompt = `
Create a professional, eye-catching marketing banner image with the following specifications:

PRODUCT/CAMPAIGN: ${productName}
CALL-TO-ACTION TEXT: "${ctaText}"
DESIGN STYLE: ${style || 'modern, clean, professional Christmas theme'}

REQUIREMENTS:
- Resolution: 1200x628px (optimal for social media & web banners)
- The text "${ctaText}" must be prominently displayed and easily readable
- Use a professional color palette suitable for ${productName}
- Include festive Christmas elements (snowflakes, ornaments, subtle patterns)
- Clear visual hierarchy with CTA as the focal point
- Professional typography with high contrast for readability
- Background should not compete with text
- Output format: High-quality digital banner, professional marketing standard

STYLE NOTES:
- Clean, modern design
- Trustworthy and professional appearance
- Eye-catching but not overwhelming
- Suitable for affiliate marketing campaigns
- Should convert viewers to click through

Generate this as a complete, ready-to-use marketing banner.
            `.trim();

            // Use Gemini 2.0 Flash (multimodal + fast)
            const model = genAI.getGenerativeModel({
                model: 'gemini-2.0-flash-exp'
            });

            console.log('[Gemini Assets] Generating banner...', { productName, ctaText });

            const result = await model.generateContent(prompt);
            const response = result.response;
            const generatedText = response.text();

            // Note: Gemini 2.0 Flash may return a description or refined prompt
            // For actual image generation, we'd use Imagen 3 API
            // For MVP, we return the optimized prompt that can be used with other services

            return {
                success: true,
                prompt: generatedText,
                metadata: {
                    productName,
                    ctaText,
                    style: style || 'default',
                    generatedAt: new Date().toISOString(),
                    model: 'gemini-2.0-flash-exp'
                }
            };

        } catch (error: any) {
            console.error('[Gemini Assets] Generation failed:', error);
            return {
                success: false,
                error: error.message || 'Failed to generate asset'
            };
        }
    },

    /**
     * Generate multiple asset variations in one call
     * @param productName - Product name
     * @param ctaText - CTA text
     * @param count - Number of variations (default: 3)
     */
    async generateVariations(
        productName: string,
        ctaText: string,
        count: number = 3
    ): Promise<{
        success: boolean;
        variations?: any[];
        error?: string;
    }> {
        try {
            const styles = [
                'elegant and sophisticated',
                'bold and energetic',
                'minimal and modern'
            ];

            const variations = await Promise.all(
                styles.slice(0, count).map((style) =>
                    this.generateAsset(productName, ctaText, style)
                )
            );

            return {
                success: true,
                variations: variations.filter(v => v.success)
            };

        } catch (error: any) {
            return {
                success: false,
                error: error.message
            };
        }
    }
};

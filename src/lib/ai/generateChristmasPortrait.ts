// Christmas Portrait Generation - Using Free AI Service Manager with HYPER-REALISTIC Prompts
import { aiServiceManager } from './AIServiceManager';
import type { GenerationParams } from './AIServiceManager';
import { generateHyperRealisticPrompt, CHRISTMAS_HYPER_REALISTIC_PROMPTS } from './HyperRealisticPrompts';

export interface ChristmasPortraitOptions {
    presetId?: string;
    prompt?: string;
    language?: string;
    aspectRatio?: string;
}

export async function generateImage(
    refPhotos: string[],
    options: ChristmasPortraitOptions
) {
    // Get the first reference photo
    const refPhoto = refPhotos[0] || '';

    // Build the HYPER-REALISTIC prompt
    let finalPrompt = options.prompt || '';

    // If using preset, get SAYAYIN-LEVEL preset prompt
    if (options.presetId && !finalPrompt) {
        finalPrompt = getHyperRealisticPresetPrompt(options.presetId, options.language || 'en');
    }

    // If custom prompt, enhance it to 8K quality
    if (finalPrompt && !options.presetId) {
        finalPrompt = enhanceToHyperRealistic(finalPrompt);
    }

    // Determine dimensions from aspect ratio (8K resolution)
    const dimensions = get8KDimensionsFromAspectRatio(options.aspectRatio || '4:5');

    // Generate using AI Service Manager with HYPER-REALISTIC specs
    const params: GenerationParams = {
        refPhoto,
        prompt: finalPrompt,
        width: dimensions.width,
        height: dimensions.height,
        style: 'hyper-realistic-8k'
    };

    const result = await aiServiceManager.generate(params);

    if (!result.success) {
        throw new Error(result.error || 'Generation failed');
    }

    return {
        url: result.imageUrl!,
        presetId: options.presetId || 'custom',
        provider: result.provider,
        timeTaken: result.timeTaken
    };
}


function getHyperRealisticPresetPrompt(presetId: string, language: string): string {
    const subject = language === 'es' ? 'Persona' : 'Person';

    const presets: Record<string, () => string> = {
        'christmas-classic': () => CHRISTMAS_HYPER_REALISTIC_PROMPTS.classicTree(subject),
        'christmas-winter': () => CHRISTMAS_HYPER_REALISTIC_PROMPTS.snowyWonderland(subject),
        'christmas-cozy': () => CHRISTMAS_HYPER_REALISTIC_PROMPTS.cozyfireplace(subject),
        'christmas-elegant': () => CHRISTMAS_HYPER_REALISTIC_PROMPTS.fashionEditorial(subject),
        'christmas-vintage': () => CHRISTMAS_HYPER_REALISTIC_PROMPTS.vintageGlamour(subject)
    };

    return presets[presetId]?.() || presets['christmas-classic']();
}

function enhanceToHyperRealistic(prompt: string): string {
    // Add SAYAYIN-LEVEL technical specifications
    const hyperRealisticEnhancements = `
${prompt}

TECHNICAL SPECIFICATIONS - 8K HYPER-REALISTIC:
- Camera: Hasselblad H6D-400c MS or Phase One XF IQ4 150MP
- Lens: Professional prime lens 85mm f/1.2 or 80mm f/2.8
- Resolution: 8K (7680x4320) minimum, 16-bit color depth
- Aperture: f/1.2 to f/2.8 (ultra-shallow depth of field, creamy bokeh)
- ISO: 50-100 (zero noise, pristine quality)
- Lighting: Professional 3-point studio setup with Profoto or Aputure lights
- Color Grading: Cinematic orange & teal LUT, film grain 8%, lifted shadows
- Post-Processing: Frequency separation, dodge & burn, professional retouching
- Quality: Vogue Magazine cover standard, Annie Leibovitz level artistry
- Sharpness: Tack-sharp focus on eyes, pixel-level detail
- Skin Tones: Perfectly calibrated, ColorChecker accurate
- Dynamic Range: 14+ stops, rich blacks, smooth highlights
- Output: Museum-quality, award-winning portrait photography

PRESERVE FACIAL IDENTITY: Maintain exact facial features, skin tone, eye color, face shape, and all unique characteristics. 100% recognizable as the same person.
`.trim();

    return hyperRealisticEnhancements;
}

function get8KDimensionsFromAspectRatio(aspectRatio: string): { width: number; height: number } {
    // 8K and 4K resolutions for maximum quality
    const ratios: Record<string, { width: number; height: number }> = {
        '1:1': { width: 4096, height: 4096 },      // 4K square
        '4:5': { width: 3456, height: 4320 },      // 8K portrait
        '9:16': { width: 2160, height: 3840 },     // 4K vertical
        '16:9': { width: 7680, height: 4320 },     // 8K landscape
        '3:4': { width: 3240, height: 4320 }       // 8K portrait
    };

    return ratios[aspectRatio] || ratios['4:5'];
}

// Export provider stats for monitoring
export async function getProviderStats() {
    return aiServiceManager.getProviderStats();
}

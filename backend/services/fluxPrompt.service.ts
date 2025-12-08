
export class FluxPromptService {
    /**
     * Generate HYPER-SPECIFIC prompts that lock face identity
     * while transforming style
     */
    static generatePrompt(
        faceProfile: any,
        style: string,
        context: string
    ): string {

        // Defaults if profile missing deep details
        const eyeColor = faceProfile.eyes?.color || 'natural';
        const skinTone = faceProfile.skin?.tone || 'natural';
        const hairColor = faceProfile.hair?.color || 'natural';
        const faceShape = faceProfile.faceShape || 'oval';
        const uniqueMarkers = faceProfile.uniqueMarkers?.join(', ') || 'Preserve facial identity';

        // PROMPT STRUCTURE: Lock identity + Style transformation
        const prompt = `
  IDENTITY-LOCKED PORTRAIT GENERATION
  
  PERSON: ${faceProfile.unique_id || 'Subject'}
  ABSOLUTE REQUIREMENTS (MUST NOT CHANGE):
  - Exact eye color: ${eyeColor}
  - Exact skin tone: ${skinTone}
  - Exact facial structure: ${faceShape}
  - Hair Color: ${hairColor}
  - Distinctive markers: ${uniqueMarkers}
  
  FACIAL CHARACTERISTICS (PRESERVE EXACTLY):
  Eyes: ${faceProfile.eyes?.shape || 'natural'} shape, ${eyeColor}
  Nose: ${faceProfile.nose?.width || 'medium'} width
  Mouth: ${faceProfile.mouth?.shape || 'natural'} shape
  
  TRANSFORMATION DIRECTIVE:
  Style: ${style}
  Context: ${context}
  
  GENERATION RULES:
  1. LOCK THE FACE - DO NOT CHANGE ANY FACIAL FEATURES
  2. Maintain exact facial proportions and characteristics
  3. Preserve all birthmarks, scars, moles exactly
  4. Generate in hyper-realistic photography style (8K, photorealistic)
  5. Do NOT add artificial filters, keep skin texture natural
  
  STYLE SPECIFICS:
  ${this.getStyleSpecificDirectives(style)}
  
  OUTPUT: Ultra-realistic, professional-grade portrait that respects identity.
  `;

        return prompt;
    }

    private static getStyleSpecificDirectives(style: string): string {
        const directives: Record<string, string> = {
            'Christmas Realistic': `
          - Warm, golden Christmas lighting
          - Festive background (blurred tree, lights)
          - Subtle festive sweater or coat if visible
          - Keep expression natural
        `,
            'Santa Suit': `
          - Authentic Santa Claus suit (red velvet, white fur)
          - Professional costume quality
          - Background: North Pole workshop or cozy fireplace
        `,
            'Elf Magic': `
          - Green/Red Elf costume with detailed embroidery
          - Whimsical forest or workshop background
          - Magical lighting effects (sparkles)
          - Ears can be slightly pointed if consistent with Elf theme
        `,
            'Professional Headshot': `
          - Studio lighting (3-point)
          - Neutral grey or bokeh office background
          - Business professional attire
          - Sharp focus on eyes
        `,
            'Winter Wonderland': `
          - Snowy outdoor landscape
          - Soft, cool winter lighting
          - Winter Coat/Scarf
          - Natural skin tones despite cold environment
        `
        };

        return directives[style] || 'Apply the specified style while preserving facial identity exactly.';
    }
}

// HYPER-REALISTIC PROMPT GENERATOR - SAYAYIN LEVEL 100+
// Professional 8K Photography Specifications

export interface PhotographySpecs {
    camera: string;
    lens: string;
    aperture: string;
    iso: string;
    shutterSpeed: string;
    resolution: string;
    lighting: string;
    colorGrading: string;
    postProcessing: string[];
}

export const PROFESSIONAL_CAMERAS = {
    hasselblad: {
        camera: "Hasselblad H6D-400c MS",
        lens: "HC 80mm f/2.8",
        aperture: "f/2.8",
        iso: "ISO 64",
        shutterSpeed: "1/125s",
        resolution: "400MP, 16-bit color depth, 8K RAW"
    },
    phaseOne: {
        camera: "Phase One XF IQ4 150MP",
        lens: "Schneider Kreuznach 80mm LS f/2.8",
        aperture: "f/2.8",
        iso: "ISO 50",
        shutterSpeed: "1/160s",
        resolution: "150MP, 16-bit color, 8K output"
    },
    canon: {
        camera: "Canon EOS R5 C",
        lens: "Canon RF 85mm f/1.2 L USM",
        aperture: "f/1.2",
        iso: "ISO 100",
        shutterSpeed: "1/200s",
        resolution: "8K RAW, 45MP stills"
    },
    sony: {
        camera: "Sony A1",
        lens: "Sony FE 85mm f/1.4 GM",
        aperture: "f/1.4",
        iso: "ISO 100",
        shutterSpeed: "1/250s",
        resolution: "50.1MP, 8K video capability"
    },
    nikon: {
        camera: "Nikon Z9",
        lens: "NIKKOR Z 85mm f/1.2 S",
        aperture: "f/1.2",
        iso: "ISO 64",
        shutterSpeed: "1/200s",
        resolution: "45.7MP, 8K RAW"
    }
};

export const EPIC_LIGHTING_SETUPS = {
    studio3Point: {
        name: "Epic 3-Point Studio Lighting",
        setup: "Key light: Profoto B10X Plus at 45° (5600K, 500W), Fill light: Profoto D2 1000 at camera level (5400K, 30% power), Rim light: Aputure 600d Pro behind subject (5600K, backlit), Hair light: Godox SL-200W from above (5800K)",
        modifiers: "90cm Octabox on key, 120cm Softbox on fill, 10° Grid on rim, Snoot on hair light",
        result: "Cinematic depth, perfect skin tones, dimensional separation, professional magazine quality"
    },
    naturalWindow: {
        name: "God-Tier Natural Window Light",
        setup: "North-facing window at golden hour (4500K), 5-in-1 reflector gold side at 45° for fill, white bounce card opposite window, black flag to control spill",
        modifiers: "Sheer white curtain for diffusion, California Sunbounce Pro reflector",
        result: "Soft, flattering, Vogue-style natural light with perfect skin rendering"
    },
    rembrandt: {
        name: "Rembrandt Lighting Masterclass",
        setup: "Main light: Profoto B10 at 45° high (5600K, 400W), Reflector: Silver at 30° low for fill, Background light: Aputure 300d II with blue gel (6500K)",
        modifiers: "Beauty dish with grid on main, Large silver reflector",
        result: "Classic triangle under eye, dramatic depth, timeless portrait aesthetic"
    },
    highKey: {
        name: "High-Key Fashion Editorial",
        setup: "Two Profoto D2 1000 at 45° both sides (5600K, equal power), Background: Three Aputure 600d Pro on white seamless (overexposed +2 stops), Fill: Large white V-flat",
        modifiers: "Strip boxes on main lights, no modifiers on background",
        result: "Pure white background, flawless skin, high-fashion magazine cover quality"
    },
    dramatic: {
        name: "Dramatic Chiaroscuro Lighting",
        setup: "Single Profoto B10X Plus at 90° side (5600K, 600W), Black V-flats on opposite side, Rim light: Aputure 300d II with CTO gel from behind (3200K)",
        modifiers: "Narrow strip box with grid, barn doors on rim",
        result: "High contrast, sculptural shadows, fine art portrait quality"
    }
};

export const COLOR_GRADING_PRESETS = {
    orangeTeal: {
        name: "Cinematic Orange & Teal",
        process: "Lift shadows to teal (RGB: 0, 128, 128), Push highlights to warm orange (RGB: 255, 200, 150), S-curve for contrast, Film grain 8%, Vignette -15",
        lut: "Kodak 2383 D65 emulation",
        result: "Blockbuster movie aesthetic, Instagram-ready, viral potential"
    },
    filmicPro: {
        name: "Filmic Pro Grade",
        process: "Kodak Vision3 500T emulation, Bleach bypass 20%, Halation glow on highlights, Film grain 12%, Color temperature shift +200K",
        lut: "Fuji Eterna 250D simulation",
        result: "Authentic film look, timeless quality, museum-worthy"
    },
    fashionEditorial: {
        name: "High-Fashion Editorial",
        process: "Crushed blacks (lift +10), Creamy highlights (gamma 1.2), Skin tone isolation and enhancement, Selective color grading, Clarity +30",
        lut: "Vogue Magazine LUT",
        result: "Magazine cover quality, luxury brand aesthetic"
    },
    naturalEnhanced: {
        name: "Natural Enhanced Realism",
        process: "Subtle S-curve, Skin tone perfection, Eye enhancement, Teeth whitening, Micro-contrast +15, Sharpening 80",
        lut: "Neutral density with warmth",
        result: "Hyper-realistic yet natural, commercial photography standard"
    }
};

export function generateHyperRealisticPrompt(
    subject: string,
    scene: string,
    style: 'studio' | 'natural' | 'dramatic' | 'fashion' | 'cinematic' = 'cinematic'
): string {
    // Select camera system
    const camera = PROFESSIONAL_CAMERAS.hasselblad; // Default to best

    // Select lighting based on style
    let lighting;
    switch (style) {
        case 'studio':
            lighting = EPIC_LIGHTING_SETUPS.studio3Point;
            break;
        case 'natural':
            lighting = EPIC_LIGHTING_SETUPS.naturalWindow;
            break;
        case 'dramatic':
            lighting = EPIC_LIGHTING_SETUPS.dramatic;
            break;
        case 'fashion':
            lighting = EPIC_LIGHTING_SETUPS.highKey;
            break;
        default:
            lighting = EPIC_LIGHTING_SETUPS.rembrandt;
    }

    // Select color grading
    const grading = COLOR_GRADING_PRESETS.orangeTeal;

    // Build hyper-realistic prompt
    const prompt = `
HYPER-REALISTIC PROFESSIONAL PORTRAIT - SAYAYIN LEVEL 100+

SUBJECT: ${subject}
SCENE: ${scene}

CAMERA SPECIFICATIONS:
- Camera: ${camera.camera}
- Lens: ${camera.lens}
- Aperture: ${camera.aperture} (ultra-shallow depth of field, creamy bokeh)
- ISO: ${camera.iso} (zero noise, pristine image quality)
- Shutter Speed: ${camera.shutterSpeed} (tack-sharp focus)
- Resolution: ${camera.resolution}
- Format: 16-bit RAW, ProRes 4444 XQ for video
- Bit Depth: 16-bit color for maximum dynamic range

LIGHTING SETUP - ${lighting.name}:
${lighting.setup}
Modifiers: ${lighting.modifiers}
Result: ${lighting.result}

COLOR GRADING - ${grading.name}:
${grading.process}
LUT Applied: ${grading.lut}
Final Look: ${grading.result}

POST-PROCESSING (Adobe Lightroom + Photoshop):
1. Frequency Separation for flawless skin (high-end retouching)
2. Dodge & Burn for dimensional sculpting
3. Color grading with professional LUTs
4. Micro-contrast enhancement (+25)
5. Selective sharpening (eyes, hair, details)
6. Luminosity masking for perfect exposure
7. Film grain overlay (8% for organic feel)
8. Vignette (-12, feathered 80%)
9. Chromatic aberration removal
10. Lens correction and perspective adjustment

TECHNICAL EXCELLENCE:
- Tack-sharp focus on eyes (critical focus point)
- Perfectly exposed skin tones (18% gray metered)
- Zero noise even in shadows
- Rich, deep blacks with detail retention
- Smooth highlight rolloff (no clipping)
- Accurate color reproduction (ColorChecker calibrated)
- Professional retouching (invisible, natural)
- 8K resolution with pixel-level sharpness

ARTISTIC DIRECTION:
- Composition: Rule of thirds, leading lines, negative space
- Expression: Authentic, genuine emotion captured
- Styling: Professional wardrobe, hair, makeup
- Background: Perfectly blurred (bokeh), complementary colors
- Mood: ${style === 'dramatic' ? 'Intense, powerful, commanding' : style === 'fashion' ? 'Elegant, sophisticated, luxurious' : 'Warm, inviting, timeless'}

QUALITY BENCHMARKS:
- Vogue Magazine cover quality
- Annie Leibovitz level artistry
- Peter Lindbergh aesthetic
- Mario Testino glamour
- Steven Meisel fashion editorial
- National Geographic technical excellence

OUTPUT SPECIFICATIONS:
- 8K resolution (7680 x 4320 pixels minimum)
- 16-bit color depth
- Adobe RGB color space
- 300 DPI for print
- Uncompressed TIFF master file
- Web-optimized JPEG (quality 95%)

FINAL RESULT: Museum-quality, award-winning portrait photography that stops viewers in their tracks. Hyper-realistic yet artistic. Technical perfection meets creative vision. Suitable for luxury brand campaigns, magazine covers, gallery exhibitions, and viral social media content.

PRESERVE FACIAL IDENTITY: Maintain exact facial features, skin tone, eye color, face shape, and unique characteristics of the subject. This is a portrait enhancement, not a face replacement. The person must be 100% recognizable.
`.trim();

    return prompt;
}

// Christmas-specific hyper-realistic prompts
export const CHRISTMAS_HYPER_REALISTIC_PROMPTS = {
    classicTree: (subject: string) => generateHyperRealisticPrompt(
        subject,
        "Standing in front of massive 15-foot decorated Christmas tree with 10,000 warm white LED lights, gold and red ornaments, in luxury hotel lobby with marble floors and crystal chandeliers",
        "cinematic"
    ),

    snowyWonderland: (subject: string) => generateHyperRealisticPrompt(
        subject,
        "In snow-covered pine forest at golden hour, fresh snowflakes falling and catching light, winter coat with fur trim, breath visible in cold air, magical atmosphere",
        "natural"
    ),

    cozyfireplace: (subject: string) => generateHyperRealisticPrompt(
        subject,
        "Sitting by stone fireplace in rustic luxury cabin, wearing cashmere Christmas sweater, holding ceramic mug of hot cocoa, warm fireplace glow, Christmas stockings hanging, cozy intimate setting",
        "dramatic"
    ),

    fashionEditorial: (subject: string) => generateHyperRealisticPrompt(
        subject,
        "High-fashion Christmas editorial in designer holiday attire, luxury penthouse with floor-to-ceiling windows showing snowy city skyline, champagne glass, sophisticated elegant atmosphere",
        "fashion"
    ),

    vintageGlamour: (subject: string) => generateHyperRealisticPrompt(
        subject,
        "1950s vintage Christmas glamour portrait, classic Hollywood lighting, retro holiday decorations, timeless elegant styling, film photography aesthetic with modern 8K quality",
        "studio"
    )
};

export default generateHyperRealisticPrompt;

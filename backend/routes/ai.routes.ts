import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { getTranslation } from '../utils/translations';
import { AIPipelineService } from '../services/aiPipeline.service';

dotenv.config();

const router = express.Router();

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

import { CHRISTMAS_PROMPTS } from '../config/christmasPrompts';

// @desc    Generate a Hyper-Realistic Christmas Photo
// @route   POST /api/ai/generate-christmas
// @access  Public
router.post('/generate-christmas', async (req, res) => {
    try {
        const { promptId, config, fileUrls, tier = 'turbo' } = req.body;

        // 1. Lookup the Template
        const template = CHRISTMAS_PROMPTS.find(p => p.id === promptId);

        if (!template) {
            console.warn(`Template ${promptId} not found, using generic.`);
        }

        const selectedPromptBase = template?.basePrompt || "A magical Christmas photo";
        const { adults, children, pets } = config || {};

        // 2. Construct the "Oscar-Winning" System Prompt
        const systemPrompt = `
        ACT AS: World-class Cinematographer & AI Artist (Harvard/Oscar level).
        
        TASK: Generate a hyper-realistic Christmas masterpiece based on the User's photos.
        
        SCENE TEMPLATE: "${selectedPromptBase}"
        
        SUBJECTS: ${adults} Adults, ${children} Children, ${pets} Pets.
        
        CRITICAL RULES (NON-NEGOTIABLE):
        1. **FACE PRESERVATION**: The faces from the source images MUST be preserved with 100% fidelity. Do not alter facial features, identity, or expressions unless requested.
        2. **HYPER-REALISM**: 8K resolution, incredibly detailed textures (velvet, snow, fur, skin pores).
        3. **LIGHTING**: Cinematic depth of field, bokeh, volumetric lighting (Rembrandt or Butterfly lighting).
        4. **COMPOSITION**: Perfect "Golden Ratio" framing.
        5. **KEYWORD INJECTION**: "Raw photo, Hasselblad X2D, 85mm f/1.2, photorealistic, premium, luxury".
        
        EXECUTION:
        - Harmonize the lighting of the subjects to match the scene perfectly.
        - Ensure skin tones are natural and consistent with the environment's color grading.
        `;

        console.log('🎄 Generating Christmas Magic with Prompt:', template?.title);
        console.log(`⚡ Using ${tier === 'premium' ? 'Flux Pro (Quality)' : 'Flux Schnell (TURBO)'}`);

        let imageUrl: string;

        // 3. Execute the Nuclear Pipeline (Flux + FaceSwap)
        const hasReplicateKey = process.env.REPLICATE_API_TOKEN && process.env.REPLICATE_API_TOKEN !== 'MISSING_TOKEN';
        const userPhoto = fileUrls && fileUrls.length > 0 ? fileUrls[0] : null;

        if (hasReplicateKey && userPhoto) {
            try {
                imageUrl = await AIPipelineService.executePipeline(
                    selectedPromptBase,
                    userPhoto,
                    tier as 'turbo' | 'premium'
                );
                console.log('✅ Real AI Generation Complete:', imageUrl);
            } catch (pipelineError) {
                console.error('⚠️ Pipeline failed, falling back to mock:', pipelineError);
                imageUrl = getFallbackImage(template?.category);
            }
        } else {
            console.log('⚠️ No Replicate key or user photo, using fallback mock image');
            imageUrl = getFallbackImage(template?.category);
        }

        res.json({
            success: true,
            message: "Christmas Magic Generated",
            imageUrl: imageUrl,
            metadata: {
                promptId: promptId,
                templateTitle: template?.title,
                generationId: "gen_" + Date.now(),
                tier: tier,
                mode: hasReplicateKey ? 'live' : 'demo'
            }
        });

    } catch (error: any) {
        console.error('Generate Christmas Error:', error);
        res.status(500).json({ message: 'Failed to generate magic', error: error.message });
    }
});

// Helper function for fallback images
function getFallbackImage(category?: string): string {
    switch (category) {
        case 'couples_elite':
            return "https://images.unsplash.com/photo-1543258103-a62bdc069871?q=80&w=2070&auto=format&fit=crop";
        case 'family_dynasty':
            return "https://images.unsplash.com/photo-1576919228636-1e58f3f5a711?q=80&w=2070&auto=format&fit=crop";
        case 'pet_natgeo':
            return "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=2070&auto=format&fit=crop";
        case 'global_luxury':
            return "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=2070&auto=format&fit=crop";
        case 'fantasy_creative':
            return "https://images.unsplash.com/photo-1514373941175-0a141072bbc8?q=80&w=2070&auto=format&fit=crop";
        default:
            return "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop";
    }
}


// ... existing export default router
// @route   POST /api/ai/enhance-prompt
// @access  Public
router.post('/enhance-prompt', async (req, res) => {
    try {
        const { userPrompt, config } = req.body;

        if (!userPrompt || !config) {
            return res.status(400).json({
                message: 'userPrompt and config required'
            });
        }

        const { adults, children, pets } = config;

        // Build enhancement instructions
        // Build enhancement instructions (Oscar-Winning Cinematographer Persona)
        const systemPrompt = `You are a world-renowned Cinematographer and Photographer, winner of 10 Academy Awards for visual excellence, specifically famous for hyper-realistic portraits of people and pets (canes/dogs).
        
        YOUR MISSION:
        Enhance the user's simple Christmas idea into a breathtaking, hyper-realistic photography prompt.
        
        CRITICAL INSTRUCTIONS:
        1.  **Style**: Cinematic, 8k resolution, highly detailed, photorealistic, depth of field (bokeh), Hasselblad X2D quality.
        2.  **Lighting**: Masterful use of warm, festive lighting (golden hour, fireplace glow, twinkling fairy lights).
        3.  **Subject**: Respect the user's input exactly: ${adults} adults, ${children} children, ${pets} pets. Ensure they are the clear focus.
        4.  **Atmosphere**: Magical, cozy, premium, high-end Christmas editorial.
        5.  **Technical**: "Shot on 85mm f/1.2 lens, incredible texture details, volumetric lighting, perfect composition."
        
        USER INPUT: "${userPrompt}"
        
        OUTPUT (The Prompt ONLY):`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const enhancedPrompt = response.text().trim();

        res.json({
            original: userPrompt,
            enhanced: enhancedPrompt,
            config: {
                adults,
                children,
                pets
            }
        });

    } catch (error: any) {
        console.error('AI Enhancement Error:', error);

        // Fallback if AI fails - return original with basic enhancement
        const { userPrompt, config } = req.body;
        const { adults, children, pets } = config;

        const fallbackEnhanced = `Christmas photo of ${adults > 0 ? `${adults} ${adults === 1 ? 'person' : 'people'}` : ''}${children > 0 ? `, ${children} ${children === 1 ? 'child' : 'children'}` : ''}${pets > 0 ? `, ${pets} ${pets === 1 ? 'pet' : 'pets'}` : ''}: ${userPrompt}, festive Christmas atmosphere, warm lighting, professional photography`;

        res.json({
            original: userPrompt,
            enhanced: fallbackEnhanced,
            config,
            fallback: true,
            message: 'AI service unavailable, using fallback enhancement'
        });
    }
});

// @desc    Generate Christmas-themed variations
// @route   POST /api/ai/variations
// @access  Public
router.post('/variations', async (req, res) => {
    try {
        const { basePrompt, count = 3 } = req.body;

        if (!basePrompt) {
            return res.status(400).json({ message: 'basePrompt required' });
        }

        const systemPrompt = `Generate ${count} creative Christmas photo variations based on this concept: "${basePrompt}"

Each variation should be a complete photo prompt with different Christmas settings, styles, or vibes. Return as JSON array with format:
[
  {"title": "Short Title", "description": "Full prompt"},
  ...
]`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        // Try to parse JSON from response
        let variations;
        try {
            // Remove markdown code blocks if present
            const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            variations = JSON.parse(cleaned);
        } catch {
            // Fallback if parsing fails
            variations = [
                {
                    title: "Original",
                    description: basePrompt
                }
            ];
        }

        res.json({
            basePrompt,
            variations,
            count: variations.length
        });

    } catch (error: any) {
        console.error('AI Variations Error:', error);
        res.status(500).json({
            message: 'Could not generate variations',
            error: error.message
        });
    }
});

// @desc    Scan image for safety (NSFW, Violence, etc.)
// @route   POST /api/ai/safety-check
// @access  Public
router.post('/safety-check', async (req, res) => {
    try {
        const { image } = req.body; // Expects Base64 string (without prefix potentially, or handle it)

        if (!process.env.GOOGLE_AI_API_KEY) {
            console.error('Safety Check Critical Error: GOOGLE_AI_API_KEY is missing');
            // Fail open or closed? For now, fail closed to be safe, but log heavily.
            return res.status(500).json({ safe: false, reason: "Server configuration error (Safety API Key)" });
        }

        if (!image) {
            return res.status(400).json({ message: 'Image data required' });
        }

        console.log('🛡️ Safety Check: Received request to scan image...');

        // Clean base64 if needed (remove "data:image/jpeg;base64," prefix)
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

        const prompt = `Analyze this image strictly for safety moderation. 
        Look for:
        1. Nudity or sexual content
        2. Graphic violence or gore
        3. Hate symbols
        4. Child exploitation materials (CSAM) - VERY CRITICAL
        
        Return ONLY a JSON object:
        {
            "safe": boolean,
            "reason": "string (short explanation if unsafe, otherwise 'safe')"
        }`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: "image/jpeg",
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();
        console.log('🛡️ Safety Check: AI Response received:', text.substring(0, 100) + '...');

        // Safe parsing
        let safetyResult;
        try {
            const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            safetyResult = JSON.parse(cleaned);
        } catch (e) {
            // If JSON parse fails, check if text contains "safe": true
            console.warn("Gemini Safety JSON parse failed, text:", text);
            if (text.toLowerCase().includes('"safe": true') || text.toLowerCase().includes('safe: true')) {
                safetyResult = { safe: true, reason: "Safe" };
            } else {
                safetyResult = { safe: false, reason: "AI Response Check Failed" };
            }
        }

        if (safetyResult.safe) {
            console.log('✅ Safety Check: Passed');
        } else {
            console.warn('❌ Safety Check: Failed -', safetyResult.reason);
        }

        res.json(safetyResult);

    } catch (error: any) {
        console.error('Safety Check Error:', error);

        // Check for specific Google API errors including quota or service unavailable
        let errorKey = "error.generic";
        if (error.message?.includes('429')) {
            errorKey = "error.safety_service_unavailable";
        } else if (error.message?.includes('503') || error.message?.includes('500')) {
            errorKey = "error.safety_service_unavailable";
        } else if (error.message?.includes('Safety')) {
            errorKey = "error.safety_check_failed";
        }

        const lang = (req as any).language || 'en';
        const reason = getTranslation(lang, errorKey);

        res.status(500).json({
            safe: false,
            reason: reason,
            details: error.message // Include details for debugging in frontend (can be removed for prod)
        });
    }
});

export default router;

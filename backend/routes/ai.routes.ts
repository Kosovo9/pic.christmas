import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// @desc    Enhance user prompt with AI
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
        const systemPrompt = `You are a Christmas photo prompt expert. Your job is to enhance user prompts for AI image generation to create beautiful, professional Christmas-themed photos.

RULES:
1. Keep the user's original intent and vision
2. Add details about Christmas atmosphere, lighting, and decorations
3. Include subject count: ${adults} adults, ${children} children, ${pets} pets
4. Make it photo-realistic and professional
5. Keep it under 200 characters
6. Don't change the core idea - only enhance it
7. Focus on Christmas/winter aesthetics

User's original idea: "${userPrompt}"

Enhanced prompt (photo-realistic, Christmas-themed, professional):`;

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

        if (!image) {
            return res.status(400).json({ message: 'Image data required' });
        }

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

        res.json(safetyResult);

    } catch (error: any) {
        console.error('Safety Check Error:', error);
        // Fail open or closed? Better fail safe (block) or allow with warning?
        // For production, we might want to fail-closed, but for now allow if error is just connection.
        // Actually, let's return error so frontend knows.
        res.status(500).json({
            safe: false,
            reason: "Safety Service Error: " + error.message
        });
    }
});

export default router;

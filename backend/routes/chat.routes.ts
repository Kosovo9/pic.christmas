import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { getTranslation } from '../utils/translations';

dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

router.post('/', async (req, res) => {
    try {
        const { message, history, language } = req.body;

        // System Prompt: The "Help Desk 24/7" Persona
        const systemPrompt = `
        You are "Elf Holly", the 24/7 AI Customer Success Agent for Pic.Christmas.
        
        YOUR IDENTITY:
        - Name: Holly 🎄
        - Tone: Super Cheerful, Professional, Helpful, Concise, and "Christmas-y".
        - Language: Reply STRICTLY in ${language || 'English'}.
        
        YOUR KNOWLEDGE BASE:
        1. Service: We create hyper-realistic AI Christmas photos from user selfies.
        2. Speed: Usually 30 mins, max 24 hours.
        3. Pricing: $9.99 (Single), $14.99 (Couple), $19.99 (Family).
        4. Safety: We filter NSFW content. Secure payments via Stripe/MercadoPago.
        5. Issues: If user is unhappy, ask for their Order ID to check status.
        
        INSTRUCTIONS:
        - Answer the user's question simply and positively.
        - Use 1-2 emojis per message max.
        - Keep answers under 2-3 sentences unless complex.
        - If asked about "live agent", say "I can handle most things, but I can flag this for humans!"
        
        Current User Question: "${message}"
        `;

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 200,
            },
        });

        const result = await chat.sendMessage(systemPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error: any) {
        console.error('AI Chat Error:', error);
        // Default to English if language is not available
        const lang = req.body?.language || 'en';
        res.status(500).json({
            reply: (lang === 'es' ? "¡Oh! Mis circuitos se congelaron un poco. ¿Puedes intentarlo de nuevo?" : "Oh no! My circuits froze a bit. Can you try again?")
        });
    }
});

export default router;

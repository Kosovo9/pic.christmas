import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { knowledgeBase } from "@/lib/knowledgeBase";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    let language = 'en';
    let message: string;
    let history: any[];
    try {
        const body = await req.json();
        message = body.message;
        history = body.history;
        language = body.language || 'en';

        // Map locale to full language name
        const langMap: Record<string, string> = {
            en: 'English', es: 'Spanish', fr: 'French', de: 'German',
            it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese',
            ja: 'Japanese', ar: 'Arabic', hi: 'Hindi', ko: 'Korean',
            tr: 'Turkish', nl: 'Dutch', vi: 'Vietnamese'
        };
        const targetLanguage = langMap[language] || 'English';

        // Set up the model with native system instruction
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: knowledgeBase.getSystemPrompt(targetLanguage) + `
            
            IMPORTANT:
            - You MUST respond in ${targetLanguage}.
            - If the user writes in a different language, reply in ${targetLanguage} unless they specifically ask to switch.
            - Keep responses under 3 sentences for mobile clarity.
            `
        });

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.8,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            reply: text,
            status: "success",
            agent: "Holly 🎁"
        });
    } catch (error) {
        console.error("AI Chat Error:", error);

        // Context-aware fallback
        const backOffMsgs: Record<string, string> = {
            en: "Ho ho ho! I'm a bit overwhelmed with letters to Santa. Please try again! ❄️",
            es: "¡Jo jo jo! Estoy un poco abrumada con tantas cartas. ¡Inténtalo de nuevo en un momento! ❄️",
            fr: "Ho ho ho ! Je suis un peu débordée par les lettres au Père Noël. Réessayez ! ❄️"
        };

        const fallback = backOffMsgs[language] || backOffMsgs['en'];
        return NextResponse.json({ reply: fallback }, { status: 200 });
    }
}

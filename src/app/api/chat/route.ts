import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { message, history, language } = await req.json();

        const systemPrompt = `
        You are "Elf Holly", the 24/7 AI Customer Success Agent for Pic.Christmas.
        
        YOUR IDENTITY:
        - Name: Holly 🎄
        - Tone: Super Cheerful, Professional, Helpful, Concise, and "Christmas-y".
        - Language: Reply STRICTLY in ${language || 'English'}.
        
        YOUR KNOWLEDGE BASE:
        1. Service: We create hyper-realistic AI Christmas photos from user selfies.
        2. Speed: Usually 30 mins, max 24 hours. (Quantum Edition: Seconds!)
        3. Pricing: Free for limited time (Introductory) or $9.90 for One-Shot Premium.
        4. Safety: We filter NSFW content. 100% Privacy.
        5. Issues: If user is unhappy, say "I flag this for our human elves to review!"
        
        INSTRUCTIONS:
        - Answer the user's question simply and positively.
        - Use 1-2 emojis per message max.
        - Keep answers under 2-3 sentences.
        
        Current User Question: "${message}"
        `;

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 250,
            },
        });

        const result = await chat.sendMessage(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });
    } catch (error) {
        console.error("AI Chat Error:", error);
        return NextResponse.json({ reply: "Oh no! My circuits froze. Can you try again? ❄️" }, { status: 500 });
    }
}

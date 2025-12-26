import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { knowledgeBase } from "@/lib/knowledgeBase";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { message, history, language } = await req.json();

        const systemPrompt = knowledgeBase.getSystemPrompt(language || 'Spanish') + `
        
        USER CONTEXT & MEMORY:
        - The user is currently browsing in ${language || 'Spanish'}.
        - Maintain continuity with previous messages in the history.
        - If the user asks something not in the knowledge base, respond with festive elegance and offer to escalate to "Human Elves".
        
        Current User Question: "${message}"
        `;

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            reply: text,
            status: "success",
            agent: "Holly 🎁"
        });
    } catch (error) {
        console.error("AI Chat Error:", error);
        // Fallback response in the correct language if possible
        const fallback = "Ho ho ho! I'm a bit overwhelmed with letters to Santa. Please try again in a moment! ❄️";
        return NextResponse.json({ reply: fallback }, { status: 200 }); // Return 200 to avoid UI crashes
    }
}

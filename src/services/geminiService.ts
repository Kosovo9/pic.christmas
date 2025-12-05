import { PromptItem, AspectRatio } from "../types";

// En producción, no expongas la API key en el cliente.
// Aquí se deja por simplicidad / demo.
const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

// Mock implementation for now as we don't have the GoogleGenAI SDK installed yet
// and we want to avoid installation issues in this environment.
// In a real scenario, we would import { GoogleGenAI } from "@google/genai";

export const generateChristmasContent = async (
    promptItem: PromptItem,
    customInstruction: string | undefined,
    imageFile: File,
    aspectRatio: AspectRatio = '1:1'
): Promise<string> => {

    const isVideo = promptItem.type === 'video';

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Return a placeholder URL based on type
    if (isVideo) {
        return "https://cdn.pixabay.com/video/2023/12/18/193685-896206678_large.mp4"; // Christmas video placeholder
    } else {
        // Return a placeholder image based on aspect ratio
        if (aspectRatio === '9:16') {
            return "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1887&auto=format&fit=crop"; // Vertical Christmas
        } else if (aspectRatio === '16:9') {
            return "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop"; // Horizontal Christmas
        } else {
            return "https://images.unsplash.com/photo-1543258103-a62bdc069871?q=80&w=1974&auto=format&fit=crop"; // Square/Default Christmas
        }
    }
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    });
};

// CHAT 24/7 – stub Hugging Face / open source
export const sendMessageToAI = async (message: string): Promise<string> => {
    // Aquí iría tu fetch real a Hugging Face:
    // const response = await fetch('https://api-inference.huggingface.co/models/xxx', { ... })
    await new Promise(r => setTimeout(r, 1500));
    return "Soy el Asistente Virtual Nexora. Puedo ayudarte a elegir el mejor estilo para tus fotos, explicar precios, idiomas y nuestra política de privacidad. (Chat de demostración, listo para conectar a Hugging Face u otro modelo open source).";
};

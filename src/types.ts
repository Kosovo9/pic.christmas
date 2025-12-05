export type Language =
    | 'es' // Spanish
    | 'en' // English
    | 'zh' // Simplified Chinese
    | 'fr' // French
    | 'de' // German
    | 'pt'; // Portuguese

export type MediaType = 'image' | 'video';

export type AspectRatio = '1:1' | '9:16' | '16:9';

export interface PromptItem {
    id: string;
    category: 'couple' | 'family' | 'pet' | 'professional' | 'video' | 'custom';
    title: Record<Language, string>;
    description: Record<Language, string>;
    fullPrompt: Record<Language, string>;
    type: MediaType;
    coverImage?: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    timestamp: number;
}

export interface GenerationJob {
    id: string;
    status: 'idle' | 'uploading' | 'processing' | 'completed' | 'failed';
    resultUrl?: string;
    mediaType: MediaType;
    error?: string;
}

export interface PricingPackage {
    id: string;
    title: string;
    description: string;
    price: string;
    cta: string;
}

// Idiomas soportados
export type Language =
  | 'es' // Spanish
  | 'en' // English
  | 'zh' // Simplified Chinese
  | 'fr' // French
  | 'de' // German
  | 'pt'; // Portuguese

export type MediaType = 'image' | 'video';

export type AspectRatio = '1:1' | '16:9' | '9:16';

export interface PromptItem {
  id: string;
  category: 'couple' | 'family' | 'pet' | 'professional' | 'video' | 'kids' | 'friends';
  title: Record<Language, string>;
  fullPrompt: Record<Language, string>; // The "Idea"
  type: MediaType;
}

export interface SubjectCounts {
  adults: number;
  kids: number;
  dogs: number;
  cats: number;
  others: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export interface PricingRule {
  basePrice: number;
  includedPeople: number;
  includedPets: number;
  pricePerExtraPerson: number;
  pricePerExtraPet: number;
}

export interface PricingPackage {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  features: Record<Language, string[]>;
  recommended: boolean;
  rule: PricingRule; // Dynamic pricing logic
}

export interface ReferralState {
  code: string;
  referrals: number; // Current count
  target: number; // 5
  hasReward: boolean;
}
// API Service for pic.christmas backend

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
    // Existing methods
    uploadPhotos: async (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => formData.append('photos', file));

        const res = await fetch(`${API_BASE}/uploads`, {
            method: 'POST',
            body: formData
        });
        return res.json();
    },

    // Orders
    createOrder: async (orderData: any) => {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        return res.json();
    },

    getOrder: async (orderId: string) => {
        const res = await fetch(`${API_BASE}/orders/${orderId}`);
        return res.json();
    },

    // Payments
    createPaymentIntent: async (orderId: string) => {
        const res = await fetch(`${API_BASE}/payments/create-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId })
        });
        return res.json();
    },

    createMPPreference: async (orderId: string) => {
        const res = await fetch(`${API_BASE}/payments/create-preference`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId })
        });
        return res.json();
    },

    // Referrals
    generateReferralCode: async (email?: string) => {
        const res = await fetch(`${API_BASE}/referrals/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        return res.json();
    },

    getReferralStats: async (code: string) => {
        const res = await fetch(`${API_BASE}/referrals/${code}`);
        return res.json();
    },

    validateReferralCode: async (code: string) => {
        const res = await fetch(`${API_BASE}/referrals/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });
        return res.json();
    },

    // Christmas Prompts
    getAllPrompts: async () => {
        const res = await fetch(`${API_BASE}/prompts`);
        return res.json();
    },

    getPromptsByCategory: async (category: string) => {
        const res = await fetch(`${API_BASE}/prompts/category/${category}`);
        return res.json();
    },

    getRandomPrompts: async (count: number = 6) => {
        const res = await fetch(`${API_BASE}/prompts/random/${count}`);
        return res.json();
    },

    // AI Enhancement
    enhancePrompt: async (userPrompt: string, config: any) => {
        const res = await fetch(`${API_BASE}/ai/enhance-prompt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userPrompt, config })
        });
        return res.json();
    },

    getPromptVariations: async (basePrompt: string, count: number = 3) => {
        const res = await fetch(`${API_BASE}/ai/variations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ basePrompt, count })
        });
        return res.json();
    }
};

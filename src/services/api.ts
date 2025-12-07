// API Service for pic.christmas backend

// 🚀 ELON 10X: Using Next.js Proxy (rewrites) to avoid CORS and env fragility.
// The browser now talks to /api, and Next.js forwards it to Render.
const API_BASE = '/api';

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
    },

    // Admin
    getAdminStats: async (token: string) => {
        // Requires Clerk Token (or secret for MVP)
        const res = await fetch(`${API_BASE}/admin/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.json();
    },

    retryOrder: async (orderId: string, token: string) => {
        const res = await fetch(`${API_BASE}/admin/retry/${orderId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.json();
    },

    // Affiliate Assets (Gemini AI)
    generateAffiliateAsset: async (data: { productName: string; ctaText: string; style?: string }) => {
        const res = await fetch(`${API_BASE}/affiliate-assets/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    generateAssetVariations: async (data: { productName: string; ctaText: string; style?: string }) => {
        const res = await fetch(`${API_BASE}/affiliate-assets/variations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

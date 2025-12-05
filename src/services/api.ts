// API Service for Pic.Christmas

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface UploadResponse {
    success: boolean;
    fileIds: string[];
}

export interface OrderConfig {
    adults: number;
    children: number;
    pets: number;
    vibe: string;
}

export const api = {
    uploadPhotos: async (files: File[]): Promise<UploadResponse> => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('photos', file);
        });

        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload photos');
        }

        return await response.json();
    },

    createOrder: async (config: OrderConfig, packageId: string, fileIds: string[]) => {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                packageId,
                config,
                originalImages: fileIds
            })
        });

        if (!response.ok) throw new Error('Failed to create order');
        return await response.json();
    },

    createPaymentIntent: async (orderId: string) => {
        const response = await fetch(`${API_URL}/payments/create-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId })
        });
        if (!response.ok) throw new Error('Failed to create payment intent');
        return await response.json();
    }
};

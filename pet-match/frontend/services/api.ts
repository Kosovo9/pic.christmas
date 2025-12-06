import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export const api = {
    createOrder: async (data: any) => {
        const res = await axios.post(`${API_URL}/orders`, data);
        return res.data;
    },

    createPaymentSession: async (orderId: string) => {
        const res = await axios.post(`${API_URL}/payments/create-session`, { orderId });
        return res.data;
    },

    // For MVP Speed, we might upload directly to cloud or send Base64 to backend (not recommended for prod but fast for prototype)
    // Here we'll assume the backend handles multipart upload or we presign. 
    // To match the backend 'originalPhoto' string expectation, we'll assume we upload first.
    // Let's implement a simple direct upload stub that returns a mock URL for now if backend upload route isn't ready, 
    // OR assuming we linked the `pic.christmas` upload route.
    // For PetMatch standalone, let's just convert file to base64 for the 'originalPhoto' field if < 10MB (Speed Hack) 
    // OR upload to a temp /api/upload endpoint.

    // Let's use Base64 for the absolute fastest MVP "One File" approach:
    uploadPhoto: async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
};

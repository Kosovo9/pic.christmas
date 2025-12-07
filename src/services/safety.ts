import { api } from './api';

// Helper to resize image for faster transmission (max 512px)
const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_SIZE = 512;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Moderate compression
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const ContentSafetyService = {
    scanFiles: async (files: File[]): Promise<{ safe: boolean; reason?: string }> => {
        console.log(`🛡️ ELON SAFE: Scanning ${files.length} files with Gemini Vision...`);

        // Check only the first 3 files to save bandwidth/latency (Sample check)
        // or check all in parallel. Let's check all for max safety.

        try {
            const checks = files.map(async (file) => {
                const base64 = await resizeImage(file);

                // Call our new backend endpoint
                // We use fetch directly here or add to api.ts? 
                // Let's use fetch to keep it self-contained or use api.ts if we add a method.
                // Using relative path /api/ai/safety-check (proxy handles it)
                const res = await fetch('/api/ai/safety-check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64 })
                });

                if (!res.ok) {
                    throw new Error('Safety check failed');
                }

                return res.json();
            });

            const results = await Promise.all(checks);

            // If ANY file is unsafe, fail the whole batch
            const unsafe = results.find((r: any) => r.safe === false);
            if (unsafe) {
                return { safe: false, reason: unsafe.reason || "Content flagged by AI Safety System." };
            }

            return { safe: true };

        } catch (error) {
            console.error("Safety Scan Error:", error);
            // Fallback: If AI is down, we could allow or block. 
            // Elon says: "Better safe than sorry".
            return { safe: false, reason: "Safety scan service temporarily unavailable. Please try again." };
        }
    }
};
